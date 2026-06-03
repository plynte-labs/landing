# Proposal: Plynte Labs Org Landing

## Intent

Transform a personal portfolio SPA into the Plynte Labs open-source organization landing page. Replace 5 personal pages (~5000 lines) with a single bilingual landing page (~900 lines) showcasing org projects, architecture pillars, contribution guide, and mission.

## Scope

### In Scope

- Single landing page with 5 sections: Hero, Ecosystem, Architecture, Contribute, Mission
- Glassmorphism UI (GlassCard component reusing existing design tokens)
- Bilingual i18n (ES/EN) with renamed localStorage key (`portfolio_lang` → `plynte_lang`)
- Simplified single-route SPA (keep BrowserRouter for future extensibility)
- Updated SEO/OG metadata and JSON-LD for Plynte Labs org identity
- Removal of all personal content: pages, features, data, assets, documentation

### Out of Scope

- Personal portfolio content, multi-page routing, contact form, EmailJS
- Vercel deployment setup or DNS configuration
- Test framework addition
- CSS token deduplication (known issue, deferred)
- UI redesign beyond org rebranding

## Capabilities

### New Capabilities

- `landing-page`: Single scrollable page aggregating all landing sections
- `hero-section`: Org hero with logo, tagline, ParticleField background, primary CTA
- `ecosystem-section`: Project grid (Brick.draw, LiveAudio, VoiceAI) with GlassCards and GitHub links
- `architecture-section`: Technical pillars (Local-First, MIT License, CI/CD, Hardware Acceleration) as icon cards
- `contribute-section`: Contribution guide with Discord/GitHub community links
- `mission-section`: Organization mission statement and maintainer info
- `glass-card`: Reusable glassmorphic card with backdrop-filter and hover glow
- `project-badge`: Tech stack badge component extending SkillBadge pattern
- `i18n-org-copy`: Bilingual translation content for all landing sections

### Modified Capabilities

None — no existing formal specs in the codebase.

## Approach

**Create → Modify → Delete → Verify** sequence.

1. **Create** new files (LandingPage, 5 sections, 2 UI components) — zero dependencies on deleted code
2. **Modify** shared infrastructure (router, navbar, SEOHead, MainLayout, index.html, `package.json`)
3. **Delete** personal code after build passes
4. **Verify** with `pnpm build` and `pnpm lint`

No new dependencies. Existing stack: React 19, Vite, TypeScript, React Router 6, framer-motion, react-helmet-async.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/LandingPage/` | New | Single landing page (2 files, ~60 lines) |
| `src/features/{5 sections}/` | New | Hero, Ecosystem, Architecture, Contribute, Mission (10 files, ~500 lines) |
| `src/components/UI/{GlassCard,ProjectBadge}/` | New | Reusable glassmorphic card + tech badge (4 files, ~150 lines) |
| `src/pages/{5 personal pages}/` | Deleted | Home, About, Portfolio, Details, NotFound (~15 files, ~1200 lines) |
| `src/features/{8 personal sections}/` | Deleted | Personal hero, about, story, philosophy, LLM insights, etc. (~16 files, ~1800 lines) |
| `src/components/{Contacto,Portfolio}/` | Deleted | EmailJS contact form + project details panel (~4 files, ~500 lines) |
| `src/data/{cvData,projectTranslations}.ts` | Deleted | Personal CV + project descriptions (2 files, ~395 lines) |
| `public/pictures/{personal}/` | Deleted | Personal photos and project images (~100+ files) |
| `src/routes/AppRouter.tsx` | Modified | 5 routes → single landing route + 404 wildcard (~15 lines) |
| `src/layouts/navbar/` | Modified | Simplified org nav, no submenus; remove/simplify MegaMenu (~30 lines) |
| `src/layouts/MainLayout.tsx` | Modified | Org navbar + fix nested `<main>` landmark (~10 lines) |
| `index.html` | Modified | Org title, description, OG/twitter tags, JSON-LD (~30 lines) |
| `src/components/SEOHead.tsx` | Modified | Org title suffix + OG image path (~10 lines) |
| `src/contexts/LanguageContext.tsx` | Modified | localStorage key rename (~1 line) |
| `src/data/translations.ts` | Modified | Full content replacement: personal → org copy (~315 lines) |
| `src/styles/colors.css` | Modified | Org brand colors (~5 lines) |
| `src/types/index.ts` | Modified | Org-specific types: Project, Pillar, NavItem (~20 lines) |
| `package.json` | Modified | Rename, update description, remove `@emailjs/browser` (~5 lines) |

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| OG image references deleted before update | **High** | Update SEOHead + index.html OG paths BEFORE deleting `public/pictures/` |
| Translation key mismatch breaks rendered UI | Medium | Preserve navbar key structure; landing keys isolated to new sections |
| CSS cascade break from deleting component styles | Medium | Audit imports before deletion; dead CSS rules in kept files are harmless |
| Nested `<main>` landmark persists | Low | Fix during MainLayout modification |
| EmailJS import left after dependency removal | Low | Grep for `@emailjs` before removing from `package.json` |
| Vercel Analytics needs reconfiguration after rename | Low | Verify post-deploy; keep dependencies |
| Single-page scroll (ScrollToTop only fires on route change) | Low | Use `scrollIntoView` or anchor-based section navigation |
| React Router v6 types mismatch | None | Verified: no `@types/react-router-dom` in devDependencies |

## Rollback Plan

`git revert` the transformation commit. The fork point is clean — all old files intact in parent commit. For emergency: redeploy last pre-transformation commit via Vercel dashboard.

## Dependencies

None. Standalone transformation with no external prerequisites.

## Success Criteria

- [ ] `pnpm build` passes with zero errors
- [ ] `pnpm lint` passes with zero errors
- [ ] All 5 landing sections render without runtime errors
- [ ] Bilingual toggle (ES/EN) works for all landing content
- [ ] Glassmorphism cards display correctly (backdrop-filter, hover glow)
- [ ] SEO metadata renders correct org title, description, OG tags
- [ ] Navigation links scroll to correct sections
- [ ] No personal content remains in rendered output

## Review Load Forecast

| Metric | Value |
|--------|-------|
| Lines added | ~900 |
| Lines deleted | ~5000 |
| Lines modified | ~100 |
| Effective review | ~1000 lines |
| 400-line budget | **Exceeded** |
| Chained PR recommended | Yes |

Deletions don't burden review, but ~900 lines of new feature code exceeds the 400-line budget. Recommend 3 chained PRs: (1) Components + data, (2) Features + landing page, (3) Infrastructure modifications + deletions.
