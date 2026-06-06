# Tasks: Vite Build Optimization

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 20-30 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | All three optimizations | Single PR | 4 files, ~25 lines, no runtime changes, tests included |

## Phase 1: Foundation

- [ ] 1.1 Add `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }` to `tsconfig.app.json`
- [ ] 1.2 Add `resolve: { alias: { '@': '/src' } }` to `vite.config.ts`
- [ ] 1.3 Install `vite-plugin-sitemap@^0.8.2` as devDependency in `package.json`

## Phase 2: Core Implementation

- [ ] 2.1 Add `build.rollupOptions.output.manualChunks` with `framer-motion` and `react-vendor` chunks to `vite.config.ts`
- [ ] 2.2 Add `Sitemap({ hostname: 'https://plynte.com', dynamicRoutes: ['/'], changefreq: 'weekly', priority: 1.0 })` plugin to `vite.config.ts`
- [ ] 2.3 Delete `public/sitemap.xml` (replaced by build-time generation)

## Phase 3: Verification

- [ ] 3.1 Run `vite build` — verify exit code 0 and chunk files: `dist/assets/framer-motion.*.js`, `dist/assets/react-vendor.*.js` (spec: "Separate vendor chunks produced")
- [ ] 3.2 Verify `dist/sitemap.xml` contains `<loc>https://plynte.com/</loc>` with lastmod, changefreq, priority (spec: "Sitemap generated on build")
- [ ] 3.3 Run `tsc -b` — verify zero errors with path aliases (spec: "Alias resolves in TypeScript")
- [ ] 3.4 Run `vite preview` — smoke test site renders without console errors (spec: "Relative imports continue working")
- [ ] 3.5 Fix spec scenario title: "Build succeeds without sitemap plugin" → "Build fails without sitemap plugin" (design open question)
