# Tasks: React Performance — Code Splitting & Render Optimization

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 55–65 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | All 5 fixes in one PR | PR 1 | Well under 400-line budget; independent, additive changes |

## Phase 1: Navbar Scroll & Callback (H5, M8)

- [x] 1.1 Add `useCallback` to React import in `src/layouts/navbar/navbar.tsx`
- [x] 1.2 Wrap `handleNavClick` in `useCallback(fn, [])` — empty deps correct (only DOM APIs, no state)
- [x] 1.3 Replace scroll `useEffect` with rAF throttle + `{ passive: true }`: store `rafId`, cancel before new rAF, clean up on unmount

## Phase 2: HeroSection Transitions & Callback (M7, M8)

- [x] 2.1 Add `useCallback` to React import in `src/features/HeroSection/HeroSection.tsx`
- [x] 2.2 Hoist 5 transition objects as module-level `const` above component — `TRANSITION_LOGO`, `TRANSITION_TAGLINE`, `TRANSITION_SUBTAGLINE`, `TRANSITION_CTA`, `TRANSITION_NONE`
- [x] 2.3 Replace all 4 inline `transition={shouldAnimate ? {...} : { duration: 0 }}` with constant references
- [x] 2.4 Wrap `handleCTAClick` in `useCallback(fn, [])` — empty deps correct (only `document.getElementById`, no state)

## Phase 3: Below-Fold Code Splitting (H6)

- [x] 3.1 Add `{ Suspense, lazy }` to React import in `src/pages/LandingPage/LandingPage.tsx`
- [x] 3.2 Replace 4 direct section imports with `const SectionName = React.lazy(() => import('path'))` — EcosystemSection, ArchitectureSection, ContributeSection, MissionSection
- [x] 3.3 Wrap each lazy component in `<Suspense fallback={<div className="section-skeleton" />}>` inside existing `<LazySection>`

## Phase 4: Particle Field Memoization (M9)

- [x] 4.1 Add `import { useMemo } from 'react'` to `src/components/UI/ParticleField/ParticleField.tsx`
- [x] 4.2 Move `if (reducedMotion) return null` above `useMemo` to skip computation entirely
- [x] 4.3 Wrap `Array.from({ length: count }).map(...)` in `useMemo(() => ..., [count])`

## Phase 5: Verification

- [x] 5.1 Run `tsc -b` — confirm zero TypeScript errors
- [ ] 5.2 Performance panel: verify scroll listener registered with `passive: true`
- [ ] 5.3 Network tab: verify separate JS chunks load for each below-fold section on fresh page load
- [ ] 5.4 Visual check: HeroSection animations (logo scale, tagline fade, CTA) play identically
- [ ] 5.5 Emulate `prefers-reduced-motion` in DevTools — verify all transitions use `duration: 0` and ParticleField renders null
