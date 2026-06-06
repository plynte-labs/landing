# Proposal: SEO Enhancement

## Intent

The landing page has three SEO gaps that prevent search engines from fully indexing the bilingual (ES/EN) content. The static `index.html` declares `lang="es"` but uses English in all meta tags, creating a language mismatch. No hreflang tags exist, so search engines index only one language variant. The LandingPage has no dynamic `SEOHead`, so browser tab titles never update when the user switches language. The `SEOHead` component is also missing `og:image:width` and `og:image:height`, which the static HTML already provides.

## Scope

### In Scope
- Add `<link rel="alternate" hreflang="es">` and `<link rel="alternate" hreflang="en">` tags to `index.html`
- Import and render `<SEOHead />` in `LandingPage.tsx` for dynamic per-language title/description updates
- Add `<meta property="og:image:width" content="1200" />` and `og:image:height` to `SEOHead.tsx`
- Change default `<title>` in `index.html` to Spanish to match `lang="es"`

### Out of Scope
- URL-based language routing (e.g. `/es/`, `/en/` paths) — this change uses existing JS-based language toggle
- Build-time sitemap generation (M15 in explore)
- Removing `<meta name="keywords">` tag (L8)
- Adding `og:locale:alternate` tags (future enhancement)

## Capabilities

### New Capabilities
- `seo-bilingual`: hreflang tags in `index.html` declaring ES and EN alternate URLs, plus `og:image:width` and `og:image:height` in `SEOHead.tsx`

### Modified Capabilities
- `landing-page`: `LandingPage.tsx` MUST render `<SEOHead />` inside the `LanguageProvider` context so title and description update dynamically per language

## Approach

Four targeted edits. No new dependencies. The existing `react-helmet-async` and `LanguageContext` already provide all plumbing needed.

1. **`index.html`**: Add two `<link rel="alternate" hreflang="...">` tags in `<head>`, one `es` self-reference and one `en` via `?lang=en`. Change `<title>` to Spanish default: "Plynte Labs — Laboratorio de Software Open-Source". Update matching `og:title`, `twitter:title` and `og:locale` to `es_MX`.

2. **`LandingPage.tsx`**: Import `SEOHead` and render it as the first child of the `.landing` wrapper. The component reads `t("seo.title")` and `t("seo.description")` from context, which already exist in `translations.ts` for both locales.

3. **`SEOHead.tsx`**: Add two `<meta property="og:image:width">` and `<meta property="og:image:height">` lines after the existing `og:image` tag. Use `content="1200"` and `content="630"` to match `index.html`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | Add hreflang links, change title/OG/Twitter defaults to Spanish |
| `src/pages/LandingPage/LandingPage.tsx` | Modified | Add `<SEOHead />` import and render |
| `src/components/SEOHead.tsx` | Modified | Add `og:image:width` + `og:image:height` meta tags |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| SEOHead with default props overrides static index.html meta before crawlers parse them | Low | `react-helmet-async` injects client-side; bots reading raw HTML still get static defaults. This is standard SPA SEO behavior. |
| `?lang=en` hreflang URL format not canonical across all search engines | Low | Google and Bing both accept query-param hreflang. Can migrate to path-based later (out of scope). |

## Rollback Plan

Revert the three modified files from git. No database, no migrations, no state.

## Dependencies

None. All required infrastructure (`react-helmet-async`, `LanguageContext`, `t()` function) already exists.

## Success Criteria

- [ ] `index.html` `<head>` contains `<link rel="alternate" hreflang="es">` and `<link rel="alternate" hreflang="en">`
- [ ] `index.html` default `<title>` is in Spanish ("Plynte Labs — Laboratorio de Software Open-Source")
- [ ] `LandingPage.tsx` renders `<SEOHead />` that updates `<title>` dynamically when language toggles
- [ ] `SEOHead.tsx` outputs `<meta property="og:image:width">` and `<meta property="og:image:height">`
- [ ] `tsc -b` passes with zero errors (no type regressions)
