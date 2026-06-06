# Design: Focus & Keyboard Accessibility Fixes

## Technical Approach

Six isolated, minimal-diff a11y fixes targeting WCAG 2.4.7 AA (Focus Visible) and ARIA violations from the skill audit (findings H3, H4, M3, M4, M5, M6). All fixes are independent — no ordering dependency. Two CSS-only changes (outlines), four component changes (attribute additions, handler removal, file extraction). Zero new dependencies.

## Architecture Decisions

### Decision: Use `outline` over `border` for focus indicators

| Option | Tradeoff | Decision |
|--------|---------|----------|
| `border` + `box-sizing` | Prevents layout shift but interferes with existing `border: none` on `.button` | Rejected |
| `outline` with offset | No layout shift, works with any box model, does not participate in box sizing | **Chosen** |
| `box-shadow` | No layout shift but blur radius can look muddy on dark themes | Rejected |

**Rationale**: `outline` does not participate in the box model — no reflow on focus. `outline-offset: 2px` keeps the ring separated from the element edge. Matches the codebase's existing `border: none` on `.button` without conflict. Uses `var(--brand-green)` to stay consistent with the existing accent color used in hover states.

### Decision: Keep CSS in MainLayout.css, import cross-directory

| Option | Tradeoff | Decision |
|--------|---------|----------|
| New `MaintainerBanner.css` in banner dir | Cleaner isolation but adds a file not in proposal scope | Rejected |
| Import `../MainLayout.css` from banner | Cross-directory import but keeps diff minimal and avoids duplication | **Chosen** |
| Move CSS rule to banner dir | Requires modifying MainLayout.css anyway (removal), extra diff | Rejected |

**Rationale**: The proposal lists `MainLayout.css` as unaffected — no CSS rule should be duplicated or relocated unnecessarily. Importing `"../MainLayout.css"` from `src/layouts/banner/` is valid in Vite and respects the minimal-diff principle.

### Decision: Remove onKeyDown entirely

| Option | Tradeoff | Decision |
|--------|---------|----------|
| Keep handler, add early return | No risk but leaves dead code that could mask bugs | Rejected |
| Remove handler + prop binding | Minimal, correct, native `<button>` fires `onClick` on Enter/Space per HTML spec §4.10.4 | **Chosen** |

**Rationale**: Native `<button>` elements fire `onClick` on Enter and Space per the HTML Living Standard. The redundant `handleKeyDown` was an anti-pattern — it could cause double-firing in some AT/UA combinations and violates the platform's native semantics. The `React` import stays — still used by `React.FC`.

## Data Flow

No data flow changes. All fixes are structural or attribute-level.

```
MainLayout ──imports──▶ MaintainerBanner (extracted, uses useLanguage())
     │                        │
     ▼                        ▼
  Navbar                  <a aria-label="Maintainer portfolio (opens in new tab)">
  aria-label=                  │
  "Main navigation"            └─ .maintainer-banner CSS (imported from ../MainLayout.css)
     │
     ▼
  LanguageSwitcher (onClick only — native button keyboard)
  ParticleField (aria-hidden="true" on each particle <div>)
  Button.css (+ :focus-visible rule)
  navbar.css (+ .navbar-item a:focus-visible rule)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/layouts/banner/MaintainerBanner.tsx` | **Create** | Extracted banner component with `aria-label`, imports `useLanguage` and `"../MainLayout.css"` |
| `src/layouts/MainLayout.tsx` | Modify | Remove inline MaintainerBanner; import from `"./banner/MaintainerBanner"` |
| `src/layouts/navbar/navbar.tsx` | Modify | Add `aria-label="Main navigation"` to `<nav>` element |
| `src/layouts/navbar/navbar.css` | Modify | Add `.navbar-item a:focus-visible { outline: 2px solid var(--brand-green); outline-offset: 2px; }` |
| `src/components/UI/Button/Button.css` | Modify | Add `.button:focus-visible { outline: 2px solid var(--brand-green); outline-offset: 2px; }` |
| `src/components/UI/LanguageSwitcher/LanguageSwitcher.tsx` | Modify | Remove `handleKeyDown` function (lines 13-18) and `onKeyDown={handleKeyDown}` prop (line 25) |
| `src/components/UI/ParticleField/ParticleField.tsx` | Modify | Add `aria-hidden="true"` attribute to each particle `<div>` in the `.map()` callback |

## Interfaces / Contracts

No new types, props, or API contracts. The extracted `MaintainerBanner` is a zero-prop functional component that consumes `useLanguage()` from the existing `LanguageContext` — same contract as the inline version.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual (visual) | Focus rings visible on Tab | Tab through navbar links and buttons; verify green outline on `:focus-visible` (not on click/mouse) |
| Manual (screen reader) | `aria-label` on banner link | NVDA/VoiceOver announces "Maintainer portfolio (opens in new tab)" |
| Manual (screen reader) | Particles excluded from a11y tree | Virtual cursor skips all 150 particle `<div>` elements |
| Manual (screen reader) | Nav landmark has accessible name | Landmark rotor lists "Main navigation" |
| Manual (keyboard) | LanguageSwitcher activation | Enter and Space toggle language without double-firing |
| Build | TypeScript compilation | `tsc -b` exits zero |
| Build | Production bundle | `npm run build` completes successfully |

No existing automated test infrastructure in this project — all verification is manual per the proposal's success criteria.

## Migration / Rollout

No migration required. Changes are additive (CSS rules, aria attributes), subtractive (handler removal), or structural (component extraction with identical runtime behavior). Rollback: revert the commit.

## Open Questions

None — all six fixes are well-defined, atomic changes with zero ambiguity.
