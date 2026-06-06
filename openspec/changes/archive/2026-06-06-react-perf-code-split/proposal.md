# Proposal: React Performance — Code Splitting & Render Optimization

## Intent

Fix 5 React performance issues from the skill-based audit (findings H5, H6, M7, M8, M9). The landing page wastes main-thread budget on unthrottled scroll events, eager-loads all feature JS upfront, recreates Framer Motion transition objects on every render, and generates particle arrays without memoization. These are low-risk, purely additive optimizations with zero behavioral change.

## Scope

### In Scope
- **H5**: Add `{ passive: true }` to scroll listener in `navbar.tsx`, throttle state updates via `requestAnimationFrame`
- **H6**: Wrap below-fold feature sections in `React.lazy()` + `<Suspense>` inside existing `LazySection`
- **M7**: Hoist Framer Motion `transition` objects to module-level constants in `HeroSection.tsx`
- **M8**: Wrap `handleNavClick` (navbar.tsx) and `handleCTAClick` (HeroSection.tsx) in `useCallback`
- **M9**: Memoize particle array generation in `ParticleField.tsx` with `useMemo`

### Out of Scope
- Full chunk-splitting in `vite.config.ts` (deferred to M10)
- GlassCard refactor (H7) — separate change
- Any visual, UX, or behavioral changes

## Capabilities

### New Capabilities
None — all fixes are internal implementation optimizations.

### Modified Capabilities
None — no spec-level requirements change. Sections render in order; animations play identically; scroll behavior unchanged.

## Approach

Five independent, localized changes following the Vercel React Best Practices skill:

1. **H5 (scroll)**: Store `requestAnimationFrame` ID in `useEffect`, set state only inside rAF callback, clean up on unmount. Pass `{ passive: true }` to `addEventListener`.
2. **H6 (code-split)**: Convert eager imports to `React.lazy(() => import('...'))` for 4 below-fold sections. Wrap in `<Suspense fallback={null}>` inside existing `LazySection`. HeroSection stays eager (above-fold).
3. **M7 (hoist constants)**: Extract 4 `transition` objects to file-level `const` — reuse in motion props instead of recreating each render.
4. **M8 (stable callbacks)**: `useCallback(fn, [])` for both handlers — they only reference stable DOM APIs.
5. **M9 (memoize particles)**: `useMemo(() => Array.from({ length: count }).map(...), [count])`; early-return for `reducedMotion` above the memo.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/layouts/navbar/navbar.tsx` | Modified | H5: passive+rAF scroll; M8: useCallback |
| `src/pages/LandingPage/LandingPage.tsx` | Modified | H6: React.lazy + Suspense wrappers |
| `src/features/HeroSection/HeroSection.tsx` | Modified | M7: hoisted transitions; M8: useCallback |
| `src/components/UI/ParticleField/ParticleField.tsx` | Modified | M9: useMemo particle array |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `React.lazy()` import fails (network) | Low | Suspense prevents crash; fallback is invisible |
| rAF throttle causes 1-frame scroll lag | None | 16ms delay invisible at 50px threshold |
| `useCallback` with empty deps → stale closure | None | Handlers reference only DOM APIs, no state |

## Rollback Plan

Revert to eager imports, remove `useCallback`/`useMemo`/rAF — all are additive one-liners. `git revert` the full commit.

## Dependencies

None — no new packages, no infra changes, no breaking API.

## Success Criteria

- [ ] All 5 sections render identically to current behavior
- [ ] `tsc -b` passes with zero errors
- [ ] Scroll listener uses `{ passive: true }` + rAF (verify via DevTools Performance panel)
- [ ] Network tab shows separate chunks for below-fold sections on fresh load
- [ ] Framer Motion animations play without regression (normal + `prefers-reduced-motion`)
