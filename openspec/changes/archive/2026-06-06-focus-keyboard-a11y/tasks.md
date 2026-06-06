# Tasks: Focus & Keyboard Accessibility Fixes

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~45 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-always |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: CSS Focus Indicators (H3)

- [x] 1.1 Add `.navbar-item a:focus-visible` rule in `src/layouts/navbar/navbar.css` — `outline: 2px solid var(--brand-green); outline-offset: 2px;`
- [x] 1.2 Add `.button:focus-visible` rule in `src/components/UI/Button/Button.css` — same outline values

## Phase 2: Component A11y Attributes (M3, M4, M5)

- [x] 2.1 Remove `handleKeyDown` function (lines 13-18) and `onKeyDown={handleKeyDown}` prop (line 25) in `src/components/UI/LanguageSwitcher/LanguageSwitcher.tsx`
- [x] 2.2 Add `aria-hidden="true"` to particle `<div>` in `src/components/UI/ParticleField/ParticleField.tsx` line 12
- [x] 2.3 Add `aria-label="Main navigation"` to `<nav>` element in `src/layouts/navbar/navbar.tsx` line 32

## Phase 3: Banner Extraction + New-Tab Label (H4, M6)

- [x] 3.1 Create `src/layouts/banner/MaintainerBanner.tsx` — extract inline `MaintainerBanner` from `MainLayout.tsx` (lines 7-19) with `aria-label="Maintainer portfolio (opens in new tab)"` on the `<a>`, import `../MainLayout.css`
- [x] 3.2 Replace inline component in `src/layouts/MainLayout.tsx` — remove lines 7-19, add `import { MaintainerBanner } from "./banner/MaintainerBanner"`

## Phase 4: Verification

- [x] 4.1 Run `npx tsc -b` — TypeScript compilation zero errors
- [x] 4.2 Run `npm run build` — production build completes successfully (vite build via npx: 480 modules, 3.10s)
- [ ] 4.3 Manual: Tab through navbar links and buttons — verify green `:focus-visible` outline (not on click)
- [ ] 4.4 Manual: Screen reader — verify "Main navigation" landmark, "opens in new tab" on banner, particles skipped, LanguageSwitcher activates on Enter/Space
