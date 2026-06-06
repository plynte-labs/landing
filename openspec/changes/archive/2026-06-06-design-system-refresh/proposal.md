# Proposal: Design System Refresh

## Intent

Audit findings H11, M11, and M12 from the skill-based audit identify three visual-design issues: (1) Inter body font is flagged as "overused AI-generated aesthetic" — the frontend-design skill requires distinctive fonts; (2) the LinkButton's rainbow RGB animation clashes with the restrained green-on-black brand palette; (3) a reported invalid `transform: ease-in-out 0.3s` at LinkButton.css line 53 (exploration snapshot). Fixing these aligns the visual system with the committed brand aesthetic.

## Scope

### In Scope
- Replace `--font-body` from `'Inter'` to `'DM Sans'` in `design-tokens.css`; add Google Fonts `<link>` in `index.html`
- Replace LinkButton `::before` rainbow gradient + `rgbAlive` keyframes with brand-consistent green glow using `--brand-green-glow`
- Verify and fix invalid CSS at LinkButton.css line 53 (current file shows `position: relative` — investigate discrepancy)
- Visual verification: font rendering across all sections and LinkButton hover state

### Out of Scope
- `--font-display` replacement (Anton — audit-positive finding)
- Other LinkButton styles (floating variant, icon alignment)
- Full design token consolidation (separate change)
- Grain texture overlay, floating hover color typo (other audit items)

## Capabilities

### New Capabilities
None

### Modified Capabilities
None — visual refinements only; no spec-level behavior or requirement changes.

## Approach

1. **Font swap (H11)**: Change `--font-body: 'Inter', sans-serif` → `'DM Sans', sans-serif` at `design-tokens.css:36`. Add `<link rel="preconnect">` and Google Fonts stylesheet to `index.html` `<head>` (DM Sans weights 400, 500, 700). DM Sans chosen over Geist: geometric warmth pairs better with Anton display font.

2. **Green glow (M11)**: Replace `::before` gradient (lines 24-38) with `var(--brand-green-glow)` background at reduced opacity. Replace `rgbAlive` keyframes with a subtle pulse animation using `box-shadow` or `opacity`. Remove entire 6-second rainbow cycle.

3. **CSS fix (M12)**: Current file at line 53 already reads `position: relative` — the exploration's `transform: ease-in-out 0.3s` is absent. Verify no other files carry this invalid property. If found, fix to `transition: transform 0.3s ease-in-out`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/styles/design-tokens.css` | Modified | `--font-body` token value |
| `index.html` | Modified | Google Fonts `<link>` for DM Sans |
| `src/components/UI/LinkButton/LinkButton.css` | Modified | Rainbow → green glow; invalid CSS check |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| DM Sans causes layout shift vs Inter | Low | Similar sans-serif metrics; test all breakpoints |
| Green glow may not render on older browsers | Low | `box-shadow` widely supported; static fallback |
| Rainbow removal degrades hover affordance | Low | Hover already gated behind `:hover::before` at `opacity: 0`; green glow provides clearer affordance |

## Rollback Plan

Revert three files to prior state via `git checkout`. No database, config, or API changes.

## Dependencies

None. Self-contained CSS and HTML changes.

## Success Criteria

- [ ] `--font-body` resolves to `'DM Sans'` and renders correctly across all sections
- [ ] LinkButton hover shows green glow (not rainbow)
- [ ] No invalid `transform: ease-in-out 0.3s` anywhere in LinkButton CSS
- [ ] No visual regression: font fallback chain intact (`sans-serif`), no layout breakage
