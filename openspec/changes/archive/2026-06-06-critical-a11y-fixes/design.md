# Design: Critical A11y Fixes

## Technical Approach

Two independent, zero-dependency accessibility fixes. Fix #1 adds a keyboard bypass mechanism (WCAG 2.4.1) via static HTML in `index.html`. Fix #2 adds motion reduction (WCAG 2.3.3) through a two-layer defense: global CSS `@media` rule + per-component `useReducedMotion()` hook. No SSR concerns — this is a client-only Vite SPA.

## Architecture Decisions

| Decision | Option A | Option B | Chosen | Rationale |
|----------|----------|----------|--------|-----------|
| Skip link placement | `index.html` (static) | `MainLayout.tsx` (React) | **index.html** | Must be first focusable element. Guaranteed in DOM before React mounts. Works if JS fails. Standard WCAG pattern (WebAIM, gov.uk, USWDS). |
| Skip link hide mechanism | `translateY(-100%)` | `top: -100%` / `clip-path` | **translateY(-100%)** | `clip-path` removes from a11y tree in some SRs. `top: -100%` is % of containing block — unreliable with `position: fixed`. `translateY` is relative to own height, animatable, keeps a11y tree presence. |
| Reduced motion hook pattern | Inline `useReducedMotion()` | Custom wrapper hook | **Inline per component** | Only 5 components. Inline is explicit, debuggable, and adds ~3 lines per file. Custom hook is premature abstraction for this scope. |
| ParticleField under reduced motion | Return `null` | Render static / fewer particles | **Return null** | Particles are purely decorative. When motion is dispreferred, the most respectful choice is to not render them — zero DOM, zero CPU, zero SR noise. Parent already has `aria-hidden="true"`. |

## Data Flow

```
              index.html (skip link)
                   │
                   │ href="#main-content"
                   ▼
         MainLayout.tsx <main id="main-content" tabIndex={-1}>
                   │
                   └── Outlet ──► LandingPage ──► feature sections

              CSS Layer: App.css
              ┌──────────────────────────────────┐
              │ @media (prefers-reduced-motion)   │──► all CSS animations/transitions
              └──────────────────────────────────┘

              JS Layer: per component
              ┌──────────────────────────────────────┐
              │ useReducedMotion() → true            │
              │   → initial={false} / initial="visible"│
              │   → motion elements render at target   │
              │ HeroSection → ParticleField(null)      │
              └──────────────────────────────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modify | Add `.skip-link <a>` as first child of `<body>`, before `<div id="root">` |
| `src/styles/App.css` | Modify | Add `.skip-link` CSS block + `@media (prefers-reduced-motion: reduce)` global rule |
| `src/layouts/MainLayout.tsx` | Modify | Add `id="main-content" tabIndex={-1}` to `<main>` element |
| `src/features/HeroSection/HeroSection.tsx` | Modify | Import `useReducedMotion`; override `initial` on 4 `motion.*` elements; pass `reducedMotion` to `ParticleField` |
| `src/features/EcosystemSection/EcosystemSection.tsx` | Modify | Import `useReducedMotion`; override `initial`/`whileInView` on grid + cards |
| `src/features/ArchitectureSection/ArchitectureSection.tsx` | Modify | Import `useReducedMotion`; override `initial`/`whileInView` on cards |
| `src/features/MissionSection/MissionSection.tsx` | Modify | Import `useReducedMotion`; override `initial`/`whileInView` on content |
| `src/features/ContributeSection/ContributeSection.tsx` | Modify | Import `useReducedMotion`; override `initial`/`whileInView` on content, steps, code-section, community |
| `src/components/UI/ParticleField/ParticleField.tsx` | Modify | Accept `reducedMotion?: boolean` prop; return `null` when `true` |

## Implementation Patterns (non-obvious)

### Skip link HTML (index.html)
```html
<body>
  <a class="skip-link" href="#main-content">Saltar al contenido</a>
  <div id="root"></div>
  ...
```

### Skip link CSS (App.css)
```css
.skip-link {
  position: fixed;
  top: 0; left: 50%;
  transform: translate(-50%, -100%);
  background: var(--color-dark-bg);
  color: var(--color-text-light);
  padding: var(--space-3) var(--space-6);
  z-index: 10000;
  border-bottom: 3px solid var(--brand-green);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  text-decoration: none;
  border-radius: 0 0 4px 4px;
}
.skip-link:focus {
  transform: translate(-50%, 0);
}
```

### Reduced motion in components (pattern for all 5 files)
```tsx
import { useReducedMotion } from 'framer-motion';

// Inside component:
const shouldAnimate = !useReducedMotion();

// Elements with initial/animate:
<motion.img
  initial={shouldAnimate ? { scale: 0.8, opacity: 0 } : false}
  animate={{ scale: 1, opacity: 1 }}
  transition={shouldAnimate ? { duration: 0.6, ease: 'easeOut' } : { duration: 0 }}
/>

// Elements with variants + whileInView:
<motion.div
  variants={cardVariants}
  initial={shouldAnimate ? "hidden" : "visible"}
  whileInView={shouldAnimate ? "visible" : undefined}
  viewport={shouldAnimate ? { once: true, margin: '-50px' } : undefined}
/>
```

### ParticleField reduced motion
```tsx
const ParticleField = ({ count = 150, reducedMotion = false }) => {
  if (reducedMotion) return null;
  // ... existing particle generation
};
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual | Tab key focuses skip link first | Keyboard: reload page, press Tab. Verify skip link receives focus before navbar items. |
| Manual | Skip link activation moves focus | Press Enter on skip link. Verify focus moves to `<main>` and next Tab goes to first interactive element in content. |
| Manual | Skip link invisible until focused | Visual check: skip link must not be visible on page load. Only appears on `:focus`. |
| Manual | Reduced motion disables animations | Enable "Reduce motion" in OS. Reload page. Verify no Framer Motion animations fire. Verify CSS transitions/animations are instant. |
| Manual | Normal behavior unchanged | Disable "Reduce motion" in OS. Verify all animations play as before. Verify skip link not visible. |
| Build | TypeScript compilation | `tsc -b` — zero errors after all changes. |

## Migration / Rollout

No migration required. Each change is self-contained: remove the skip link `<a>` from `index.html`, remove added CSS blocks from `App.css`, remove `id`/`tabIndex` from `<main>`, and revert `useReducedMotion()` additions in feature files. No data, state, or dependency changes.

## Open Questions

None. Both fixes use standard, well-documented patterns. No external dependencies beyond `framer-motion` (already installed). No ambiguity in approach.
