# Tasks: SEO Enhancement

## Review Workload Forecast

- **400-line budget risk**: Low (~30 lines changed across 4 files)
- **Chained PRs recommended**: No
- **Decision needed before apply**: No

## Task List

### Phase 1: Static HTML SEO

- [x] 1.1 (H12) Add hreflang tags to `index.html` `<head>`: self-referencing ES + alternate EN
- [x] 1.2 (L3) Change default `<title>`, `<meta description>`, OG title/description, and Twitter title/description to Spanish in `index.html`

### Phase 2: Component SEO

- [x] 2.1 (M14) Add `og:image:width` (1200) + `og:image:height` (630) to `SEOHead.tsx`
- [x] 2.2 (M1) Add `<SEOHead />` to `LandingPage.tsx` using `t()` for dynamic title/description

### Phase 3: Translation Data

- [x] 3.1 Update `translations.ts` ES `seo.title` and `seo.description` to Spanish text
