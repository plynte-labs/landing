# Proposal: Focus & Keyboard Accessibility Fixes

## Intent

Fix 6 accessibility issues from the skill-based audit (findings H3, H4, M3, M4, M5, M6) that impact keyboard-only and screen reader users. Without fixes: navbar links and buttons lack visible focus indicators (WCAG 2.4.7 AA violation), screen readers get no warning about new-tab links, decorative particles pollute the a11y tree, and an inline component anti-pattern causes unnecessary re-mounts.

## Scope

### In Scope
- Add `:focus-visible` outline to `.navbar-item a` and `.button` (brand-green, 2px, offset 2px)
- Add `aria-label` to maintainer banner link warning about new-tab behavior
- Remove redundant `onKeyDown` handler from LanguageSwitcher (native `<button>` handles Enter/Space)
- Add `aria-hidden="true"` to all particle `<div>` elements in ParticleField
- Add `aria-label="Main navigation"` to the `<nav>` element in navbar.tsx
- Extract `MaintainerBanner` from MainLayout.tsx to `src/layouts/banner/MaintainerBanner.tsx`

### Out of Scope
- Skip-to-content link (C1, separate change)
- `prefers-reduced-motion` (C2, separate change)
- All other audit findings (H1-H2, H5-H12, M1-M2, M7-M15, L1-L8)

## Capabilities

### New Capabilities
None — the aria-label additions (H4, M4) and component extraction (M6) are implementation-only attribute/file changes.

### Modified Capabilities
- `keyboard-navigation`: Adds `:focus-visible` requirement for navbar links and Button (H3), `aria-label` on `<nav>` (M5), and ensures native button keyboard handling is not overridden by redundant handlers (M3).

## Approach

Apply 6 targeted, minimal-diff fixes directly to the files identified in the audit. Each fix is isolated — no fix depends on another. CSS-only changes for H3 (vendor-safe property), attribute additions for H4/M4/M5, code removal for M3, file extraction for M6. No new dependencies.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/layouts/navbar/navbar.css` | Modified | Add `.navbar-item a:focus-visible` rule |
| `src/components/UI/Button/Button.css` | Modified | Add `.button:focus-visible` rule |
| `src/layouts/MainLayout.tsx` | Modified | Add aria-label to banner link; remove inline component |
| `src/layouts/banner/MaintainerBanner.tsx` | New | Extracted banner component |
| `src/components/UI/LanguageSwitcher/LanguageSwitcher.tsx` | Modified | Remove onKeyDown handler and prop |
| `src/components/UI/ParticleField/ParticleField.tsx` | Modified | Add aria-hidden to particle divs |
| `src/layouts/navbar/navbar.tsx` | Modified | Add aria-label to `<nav>` |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Focus-visible outline may clash with brand design | Low | Uses `var(--brand-green)` to match existing accent |
| Removing onKeyDown could break keyboard activation on certain AT/browser combos | Very Low | Native `<button>` handles Enter/Space per HTML spec |
| Extracted MaintainerBanner may break if MainLayout had implicit coupling | Low | Banner only uses `useLanguage()` hook; zero props or closure deps |

## Rollback Plan

Revert the commit. All changes are additive (CSS rules, aria attributes) or removal (onKeyDown) — no state migration involved.

## Dependencies

None. No external packages, API changes, or config modifications.

## Success Criteria

- [ ] `tsc -b` passes with zero errors
- [ ] `npm run build` completes successfully
- [ ] Tab-keyboard navigation shows visible focus rings on all navbar links and buttons
- [ ] Screen reader announces "Maintainer portfolio (opens in new tab)" on banner link
- [ ] LanguageSwitcher activates on Enter and Space via native button behavior
- [ ] Screen reader skips over 150 particle divs (marked aria-hidden)
- [ ] `<nav>` element has accessible name "Main navigation"
- [ ] MaintainerBanner exists as separate file in `src/layouts/banner/`
