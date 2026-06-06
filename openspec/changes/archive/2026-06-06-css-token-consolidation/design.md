# Design: CSS Token Consolidation

## Technical Approach

Three CSS token files (`colors.css`, `design-tokens.css`, `variables.css`) overlap and conflict (`--color-primary` defined as `#F5F5F7` in one, `#6FF073` in another). `variables.css` is dead code (never imported). Three feature sections hardcode `background: #000000` instead of using `var(--color-dark-bg)`.

**Strategy**: Audit which `colors.css` tokens are actually used (@grep across all `.css`), carry those into `design-tokens.css`, delete both redundant files, fix the import chain, and replace hardcoded backgrounds.

## Architecture Decisions

| Decision | Options | Tradeoffs | Choice |
|----------|---------|-----------|--------|
| **Which colors.css tokens to carry over** | (A) Only `--color-bg-secondary: black` as proposal states | (A) Would break `--color-secondary` (8 usages across 7 files: ArchitectureSection.css, MissionSection.css, EcosystemSection.css, ContributeSection.css, Button.css, ProjectBadge.css, bg.css) and `--color-text-secondary` (App.css `::selection`). Rejected. | **(B) Carry all 3 used tokens**: `--color-secondary: #9FA2B4`, `--color-text-secondary: white`, `--color-bg-secondary: black`. Drop truly unused: `--color-primary` (overridden by design-tokens.css), `--color-opposite`, `--color-complementary`, `--color-bg-primary`, `--color-bg-complementary`, `[data-theme="dark"]` block. |
| **Token naming** | (A) Rename to `--color-text-muted` / `--color-dark-surface` to match design-tokens.css conventions | (A) Requires updating 10+ usages across 7 files, increases diff size and risk. Rejected. | **(B) Keep existing names**. `--color-secondary`, `--color-text-secondary`, `--color-bg-secondary` are established in the codebase. Design-tokens.css has gap (`--color-text-muted: #666` is different from `--color-secondary: #9FA2B4`; `--color-text-light: #ffffff` is equivalent to `--color-text-secondary: white` but a different name). Adding the 3 tokens is the minimal-change path. |
| **--color-dark-bg value** | `#0a0a0a` (current) vs `#000000` (hardcoded) | `#0a0a0a` is perceptually identical to `#000000` on 99% of consumer displays. The token already exists in design-tokens.css:26. No value change needed. | Use existing `--color-dark-bg: #0a0a0a`. |
| **Delete variables.css** | (A) Delete | (A) Confirmed dead code: zero imports across entire codebase via @grep. Safe to delete. | **Delete**. |

## Data Flow

```
                        Before
    App.css ──→ @import './colors.css' ──→ :root { --color-secondary, --color-bg-secondary, ... }
          └──→ @import './design-tokens.css' ──→ :root { --color-primary, --color-dark-bg, ... }
    
    Feature CSS ──→ background: #000000 (hardcoded, no token)

                        After
    App.css ──→ @import './design-tokens.css' ──→ :root { all tokens single-source }
    
    Feature CSS ──→ background: var(--color-dark-bg) (tokenized)
```

CSS cascade order: `design-tokens.css` was already imported AFTER `colors.css` in App.css, so its `--color-primary: #6FF073` already won. After merge, cascade order is irrelevant — single source of truth.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/styles/design-tokens.css` | Modify | Add 3 tokens after `--color-text-light` (line 7): `--color-secondary: #9FA2B4;`, `--color-text-secondary: white;`, `--color-bg-secondary: black;` |
| `src/styles/App.css` | Modify | Line 1: Delete `@import './colors.css';` |
| `src/styles/colors.css` | Delete | All valuable tokens migrated to design-tokens.css |
| `src/styles/variables.css` | Delete | Dead code (zero imports), no migration needed |
| `src/features/HeroSection/HeroSection.css` | Modify | Line 4: `background: #000000` → `background: var(--color-dark-bg)` |
| `src/features/ArchitectureSection/ArchitectureSection.css` | Modify | Line 3: `background: #000000` → `background: var(--color-dark-bg)` |
| `src/features/MissionSection/MissionSection.css` | Modify | Line 3: `background: #000000` → `background: var(--color-dark-bg)` |

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | No CSS import errors or unresolved custom properties | `npm run build` must succeed with zero warnings |
| Visual | Background parity across Hero, Architecture, Mission sections | Browser DevTools: inspect computed `background-color` on `.hero`, `.architecture`, `.mission` — must resolve to `#0a0a0a` |
| Token resolution | All 3 migrated tokens resolve correctly | DevTools Styles panel: verify `--color-secondary` → `#9FA2B4`, `--color-text-secondary` → `white`, `--color-bg-secondary` → `black` |
| Regression | No missing tokens in consuming components | Navigate full landing page — navbar, EcosystemSection cards, buttons, link buttons, badges should render with correct colors |
| Import chain | No stale `colors.css` import | `@grep` for `colors\.css` in `src/` — must return zero hits |

## Migration / Rollout

No migration required. Rollback via `git checkout -- src/styles/colors.css src/styles/variables.css` and revert App.css + 3 feature CSS files.

## Open Questions

None — all token usage audited, all dependencies verified.
