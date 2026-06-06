# Performance Specification

## Purpose

Runtime performance optimization for the landing page. Covers scroll event handling, code splitting, render memoization, and stable references. All optimizations preserve existing visual behavior.

## Requirements

### Requirement: Passive Scroll Listening

Scroll event listeners MUST use passive mode (`{ passive: true }`) and throttle state updates to the animation frame rate via `requestAnimationFrame`.

#### Scenario: Scroll listener uses passive mode

- GIVEN the navbar component is mounted
- WHEN a scroll event listener is registered on the window
- THEN the listener is added with `{ passive: true }`
- AND the browser does not block on the listener for scroll performance

#### Scenario: Scroll state updates throttled to rAF

- GIVEN the user scrolls rapidly
- WHEN multiple scroll events fire within a single animation frame
- THEN scroll-related state updates at most once per frame
- AND intermediate scroll events do not trigger React state updates

### Requirement: Below-Fold Code Splitting

Feature sections rendered below the fold MUST be code-split with `React.lazy()` and wrapped in `<Suspense>`. Above-fold sections (HeroSection) SHALL remain eagerly loaded.

#### Scenario: Below-fold sections loaded as chunks

- GIVEN the landing page loads
- WHEN the browser parses the initial JavaScript bundle
- THEN below-fold feature sections are NOT present in the initial bundle
- AND each section is fetched as a separate chunk when scrolled into view

#### Scenario: Suspense fallback is invisible

- GIVEN a lazy-loaded section chunk is loading
- WHEN the section enters the viewport
- THEN the `<Suspense>` boundary renders a null fallback
- AND no layout shift occurs when the section content appears

### Requirement: Hoisted Animation Configuration

Framer Motion `transition` objects MUST be hoisted to module scope as `const` declarations to avoid per-render object recreation.

#### Scenario: Transition objects are module-level constants

- GIVEN the HeroSection component renders
- WHEN motion props reference transition configurations
- THEN each transition object is a file-level `const` outside the component function
- AND the same object reference is reused across renders

### Requirement: Stable Event Handler References

Event handler callbacks passed as props or used in `useEffect` dependencies MUST be wrapped in `useCallback` with stable dependency arrays.

#### Scenario: Navigation handler has stable reference

- GIVEN the navbar component renders
- WHEN the `handleNavClick` callback is created
- THEN it is wrapped in `useCallback` with an empty dependency array
- AND the callback reference does not change between renders

#### Scenario: CTA handler has stable reference

- GIVEN the HeroSection renders
- WHEN the `handleCTAClick` callback is created
- THEN it is wrapped in `useCallback` with a stable dependency array
- AND child components receiving it as a prop do not re-render unnecessarily

### Requirement: Memoized Expensive Computations

Expensive computations producing large derived data (e.g., particle arrays) MUST be wrapped in `useMemo` to avoid recalculation on every render.

#### Scenario: Particle array computed once

- GIVEN the ParticleField component renders with a fixed particle count
- WHEN the component re-renders due to parent state changes
- THEN the particle array is NOT regenerated
- AND the memoized array is reused

#### Scenario: Particle array respects reduced motion

- GIVEN the user prefers reduced motion
- WHEN ParticleField evaluates its render path
- THEN particle generation is skipped before any expensive computation
- AND `useMemo` early-returns an empty array
