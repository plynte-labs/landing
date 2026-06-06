# Proposal: Vite Build Optimization

## Intent

The Vite build configuration is bare-minimum — no path aliases, no vendor chunk splitting, and a hardcoded sitemap. Deep relative imports (`../../components/...`) hurt readability and refactoring safety. All vendor dependencies bundle into a single chunk, missing cache-splitting opportunities. The static `sitemap.xml` is stale the moment content changes. These three fixes modernize the build pipeline with minimal risk.

## Scope

### In Scope
- `resolve.alias` (`@/` → `src/`) in vite.config.ts and tsconfig paths
- `build.rollupOptions.manualChunks` splitting framer-motion and react-vendor
- Build-time sitemap generation replacing `public/sitemap.xml`

### Out of Scope
- Full import migration from relative to `@/` paths (deferred)
- Vite dev server config (port, host)
- ES2020 → ES2022 target upgrade
- `.env.example` for environment variables
- Code splitting via `React.lazy()` (already covered by `performance` spec)

## Capabilities

### New Capabilities
- `vite-path-aliases`: Configure `@/` → `src/` alias in Vite and TypeScript.
- `build-time-sitemap`: Replace static `public/sitemap.xml` with build-time generation via `vite-plugin-sitemap`.

### Modified Capabilities
- `performance`: Add vendor manual chunk splitting (`framer-motion`, `react-vendor`) as a new bundle optimization requirement.

## Approach

**H10 — Path aliases**: Add `resolve.alias: { '@': '/src' }` to `vite.config.ts`. Add `"paths": { "@/*": ["./src/*"] }` to `tsconfig.app.json`. Both configs stay synchronized. No import migration in this change — aliases are infrastructure-only and additive (relative imports still resolve).

**M10 — Vendor splitting**: Add `build.rollupOptions.output.manualChunks` with two named chunks: `framer-motion` (framer-motion) and `react-vendor` (react, react-dom, react-router-dom). Enables browser caching of vendor code across deploys and parallel chunk download.

**M15 — Build-time sitemap**: Remove `public/sitemap.xml`. Install `vite-plugin-sitemap` as devDependency. Add plugin with config: hostname `https://plynte.com`, dynamic lastmod, weekly changefreq, priority 1.0. Generated sitemap outputs to `dist/sitemap.xml` on build.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `vite.config.ts` | Modified | Add resolve.alias, build.rollupOptions, sitemap plugin |
| `tsconfig.app.json` | Modified | Add paths mapping for `@/*` |
| `public/sitemap.xml` | Removed | Replaced by build-time generation |
| `package.json` | Modified | Add `vite-plugin-sitemap` devDependency |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Path alias breaks existing imports during migration | Low | Aliases additive — relative imports still resolve. No migration in this change. |
| manualChunks causes chunk loading failures | Low | Follows Vite documented pattern. Verify with `vite build && vite preview`. |
| vite-plugin-sitemap version compatibility with Vite 6.3 | Low | Lock compatible semver. Verify sitemap output at `dist/sitemap.xml`. |

## Rollback Plan

Revert all three config changes atomically via `git revert`. No runtime code modified — only build configuration. `public/sitemap.xml` restorable from git history.

## Dependencies

None. All changes are self-contained build configuration.

## Success Criteria

- [ ] `import` using `@/components/...` resolves in IDE and `vite build`
- [ ] `vite build` produces separate `framer-motion.[hash].js` and `react-vendor.[hash].js` chunks
- [ ] `vite build` generates `dist/sitemap.xml` with correct URL, lastmod, changefreq, priority
- [ ] `vite build && vite preview` serves the site without errors
- [ ] `tsc -b` passes with path aliases configured
