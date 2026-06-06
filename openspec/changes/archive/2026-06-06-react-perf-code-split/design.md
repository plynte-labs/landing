# Design: React Performance — Code Splitting & Render Optimization

## Technical Approach

Five independent, additive optimizations with zero behavioral change. Each fix targets a single React performance anti-pattern: passive event listeners + rAF throttle (H5), import-level code splitting with Suspense (H6), hoisted animation constants (M7), stable callback references (M8), and memoized derived data (M9). No new dependencies, no API surface changes.

## Architecture Decisions

| # | Option A | Option B | Decision | Why |
|---|----------|----------|----------|-----|
| H5 | `{ passive: true }` only | passive + rAF throttle | **Option B** | Passive alone prevents blocking the compositor but still fires setState on every scroll frame (can be 120+ Hz on high-refresh displays). rAF collapses multiple state updates into one per frame. |
| H6 | `React.lazy()` only | `React.lazy()` inside existing `<LazySection>` | **Option B** | LazySection already provides IntersectionObserver-based DOM deferral. Adding `React.lazy()` as an INNER wrapper splits the JS chunk without changing the render-timing contract. Two-phase deferral: chunk loads when observer fires, DOM renders when chunk resolves. |
| M7 | 5 module-level consts (4 animated + 1 no-animation) | 8 consts (one per motion element × 2 variants) | **Option A** | The `{ duration: 0 }` variant is identical across all 4 elements. Reusing a single `TRANSITION_NONE` const avoids duplication. One const per animated variant preserves readability. |
| M8 | `useCallback(fn, [])` — empty deps | `useCallback(fn, [deps])` — state-aware deps | **Option A** | Both `handleNavClick` and `handleCTAClick` reference only stable DOM APIs (`document.getElementById`, `scrollIntoView`) and closure parameters. No component state is read. Empty deps are correct and produce a truly stable reference across the component's lifetime. |
| M9 | `useMemo` inside component | Extract to pure utility function + `useMemo` | **useMemo only** | The particle generation uses `Math.random()` — extracting to a module-level function would still need memoization because random values change if called on every render. `useMemo` with `[count]` dependency is the minimal correct fix. |

## Data Flow

```
User scrolls → passive listener fires → rAF queues update → setState (1/frame max)
                                                                  ↓
User hits landing → HeroSection (eager) renders immediately
                        ↓
              Scroll → IntersectionObserver fires → React.lazy chunk loads → Suspense resolves → section renders
```

## File Changes

| File | Action | Change |
|------|--------|--------|
| `src/layouts/navbar/navbar.tsx` | Modify | H5: Add `{ passive: true }` to scroll listener, wrap `setIsScrolled` in rAF with cleanup. M8: Wrap `handleNavClick` in `useCallback(fn, [])`. Add `useCallback` to React import. |
| `src/pages/LandingPage/LandingPage.tsx` | Modify | H6: Replace 4 direct section imports with `React.lazy(() => import(...))`. Wrap each lazy component in `<Suspense fallback={<div className="section-skeleton" />}>` inside existing `<LazySection>`. |
| `src/features/HeroSection/HeroSection.tsx` | Modify | M7: Extract 5 module-level transition constants. Replace inline objects with constant references. M8: Wrap `handleCTAClick` in `useCallback(fn, [])`. Add `useCallback` to React import. |
| `src/components/UI/ParticleField/ParticleField.tsx` | Modify | M9: Add `import { useMemo } from 'react'`. Move early-return above `useMemo`. Wrap `Array.from(...)` in `useMemo(() => ..., [count])`. |

## Interfaces / Contracts

No new types. Module-level constants use inline type inference:

```ts
// HeroSection.tsx — hoisted transitions (M7)
const TRANSITION_LOGO = { duration: 0.6, ease: "easeOut" as const };
const TRANSITION_TAGLINE = { delay: 0.3, duration: 0.5 };
const TRANSITION_SUBTAGLINE = { delay: 0.5, duration: 0.5 };
const TRANSITION_CTA = { delay: 0.7, duration: 0.5 };
const TRANSITION_NONE = { duration: 0 };
```

rAF cleanup pattern (H5):
```ts
useEffect(() => {
  let rafId: number;
  const handleScroll = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => setIsScrolled(window.scrollY > 50));
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", handleScroll);
    cancelAnimationFrame(rafId);
  };
}, []);
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | TypeScript compilation | `tsc -b` — zero errors |
| Unit (manual) | rAF state update fires at correct scroll threshold | Scroll > 50px in DevTools, verify `.navbar.scrolled` class appears |
| Manual | Lazy chunks load on scroll | Network tab — verify separate JS chunks for each below-fold section |
| Manual | Animations play correctly | Visual check: logo scale, tagline opacity, CTA fade-in on load |
| Manual | `prefers-reduced-motion` respected | Emulate in DevTools, verify transitions use `duration: 0` |
| Manual | Passive listener confirmed | Performance panel → event listeners → scroll → verify `passive: true` |

## Migration / Rollout

No migration required. All changes are additive one-liners. Rollback: revert the full commit or individual hunks.

## Open Questions

None.
