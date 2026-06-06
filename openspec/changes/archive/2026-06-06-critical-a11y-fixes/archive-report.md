## Archive Report: critical-a11y-fixes

**Change**: critical-a11y-fixes
**Archived**: 2026-06-06
**Mode**: hybrid (OpenSpec + Engram)
**Status**: PASS — all 11 tasks complete, 11/11 spec scenarios compliant, zero type errors

### What Changed

Two WCAG accessibility fixes implemented:

**Fix 1 — Skip-to-content link (WCAG 2.4.1 Level A)**:
- Added static `<a class="skip-link" href="#main-content">Saltar al contenido</a>` as first child of `<body>` in `index.html`
- Added `.skip-link` CSS in `App.css` — `transform: translate(-50%, -100%)` hidden, slides in on `:focus`
- Added `id="main-content" tabIndex={-1}` to `<main>` in `MainLayout.tsx`
- Ensures keyboard users can bypass navigation on every page load

**Fix 2 — Reduced motion support (WCAG 2.3.3)**:
- Global CSS `@media (prefers-reduced-motion: reduce)` in `App.css` forces near-zero animation/transition durations
- `useReducedMotion()` in 5 feature components: HeroSection (4 elements), EcosystemSection (grid + cards), ArchitectureSection (cards), MissionSection (content), ContributeSection (container + steps + code-section + community)
- `ParticleField` adapted — accepts `reducedMotion?: boolean` prop, returns `null` when true
- Two-layer defense: CSS layer + JS/React layer

### Files Changed (9 files, ~75 lines)

| File | Action |
|------|--------|
| `index.html` | +1 skip-link `<a>` |
| `src/styles/App.css` | +skip-link CSS block, +reduced-motion @media rule |
| `src/layouts/MainLayout.tsx` | +`id="main-content" tabIndex={-1}` on `<main>` |
| `src/features/HeroSection/HeroSection.tsx` | +`useReducedMotion()`, conditional `initial`/`transition` on 4 elements, pass to ParticleField |
| `src/features/EcosystemSection/EcosystemSection.tsx` | +`useReducedMotion()`, conditional `initial`/`whileInView` on grid + cards |
| `src/features/ArchitectureSection/ArchitectureSection.tsx` | +`useReducedMotion()`, conditional `initial`/`whileInView`/`viewport` on cards |
| `src/features/MissionSection/MissionSection.tsx` | +`useReducedMotion()`, conditional `initial`/`whileInView`/`viewport` on content |
| `src/features/ContributeSection/ContributeSection.tsx` | +`useReducedMotion()`, conditional on container, steps, code-section, community |
| `src/components/UI/ParticleField/ParticleField.tsx` | +`reducedMotion?: boolean` prop, early return `null` |

### Specs Synced to Main

| Domain | Action | Details |
|--------|--------|---------|
| `keyboard-navigation` | Created | 1 requirement (Skip-to-content Link), 4 scenarios. New spec — no prior main spec existed. |
| `motion-accessibility` | Created | 1 requirement (Reduced Motion Support), 7 scenarios. New spec — no prior main spec existed. |

### Archive Contents
- `proposal.md` ✅
- `design.md` ✅
- `specs/keyboard-navigation/spec.md` ✅
- `specs/motion-accessibility/spec.md` ✅
- `tasks.md` ✅ (11/11 tasks complete)
- `verify-report.md` ✅ (PASS)

### Design Decisions Followed (4/4)
1. Skip link placed in `index.html` (static, before React mount) ✅
2. Hide mechanism: `translateY(-100%)` → visible on `:focus` ✅
3. Reduced motion: global CSS + per-component `useReducedMotion()` ✅
4. ParticleField: return `null` on reduced motion ✅

### Minor Deviation
`HeroSection.tsx:24` — `reducedMotion={reducedMotion ?? false}` (type safety hardening, semantically equivalent). `useReducedMotion()` returns `boolean | null`; `?? false` defaults to no reduced motion which is the safe behavior.

### Key Learnings
- `useReducedMotion()` from framer-motion returns `boolean | null` (null during SSR/first render). Must handle null case explicitly.
- Skip link in `index.html` is the standard WCAG pattern — ensures availability before React mounts and works if JS fails.
- `clip-path` hide technique can remove elements from a11y tree in some screen readers; `translateY` is safer.

### Source of Truth Updated
- `openspec/specs/keyboard-navigation/spec.md` — new main spec
- `openspec/specs/motion-accessibility/spec.md` — new main spec

### Traceability
- Engram apply-progress: observation #1424
- Engram archive-report: observation #1426

### SDD Cycle
✅ Explore → ✅ Propose → ✅ Spec → ✅ Design → ✅ Tasks → ✅ Apply → ✅ Verify → ✅ Archive
