# Proposal: CSS Token Consolidation

## Intent

Three overlapping CSS token files (`colors.css`, `design-tokens.css`, `variables.css`) define conflicting values for the same custom properties — e.g., `--color-primary` is `#F5F5F7` in one and `#6FF073` in another. `variables.css` is never imported (dead code). Three feature sections hardcode `background: #000000` instead of using `var(--color-dark-bg)`. This creates token drift and breaks the single-source-of-truth principle required by the Portfolio UI/UX skill.

## Scope

### In Scope
- Merge `colors.css` into `design-tokens.css`, keeping only tokens actually used
- Remove `colors.css` and `variables.css` from `src/styles/`
- Update `App.css` to import only `design-tokens.css`
- Replace hardcoded `background: #000000` with `var(--color-dark-bg)` in HeroSection, ArchitectureSection, and MissionSection CSS

### Out of Scope
- Introducing new design tokens or color values
- Changing token naming conventions (e.g., `--color-*` to `--brand-*`)
- Light mode / dark mode toggle support
- CSS Modules or CSS-in-JS migration

## Capabilities

### New Capabilities
None — this is a pure consolidation refactor.

### Modified Capabilities
None — no spec-level requirements change. The affected feature sections (`hero-section`, `architecture-section`, `mission-section`) keep identical visual behavior. Existing `color-migration` spec values (`--color-dark-bg: #0a0a0a`, `--color-primary: #6FF073`) are preserved.

## Approach

1. Merge `colors.css` token definitions into `design-tokens.css`: carry over `--color-bg-secondary: black` (used by `glass-card` spec and GlassCard component), drop everything else (`--color-primary: #F5F5F7`, `--color-opposite`, `--color-complementary`, `--color-bg-primary`, `--color-bg-complementary`, `--color-text-secondary`, `[data-theme="dark"]` block)
2. Delete `src/styles/colors.css` and `src/styles/variables.css`
3. In `App.css`: replace `@import './colors.css';` + `@import './design-tokens.css';` with single `@import './design-tokens.css';`
4. In `HeroSection.css:4`, `ArchitectureSection.css:3`, `MissionSection.css:3`: replace `background: #000000` with `background: var(--color-dark-bg)`

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/styles/design-tokens.css` | Modified | Absorb `--color-bg-secondary: black` from colors.css |
| `src/styles/App.css` | Modified | Reduce imports from 2 to 1 |
| `src/styles/colors.css` | Removed | Redundant token file |
| `src/styles/variables.css` | Removed | Dead code, never imported |
| `src/features/HeroSection/HeroSection.css` | Modified | Line 4: hardcoded → token |
| `src/features/ArchitectureSection/ArchitectureSection.css` | Modified | Line 3: hardcoded → token |
| `src/features/MissionSection/MissionSection.css` | Modified | Line 3: hardcoded → token |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Subtle background color shift (`#000000` → `#0a0a0a`) visible on high-brightness displays | Low | `#0a0a0a` is perceptually identical to black on 99% of displays; verified via hex comparison |
| Removing `colors.css` breaks a forgotten direct import | Low | Grep entire codebase for `colors.css` imports before deletion |

## Rollback Plan

Restore deleted files from git (`git checkout -- src/styles/colors.css src/styles/variables.css`). Revert `App.css` to original two-import form. Revert the 3 feature CSS files to `background: #000000`.

## Dependencies

None.

## Success Criteria

- [ ] Only one CSS token file exists: `src/styles/design-tokens.css`
- [ ] `App.css` imports exactly one token file
- [ ] `--color-primary` resolves to `#6FF073` (verified via browser DevTools)
- [ ] `--color-bg-secondary` resolves to `black` (preserved from colors.css)
- [ ] No hardcoded `#000000` backgrounds remain in feature CSS files
- [ ] `npm run build` succeeds with no CSS warnings
- [ ] Visual regression: all sections render identical backgrounds to pre-change state
