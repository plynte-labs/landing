# Tasks: Refactor GlassCard — Explicit Variant Components

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~90 (1 file rewritten, 1 import+tag change, 4 verified) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Core Variant Components

- [x] 1.1 Rewrite `src/components/UI/GlassCard/GlassCard.tsx` — replace single boolean-branching component with internal `GlassCardBase` (polymorphic `as` prop + className concatenation) plus 4 named exports: `GlassCard` (div), `GlassCardLink` (a), `GlassCardMotion` (motion.div), `GlassCardMotionLink` (a > motion.div)
- [x] 1.2 Remove `href` and `motionProps` from public `GlassCard` interface — each variant declares only its needed props per design interfaces

## Phase 2: Consumer Migration

- [x] 2.1 Migrate `src/features/EcosystemSection/EcosystemSection.tsx` — change import from `GlassCard` to `GlassCardLink`, update JSX tag from `<GlassCard>` to `<GlassCardLink>` (line 71 + closing line 117). **Deviation**: Conditional rendering required — `GlassCardLink` when `isLive && project.github`, else `GlassCard` div. Single tag swap impossible because `liveaudio`/`opencohost` are `coming-soon` without `github` URL, and `GlassCardLinkProps.href` is required `string`.
- [x] 2.2 Verify `src/features/HeroSection/HeroSection.tsx` — import still resolves to div-only `GlassCard`, no JSX change needed
- [x] 2.3 Verify `src/features/MissionSection/MissionSection.tsx` — same as 2.2
- [x] 2.4 Verify `src/features/ContributeSection/ContributeSection.tsx` — same as 2.2
- [x] 2.5 Verify `src/features/ArchitectureSection/ArchitectureSection.tsx` — same as 2.2

## Phase 3: Spec & Build Verification

- [x] 3.1 Run `npm run build` — confirm zero TypeScript errors, bundle does not regress
- [ ] 3.2 Run `npm run dev` — visual smoke test: all 5 consumer sections render identically to production
- [x] 3.3 Verify DOM output per spec scenarios: `<GlassCard>` → `<div>`, `<GlassCardLink>` → `<a>` with `target="_blank" rel="noopener noreferrer"`, `<GlassCardMotion>` → `<motion.div>`, `<GlassCardMotionLink>` → `<a><motion.div>`
- [x] 3.4 Confirm `GlassCard.css` is unchanged and shared across all 4 variants
