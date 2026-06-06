# Proposal: Refactor GlassCard — Explicit Variant Components

## Intent

`GlassCard.tsx` branches into 4 render paths (a+motion.div, a, motion.div, div) based on boolean-like presence of `href` and `motionProps`. This is the `architecture-avoid-boolean-props` antipattern from the vercel-composition-patterns skill (audit finding H7). Every consumer must import a single component that carries unused branching logic. Testing all 4 paths is needlessly complex.

## Scope

### In Scope
- Split `GlassCard.tsx` into 4 explicit variant components sharing `.glass-card` CSS
- `GlassCard` — base `<div>` (4 consumers: Hero, Contribute, Mission, Architecture)
- `GlassCardLink` — `<a>` wrapper (1 consumer: Ecosystem)
- `GlassCardMotion` — `<motion.div>` (zero consumers today; future-proofed)
- `GlassCardMotionLink` — `<a>` + `<motion.div>` (zero consumers today; future-proofed)
- Update all 5 consumer imports to use the specific variant they need
- Remove `motionProps`/`href` branching from the old component
- Keep `GlassCard.css` unchanged (all variants share same glass styling)

### Out of Scope
- Changing glass styling, hover effects, or CSS tokens
- Barrel file or index re-export (future work)
- Path alias migration (separate change)

## Capabilities

### Modified Capabilities
- `glass-card`: Replaces boolean-prop branching with explicit variant components. `GlassCard` → `<div>` only (no href, no motion). `GlassCardLink` → `<a>` only. `GlassCardMotion` → `<motion.div>` only. `GlassCardMotionLink` → `<a>` + `<motion.div>`. Same CSS class, same styling.

## Approach

Apply `patterns-explicit-variants` from vercel-composition-patterns. Extract each render path into a named component. All 4 share the same `.glass-card` class from the existing CSS. Drop `GlassCardProps`, `motionProps`, and `href` from `GlassCard` — each variant declares only the props it needs. No behavioral change in rendering.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/UI/GlassCard/GlassCard.tsx` | Rewritten | Split into 4 named exports |
| `src/components/UI/GlassCard/GlassCard.css` | Unchanged | All variants share same class |
| `src/features/HeroSection/HeroSection.tsx` | Modified | Import `GlassCard` |
| `src/features/EcosystemSection/EcosystemSection.tsx` | Modified | Import `GlassCardLink` |
| `src/features/ContributeSection/ContributeSection.tsx` | Modified | Import `GlassCard` |
| `src/features/MissionSection/MissionSection.tsx` | Modified | Import `GlassCard` |
| `src/features/ArchitectureSection/ArchitectureSection.tsx` | Modified | Import `GlassCard` |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Import paths break if consumer uses wrong variant | Low | grep all consumers before rename; each consumer maps to exactly one variant |
| `framer-motion` import tree-shaking loss | Low | No consumer uses motion today; tree-shaking actually improves |

## Rollback Plan

Revert `GlassCard.tsx` to the single component with `href`/`motionProps` branching. Restore consumer imports to `import { GlassCard } from '...'`. One commit revert.

## Dependencies

None. Self-contained component-level refactor.

## Success Criteria

- [ ] `GlassCard.tsx` has zero conditional render paths based on prop presence
- [ ] All 5 consumers import the correct variant and render identically to before
- [ ] `npm run build` succeeds with no new TypeScript errors
- [ ] Existing glass-card spec updated to describe explicit variant API
