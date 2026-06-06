# Design: Design System Refresh

## Technical Approach

Three isolated CSS/HTML patches: (1) replace Inter with DM Sans via token change + Google Fonts link, (2) replace LinkButton rainbow `::before` animation with brand-consistent green glow using existing `--brand-green-glow` token, (3) verify M12 invalid CSS is absent from LinkButton.css. All changes are additive/replacement only — no structural refactors, no new components.

## Architecture Decisions

### Decision: DM Sans over Inter

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Inter (current) | Overused AI aesthetic; flagged by audit H11 | Reject |
| DM Sans | Geometric warmth pairs with Anton display; 3-axis weight range (400/500/700) | **Choose** |
| Geist | Vercel-native; open-source; less geometric contrast with Anton | Reject |

**Rationale**: DM Sans's geometric warmth provides visual contrast against the industrial Anton display font. The weights 400, 500, 700 map cleanly to existing `--font-weight-normal`, `--font-weight-semibold`, and `--font-weight-bold` tokens.

### Decision: Green glow via `--brand-green-glow` + `box-shadow` pulse

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `var(--brand-green-glow)` bg only | Static; no motion affordance on hover | Reject |
| bg + `box-shadow` pulse keyframes | Motion reinforces hover; existing token reused; no new colors | **Choose** |
| Gradient copy of brand-green | Duplicates token value; harder to maintain | Reject |

**Rationale**: The existing `--brand-green-glow: rgba(111, 240, 115, 0.3)` token is the single source of truth for green glow. Adding a `pulseGreen` keyframe animating `box-shadow` provides motion without introducing new color values. This eliminates the 6-second `rgbAlive` keyframes and the 8-color gradient entirely.

### Decision: M12 scope — LinkButton only

**Choice**: Verify LinkButton.css only; document Button.css sibling bug as out-of-scope finding.
**Rationale**: Proposal scope is explicitly limited to LinkButton.css. The same invalid CSS at `Button.css:57` (`transform: ease-in-out 0.3s` → should be `transition: transform 0.3s ease-in-out`) belongs in a separate change or this change's apply phase if scope expands.

## Data Flow

```
index.html <link> ──→ Google Fonts CDN ──→ DM Sans loaded
                                                    │
design-tokens.css ───→ :root { --font-body: 'DM Sans' } ──→ all CSS consuming var(--font-body)
                                                    │
LinkButton.css ──→ ::before { --brand-green-glow bg } ──→ hover → pulseGreen keyframes
                                                    │
LinkButton.css:53 ──→ verified: position: relative (M12 absent)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/styles/design-tokens.css` | Modify | Line 36: `'Inter'` → `'DM Sans'`; keep fallback `sans-serif` |
| `index.html` | Modify | Add `<link rel="preconnect">` to fonts.googleapis.com + `<link>` for DM Sans (400, 500, 700) in `<head>` |
| `src/components/UI/LinkButton/LinkButton.css` | Modify | Replace `::before` rainbow gradient (lines 24-32) with `background: var(--brand-green-glow)`; replace `rgbAlive` keyframes (lines 57-65) with `pulseGreen`; remove `background-size` and unused computed properties |
| `src/components/UI/Button/Button.css` | None | M12 sibling bug at line 57 (`transform: ease-in-out 0.3s`) documented as out-of-scope; proposed fix: `transition: transform 0.3s ease-in-out` |

## Interfaces / Contracts

No API, type, or component contract changes. Token consumers use `var(--font-body)` as before — the value changes, the interface does not. Green glow uses existing `--brand-green-glow` token with no new custom properties.

```css
/* New keyframes replacing rgbAlive */
@keyframes pulseGreen {
  0%, 100% { box-shadow: 0 0 4px var(--brand-green-glow); }
  50%      { box-shadow: 0 0 16px var(--brand-green-glow); }
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | DM Sans renders across all sections | Manual: inspect HeroSection, MissionSection, ContributeSection, EcosystemSection, ArchitectureSection |
| Visual | LinkButton hover shows green glow | Manual: hover LinkButton in floating and inline contexts; verify no rainbow flash |
| CSS validity | No `transform: ease-in-out` in LinkButton.css | `rg "transform:\s*ease-in-out" src/components/UI/LinkButton/` — expect 0 results |
| Regression | Fallback chain intact (`sans-serif`) | Verify `--font-body` ends with `, sans-serif` |
| Regression | No layout breakage | Manual: test at 320px, 768px, 1024px, 1440px |

## Migration / Rollout

No migration required. Rollback: `git checkout` the three modified files.

## Open Questions

- [ ] Should Button.css:57 be fixed in this change or a follow-up? (Proposal scope says LinkButton only)
- [ ] Do we need `font-display: swap` on the Google Fonts link for FOUT control?
