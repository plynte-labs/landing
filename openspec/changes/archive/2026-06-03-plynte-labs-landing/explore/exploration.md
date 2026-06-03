# Exploration: Transform Portfolio_Fran → Plynte Labs Org Landing

> **Date**: 2026-06-03
> **Phase**: SDD Explore
> **Change**: plynte-labs-landing
> **Artifact Store**: hybrid (OpenSpec + Engram)

---

## 1. Keep List — Files Confirmed to Preserve

### Styles (7 files, ~296 lines total)

| File | Lines | Reason |
|------|-------|--------|
| `src/styles/design-tokens.css` | 62 | CSS custom properties: colors, typography, spacing, transitions, z-index. Foundation for org theme. |
| `src/styles/colors.css` | 26 | Color scheme variables + `[data-theme="dark"]`. Overlaps with design-tokens.css (known issue). |
| `src/styles/App.css` | 50 | Reset, `#root` base, `::selection`, heading/body fonts, scrollbar. Import chain loads colors.css + design-tokens.css. |
| `src/styles/bg.css` | 74 | `.bg-pan-right` animated gradient, `.explosion-bg`, `.particle` floatUp keyframes. Used by ParticleField. |
| `src/styles/GlassUpgrades.css` | 66 | Glassmorphism: backdrop-filter, border effects for `.PhilosophyCard`, `.skill-category`, `.skill-tag`. Reference pattern for new glassmorphic cards. |
| `src/styles/variables.css` | 9 | Duplicate variables (overlapping with design-tokens.css). Known issue — safe to keep, may deduplicate later. |

### Contexts (1 file, 64 lines)

| File | Lines | Reason |
|------|-------|--------|
| `src/contexts/LanguageContext.tsx` | 64 | i18n provider: `LanguageProvider` + `useLanguage` hook. localStorage persistence (`portfolio_lang` key — rename to org-specific). Nested-key translator `t("key.path")`. Supports `es`/`en`. |

### Data (1 file, 315 lines — content replaced)

| File | Lines | Reason |
|------|-------|--------|
| `src/data/translations.ts` | 315 | Bilingual copy for all pages/sections. STRUCTURE kept — all content REPLACED with Plynte Labs org copy. Translation keys mirror current routes (navbar, seo, home, about, contact, portfolio, etc.). |

### Core Components (5 files, ~200 lines)

| File | Lines | Reason |
|------|-------|--------|
| `src/components/SEOHead.tsx` | 44 | React Helmet wrapper. Dynamically sets `<title>`, `<meta>`, OG tags, canonical URL. Hardcoded strings (`"Gustavo Francisco — Full Stack Developer"`) will be UPDATED to org identity. |
| `src/components/UI/Button/Button.tsx` | 49 | Reusable button: `primary`/`secondary`/`danger` variants, loading spinner state, `aria-busy`. Keep as-is. |
| `src/components/UI/Button/Button.css` | 90 | Button styles including `.button--floating` helper. |
| `src/components/UI/Loader/Loader.tsx` | 15 | Loading spinner with configurable message. Use for Suspense fallback. |
| `src/components/UI/ParticleField/ParticleField.tsx` | 30 | Renders N animated particles via `.particle` CSS class (from bg.css). Configurable `count` prop (default 150). No personal data — pure visual. |
| `src/components/UI/ScrollToTop/ScrollToTop.tsx` | 13 | Scrolls to top on route change via `useLocation()`. Less relevant with single-page but harmless to keep. |

### Layouts (6 files, ~230 lines — will be modified)

| File | Lines | Reason |
|------|-------|--------|
| `src/layouts/MainLayout.tsx` | 20 | Wraps `<LanguageProvider>` + `<Navbar>` + `<Outlet>`. Known issue: nested `<main>` (App.tsx also uses `<main>` indirectly). Modified: new org navbar. |
| `src/layouts/navbar/navbar.tsx` | 57 | Desktop navbar with scroll detection, MegaMenu toggle, LanguageSwitcher, NavbarLogo. Modified: simplified for org (no submenus, fewer items). |
| `src/layouts/navbar/navbar.config.ts` | 34 | Navigation item definitions: INICIO, SOBRE MÍ, PORTFOLIO with children/submenus. Replaced with org links. |
| `src/layouts/navbar/MegaMenu.tsx` | 56 | Fullscreen overlay menu with columns, image, language toggle. Modified or removed — org landing is single-page, may not need mega menu. |
| `src/layouts/navbar/navbar.css` | — | Navbar styling. Modified. |
| `src/layouts/navbar/MegaMenu.css` | — | MegaMenu styling. Modified or removed. |

### Router (1 file, 30 lines — simplified)

| File | Lines | Reason |
|------|-------|--------|
| `src/routes/AppRouter.tsx` | 30 | BrowserRouter with 5 lazy-loaded routes (Home, About, Portfolio, Details, 404). Simplified to single `<LandingPage>` route. Keep `BrowserRouter`, `Suspense`, `ScrollToTop` wrapper structure. |

### Entry Points (2 files, 30 lines)

| File | Lines | Reason |
|------|-------|--------|
| `src/main.tsx` | 13 | React root with `StrictMode` + `HelmetProvider`. Keep as-is. |
| `src/App.tsx` | 17 | Imports `App.css`, renders `<AppRouter>` + `<Analytics>` + `<SpeedInsights>`. Keep structure. Known issue: nested `<main>` landmark. |

### Types (1 file, 5 lines)

| File | Lines | Reason |
|------|-------|--------|
| `src/types/index.ts` | 5 | Basic `User` interface. Extend with org-specific types (Project, Feature, etc.). |

### Config Files (6 files, ~102 lines)

| File | Lines | Reason |
|------|-------|--------|
| `vite.config.ts` | 7 | Vite + `@vitejs/plugin-react-swc`. Keep as-is. |
| `tsconfig.json` | 7 | Project references to `tsconfig.app.json` and `tsconfig.node.json`. Keep as-is. |
| `tsconfig.app.json` | 27 | Strict mode, ESNext target, React JSX. Keep as-is. |
| `tsconfig.node.json` | 25 | For `vite.config.ts`. Keep as-is. |
| `eslint.config.js` | 28 | ESLint flat config with react-hooks and react-refresh plugins, TypeScript ESLint. Keep as-is. |
| `vercel.json` | 5 | SPA rewrite rule (all routes → `/index.html`). Keep as-is. |

### Root Files (3 files — updated)

| File | Lines | Reason |
|------|-------|--------|
| `index.html` | 107 | HTML entry with meta tags, OG tags, JSON-LD structured data (Person + SoftwareApplication). Update title, description, OG image, JSON-LD for Plynte Labs org. |
| `package.json` | 35 | Rename to `plynte-labs-landing`, update description. Dependencies: React 19, React Router 6, framer-motion, EmailJS, Vercel Analytics/Speed Insights, react-helmet-async. |
| `.gitignore` | 28 | Standard ignores. Keep as-is. |

### Public Assets (4 items — keep)

| Path | Reason |
|------|--------|
| `public/Plynte.svg` | Org logo SVG. KEEP. |
| `public/robots.txt` | Keep (will update content for org domain). |
| `public/sitemap.xml` | Keep (will update content for org domain). |
| `public/assets/react.svg` | Default Vite asset. Keep. |
| `public/assets/vite.svg` | Default Vite asset. Keep. |

### Reusable UI Components to Keep (5 components, ~175 lines)

| Path | Reason |
|------|--------|
| `src/components/UI/LanguageSwitcher/` | ES/EN toggle. Required for bilingual org site. |
| `src/components/UI/Navbar/NavbarLogo.tsx` | Logo component used in Navbar + MegaMenu. Update for org logo. |
| `src/components/UI/Navbar/NavbarLogo.css` | Logo styles. Keep. |
| `src/components/UI/Icons/SvgIcons.tsx` | Reusable SVG icon components. Keep. |
| `src/components/UI/SkillBadge/` | Tech badge component. Repurpose as base for ProjectBadge component. |
| `src/components/UI/LinkButton/` | Link-styled button. Keep as generic reusable. |
| `src/utils/slug.ts` | `generateSlug()` pure utility — generic, no personal data. Keep. |

---

## 2. Delete List — Files Confirmed for Deletion

### Pages (5 directories, ~15 files, ~1200 lines)

| Path | Reason |
|------|--------|
| `src/pages/HomePage/` (HomePage.tsx + 2 CSS) | Personal home: hero, project scroll, about snippet, floating CTA. Replaced by `LandingPage`. |
| `src/pages/AboutPage/` (AboutPage.tsx + CSS) | Personal about: story, philosophy, AI insights. Not relevant for org landing. |
| `src/pages/PortfolioPage/` (PortfolioPage.tsx + CSS) | Personal portfolio grid, skills bento, experience. Replaced by `EcosystemSection`. |
| `src/pages/DetailsPage/` (DetailsPage.tsx + CSS) | Project detail page. Not needed for org landing (links to GitHub repos). |
| `src/pages/NotFoundPage/` (NotFoundPage.tsx + CSS) | Personal 404 with Pikachu crying. Replace with org-specific 404. |

### Features (8 directories, ~16 files, ~1800 lines)

| Path | Reason |
|------|--------|
| `src/features/HomeSection/` | Personal hero with name/title animation. Replaced by `HeroSection`. |
| `src/features/AboutSection/` | Personal about with image + text. |
| `src/features/StorySection/` | Personal journey narrative. |
| `src/features/PhilosophySection/` | Personal work philosophy cards. |
| `src/features/LlmInsightsSection/` | AI/LLM insights (personal). |
| `src/features/DetailSection/` | Project detail expander. |
| `src/features/FeatureSelector/` | Skill category selector (Perfil, Frontend, Backend, Python, Cloud, Proyectos). |
| `src/features/InfrastructureDetail/` | Infrastructure detail expander. |

### Components (4 directories, ~8 files, ~500 lines)

| Path | Reason |
|------|--------|
| `src/components/Contacto/` (ContactForm.tsx + CSS) | EmailJS contact form. Replace with org contact links (GitHub, Discord, Email). |
| `src/components/Portfolio/` (ProjectDetailsPanel.tsx + CSS) | Project detail panel. |
| `src/components/UI/ImgContainer/` (ImgContainer.tsx + CSS) | Clickable article for project images. Known issue: uses `<article>` as clickable container. Used only by HomePage. |
| `src/components/UI/ScrollableContainer/` (ScrollableContainer.tsx + CSS) | Horizontal scroll with arrow buttons. Known issue: buttons need accessible names. Used only by HomePage project strip. |
| `src/components/UI/PageHeader/` (PageHeader.tsx + CSS) | Internal page header component. Used by AboutPage, PortfolioPage. Not needed for single-page org landing. |

### Data (2 files, ~395 lines)

| Path | Reason |
|------|--------|
| `src/data/cvData.ts` | 243 lines. Personal CV: skills, experience, projects, contact info. |
| `src/data/projectTranslations.ts` | 152 lines. Bilingual descriptions for 14 personal projects (Brick.draw, Floppy, Sloppy, Dog-bros, etc.). |

### Hooks (1 file, ~43 lines)

| Path | Reason |
|------|--------|
| `src/hooks/useImagePreloader.ts` | Image preloader with sessionStorage caching. Used only by HomePage for personal project images. |

### Public Assets (6 directories, ~100+ files)

| Path | Reason |
|------|--------|
| `public/pictures/Homepicture.webp` | Personal hero photo. |
| `public/pictures/Home_picture.webp` | Personal hero photo variant. |
| `public/pictures/goatatwork.webp` | Personal image (goat mascot). |
| `public/pictures/Aqua.webp` | Personal image (referenced in MegaMenu). |
| `public/pictures/drawsByMe/` | 2 personal drawings (Artur_master.webp, drawByMe.webp). |
| `public/pictures/ImgProyects/` | 14 project image folders (Brick.draw, BroDogs, Cacao, Chat, ComputerHelper, Floppy, LiveAudio, Plynte, RedirectLink, RememberCompanion, Sloppy, VoiceAI, VoiceAI.Kira, Character.webp). |
| `public/structure/structure.webp` | Personal infrastructure diagram. |
| `public/Franguh.svg` | Personal logo variant (FranGuh). Replace with Plynte Labs logo. |

### Personal Documentation (9 files, ~1700+ lines)

| Path | Reason |
|------|--------|
| `Agente.md` | 243 lines. Agent prompt for audit workflow. |
| `Mejoras.md` | 351 lines. Improvement notes from audit. |
| `Prompt.md` | 304 lines. Prompt template for audit agent. |
| `Revision.md` | 772 lines. Full technical review from audit agent. |
| `Sesiones/Session1.md` | Personal session notes. |
| `Sesiones/Session2.md` | Personal session notes. |
| `Sesiones/Session3.md` | Personal session notes. |
| `Sesiones/Session4.md` | Personal session notes. |
| `docs/audit/` | 3 files (AGENT_REFACTOR_PLAN.md, CODE_SMELLS_AND_BUGS.md, UI_UX_AUDIT.md). Old audit artifacts. |
| `image.png` | Root-level stray image. |

---

## 3. Create List — New Files to Build

### Pages (1 new page)

| Path | Purpose |
|------|--------|
| `src/pages/LandingPage/LandingPage.tsx` | Single page that assembles all landing sections. Replaces multi-route SPA with one scrollable page. |
| `src/pages/LandingPage/LandingPage.css` | Page-level layout styles. |

### Features (5 new feature sections)

| Path | Purpose |
|------|--------|
| `src/features/HeroSection/HeroSection.tsx` + CSS | Plynte Labs hero: logo, tagline ("Open-source tools for the modern web"), particles background, primary CTA ("Explore Projects" → scroll to Ecosystem). Reuses `ParticleField`. |
| `src/features/EcosystemSection/EcosystemSection.tsx` + CSS | Project grid showcasing Brick.draw, LiveAudio, VoiceAI. Each card: GlassCard wrapper, project badge, description, link to GitHub. |
| `src/features/ArchitectureSection/ArchitectureSection.tsx` + CSS | Technical pillars: Local-First, MIT License, CI/CD, Hardware Acceleration. Icon + description cards. |
| `src/features/ContributeSection/ContributeSection.tsx` + CSS | How to contribute: open issues, PR standards, Code of Conduct, community links (Discord/GitHub). |
| `src/features/MissionSection/MissionSection.tsx` + CSS | Who's behind Plynte Labs: mission statement, org philosophy, maintainer info. |

### New UI Components (2 new)

| Path | Purpose |
|------|--------|
| `src/components/UI/GlassCard/GlassCard.tsx` + CSS | Reusable glassmorphic card: backdrop-filter blur, semi-transparent bg, bordered with subtle glow on hover. Pattern from GlassUpgrades.css. |
| `src/components/UI/ProjectBadge/ProjectBadge.tsx` + CSS | Tech stack badge: icon + label. Reuses/extends SkillBadge pattern. |

### Updated Data

| Path | Purpose |
|------|--------|
| `src/data/translations.ts` | Completely new bilingual copy: navbar (Home, Projects, Contribute), hero taglines, ecosystem descriptions, architecture pillars, contribution guide, mission statement. |

### Updated Public Assets (1 new, clean up)

| Path | Purpose |
|------|--------|
| `public/pictures/plynte-hero.webp` | Org hero/OG image for Plynte Labs. |
| Keep `public/Plynte.svg` | Org logo already exists. |

---

## 4. Modify List — Exact Changes Per File

| File | Change | Lines Affected |
|------|--------|---------------|
| `src/layouts/MainLayout.tsx` | Update Navbar import to simplified org navbar. Fix nested `<main>` landmark if rendering `<Outlet>` inside `<main>`. | ~10 |
| `src/layouts/navbar/navbar.tsx` | Replace personal nav items (INICIO, SOBRE MÍ, PORTFOLIO) with org links (Home, Projects, Contribute). Remove or simplify MegaMenu toggle. Keep scroll-based background and LanguageSwitcher. | ~20 |
| `src/layouts/navbar/navbar.config.ts` | Replace `NAV_ITEMS` with org navigation: no children/submenus. | ~15 |
| `src/layouts/navbar/MegaMenu.tsx` | Remove or simplify — org landing is single-page, likely does not need mega menu. If kept, update personal image reference (`Aqua.webp`) and menu items. | ~30 |
| `src/routes/AppRouter.tsx` | Replace 5 routes with single `<LandingPage>` at `"/"`. Keep 404 wildcard. Keep `BrowserRouter`, `Suspense`, `ScrollToTop`. | ~15 |
| `index.html` | Update `<title>`, `description`, `og:title`, `og:description`, `og:image`, `twitter:*`, JSON-LD (from Person → Organization, update application entries). | ~30 |
| `package.json` | Rename `"portfolio-fran"` → `"plynte-labs-landing"`. Update description. Remove EmailJS dependency if contact form is replaced. | ~5 |
| `src/App.tsx` | May need minor adjustment if nested `<main>` issue is fixed (MainLayout has `<main>` wrapping Outlet). | ~5 |
| `src/components/SEOHead.tsx` | Update hardcoded title suffix `"Gustavo Francisco — Full Stack Developer"` → `"Plynte Labs"`. Update default OG image path. | ~10 |
| `src/components/UI/Navbar/NavbarLogo.tsx` | Update logo to use Plynte Labs branding. | ~5 |
| `src/contexts/LanguageContext.tsx` | Rename localStorage key `"portfolio_lang"` → `"plynte_lang"`. | ~1 |
| `src/styles/colors.css` | May add org-specific brand colors. Keep dark theme support. | ~5 |
| `src/types/index.ts` | Add org-specific types: `Project`, `Pillar`, `NavItem`. Replace `User` with relevant types. | ~20 |

---

## 5. Final Architecture — ASCII Tree

```
src/
├── App.tsx                          # Entry: App.css + Router + Analytics (MODIFY: minor)
├── main.tsx                         # React root + HelmetProvider (KEEP)
│
├── components/
│   ├── SEOHead.tsx                  # Dynamic SEO metadata (MODIFY: org strings)
│   └── UI/
│       ├── Button/                  # Reusable button (KEEP)
│       │   ├── Button.tsx
│       │   └── Button.css
│       ├── GlassCard/               # ★ NEW: Glassmorphic card wrapper
│       │   ├── GlassCard.tsx
│       │   └── GlassCard.css
│       ├── Icons/                   # SVG icon components (KEEP)
│       │   └── SvgIcons.tsx
│       ├── LanguageSwitcher/        # ES/EN toggle (KEEP)
│       │   ├── LanguageSwitcher.tsx
│       │   └── LanguageSwitcher.css
│       ├── LinkButton/              # Link-styled button (KEEP)
│       │   ├── LinkButton.tsx
│       │   └── LinkButton.css
│       ├── Loader/                  # Loading spinner (KEEP)
│       │   ├── Loader.tsx
│       │   └── Loader.css
│       ├── Navbar/                  # Navbar logo component (MODIFY)
│       │   ├── NavbarLogo.tsx
│       │   └── NavbarLogo.css
│       ├── ParticleField/           # Particle background (KEEP)
│       │   └── ParticleField.tsx
│       ├── ProjectBadge/            # ★ NEW: Tech stack badge
│       │   ├── ProjectBadge.tsx
│       │   └── ProjectBadge.css
│       ├── ScrollToTop/             # Scroll restoration (KEEP)
│       │   └── ScrollToTop.tsx
│       └── SkillBadge/              # Tech badge (KEEP as reference)
│           ├── SkillBadge.tsx
│           └── SkillBadge.css
│
├── contexts/
│   └── LanguageContext.tsx          # i18n provider (MODIFY: storage key)
│
├── data/
│   └── translations.ts             # Bilingual org copy (REPLACE content)
│
├── features/
│   ├── ArchitectureSection/         # ★ NEW: Technical pillars
│   │   ├── ArchitectureSection.tsx
│   │   └── ArchitectureSection.css
│   ├── ContributeSection/           # ★ NEW: How to contribute
│   │   ├── ContributeSection.tsx
│   │   └── ContributeSection.css
│   ├── EcosystemSection/            # ★ NEW: Project showcase grid
│   │   ├── EcosystemSection.tsx
│   │   └── EcosystemSection.css
│   ├── HeroSection/                 # ★ NEW: Plynte Labs hero
│   │   ├── HeroSection.tsx
│   │   └── HeroSection.css
│   └── MissionSection/              # ★ NEW: Mission & philosophy
│       ├── MissionSection.tsx
│       └── MissionSection.css
│
├── hooks/
│   └── (empty after deletion)
│
├── layouts/
│   ├── MainLayout.tsx               # Layout wrapper (MODIFY)
│   └── navbar/                      # Navigation (MODIFY: simplified)
│       ├── navbar.tsx
│       ├── navbar.config.ts
│       ├── navbar.css
│       ├── MegaMenu.tsx             # (SIMPLIFY or REMOVE)
│       └── MegaMenu.css
│
├── pages/
│   └── LandingPage/                 # ★ NEW: Single org landing page
│       ├── LandingPage.tsx
│       └── LandingPage.css
│
├── routes/
│   └── AppRouter.tsx                # Router (SIMPLIFY: single route)
│
├── styles/
│   ├── App.css                      # Reset + base (KEEP)
│   ├── bg.css                       # Background effects (KEEP)
│   ├── colors.css                   # Color scheme (MODIFY: org colors)
│   ├── design-tokens.css            # CSS tokens (KEEP)
│   ├── GlassUpgrades.css            # Glassmorphism refs (KEEP)
│   └── variables.css                # Duplicate vars (KEEP, dedupe later)
│
├── types/
│   └── index.ts                     # Type definitions (EXTEND)
│
└── utils/
    └── slug.ts                      # URL slug generator (KEEP)
```

---

## 6. Risk Assessment

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | **Breaking CSS cascade**: Deleting personal features removes CSS that other components may import. `GlassUpgrades.css` targets `.PhilosophySection` / `.PhilosophyCard` — these classes will vanish. | Medium | Audit all CSS imports before deletion. `GlassUpgrades.css` rules for deleted classes become dead code (harmless). |
| 2 | **Nested `<main>` landmark**: `MainLayout` wraps `<main>` around `<Outlet>`, and `App.tsx` renders inside `<main>` indirectly. Known issue from portfolio skill. | Low | Fix during MainLayout modification — remove the `<main>` wrapper or restructure. |
| 3 | **Translation key mismatch**: New `translations.ts` must maintain all keys referenced by kept components (Navbar keys, LanguageSwitcher). Missing keys cause fallback to key name. | Medium | Keep navbar translation keys (`navbar.*`) structure. Add new section keys for landing. |
| 4 | **Vercel Analytics dependency**: `@vercel/analytics` and `@vercel/speed-insights` are tied to the original Vercel project. After repo rename, these need reconfiguration. | Low | Verify analytics work post-deploy. Keep dependencies. |
| 5 | **EmailJS removal**: If ContactForm is deleted and `@emailjs/browser` removed from package.json, ensure no other code imports it. | Low | Grep for EmailJS imports before removing dependency. |
| 6 | **React Router v6 types**: Known issue from portfolio skill: `@types/react-router-dom` v5 listed but not in package.json. Already resolved — no action needed. | None | Verified: no `@types/react-router-dom` in devDependencies. |
| 7 | **Single-page scroll behavior**: ScrollToTop fires on route change only. Since we go single-page, section navigation (anchor links) may need `scrollIntoView` behavior instead of route changes. | Low | Could keep smooth scrolling without route changes, or keep anchor-based navigation. |
| 8 | **OG image path**: `SEOHead` defaults to `/pictures/Homepicture.webp` which will be deleted. Must update to new org hero image BEFORE deletion. | High | Update `SEOHead` default image path and `index.html` OG image tags before deleting personal assets. |

---

## 7. Size Estimate

| Category | Lines | Description |
|----------|-------|-------------|
| **ADD** (new features/components) | ~800-1000 | 5 new feature sections, 2 new UI components, 1 new page, updated translations (~300 lines new copy) |
| **DELETE** (personal content) | ~5000-6000 | 5 pages, 8 features, 4 components, 2 data files, 1 hook, 8 personal docs, public assets |
| **MODIFY** (existing files) | ~80-120 | Package.json, index.html, router, navbar, layouts, SEOHead, LanguageContext, types |
| **KEEP** (unchanged) | ~700 | Styles, configs, UI primitives, entry points, Vercel config |
| **Total lines touched** | ~6500 | Across ~40+ files created/deleted/modified |

---

## 8. Dependencies

**No new npm packages needed.** The existing stack fully covers requirements:

| Dependency | Version | Usage |
|------------|---------|-------|
| `react` + `react-dom` | 19.1.0 | UI rendering |
| `react-router-dom` | 6.30.1 | SPA routing (simplified to single route) |
| `framer-motion` | 12.38.0 | Section entrance animations (optional, already available) |
| `react-helmet-async` | 3.0.0 | SEO metadata via `SEOHead` |
| `@vercel/analytics` | 1.6.1 | Vercel analytics (keep) |
| `@vercel/speed-insights` | 1.3.1 | Vercel speed insights (keep) |

**Removable**: `@emailjs/browser` (4.4.1) — only used by deleted ContactForm. Remove after confirming no other imports.

---

## 9. Known Issues to Fix During Transformation

From the project-specific portfolio architect skill, these known issues are relevant:

1. ✅ **Nested `<main>` landmarks**: `App.tsx` + `MainLayout.tsx` create nesting. Fix when modifying MainLayout.
2. ✅ **`colors.css` and `design-tokens.css` overlapping tokens**: Deduplicate when adding org colors.
3. ✅ **`ImgContainer` uses clickable `<article>`**: Deleted with the component.
4. ✅ **`ScrollableContainer` buttons need accessible names**: Deleted with the component.
5. ✅ **`generateSlug` import coupling**: Resolved — it's in `utils/slug.ts`, not in DetailsPage. HomePage imports correctly. Keep utility.
6. ✅ **`DetailSection` unused props**: Component deleted.
7. ❌ **`PortfolioPage.css` invalid `color: var();`**: File deleted — no fix needed.
8. ❌ **`DetailsPage.tsx` uses `as any`**: File deleted — no fix needed.

---

## 10. Transformation Sequence Recommendation

The safest order to avoid broken builds:

1. **Create** all new files first (pages, features, components, translations) — they have no dependencies on deleted code
2. **Modify** shared infrastructure (router, navbar, MainLayout, SEOHead, index.html, package.json) — point them at new files
3. **Delete** old code once new code builds successfully
4. **Delete** personal assets (public/pictures, docs, notes)
5. **Verify** with `pnpm build` and `pnpm lint`

---

## 11. Ready for Proposal

**Yes.** All files have been read and confirmed. The transformation scope, risks, and architecture are fully mapped. Next phase: `sdd-propose` to formalize intent, scope, and rollback plan.
