# Tasks: CSS Token Consolidation

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~35-40 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Full CSS token consolidation | Single PR | Well under 400-line budget; no split needed |

## Phase 1: Token Migration

- [x] 1.1 Add 3 tokens to `src/styles/design-tokens.css`: insert `--color-secondary: #9FA2B4;`, `--color-text-secondary: white;`, `--color-bg-secondary: black;` after `--color-text-light` (line 7)

## Phase 2: File Cleanup

- [x] 2.1 Delete `src/styles/colors.css` (26 lines — tokens already migrated in 1.1)
- [x] 2.2 Delete `src/styles/variables.css` (dead code, zero imports)
- [x] 2.3 Remove `@import './colors.css';` from `src/styles/App.css` line 1

## Phase 3: Background Tokenization

- [x] 3.1 Replace `background: #000000` with `background: var(--color-dark-bg)` in `src/features/HeroSection/HeroSection.css` line 4
- [x] 3.2 Replace `background: #000000` with `background: var(--color-dark-bg)` in `src/features/ArchitectureSection/ArchitectureSection.css` line 3
- [x] 3.3 Replace `background: #000000` with `background: var(--color-dark-bg)` in `src/features/MissionSection/MissionSection.css` line 3

## Phase 4: Verification

- [x] 4.1 Run `pnpm tsc -b` — must succeed with zero errors
- [x] 4.2 Grep `src/` for `colors\.css` and `variables\.css` — must return zero hits
- [x] 4.3 Grep `src/features/` for `#000000` — must return zero hits in CSS files
- [ ] 4.4 Visual check: open DevTools, verify `.hero`, `.architecture`, `.mission` computed `background-color` resolves to `#0a0a0a`
