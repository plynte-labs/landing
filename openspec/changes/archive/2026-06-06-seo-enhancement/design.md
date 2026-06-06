# Design: SEO Enhancement

## Technical Approach

Four-target edit: static HTML gains Spanish defaults + hreflang tags, `SEOHead` gains Open Graph image dimensions, `LandingPage` renders `SEOHead` for dynamic language-aware titles, and ES translations gain Spanish seo text. No new dependencies — `react-helmet-async` and `LanguageContext` provide all plumbing.

## Architecture Decisions

| Decision | Option | Tradeoff | Choice |
|----------|--------|----------|--------|
| Hreflang URL format | Query params (`?lang=en`) | No routing changes; less canonical than path-based URLs | Query params — path routing out of scope |
| SEOHead render position | First child of `.landing` wrapper | Ensures Helmet injects before section content | First child of `.landing` |
| Spanish seo translations | Update `translations.ts` ES entries | 2 new strings; discovered gap — both locales had identical English text | Update ES entries (required for dynamic language toggle) |
| og:image dimensions | Hardcoded `1200` × `630` in SEOHead | Decouples from static HTML if image ever changes | Hardcoded constants matching `index.html` |

## Discovery: translations.ts Gap

Both `es` and `en` locales in `translations.ts` store identical English `seo.title` and `seo.description` values. The ES entry needs Spanish text so that `SEOHead`'s `t("seo.title")` returns Spanish when language is toggled. This file is implicitly affected even though the proposal's "Affected Areas" table doesn't list it.

## Data Flow

```
index.html (static crawl / no JS)
  └── <title> Spanish default
  └── <link rel="alternate" hreflang="es|en">

Client mount (JS crawl)
  └── HelmetProvider
        └── LandingPage
              └── SEOHead (reads LanguageContext via t())
                    ├── t("seo.title") → <title> (ES or EN)
                    ├── t("seo.description") → og:description, meta description
                    ├── og:image + width/height
                    └── canonical + html lang
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modify | Add `hreflang` links (es self-ref, en via `?lang=en`); change `<title>` to "Plynte Labs — Laboratorio de Software Open-Source"; update `og:title` and `twitter:title` to Spanish |
| `src/components/SEOHead.tsx` | Modify | Add `<meta property="og:image:width" content="1200" />` and `og:image:height` after `og:image` |
| `src/pages/LandingPage/LandingPage.tsx` | Modify | Import `SEOHead` and render as first child of `.landing` div (no props — defaults from `t()`) |
| `src/data/translations.ts` | Modify | Update ES locale `seo.title` and `seo.description` to Spanish text |

## Interfaces / Contracts

No new types or contracts. `SEOProps` interface unchanged. `SEOHead` rendered without explicit props on landing page — relies on `t()` defaults from `LanguageContext`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Static | hreflang tags present in `index.html` | Manual inspection via browser DevTools / Lighthouse |
| Static | Spanish default `<title>` | Manual inspection |
| Component | SEOHead outputs `og:image:width` and `og:image:height` | Unit test: mount with `HelmetProvider`, assert meta tags |
| Integration | LandingPage includes SEOHead; title changes on language toggle | Manual: toggle language, inspect `<head>` |
| Build | No type regressions | `tsc -b` passes |

## Migration / Rollout

No migration required. Instant rollback via `git revert` of the four modified files.

## Open Questions

- [ ] What is the official Spanish `seo.description` text? Proposal defines the ES title but not the ES description — content owner should provide it, or a direct translation of the English description can be used as initial value.
- [ ] SEOHead title format `{displayTitle} | Plynte Labs` produces redundancy since `seo.title` already contains "Plynte Labs". Not in scope for this change, but worth flagging.
