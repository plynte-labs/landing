# Design: Plynte Labs Org Landing

## Technical Approach

Single-page SPA transformation: replace 5 personal portfolio routes with one landing page using 5 feature sections, 2 shared UI components (`GlassCard`, `ProjectBadge`), and a simplified org navbar. Zero new dependencies — leverage existing React 19, framer-motion, react-helmet-async, react-router-dom v6. Color migration from orange→green via CSS tokens. Delete personal code after build passes. **Create → Modify → Delete → Verify** sequence.

## Component Tree

```
MainLayout (LanguageProvider > Navbar + <main>)
└── LandingPage (via <Outlet>)
    ├── SEOHead (reads t() for org title/desc)
    ├── HeroSection
    │   ├── ParticleField (count=150, aria-hidden)
    │   ├── <img src="/plynte logo2.png"> (scale-in via framer-motion)
    │   ├── <h1>{t("hero.tagline")}</h1> (green text-shadow glow)
    │   ├── Button (CTA → scrollTo #ecosystem)
    │   └── GlassCard (MIT badge, no href)
    ├── EcosystemSection
    │   ├── <h2>{t("ecosystem.heading")}</h2>
    │   └── <div.grid> {orgData.projects.map(p =>
    │       <GlassCard href={p.github} whileHover>
    │         ├── <img.Logo>
    │         ├── <h3>{t(`ecosystem.${p.key}.name`)}</h3>
    │         ├── <p>{t(`ecosystem.${p.key}.desc`)}</p>
    │         ├── ProjectBadge[] (variant={green|blue|purple})
    │         └── GitHubLabel
    │       </GlassCard>
    │   )} </div>
    ├── ArchitectureSection
    │   ├── <h2>{t("architecture.heading")}</h2>
    │   └── <div.grid> {orgData.pillars.map(p =>
    │       <GlassCard whileInView={{ opacity: 1, x: 0 }}>
    │         ├── Icon
    │         ├── <h3>{t(`architecture.${p.key}.title`)}</h3>
    │         └── <p>{t(`architecture.${p.key}.desc`)}</p>
    │       </GlassCard>
    │   )} </div>
    ├── ContributeSection
    │   ├── <h2>{t("contribute.heading")}</h2>
    │   ├── <ol.steps> {steps.map(s => <li>...)} </ol>
    │   ├── <pre> conventional-commits snippet </pre>
    │   └── Links: GitHub org, Discord
    ├── MissionSection
    │   ├── <h2>{t("mission.heading")}</h2>
    │   ├── <p> mission + MIT statement </p>
    │   └── MaintainerInfo (name, role, subtle GitHub/LinkedIn links)
    └── Footer (in MainLayout, text via t("footer.*"))
```

## Architecture Decisions

| Decision | Choice | Rejected | Rationale |
|----------|--------|----------|-----------|
| **Data source** | `src/data/orgData.ts` for structured data (URLs, GitHub links, icon refs), translations for display text | Inline data or all-in-translations | Separation: translators own words, devs own URLs. SkillBadge labels don't need i18n. |
| **GlassCard href** | Renders `<a>` when `href` present, `<div>` otherwise | `motion.a` conditional | Preserves semantic anchor + keyboard accessibility. Spec requires proper anchor rendering. |
| **GlassCard motion** | Accept optional `motionProps` spread; internal `<motion.div>` only when props provided | Always `motion.div` | Avoids unnecessary framer-motion wrapper for static cards (e.g., MIT badge). |
| **Nav anchor scroll** | `element.scrollIntoView({ behavior: "smooth" })` via `useRef` per section, NOT hash routes | `react-router-hash-link` or hash-based React Router | Single-page, no route for sections. Avoids ScrollToTop interference. Simpler. |
| **Navbar submenus** | REMOVE MegaMenu entirely. Three flat links: Home (#), Projects (#ecosystem), Contribute (#contribute). Plus LanguageSwitcher. | Keep MegaMenu simplified | Org landing needs clarity, not hierarchy. Submenus confuse single-page intent. |
| **404 page** | KEEP NotFoundPage, rewrite org copy. No "About Me" button — replace with GitHub link. | Remove entirely or replace with redirect | Typos still happen. SPA needs a fallback. Minimal org-themed 404 costs nothing. |
| **Logo in navbar** | `<img>` Plynte Labs logo (svg) — replace "Franguh" text + arrow | Keep NavbarLogo text component | Org identity. No dropdown arrow needed (no MegaMenu). |
| **CSS files per feature** | Each feature section gets its own `.css` file, BEM naming | Shared section CSS or CSS modules | Matches existing project pattern (`HomePage.css`, `AboutSection.css`). Zero new tooling. |
| **framer-motion animate** | `whileInView` for scroll-triggered cards (ecosystem, architecture, contribute). `initial/animate` for hero logo. | `useInView` hook or IntersectionObserver manual | framer-motion already a dependency. `whileInView` is declarative and simpler. |

## Data Flow

```
orgData.ts (static) ──────→ EcosystemSection ──props──→ GlassCard ──props──→ ProjectBadge
                                  │
translations.ts ──LanguageContext──┤
                                  │
                         ArchitectureSection ──props──→ GlassCard
                         ContributeSection
                         MissionSection

LanguageContext ─→ ALL components (useLanguage() hook)
                   provides: { language, setLanguage, t() }
```

No state management beyond `useLanguage()`. Sections receive static data via imports, display text via `t()`, and manage scroll refs internally via `useRef`.

## CSS Architecture

**Import chain** (unchanged): `App.css` → `colors.css` + `design-tokens.css`

**New CSS variables** in `design-tokens.css`:
```css
--brand-green: #6FF073;
--brand-green-hover: #4CAF50;
--brand-green-glow: rgba(111, 240, 115, 0.3);
--glass-bg: rgba(0, 0, 0, 0.3);
--glass-border: rgba(111, 240, 115, 0.08);
--glass-blur: blur(12px);
```

**Token replacements** in `design-tokens.css`:
- `--color-primary`: `#ff8903` → `#6FF073`
- `--color-primary-hover`: `#e67a00` → `#4CAF50`
- `--color-accent`: `#ff9900` → `#6FF073`
- `--color-brand-orange` / `--color-brand-orange-2`: REMOVED, replaced with green equivalents

**App.css changes**: scrollbar thumb from `var(--color-primary)` → `#6FF073`; `::selection` from `var(--color-bg-primary)` → `rgba(111, 240, 115, 0.30)`.

**GlassUpgrades.css**: extract reusable `.glass-card` base class. Remove dead `.PhilosophySection`/`.PhilosophyCard`/`.skill-category`/`.skill-tag` rules. Keep `backdrop-filter` definition.

**LanguageSwitcher.css**: `--color-brand-orange-2` references → `--brand-green`.

**Navbar.css**: `.navbar-item a:hover { color: --brand-green }` replaces `--color-opposite`.

**Feature CSS files** (new): `HeroSection.css`, `EcosystemSection.css`, `ArchitectureSection.css`, `ContributeSection.css`, `MissionSection.css`, `GlassCard.css`, `ProjectBadge.css`, `LandingPage.css`. All use BEM naming.

**bg.css**: particle color `#71021c` → `#6FF073` with reduced opacity. Orange gradient → green gradient.

## Animation Strategy

| Section | Animation | Implementation |
|---------|-----------|----------------|
| Hero logo | Scale-in on mount | `motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}` |
| Hero CTA | Fade-up after logo | `transition={{ delay: 0.5 }}` |
| Ecosystem cards | Staggered reveal on scroll | `motion.div whileInView` with `staggerChildren: 0.15` on parent, `delay: index * 0.1` |
| Architecture cards | Fade in left-to-right | `initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}` |
| Contribute steps | Sequential fade-up | Same pattern as ecosystem |
| Mission section | Simple fade-in | `whileInView={{ opacity: 1 }}` once |
| GlassCard hover | Scale + green border | `whileHover={{ scale: 1.02, borderColor: 'rgba(111,240,115,0.3)' }}` |
| ParticleField | Always running | Unchanged — CSS `floatUp` keyframes. Particles re-colored to green. |

All `whileInView` use `once: true` to avoid re-trigger. Subtle transitions only — no jarring effects per spec.

## Responsive Strategy

Mobile-first using existing `--space-*` tokens:

| Breakpoint | Hero | Ecosystem | Architecture | Contribute | Navbar |
|-----------|------|-----------|-------------|------------|--------|
| `<768px` mobile | Logo 60%, tagline `--font-size-lg` | 1 column | 1 column | Stacked cards | Hidden menu (existing behavior), logo + LanguageSwitcher only |
| `768-1024px` tablet | Logo 80% | 2 columns | 2 columns | 2×2 grid | Inline nav links |
| `>1024px` desktop | Logo 100% (400px max) | 3 columns | 4 columns | Horizontal steps | Full inline nav |

GlassCard: full-width on mobile, `padding: var(--space-6)` desktop → `var(--space-4)` mobile.

## Navbar Redesign

**Before**: `Franguh ▾` + INICIO | SOBRE MÍ | PORTFOLIO + MegaMenu with Aqua.webp
**After**: `<img class="navbar__logo" src="Plynte.svg">` + Home | Projects | Contribute + LanguageSwitcher

- Remove `navbar.config.ts` `children` arrays — flat links with `href="#ecosystem"` / `href="#contribute"`
- Remove `MegaMenu.tsx` and `MegaMenu.css` entirely
- Remove `NavbarLogo.tsx` and `NavbarLogo.css`
- Keep scroll-based `isScrolled` → adds `scrolled` class (opacity background)
- `useLocation().pathname` still closes mobile nav on nav click (keep behavior)
- LanguageSwitcher hover border-color: orange → green

## Data Architecture

**`src/data/orgData.ts`** (new file):
```ts
export interface OrgProject {
  key: "brickdraw" | "liveaudio" | "voiceai";
  github: string;
  techLabels: string[]; // static — not i18n
  badgeVariants: ("green" | "blue" | "purple")[];
}

export interface OrgPillar {
  key: "localFirst" | "mitLicense" | "cicd" | "hwAccel";
  icon: string; // emoji or CSS icon class
}

export const orgProjects: OrgProject[] = [
  { key: "brickdraw", github: "https://github.com/plynte-labs/Brick.draw", techLabels: ["Tauri", "React", "Rust"], badgeVariants: ["purple", "blue", "green"] },
  { key: "liveaudio", github: "https://github.com/plynte-labs/LiveAudio", techLabels: ["Python", "Whisper", "OBS"], badgeVariants: ["blue", "green", "purple"] },
  { key: "voiceai", github: "https://github.com/plynte-labs/VoiceAI", techLabels: ["Python", "Ollama", "Twitch"], badgeVariants: ["blue", "green", "green"] },
];

export const orgPillars: OrgPillar[] = [
  { key: "localFirst", icon: "💻" },
  { key: "mitLicense", icon: "📜" },
  { key: "cicd", icon: "🔄" },
  { key: "hwAccel", icon: "⚡" },
];
```

Display text (names, descriptions, section headings, button labels, footer) lives in `translations.ts` under new keys: `hero.*`, `ecosystem.*`, `architecture.*`, `contribute.*`, `mission.*`, `footer.*`.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/pages/LandingPage/` | **Create** | LandingPage.tsx + .css (~100 lines) |
| `src/features/HeroSection/` | **Create** | Logo, tagline, particles, CTA (~80 lines) |
| `src/features/EcosystemSection/` | **Create** | Project grid with GlassCards (~90 lines) |
| `src/features/ArchitectureSection/` | **Create** | 4 pillar cards (~80 lines) |
| `src/features/ContributeSection/` | **Create** | Workflow steps + community links (~120 lines) |
| `src/features/MissionSection/` | **Create** | Mission + maintainer info (~70 lines) |
| `src/components/UI/GlassCard/` | **Create** | Reusable glassmorphic card (~40 lines) |
| `src/components/UI/ProjectBadge/` | **Create** | Tech badge extending SkillBadge (~25 lines) |
| `src/data/orgData.ts` | **Create** | Project + pillar definitions (~30 lines) |
| `src/routes/AppRouter.tsx` | **Modify** | 5 routes → 1 landing + 1 wildcard (~15 lines) |
| `src/layouts/MainLayout.tsx` | **Modify** | Fix nested `<main>`, import new Navbar (~10 lines) |
| `src/layouts/navbar/navbar.tsx` | **Modify** | Flat org links, no MegaMenu (~35 lines) |
| `src/layouts/navbar/navbar.config.ts` | **Modify** | 3 flat items, no children (~10 lines) |
| `src/layouts/navbar/navbar.css` | **Modify** | Green hover color (~2 lines) |
| `src/layouts/navbar/MegaMenu.tsx` | **Delete** | No longer needed |
| `src/layouts/navbar/MegaMenu.css` | **Delete** | No longer needed |
| `src/components/UI/Navbar/` | **Delete** | NavbarLogo replaced by `<img>` |
| `src/contexts/LanguageContext.tsx` | **Modify** | localStorage key: `portfolio_lang` → `plynte_lang` (~1 line) |
| `src/data/translations.ts` | **Modify** | Replace all personal copy with org copy (~315 lines) |
| `src/components/SEOHead.tsx` | **Modify** | Org title suffix, OG image path, remove page-specific mapping (~15 lines) |
| `src/styles/design-tokens.css` | **Modify** | Orange → green tokens + new glass vars (~10 lines) |
| `src/styles/colors.css` | **Modify** | `--color-bg-primary`, `--color-opposite`, `--color-secondary` → green (~5 lines) |
| `src/styles/App.css` | **Modify** | Green scrollbar + selection (~4 lines) |
| `src/styles/GlassUpgrades.css` | **Modify** | Extract `.glass-card`, remove dead rules (~40 lines) |
| `src/styles/bg.css` | **Modify** | Particle color → green, orange gradient → green (~6 lines) |
| `src/types/index.ts` | **Modify** | Add Project, Pillar, NavItem types (~15 lines) |
| `index.html` | **Modify** | Org title, description, OG/twitter, JSON-LD (~50 lines) |
| `package.json` | **Modify** | Name, desc, remove `@emailjs/browser` (~3 lines) |
| `src/pages/{Home,About,Portfolio,Details}Page/` | **Delete** | Personal pages (~15 files) |
| `src/features/{8 personal sections}/` | **Delete** | HomeSection, AboutSection, StorySection, PhilosophySection, LlmInsightsSection, FeatureSelector, DetailSection, InfrastructureDetail (~16 files) |
| `src/components/{Contacto,Portfolio}/` | **Delete** | EmailJS form + project details (~4 files) |
| `src/data/{cvData,projectTranslations}.ts` | **Delete** | Personal data (~2 files) |
| `public/pictures/` | **Delete** | Personal photos + project images (~100+ files) |

## Interfaces / Contracts

```ts
// src/types/index.ts (additions)
export interface Project {
  key: "brickdraw" | "liveaudio" | "voiceai";
  github: string;
  techLabels: string[];
  badgeVariants: ("green" | "blue" | "purple")[];
}

export interface Pillar {
  key: "localFirst" | "mitLicense" | "cicd" | "hwAccel";
  icon: string;
}

export interface NavItem {
  label: string;
  translationKey?: string;
  href: string; // anchor or route path
}

// GlassCard props
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  href?: string;       // renders as <a> if provided
  motionProps?: MotionProps; // optional framer-motion spread
}

// ProjectBadge props
interface ProjectBadgeProps {
  label: string;
  variant?: "green" | "blue" | "purple"; // default: green
  className?: string;
}
```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Build | All components compile clean | `tsc -b` with strict mode |
| Lint | No ESLint violations | `pnpm lint` — zero errors |
| Integration | All 5 sections render without runtime errors | Manual browser check after build |
| Visual | Glassmorphism renders (backdrop-filter, hover glow) | Manual verification in Chrome/Firefox |
| i18n | Bilingual toggle updates all sections | Manual toggle ES↔EN, verify text changes |
| Nav scroll | Anchor clicks scroll to correct sections | Manual click each nav link |
| SEO | Title, description, OG tags, JSON-LD | View page source / Open Graph debugger |
| A11y | Semantic HTML, keyboard nav, contrast | Manual audit + axe DevTools |

No unit tests or test framework added — out of scope per proposal.

## Migration / Rollout

**Create first, delete last.** All new components are independent of deleted code:
1. Create new files (components, features, data, CSS)
2. Modify shared infrastructure (router, navbar, SEOHead, translations, tokens)
3. `pnpm build` — verify zero errors
4. Delete personal code
5. `pnpm build` + `pnpm lint` — verify zero errors

**Rollback**: `git revert` the transformation commit. All old files intact in parent.

## Open Questions

- [ ] Are Plynte Labs GitHub URLs final? (`github.com/plynte-labs/Brick.draw`, etc.) — used in `orgData.ts` and must be correct before PR merge.
- [ ] Logo file: `public/plynte logo2.png` has black background at 1000×1000. Does it need cropping or an SVG version for the navbar?
- [ ] Discord invite link — not in the specs. Platform currently has a Discord server? If not, leave as placeholder or hide until available.
- [ ] OG image: what replaces the personal Homepicture.webp? Org logo? New org banner image? Currently unaddressed.
