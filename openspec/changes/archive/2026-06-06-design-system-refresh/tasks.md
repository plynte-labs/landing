# Tasks: Design System Refresh

## Review Workload Forecast

| Metric | Value |
|--------|-------|
| Estimated changed lines | ~35 (CSS + HTML only) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Decision needed before apply | No |
| Chain strategy | N/A — single PR |

---

## Phase 1: Font & Animation Refresh

### 1.1 Replace Inter → DM Sans body font token

- [x] Change `--font-body: 'Inter', sans-serif` → `--font-body: 'DM Sans', sans-serif` at `src/styles/design-tokens.css:36`
- **Spec**: Distinctive Body Font requirement
- **Design**: DM Sans chosen for geometric warmth pairing with Anton display

### 1.2 Add Google Fonts preconnect and stylesheet for DM Sans

- [x] Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `https://fonts.gstatic.com` in `index.html` `<head>`
- [x] Add `<link>` stylesheet loading DM Sans weights 400, 500, 700 with `display=swap`
- **Spec**: Font resources loaded efficiently scenario
- **Design**: Preconnect + stylesheet in `<head>`

### 1.3 Replace LinkButton rainbow animation with brand green glow

- [x] Replace `::before` linear-gradient (rainbow) with `background: var(--brand-green-glow)`
- [x] Remove `background-size: 200% 100%`
- [x] Replace `@keyframes rgbAlive` with `@keyframes pulseGreen` (box-shadow pulse per design)
- [x] Update animation property on `::before` from `rgbAlive 6s` to `pulseGreen 2s ease-in-out infinite`
- [x] Shorten `transition: opacity 2s` → `transition: opacity 0.3s ease-in-out` for snappier hover
- **Spec**: Brand-Consistent LinkButton Animation requirement (all 4 scenarios)
- **Design**: Green glow via `--brand-green-glow` + `box-shadow` pulse keyframes

### 1.4 Verify M12 invalid CSS absent from LinkButton.css

- [x] Run `rg "transform:\s*ease-in-out" src/components/UI/LinkButton/LinkButton.css` — result: **CLEAN** (0 matches)
- **Spec**: Valid CSS Properties requirement — No invalid property declarations scenario
- **Design**: M12 scope note — LinkButton verified, Button.css sibling bug documented

### 1.5 Fix invalid CSS at Button.css:57 (`transform: ease-in-out 0.3s`)

- [x] Change `transform: ease-in-out 0.3s` → `transition: transform 0.3s ease-in-out` at `src/components/UI/Button/Button.css:57`
- **Spec**: Valid CSS Properties requirement — Transition timing uses transition property scenario
- **Scope expansion**: Design M12 decision documented this as Button.css sibling bug; included per apply-phase instructions
