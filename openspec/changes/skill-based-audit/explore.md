# Skill-Based Project Audit: Plynte Labs Landing

> **Audit date**: 2026-06-06  
> **Project**: plynte-labs/landing — React 19.1 + Vite 6.3 + TypeScript 5.8 SPA  
> **Change**: `skill-based-audit`

## Skill Resolution

All 8 skill lenses were loaded and applied:

| # | Skill | File | Status |
|---|-------|------|--------|
| 1 | portfolio-ui-ux-architect | `.opencode/skills/portfolio-ui-ux-architect/SKILL.md` | ✅ Loaded |
| 2 | accessibility | `.agents/skills/accessibility/SKILL.md` | ✅ Loaded |
| 3 | seo | `.agents/skills/seo/SKILL.md` | ✅ Loaded |
| 4 | vercel-react-best-practices | `.agents/skills/react-best-practices/SKILL.md` | ✅ Loaded |
| 5 | vercel-composition-patterns | `.agents/skills/composition-patterns/SKILL.md` | ✅ Loaded |
| 6 | typescript-advanced-types | `.agents/skills/typescript-advanced-types/SKILL.md` | ✅ Loaded |
| 7 | vite | `.agents/skills/vite/SKILL.md` | ✅ Loaded |
| 8 | frontend-design | `.agents/skills/frontend-design/SKILL.md` | ✅ Loaded |

## Executive Summary

The Plynte Labs landing page is a well-structured single-page application with solid fundamentals: strict TypeScript, clean component separation (pages → features → components), impressive JSON-LD structured data, and a distinctive green-on-black visual identity. However, the project has **critical accessibility gaps** (no skip link, no reduced-motion support, no focus-visible styles on key interactive elements), **overlapping CSS design tokens** across three conflicting files, **no code splitting for below-fold sections**, an **unthrottled scroll listener** causing wasted renders, and a **GlassCard component** suffering from the exact boolean-prop branching the composition skill warns against. The frontend design is cohesive but uses the explicitly discouraged Inter font, and the RGB rainbow animation on LinkButton clashes with the otherwise restrained green-on-black palette. SEO is limited by the single-page architecture with no hreflang for bilingual content. The Vite config is bare-minimum with no path aliases, chunk splitting, or build optimization.

**Top priorities**: (1) Fix accessibility — skip link, reduced-motion, focus-visible styles. (2) Consolidate CSS design tokens. (3) Add code splitting with React.lazy for feature sections. (4) Refactor GlassCard away from boolean branching. (5) Throttle the navbar scroll handler.

---

## Findings by Category

### 1. Portfolio UI/UX Architect

| # | Severity | File | Line(s) | Issue | Why it matters | Fix |
|---|----------|------|---------|-------|----------------|-----|
| 1 | HIGH | `src/styles/colors.css`, `src/styles/design-tokens.css`, `src/styles/variables.css` | 1–26, 1–72, 1–9 | Three CSS files define overlapping `--color-primary` tokens. `colors.css` sets `#F5F5F7`, `design-tokens.css` overrides to `#6FF073`, `variables.css` also sets `#6FF073` but is not imported anywhere. `colors.css` defines `--color-bg-secondary: black` while `design-tokens.css` uses `--color-dark-bg`, `--color-dark-surface`. Token drift is real. | CSS tokens must be the single visual source of truth (skill mandates "CSS token consistency over scattered one-off styles"). Three files with competing definitions make it impossible to know which token is authoritative. | Consolidate into a single `tokens.css` or `design-tokens.css`. Remove `colors.css` and `variables.css`. Define all tokens in one place. Import only that file in `App.css`. |
| 2 | MEDIUM | `src/features/HeroSection/HeroSection.css` | 4 | Hardcoded `background: #000000` instead of using `var(--color-dark-bg)` or a token. | Scattered hardcoded colors break the design token system and make theme changes (e.g., light mode) impossible. | Replace with `var(--color-dark-bg)`. |
| 3 | MEDIUM | `src/features/ArchitectureSection/ArchitectureSection.css` | 3 | Same as above: `background: #000000` hardcoded. | Same justification. | Replace with `var(--color-dark-bg)`. |
| 4 | MEDIUM | `src/features/MissionSection/MissionSection.css` | 3 | Same: `background: #000000` hardcoded. | Same justification. | Replace with `var(--color-dark-bg)`. |
| 5 | LOW | `src/features/HeroSection` | Entire feature | No SEOHead usage on the landing page. The landing page is the primary route but has no Helmet-managed meta tags; it relies entirely on `index.html` static defaults. | The skill states: "Use `SEOHead` consistently." The landing page should programmatically set its own title/description for dynamic language changes. | Add `<SEOHead />` to `LandingPage.tsx` using the `t()` function for dynamic titles. |
| 6 | LOW | `src/layouts/MainLayout.tsx` | 26 | `<main>` landmark exists but no `<header>`, no `<footer>`. The maintainer banner and navbar are outside any landmark. | The skill mandates a clear AppShell structure. Missing landmarks reduce screen reader navigation quality. | Wrap the banner and navbar in a `<header>` landmark. Add a `<footer>` with license/build info. |
| 7 | LOW | `src/features/ContributeSection` | Entire feature | No contact form. No way for visitors to reach out directly beyond GitHub links. | The skill's portfolio architecture includes a `ContactForm`. For a landing page aiming to attract contributors, a contact method builds trust. | Add a lightweight contact section or link to a contact form. |
| 8 | LOW | App-wide | — | All 5 section headings use identical CSS: `font-family: var(--font-display)`, `font-size: var(--font-size-2xl)`, `text-align: center`, `margin: 0 0 var(--space-12)`. Every section looks like its own hero. | The skill warns against "every section looking like a hero" and "repeated hero patterns." Identical heading styles mask the information hierarchy. | Vary heading sizes or visual treatment between primary and secondary sections. |

### 2. Accessibility (WCAG 2.2)

| # | Severity | File | Line(s) | Issue | Why it matters | Fix |
|---|----------|------|---------|-------|----------------|-----|
| 1 | CRITICAL | All pages | — | No "skip to content" link. Keyboard users must tab through navbar items on every page load. | WCAG 2.4.1 (Level A): "A mechanism is available to bypass blocks of content that are repeated on multiple Web pages." Required for compliance. | Add a `.skip-link` anchor as the first focusable element in the DOM. See `accessibility` skill reference pattern. |
| 2 | CRITICAL | `src/features/HeroSection/HeroSection.css`, all CSS | — | No `prefers-reduced-motion` media query anywhere. Framer Motion animations run at full intensity regardless of user OS preference. | WCAG 2.3.3 (Level AAA): "Motion animation triggered by interaction can be disabled." Even at Level A, reduced-motion is a fundamental accessibility feature. The skill explicitly requires it with: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; } }`. | Add `prefers-reduced-motion` to `App.css`. For Framer Motion, use `useReducedMotion()` hook and conditionally disable animations. |
| 3 | HIGH | `src/layouts/navbar/navbar.css` | 44–52 | Navbar links have no `:focus-visible` styles. Tabbing through nav items shows only browser default focus ring (which some users disable). | WCAG 2.4.7 (Level AA): "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible." The accessibility skill mandates visible focus states. | Add `.navbar-item a:focus-visible { outline: 2px solid var(--brand-green); outline-offset: 2px; }`. |
| 4 | HIGH | `src/components/UI/Button/Button.css` | — | Button component has no explicit `:focus-visible` style. Relies entirely on browser default. | Same as above — WCAG 2.4.7. | Add `button:focus-visible { outline: 2px solid var(--brand-green); outline-offset: 2px; }`. |
| 5 | HIGH | `src/layouts/MainLayout.tsx` | 10–18 | Maintainer banner `<a>` uses `target="_blank"` without warning screen readers that a new tab opens. No `aria-label`, no visual indicator. | WCAG 2.4.4 (Level A): Link purpose must be clear. Users should know the link opens in a new context. The accessibility skill explicitly requires this. | Add `aria-label="Maintainer portfolio (opens in new tab)"` or append "(opens in new tab)" visually. |
| 6 | MEDIUM | `src/components/UI/LanguageSwitcher/LanguageSwitcher.tsx` | 13–18 | Custom `onKeyDown` handler for Enter/Space on a native `<button>`. Buttons already handle these keys natively. | Redundant and potentially conflicting with native behavior. The accessibility skill says "Prefer native elements" — the button already works. The custom handler could interfere with assistive tech. | Remove the `onKeyDown` handler entirely. The `<button onClick>` handles both click and keyboard activation natively. |
| 7 | MEDIUM | `src/components/UI/ParticleField/ParticleField.tsx` | 10–23 | 150 decorative `<div>` elements are rendered without `aria-hidden="true"`. Screen readers will attempt to navigate through them. | WCAG 1.1.1 (Level A): Non-text content must have text alternatives or be marked as decorative. The accessibility skill requires `role="presentation"` or `aria-hidden="true"` for decorative elements. | Add `aria-hidden="true"` to each particle div. The parent `<div>` in HeroSection already has this (line 21), but the individual particles should too for robustness. |
| 8 | MEDIUM | `src/layouts/navbar/navbar.tsx` | 32 | `<nav>` element lacks `aria-label`. | WCAG 2.4.1: Multiple nav landmarks should be distinguishable. The accessibility skill: "Navigation: predictable and not dominant." With only one nav, it's less critical but still recommended for future-proofing. | Add `aria-label="Main navigation"` to the `<nav>` element. |
| 9 | MEDIUM | `src/layouts/MainLayout.tsx` | 6 | `MaintainerBanner` component is defined inside `MainLayout.tsx` as a nested function component. React will recreate it on every render. | The Vercel React skill's `rerender-no-inline-components` rule: "Don't define components inside components." This causes the banner to re-mount on every MainLayout render. | Extract `MaintainerBanner` to its own file in `src/layouts/banner/MaintainerBanner.tsx`. |
| 10 | LOW | `src/features/HeroSection/HeroSection.tsx` | 29 | `<img>` has `alt="Plynte Labs"` but the logo itself contains the text "Plynte Labs". For a logo image, the alt text should be the organization name, which it is. But `width={400}` and `height={400}` are hardcoded while CSS limits it to `max-width: 400px`. | Minor redundancy — HTML attributes should match rendered size. Not a failure but a precision concern. | Use `width="400"` and `height="400"` consistently, or remove the HTML attributes and rely on CSS. |

### 3. SEO

| # | Severity | File | Line(s) | Issue | Why it matters | Fix |
|---|----------|------|---------|-------|----------------|-----|
| 1 | HIGH | `index.html` | 7 | `<title>` is static English, but the site defaults to Spanish (`lang="es"`). The title "Plynte Labs — Open-Source Software Laboratory" doesn't match the default Spanish audience. | The SEO skill: "Title tags present and unique." A mismatch between declared language and title content sends mixed signals to search engines. | Set the default title in Spanish: "Plynte Labs — Laboratorio de Software Open-Source". Let `SEOHead` override per-route. |
| 2 | HIGH | `index.html` | — | No hreflang tags. The site supports ES and EN via JS toggle, but search engines see only one language per crawl. | The SEO skill: "Hreflang tags — for multi-language sites." Without hreflang, Google may index only the default content and miss the English variant entirely. | Add `<link rel="alternate" hreflang="es" href="https://plynte.com/" />` and `<link rel="alternate" hreflang="en" href="https://plynte.com/?lang=en" />` (or separate URL paths). |
| 3 | MEDIUM | `src/pages/LandingPage/LandingPage.tsx` | 1–48 | No `SEOHead` component used. The primary landing page has no programmatic meta tag management. All SEO metadata comes from static `index.html` defaults. | The SEO skill: "Title tags present and unique." If a user switches language, the title in the browser tab doesn't update because `index.html` only sets it once at load. | Add `<SEOHead />` to `LandingPage.tsx` using translations for dynamic title/description per language. |
| 4 | MEDIUM | `public/sitemap.xml` | 1–9 | Single URL sitemap with hardcoded `lastmod`. No automation to update on deploy. | The SEO skill: "Update sitemap when content changes." A stale sitemap signals search engines that your site is not maintained. | Generate sitemap dynamically at build time using a Vite plugin (`vite-plugin-sitemap`) or a simple build script. |
| 5 | LOW | `src/components/SEOHead.tsx` | 25 | `og:image` is set without `og:image:width` and `og:image:height`. The `index.html` has these (lines 29–30), but `SEOHead` component doesn't propagate them. | Open Graph images render better when dimensions are specified. Missing dimensions can cause layout shifts in social previews. | Add `og:image:width` and `og:image:height` meta tags in `SEOHead.tsx`. |
| 6 | LOW | `index.html` | 12 | `<meta name="keywords">` is present. Google has ignored this tag since 2009. | Not harmful, but dead weight. The SEO skill doesn't even mention keywords tags because they're obsolete. | Remove or leave — low priority. |

### 4. React Best Practices (Vercel)

| # | Severity | File | Line(s) | Issue | Why it matters | Fix |
|---|----------|------|---------|-------|----------------|-----|
| 1 | HIGH | `src/layouts/navbar/navbar.tsx` | 12–17 | Scroll event listener without throttling and without `passive: true`. Every scroll pixel fires `setIsScrolled(window.scrollY > 50)` which triggers a state update and re-render on every frame. | Vercel skill `client-passive-event-listeners`: "Use passive listeners for scroll." The current code: `window.addEventListener("scroll", handleScroll)` — no passive option. On mobile, this blocks the main thread during scroll. | Add `{ passive: true }` as third argument. Also debounce or use `requestAnimationFrame` throttle: only check scroll position at ~60fps. |
| 2 | HIGH | `src/pages/LandingPage/LandingPage.tsx` | 1–7 | All 5 feature sections imported eagerly. Only `NotFoundPage` is lazy. That means EcosystemSection, ArchitectureSection, ContributeSection, MissionSection (all below fold) are bundled into the main chunk. | Vercel skill `bundle-dynamic-imports`: "Use next/dynamic for heavy components." In Vite: use `React.lazy()`. These sections aren't needed until scrolled into view. | Wrap each feature section in `React.lazy()` + `<Suspense>`. Combine with the existing `LazySection` to create true code-split lazy loading. |
| 3 | MEDIUM | `src/features/HeroSection/HeroSection.tsx` | 35–36, 42–43, 51–52, 60–61 | Inline transition objects (`{ delay: 0.3, duration: 0.5 }`) are recreated on every render as new object references. | Vercel skill `rerender-memo-with-default-value`: "Hoist default non-primitive props." Framer Motion's `transition` compares by reference — recreating objects causes unnecessary reconciliation. | Hoist transition configs to module-level constants: `const logoTransition = { duration: 0.6, ease: 'easeOut' }`. |
| 4 | MEDIUM | `src/layouts/navbar/navbar.tsx` | 20–29 | `handleNavClick` is recreated every render. It's passed as `onClick` to every nav item. | Vercel skill `rerender-functional-setstate`: "Use functional setState for stable callbacks." While not state, the callback recreation means every `<a>` gets a new handler reference each render. | Wrap in `useCallback`. |
| 5 | MEDIUM | `src/features/HeroSection/HeroSection.tsx` | 12–16 | `handleCTAClick` is recreated every render. | Same as above — unnecessary function recreation. Especially bad because the `<Button>` component spreads `...rest` which includes `onClick`. | Wrap in `useCallback`. |
| 6 | MEDIUM | `src/components/UI/ParticleField/ParticleField.tsx` | 2–26 | Generates 150 particle elements on every render with `Array.from({ length: count }).map(...)`. No memoization. | Vercel skill `rendering-hoist-jsx`: "Extract static JSX outside components." The particle positions change randomly every render because `Math.random()` runs in the component body. | Wrap particle generation in `useMemo` with `[count]` dependency. Or better: pre-generate the particle data once at module level. |
| 7 | LOW | `src/layouts/MainLayout.tsx` | 7–19 | `MaintainerBanner` defined as nested component inside `MainLayout.tsx`. | Vercel skill `rerender-no-inline-components`: "Don't define components inside components." Causes re-mounting on every MainLayout render. | Extract to separate file. Already noted under accessibility — same fix. |

### 5. Composition Patterns (Vercel)

| # | Severity | File | Line(s) | Issue | Why it matters | Fix |
|---|----------|------|---------|-------|----------------|-----|
| 1 | HIGH | `src/components/UI/GlassCard/GlassCard.tsx` | 7–61 | Four rendering paths based on boolean-like presence of `href` and `motionProps`: (1) both → `<a><motion.div>`, (2) href only → `<a>`, (3) motionProps only → `<motion.div>`, (4) neither → `<div>`. This is the exact `architecture-avoid-boolean-props` antipattern. | "Don't add boolean props to customize behavior; use composition." Each render path carries different semantics, styles, and behavior. Testing all 4 branches is hard. Adding a 5th variant (e.g., `as="button"`) would explode the combinatorial space. | Split into explicit variant components: `GlassCard` (base div), `GlassCardLink` (anchor), `GlassCardMotion` (motion.div), `GlassCardMotionLink` (anchor + motion). Or use the `patterns-explicit-variants` pattern. |
| 2 | MEDIUM | `src/components/UI/Button/Button.tsx` | 5, 13 | `variant: 'primary' | 'secondary' | 'danger'` prop drives CSS class selection with BEM-like `button--${variant}`. | "Don't add boolean props to customize behavior; use composition." While this is the most common React pattern, the skill explicitly calls for compound components or explicit variant components. | Per the skill: create `Button.Primary`, `Button.Secondary`, `Button.Danger` as compound components, or use explicit variant components: `PrimaryButton`, `SecondaryButton`, `DangerButton`. |
| 3 | LOW | `src/components/UI/ProjectBadge/ProjectBadge.tsx` | 5, 10 | `variant?: 'green' | 'blue' | 'purple'` follows the same enum-prop pattern. | Same as Button — enum prop drives CSS variants. Lower priority because ProjectBadge is simpler (no loading state, no children complexity). | If refactoring Button, apply the same pattern here for consistency. Or leave as-is if the API stays simple. |
| 4 | LOW | `src/contexts/LanguageContext.tsx` | 36–50 | `t()` function uses `let current: any` with eslint-disable. The `state-context-interface` pattern from the skill says: "Define generic interface with state, actions, meta." The context does provide state (`language`), actions (`setLanguage`), and meta (`t`), which is good. But the `t()` implementation is weakly typed. | The skill values type-safe context interfaces. `any` defeats the purpose. | Type the translations object properly with a recursive `TranslationValue` type: `string | { [key: string]: TranslationValue }`. Then `t()` can return `string` without `any`. |

### 6. TypeScript Advanced Types

| # | Severity | File | Line(s) | Issue | Why it matters | Fix |
|---|----------|------|---------|-------|----------------|-----|
| 1 | HIGH | `src/data/translations.ts` | 2 | `Record<string, Record<string, unknown>>` — the entire translations object has no type safety. Accessing `translations.es.hero.tagline` would type as `unknown`. | The TypeScript skill says: "Use `unknown` over `any`" but even `unknown` here defeats the purpose. The translations object has a KNOWN, STATIC structure. Strong typing enables autocomplete and catches missing keys at compile time. | Define a proper `Translations` type that mirrors the actual keys: `type Locale = 'es' | 'en'`; `interface TranslationDict { banner: {...}; navbar: {...}; hero: {...}; ... }`. Then `translations: Record<Locale, TranslationDict>`. |
| 2 | HIGH | `src/contexts/LanguageContext.tsx` | 38–39 | `let current: any = translations[language]` with `eslint-disable-next-line @typescript-eslint/no-explicit-any`. The `any` cascade makes the entire `t()` function untyped. | "Over-using `any`: Defeats the purpose of TypeScript." This is the single most impactful type weakness in the codebase — it infects the core internationalization system. | Once translations are properly typed (finding #1 above), `current` becomes `TranslationDict | TranslationValue` and no `any` is needed. |
| 3 | MEDIUM | `src/features/EcosystemSection/EcosystemSection.tsx` | 31–45 | `badgeVariantMap` is typed as `Record<string, 'green' | 'blue' | 'purple'>` but the fallback `badgeVariantMap[label] ?? 'green'` silently returns 'green' for unknown tech labels. | The TypeScript skill: "Not using discriminated unions: Misses type narrowing opportunities." The tech labels are known strings. Adding a new tech without a mapping silently renders a green badge. | Use a `Map` or ensure exhaustiveness by defining all tech labels as a union type: `type TechLabel = 'TypeScript' | 'Canvas' | ...`. Then `Record<TechLabel, BadgeVariant>` catches missing entries at compile time. |
| 4 | LOW | `src/features/EcosystemSection/EcosystemSection.tsx` | 20, 27 | `ease: [0, 0, 0.2, 1] as const` — `as const` preserves the tuple type. Good usage. | This is correct TypeScript. The TypeScript skill would approve of `as const` for literal preservation. | N/A — positive finding. |
| 5 | LOW | `src/types/index.ts` | 13 | `status: 'live' | 'coming-soon'` is a union but not a full discriminated union. Could benefit from an additional `'archived'` or `'deprecated'` status for future projects. | Minor, but the TypeScript skill encourages discriminated unions for exhaustive switch statements. | Add more status variants as needed. Not urgent. |
| 6 | LOW | `src/components/UI/Button/Button.tsx` | 5 | `variant?: 'primary' | 'secondary' | 'danger'` — union type is correct, but `variant` is optional with a default. TypeScript's strict mode would catch invalid variants. | The union type is properly constrained. No `string` fallback. | N/A — good usage. |
| 7 | POSITIVE | `tsconfig.app.json` | 13, 19–23 | `verbatimModuleSyntax: true`, `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `erasableSyntaxOnly: true`. These are all best practices the TypeScript skill endorses. | Excellent strictness configuration. | N/A — keep these enabled. |

### 7. Vite

| # | Severity | File | Line(s) | Issue | Why it matters | Fix |
|---|----------|------|---------|-------|----------------|-----|
| 1 | MEDIUM | `vite.config.ts` | 1–7 | No `resolve.alias` configured. All imports use deep relative paths like `../../components/UI/GlassCard/GlassCard`. | Deep relative imports hurt readability, refactoring safety (moving a file breaks all relative imports), and onboarding. The Vite skill shows `resolve: { alias: { '@': '/src' } }` as the standard pattern. | Add `resolve: { alias: { '@': '/src' } }` to vite.config.ts AND add `"paths": { "@/*": ["./src/*"] }` to tsconfig.app.json `compilerOptions`. Then migrate imports incrementally. |
| 2 | MEDIUM | `vite.config.ts` | 1–7 | No `build` configuration. No chunk splitting, no target, no minification tuning. | Large dependencies like `framer-motion` (~120KB min+gzip) and `react-router-dom` are bundled into a single vendor chunk. The Vite skill references build optimization options. | Add `build: { rollupOptions: { output: { manualChunks: { 'framer-motion': ['framer-motion'], 'react-vendor': ['react', 'react-dom', 'react-router-dom'] } } } }`. |
| 3 | LOW | `vite.config.ts` | 1–7 | No `server` configuration (port, host, proxy). Dev server uses random port. | Minor — works fine but explicit port makes team onboarding consistent. | Add `server: { port: 3000, open: true }`. |
| 4 | LOW | `tsconfig.app.json` | 4 | `target: "ES2020"` — conservative for a modern SPA that only targets modern browsers. | ES2020 lacks `array.at()`, `Object.hasOwn()`, `Error.cause`, and other modern features. | Upgrade to `"ES2022"` to match `tsconfig.node.json`. |
| 5 | LOW | Project root | — | No `.env` or `.env.example` file. The production URL `https://plynte.com` is hardcoded in `index.html`, `SEOHead.tsx`, and `sitemap.xml`. | Environment-variable-driven config is a standard Vite pattern via `import.meta.env`. | Create `.env.example` with `VITE_SITE_URL=https://plynte.com`. Use `import.meta.env.VITE_SITE_URL` in code. |
| 6 | POSITIVE | `vite.config.ts` | 2, 6 | Using `@vitejs/plugin-react-swc` — the faster SWC-based React plugin. Good choice. | The Vite skill endorses SWC for performance. | N/A — keep it. |

### 8. Frontend Design

| # | Severity | File | Line(s) | Issue | Why it matters | Fix |
|---|----------|------|---------|-------|----------------|-----|
| 1 | HIGH | `src/styles/design-tokens.css` | 33 | `--font-body: 'Inter', sans-serif` — Inter is explicitly called out in the skill as an "overused font family" and "generic AI-generated aesthetics." | "NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts)." Inter is the #1 most common AI-chosen font. The skill demands distinctive, unexpected choices. | Replace Inter with a distinctive body font that pairs well with Anton. Consider: 'DM Sans' (geometric, warm), 'Sora' (technical, clean), 'Geist' (Vercel's font, modern), or 'Manrope' (geometric, versatile). |
| 2 | MEDIUM | `src/components/UI/LinkButton/LinkButton.css` | 24–38 | RGB rainbow animated border on hover (`linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #33ff00, #00ffff, #3300ff, #ff00ff, #ff0000)`) — a 6-second color cycle animation. | The skill: "Commit to a cohesive aesthetic." The rainbow effect clashes violently with the otherwise restrained green-on-black palette. It reads as a 2015 gaming peripheral, not a professional software laboratory. | Replace with a green glow animation consistent with `--brand-green-glow`. Or use a subtle gradient border that aligns with the brand palette: `linear-gradient(90deg, var(--brand-green), var(--color-brand-blue))`. |
| 3 | MEDIUM | `src/components/UI/LinkButton/LinkButton.css` | 53 | `transform: ease-in-out 0.3s` — invalid CSS value. `transform` expects a transform function, not an easing value. This doesn't work. | Broken CSS that silently fails. The button actually uses the `:hover` transform at line 47 for `scale(1.05)`, but the invalid rule is dead code that suggests incomplete implementation. | Remove line 53 entirely, or fix to `transition: transform 0.3s ease-in-out`. |
| 4 | LOW | `src/components/UI/LinkButton/LinkButton.css` | 57 | `.button--floating:hover` sets `background-color: #ffa527` instead of `#ffa927` — essentially identical colors (one character off). | Inadvertent typo creates visual inconsistency. The hover state is imperceptibly different from the default. | Fix the hover color or remove the hover rule if unintentional. |
| 5 | LOW | App-wide | — | No grain/noise texture overlay. The skill recommends "grain overlays" and "noise textures" for atmosphere. The dark background is clean but flat. | The skill values "Backgrounds & Visual Details: Create atmosphere and depth rather than defaulting to solid colors." The particle field only covers the hero section. | Consider adding a subtle SVG noise filter (`feTurbulence`) as a full-page overlay with `mix-blend-mode: overlay` and `opacity: 0.03` for texture. |
| 6 | POSITIVE | `src/styles/design-tokens.css` | 32 | `--font-display: 'Anton', sans-serif` — Anton is a distinctive display font. Not Space Grotesk, not Inter Display. | The skill explicitly warns against converging on common choices like "Space Grotesk." Anton is a strong, characterful choice appropriate for a tech lab brand. | N/A — good choice. |
| 7 | POSITIVE | App-wide | — | Green-on-black palette with green (#6FF073) as the sole accent color. Consistent, committed, not timid. | The skill: "Dominant colors with sharp accents outperform timid, evenly-distributed palettes." This project commits to ONE accent color and executes it well. | N/A — good execution. |
| 8 | POSITIVE | `src/features/HeroSection/HeroSection.css` | 28–36 | Logo image uses `user-select: none`, `-webkit-user-drag: none`, `pointer-events: none` — prevents selection/dragging of the brand logo. | Attention to detail in preventing unintended interactions with brand assets. | N/A — good detail. |

---

## Prioritized Action List

Ordered by severity × impact. Each item is a self-contained task.

### 🔴 Critical

| # | Action | Skill Lens | Files |
|---|--------|------------|-------|
| C1 | Add skip-to-content link as first focusable element | Accessibility | `index.html` or `MainLayout.tsx` |
| C2 | Add `prefers-reduced-motion` media query; use `useReducedMotion()` in Framer Motion components | Accessibility | `App.css`, all feature `.tsx` using `motion` |

### 🟠 High

| # | Action | Skill Lens | Files |
|---|--------|------------|-------|
| H1 | Consolidate CSS tokens: merge `colors.css`, `design-tokens.css`, remove `variables.css`. Single source of truth. | Portfolio UI/UX | `src/styles/*.css` |
| H2 | Replace hardcoded `background: #000000` with `var(--color-dark-bg)` in 3 feature CSS files | Portfolio UI/UX | `HeroSection.css:4`, `ArchitectureSection.css:3`, `MissionSection.css:3` |
| H3 | Add `:focus-visible` styles to navbar links and Button component | Accessibility | `navbar.css`, `Button.css` |
| H4 | Add `aria-label` to maintainer banner link indicating new-tab behavior | Accessibility | `MainLayout.tsx:10–18` |
| H5 | Scroll listener: add `{ passive: true }` and requestAnimationFrame throttle | React Best Practices | `navbar.tsx:16` |
| H6 | Code-split feature sections with `React.lazy()` + `<Suspense>` | React Best Practices | `LandingPage.tsx`, create new lazy wrappers |
| H7 | Refactor GlassCard: split into explicit variant components (`GlassCard`, `GlassCardLink`, `GlassCardMotion`, `GlassCardMotionLink`) | Composition Patterns | `GlassCard.tsx`, all consumers |
| H8 | Type the `translations` object with proper structure instead of `Record<string, Record<string, unknown>>` | TypeScript | `translations.ts` |
| H9 | Remove `any` from `t()` function; use proper typed recursive lookup | TypeScript | `LanguageContext.tsx:36–50` |
| H10 | Add `resolve.alias` (`@/` → `src/`) to vite.config.ts and tsconfig paths | Vite | `vite.config.ts`, `tsconfig.app.json` |
| H11 | Replace Inter font with a distinctive body font | Frontend Design | `design-tokens.css:33`, `index.html` (Google Fonts link) |
| H12 | Reconsider bilingual SEO: add hreflang tags | SEO | `index.html` |

### 🟡 Medium

| # | Action | Skill Lens | Files |
|---|--------|------------|-------|
| M1 | Add `SEOHead` to `LandingPage.tsx` for dynamic per-language meta tags | SEO + Portfolio UI | `LandingPage.tsx` |
| M2 | Wrap `LandingPage` + pages in `<header>`, `<footer>` landmarks (MainLayout) | Portfolio UI/UX + Accessibility | `MainLayout.tsx` |
| M3 | Remove redundant `onKeyDown` handler from LanguageSwitcher (button handles it natively) | Accessibility | `LanguageSwitcher.tsx:13–18` |
| M4 | Add `aria-hidden="true"` to individual particle divs | Accessibility | `ParticleField.tsx:11` |
| M5 | Add `aria-label="Main navigation"` to `<nav>` | Accessibility | `navbar.tsx:32` |
| M6 | Extract `MaintainerBanner` to separate file (fix inline component definition) | Accessibility + React Best Practices | `MainLayout.tsx` → new file |
| M7 | Hoist Framer Motion transition objects to module-level constants | React Best Practices | `HeroSection.tsx` |
| M8 | Wrap `handleNavClick` and `handleCTAClick` in `useCallback` | React Best Practices | `navbar.tsx`, `HeroSection.tsx` |
| M9 | Memoize particle generation with `useMemo` | React Best Practices | `ParticleField.tsx` |
| M10 | Add `build.rollupOptions.manualChunks` for vendor splitting (framer-motion, react-vendor) | Vite | `vite.config.ts` |
| M11 | Remove rainbow RGB animation from LinkButton; replace with brand-consistent green glow | Frontend Design | `LinkButton.css:24–38` |
| M12 | Fix invalid `transform: ease-in-out 0.3s` in LinkButton.css | Frontend Design | `LinkButton.css:53` |
| M13 | Make `badgeVariantMap` exhaustive with `TechLabel` union type | TypeScript | `EcosystemSection.tsx:31–41` |
| M14 | Add `og:image:width` + `og:image:height` to `SEOHead.tsx` | SEO | `SEOHead.tsx:25` |
| M15 | Generate sitemap at build time (dynamically, not hardcoded) | SEO | `public/sitemap.xml` → Vite plugin |

### 🟢 Low

| # | Action | Skill Lens | Files |
|---|--------|------------|-------|
| L1 | Vary section heading sizes/visual weight to avoid repetitive hero patterns | Portfolio UI/UX | All feature CSS files |
| L2 | Add contact section/link for contributor outreach | Portfolio UI/UX | New feature or LinkButton component |
| L3 | Set default `<title>` in `index.html` to Spanish to match `lang="es"` | SEO | `index.html:7` |
| L4 | Create `.env.example` with `VITE_SITE_URL`; use `import.meta.env` in code | Vite | New file + `index.html`, `SEOHead.tsx` |
| L5 | Upgrade `tsconfig.app.json` target from `ES2020` to `ES2022` | Vite | `tsconfig.app.json:4` |
| L6 | Fix `--floating` hover color typo (`#ffa527` → `#ffa927`) | Frontend Design | `Button.css:57` |
| L7 | Add subtle grain/noise texture overlay for atmosphere | Frontend Design | `App.css` (global) |
| L8 | Remove `<meta name="keywords">` from `index.html` (dead tag) | SEO | `index.html:12` |

---

## Positive Findings (What's Working Well)

1. **Strict TypeScript config**: `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `verbatimModuleSyntax` — excellent discipline.
2. **JSON-LD Structured Data**: Impressive `@graph` with Organization, WebSite, and 3 SoftwareApplication entities. This is above-average SEO hygiene.
3. **Green-on-black accent commitment**: Single dominant accent color executed consistently. The skill explicitly endorses this.
4. **Anton display font**: Distinctive choice, avoids the Space Grotesk trap.
5. **SWC React plugin**: Fast build tooling choice.
6. **LazySection with IntersectionObserver**: Already have the foundation for code splitting — just needs `React.lazy()` wrapped around imports.
7. **SEOHead component exists and works**: Just needs to be used on all routes.
8. **`robots.txt` and `sitemap.xml` present**: Basic SEO crawlability is handled.
9. **`ScrollToTop` component**: Proper route-change scroll behavior.
10. **No `as any` cast in DetailsPage** (this project doesn't have that page; `generateSlug` is properly in `utils/slug.ts`).

---

## Skill Resolution Details

All 8 skills were successfully loaded. Key references applied:

- **Portfolio UI/UX**: IA mandatory structure, CSS token consistency rule, visual direction (strong contrast, restrained orange accent → adapted to green for this project), component model, known issues checklist.
- **Accessibility**: WCAG 2.2 POUR principles, skip link pattern, `prefers-reduced-motion` rule, focus-visible mandate, landmark rules, target size (24×24), keyboard accessibility.
- **SEO**: Title/meta unique per route, canonical URLs, structured data validation, hreflang tags, sitemap best practices, heading hierarchy.
- **React Best Practices**: Bundle size rules (`bundle-dynamic-imports`), re-render rules (`rerender-no-inline-components`, `rerender-memo-with-default-value`), client performance (`client-passive-event-listeners`).
- **Composition Patterns**: `architecture-avoid-boolean-props`, `state-context-interface`, `patterns-explicit-variants`, `react19-no-forwardref`.
- **TypeScript Advanced Types**: Generics, discriminated unions, avoiding `any`, `as const` usage, type inference.
- **Vite**: Configuration basics, `resolve.alias`, `build.rollupOptions.manualChunks`, environment variables, SWC plugin.
- **Frontend Design**: Font distinctiveness, color commitment, avoiding generic AI aesthetics, atmosphere/texture, intentionality over intensity.
