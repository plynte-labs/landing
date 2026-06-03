# Tasks: Plynte Labs Org Landing

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated lines ADDED | ~1120 |
| Estimated lines MODIFIED | ~461 |
| Estimated lines DELETED | ~5000+ |
| Effective review burden (additions + modifications) | ~1581 |
| 400-line budget exceeded | **Yes — ~4x over budget** |
| Chained PRs recommended | Yes |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested PR Slices (Feature Branch Chain)

| PR | Goal | Base | Tasks | ~Lines |
|----|------|------|-------|--------|
| PR 1 | Foundation: tokens, types, data, UI | main | T1–T5, T21 | 225 |
| PR 2 | Sections Pt 1: Hero, Ecosystem, Architecture | PR 1 | T6–T8, T12 (partial: imports Hero+Eco+Arch only) | 470 |
| PR 3 | Sections Pt 2: Contribute, Mission + translations | PR 2 | T9–T12 (complete LandingPage) + T11 (translations) | 645 |
| PR 4 | Wiring: router, navbar, SEO, index.html, package | PR 3 | T13–T20 | 90 |
| PR 5 | Cleanup: delete personal code + verify | PR 4 | T22–T33 | 0 effective (deletions) |

*Note: translations.ts (T11) spans ~315 lines — split inline per section across PR 2/3.*

---

## Phase 1: Foundation (CREATE)

- [x] **T1**: Add green brand tokens to `src/styles/design-tokens.css` — `--brand-green: #6FF073`, `--brand-green-hover: #4CAF50`, `--brand-green-glow: rgba(111,240,115,0.3)`, `--glass-bg: rgba(0,0,0,0.3)`, `--glass-border: rgba(111,240,115,0.08)`, `--glass-blur: blur(12px)`. Dependencies: none. Verify: open `design-tokens.css`, confirm 6 new vars exist.

- [x] **T2**: Migrate orange→green in `src/styles/design-tokens.css` (--color-primary: #ff8903→#6FF073, --color-primary-hover: #e67a00→#4CAF50, --color-accent: #ff9900→#6FF073), `src/styles/colors.css` (--color-bg-primary: #ff9900→#6FF073), `src/styles/App.css` (scrollbar→#6FF073, ::selection→rgba(111,240,115,0.30)), `src/styles/bg.css` (particle color→#6FF073, orange gradient→green). Remove --color-brand-orange + --color-brand-orange-2 from design-tokens.css. Dependencies: T1. Verify: grep for `#ff8903` and `#ff9900` — zero hits.

- [x] **T3**: Create `src/data/orgData.ts` — export `OrgProject` + `OrgPillar` interfaces, `orgProjects[]` (brickdraw with `github: "https://github.com/plynte-labs/brick-draw"`, liveaudio + voiceai with `github: ""` coming-soon), `orgPillars[]`. Dependencies: none. Verify: `tsc -b` compiles.

- [x] **T4**: Create `src/components/UI/GlassCard/GlassCard.tsx` + `GlassCard.css` — accepts `children`, optional `className`, optional `href` (renders `<a>` if provided, `<div>` otherwise), optional `motionProps` (wraps in `motion.div` when present). CSS: backdrop-filter + glass vars. Dependencies: T1. Verify: import in temp test fragment, confirm renders both as div and anchor.

- [x] **T5**: Create `src/components/UI/ProjectBadge/ProjectBadge.tsx` + `ProjectBadge.css` — accepts `label` (string), optional `variant` ("green"|"blue"|"purple", default "green"). Pill shape, glassmorphism border. Dependencies: T1. Verify: render 3 badges with different variants, check colors.

---

## Phase 2: Feature Sections (CREATE)

- [x] **T6**: Create `src/features/HeroSection/HeroSection.tsx` + `HeroSection.css` — logo via `<img src="/plynte logo2.png">` with framer-motion scale-in, `t("hero.tagline")` with green text-shadow glow, ParticleField `count={150}`, CTA Button ("Explore Projects"), MIT badge via GlassCard. Dependencies: T1, T4. Verify: render in isolation, logo animates, particles flow behind, CTA has green accent.

- [x] **T7**: Create `src/features/EcosystemSection/EcosystemSection.tsx` + `EcosystemSection.css` — responsive grid (1col mobile, 3col desktop). Iterates `orgData.projects[]`, renders GlassCard per project with name (`t()`), description (`t()`), ProjectBadge tech stack, GitHub link icon. Staggered `whileInView` animation. Dependencies: T1, T3, T4, T5. Verify: 3 cards render, staggered entrance on scroll, GitHub link opens new tab.

- [x] **T8**: Create `src/features/ArchitectureSection/ArchitectureSection.tsx` + `ArchitectureSection.css` — 4 pillar GlassCards from `orgData.pillars[]`: icon + i18n title + description. `whileInView` fade-left. Connecting lines/blueprint aesthetic. Dependencies: T1, T3, T4. Verify: 4 cards with icons + text, fade-in animation triggers once.

- [x] **T9**: Create `src/features/ContributeSection/ContributeSection.tsx` + `ContributeSection.css` — numbered workflow steps (Fork→Branch→PR→Review), `<pre>` conventional commits snippet, GitHub org link (no Discord, no Code of Conduct — per PR 3 spec). Dependencies: T1. Verify: 4 steps visible, commit snippet styled, link opens new tab.

- [x] **T10**: Create `src/features/MissionSection/MissionSection.tsx` + `MissionSection.css` — mission statement paragraph, explicit MIT license mention, maintainer info (name + role, 1-2 lines), subtle personal GitHub link. Dependencies: T1. Verify: text renders, MIT visible, maintainer link is secondary-style.

---

## Phase 3: Integration (MODIFY)

- [x] **T11**: Rewrite `src/data/translations.ts` — keep navbar.* key structure with org labels, add hero.* / ecosystem.* / architecture.* / contribute.* / mission.* / footer.* / seo.* keys with complete ES+EN translations. Removed home/about/story/philosophy/insights/contact/portfolio/featureSelector keys. Replaced notFound.* with org 404 copy. Dependencies: T6-T10 (know which keys features consume). Verify: `t("hero.tagline")` returns string in both languages, `t("home.intro")` returns raw key fallback.

- [x] **T12**: Create `src/pages/LandingPage/LandingPage.tsx` + `LandingPage.css` — renders all 5 sections in order: HeroSection, EcosystemSection, ArchitectureSection, ContributeSection, MissionSection. Each section receives a `ref` for scrollIntoView navigation. Dependencies: T6-T10. Verify: landing page renders, all sections visible in correct order.

- [ ] **T13**: Modify `src/routes/AppRouter.tsx` — replace 5 routes with single `<LandingPage>` at `"/"`. Keep 404 wildcard catching `*`. Keep BrowserRouter, Suspense, ScrollToTop. Dependencies: T12. Verify: `"/"` renders landing, `"/anything"` renders 404.

- [ ] **T14**: Modify `src/layouts/MainLayout.tsx` — update navbar import to simplified org navbar. Fix nested `<main>` landmark: use `<div>` wrapper or remove outer `<main>`. Dependencies: T15. Verify: inspect DOM, only one `<main>` element exists.

- [ ] **T15**: Modify `src/layouts/navbar/navbar.tsx` — flat org links (Home #, Projects #ecosystem, Contribute #contribute) + LanguageSwitcher. Replace logo with `<img src="/plynte logo2.png">`. Remove MegaMenu toggle. Keep scroll-based `isScrolled` class. Delete `src/layouts/navbar/MegaMenu.tsx` + `MegaMenu.css`. Modify `navbar.config.ts` — flat items, no children. Modify `navbar.css` — green hover color. Delete `src/components/UI/Navbar/NavbarLogo.tsx` + `.css`. Dependencies: T1. Verify: navbar shows 3 flat links + LanguageSwitcher, no mega menu toggle, scroll adds scrolled class.

- [ ] **T16**: Modify `src/components/SEOHead.tsx` — update title suffix to "Plynte Labs", description to org copy, OG image to `"/plynte logo2.png"`. Remove page-specific title mapping. Dependencies: T11. Verify: page source shows "Plynte Labs" in title and OG tags.

- [ ] **T17**: Modify `src/contexts/LanguageContext.tsx` — rename localStorage key `"portfolio_lang"` → `"plynte_lang"`. Dependencies: none. Verify: toggle language, refresh page, language persists under new key.

- [ ] **T18**: Modify `index.html` — update `<title>`, `<meta description>`, `og:title`, `og:description`, `og:image`, `twitter:*`, JSON-LD (Person→Organization, update SoftwareApplication entries). Dependencies: none. Verify: view source, org metadata renders correctly.

- [ ] **T19**: Modify `package.json` — rename `"name"` to `"plynte-labs-landing"`, update `"description"`. Dependencies: none. Verify: `pnpm install` works after rename.

- [ ] **T20**: Modify `src/App.tsx` — fix nested `<main>` if App.tsx wraps content in `<main>`. Minor adjustments for new router. Dependencies: T14. Verify: single `<main>` landmark in DOM.

- [x] **T21**: Extend `src/types/index.ts` — add `Project`, `Pillar`, `NavItem` interfaces per design contracts. Dependencies: none. Verify: `tsc -b` compiles.

---

## Phase 4: Cleanup (DELETE)

- [ ] **T22**: Delete personal pages: `src/pages/HomePage/`, `src/pages/AboutPage/`, `src/pages/PortfolioPage/`, `src/pages/DetailsPage/` (all files within). Dependencies: T13 (router disconnected). Verify: grep imports of deleted pages — zero in remaining source.

- [ ] **T23**: Delete personal features: `src/features/HomeSection/`, `AboutSection/`, `StorySection/`, `PhilosophySection/`, `LlmInsightsSection/`, `DetailSection/`, `FeatureSelector/`, `InfrastructureDetail/`. Dependencies: T22. Verify: grep — zero imports remain.

- [ ] **T24**: Delete personal components: `src/components/Contacto/`, `src/components/Portfolio/`, `src/components/UI/ImgContainer/`, `src/components/UI/ScrollableContainer/`, `src/components/UI/PageHeader/`. Dependencies: T23. Verify: grep — zero imports.

- [ ] **T25**: Delete personal data: `src/data/cvData.ts`, `src/data/projectTranslations.ts`. Dependencies: T24. Verify: grep — zero imports.

- [ ] **T26**: Delete personal hook: `src/hooks/useImagePreloader.ts`. Dependencies: T24. Verify: grep — zero imports.

- [ ] **T27**: Delete personal assets: `public/pictures/` (all files + subdirs), `public/Franguh.svg`, `public/structure/`. Dependencies: T16 (OG image updated first). Verify: `pnpm build` passes.

- [ ] **T28**: Delete personal docs: `Agente.md`, `Mejoras.md`, `Prompt.md`, `Revision.md`, `Sesiones/`, `docs/audit/`, `image.png`. Dependencies: none. Verify: files removed from repo.

- [ ] **T29**: Modify `src/pages/NotFoundPage/` — replace Pikachu + personal text with org copy (use translations `notFound.*`), remove "About Me" button, add GitHub org link. Dependencies: T11 (notFound keys exist). Verify: 404 page renders org-themed message.

- [ ] **T30**: Remove `@emailjs/browser` from `package.json` dependencies. Run `grep` for `@emailjs` — confirm zero imports remain, then `pnpm install`. Dependencies: T24 (Contacto deleted). Verify: `pnpm install` + `pnpm build`.

- [ ] **T31**: Clean up `src/styles/GlassUpgrades.css` — remove dead `.PhilosophySection`/`.PhilosophyCard`/`.skill-category`/`.skill-tag` rules. Update remaining orange references → green. Extract reusable `.glass-card` base class. Dependencies: T23 (PhilosophySection deleted). Verify: `pnpm build` passes.

---

## Phase 5: Verify

- [ ] **T32**: Run `pnpm build` — `tsc -b && vite build`. MUST pass with ZERO errors. Dependencies: T1-T31 complete. Verify: terminal output shows success.

- [ ] **T33**: Run `pnpm lint` — MUST pass with ZERO errors. Dependencies: T32. Verify: terminal output shows zero warnings/errors.
