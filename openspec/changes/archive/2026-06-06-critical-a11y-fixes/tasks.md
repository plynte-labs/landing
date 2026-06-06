# Tasks: Critical A11y Fixes

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~70–80 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Skip-to-Content Link (Fix 1)

- [x] 1.1 Add skip link anchor to `index.html` — insert `<a class="skip-link" href="#main-content">Saltar al contenido</a>` as first child of `<body>`, before `<div id="root">`.
- [x] 1.2 Add `.skip-link` CSS to `src/styles/App.css` — fixed positioning, `translateY(-100%)` hidden, slides in on `:focus`, `z-index: 10000`.
- [x] 1.3 Add skip target to `src/layouts/MainLayout.tsx` — change `<main>` to `<main id="main-content" tabIndex={-1}>`.

## Phase 2: Reduced Motion — Global CSS (Fix 2)

- [x] 2.1 Add `@media (prefers-reduced-motion: reduce)` to `src/styles/App.css` — force `animation-duration` and `transition-duration` to `0.01ms !important`.

## Phase 3: Reduced Motion — Feature Components

> All tasks in Phase 3 are independent and can run in parallel.

- [x] 3.1 `src/features/HeroSection/HeroSection.tsx` — import `useReducedMotion`; when `true`, set `initial={false}` on 4 `motion.*` elements (logo, h1, p, cta) and pass `reducedMotion` to `ParticleField`.
- [x] 3.2 `src/features/EcosystemSection/EcosystemSection.tsx` — import `useReducedMotion`; when `true`, set `initial="visible"` and `whileInView={undefined}` on grid container and card items.
- [x] 3.3 `src/features/ArchitectureSection/ArchitectureSection.tsx` — import `useReducedMotion`; when `true`, set `initial="visible"` and `whileInView={undefined}` on card motion elements.
- [x] 3.4 `src/features/MissionSection/MissionSection.tsx` — import `useReducedMotion`; when `true`, set `initial="visible"` and `whileInView={undefined}` on content motion element.
- [x] 3.5 `src/features/ContributeSection/ContributeSection.tsx` — import `useReducedMotion`; when `true`, set `initial="visible"` and `whileInView={undefined}` on container and nested elements (steps, code-section, community).

## Phase 4: ParticleField Adaptation

- [x] 4.1 `src/components/UI/ParticleField/ParticleField.tsx` — accept `reducedMotion?: boolean` prop; return `null` immediately when `true`.

## Phase 5: Build Verification

- [x] 5.1 Run `pnpm tsc -b` — confirm zero type errors after all changes.
