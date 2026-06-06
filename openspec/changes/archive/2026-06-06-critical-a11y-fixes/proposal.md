# Proposal: Critical A11y Fixes

## Intent

Fix two WCAG failures from the skill-based audit: missing skip-to-content mechanism (2.4.1 Level A) and absent `prefers-reduced-motion` support (2.3.3 Level AAA). Keyboard users currently tab through every navbar item on each page load. Motion-sensitive users have no opt-out — Framer Motion animations run at full intensity regardless of OS preference.

## Scope

### In Scope
- Skip-to-content anchor as first focusable element in `index.html`
- `id="main-content"` on `<main>` in MainLayout (skip target)
- Global `@media (prefers-reduced-motion: reduce)` rule in `App.css`
- `useReducedMotion()` hook in 5 feature components using Framer Motion

### Out of Scope
- Focus-visible styles on navbar/buttons (separate H3 change)
- Reduced-motion for CSS-only keyframe animations in other files
- Motion preference persistence beyond OS-level media query

## Capabilities

### New Capabilities
- `skip-to-content`: Keyboard bypass mechanism per WCAG 2.4.1 Level A
- `reduced-motion`: Motion reduction per WCAG 2.3.3, respecting OS preference

### Modified Capabilities
None. Existing spec behavior (section composition, rendering, i18n) is unchanged. This is infrastructure-only — no requirement-level modification to any existing capability.

## Approach

**Skip link**: Static `<a>` as first child of `<body>` in `index.html`, before `<div id="root">`. Standard pattern: `position: fixed; transform: translateY(-100%)` until `:focus`, then slides into view. Targets `#main-content` — an `id` added to the existing `<main>` in MainLayout. This ensures the link is available before React mounts.

**Reduced motion**: Two-layer defense. (a) Global CSS: `animation-duration: 0.01ms !important` and `transition-duration: 0.01ms !important` inside `@media (prefers-reduced-motion: reduce)`. (b) Framer Motion: `useReducedMotion()` per component; when `true`, skip `initial`/`animate` by setting both to the target (visible) state.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | Add skip-link `<a>` before `#root` |
| `src/styles/App.css` | Modified | Skip-link CSS + reduced-motion media query |
| `src/layouts/MainLayout.tsx` | Modified | `id="main-content"` on `<main>` |
| `src/features/HeroSection/HeroSection.tsx` | Modified | `useReducedMotion()` on 4 motion elements |
| `src/features/EcosystemSection/EcosystemSection.tsx` | Modified | `useReducedMotion()` on grid + cards |
| `src/features/ArchitectureSection/ArchitectureSection.tsx` | Modified | `useReducedMotion()` on cards |
| `src/features/ContributeSection/ContributeSection.tsx` | Modified | `useReducedMotion()` on content + steps |
| `src/features/MissionSection/MissionSection.tsx` | Modified | `useReducedMotion()` on content |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Skip link CSS breaks first-paint layout | Low | `position: fixed`, `top: 0`, `z-index: 10000` — isolated from flow |
| `useReducedMotion()` returns `null` during SSR | Low | No SSR in this Vite SPA; defaults to `false` |
| Skip link not focusable before React mounts | Low | Static HTML in `index.html` — available immediately |

## Rollback Plan

Remove the skip-link `<a>` from `index.html`, remove `id="main-content"` from `<main>`, delete the skip-link CSS block and reduced-motion media query from `App.css`, and revert `useReducedMotion()` additions in all 5 feature files. Each change is self-contained with no data or state dependencies.

## Dependencies

None. `useReducedMotion` ships with the already-installed `framer-motion` package.

## Success Criteria

- [ ] Tab on page load focuses skip link as first element
- [ ] Activating skip link moves focus to `<main>` content
- [ ] Skip link invisible until focused
- [ ] OS "Reduce motion" disables all Framer Motion animations
- [ ] OS "Reduce motion" disables all CSS animations/transitions
- [ ] `tsc -b` passes with zero errors
- [ ] Visual behavior unchanged when reduced motion is OFF
