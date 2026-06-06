# build-tooling Specification

## Purpose

Build-time configuration and optimization for the Vite-based landing page. Covers import path aliases, vendor chunk splitting, and build-time sitemap generation.

## Requirements

### Requirement: Path Alias Resolution

The build system MUST resolve `@/` as the project `src/` directory in both TypeScript and Vite.

#### Scenario: Alias resolves in TypeScript

- GIVEN `tsconfig.app.json` includes `"paths": { "@/*": ["./src/*"] }`
- WHEN `tsc -b` type-checks a file with `import X from "@/components/X"`
- THEN TypeScript resolves the import to `src/components/X` without errors

#### Scenario: Alias resolves in Vite build

- GIVEN `vite.config.ts` includes `resolve.alias: { "@": "/src" }`
- WHEN `vite build` bundles a file with `import X from "@/components/X"`
- THEN Vite resolves the import to `src/components/X`
- AND the built output is identical to using a relative import

#### Scenario: Relative imports continue working

- GIVEN path aliases are configured
- WHEN a file uses a relative import (`../../components/X`)
- THEN `tsc` and `vite build` resolve it correctly
- AND no existing import migration is required

### Requirement: Vendor Chunk Splitting

The build system MUST split vendor dependencies into separately cacheable chunks: `framer-motion` (framer-motion) and `react-vendor` (react, react-dom, react-router-dom).

#### Scenario: Separate vendor chunks produced

- GIVEN `build.rollupOptions.output.manualChunks` is configured
- WHEN `vite build` completes
- THEN `dist/assets/framer-motion.[hash].js` exists
- AND `dist/assets/react-vendor.[hash].js` exists
- AND neither vendor code appears in the main application chunk

#### Scenario: Vendor chunks cache across deploys

- GIVEN the framer-motion version is unchanged between deploys
- WHEN `vite build` runs on a subsequent deploy
- THEN `framer-motion.[hash].js` produces the same content hash
- AND the browser reuses the cached chunk without re-downloading

#### Scenario: Unknown vendor not bundled incorrectly

- GIVEN a new dependency is added that is not in manualChunks
- WHEN `vite build` runs
- THEN the unknown dependency lands in the default vendor chunk
- AND the build does not fail or produce broken chunks

### Requirement: Build-Time Sitemap Generation

The build system MUST generate `sitemap.xml` at build time via `vite-plugin-sitemap`, replacing the static `public/sitemap.xml`. The plugin SHALL use hostname `https://plynte.com`.

#### Scenario: Sitemap generated on build

- GIVEN `vite-plugin-sitemap` is installed and added to the Vite plugins array
- WHEN `vite build` completes
- THEN `dist/sitemap.xml` exists
- AND contains `<url><loc>https://plynte.com/</loc>` with `lastmod`, `changefreq`, and `priority` fields

#### Scenario: Static sitemap removed

- GIVEN the sitemap plugin is active in the build pipeline
- WHEN `public/sitemap.xml` is deleted from the repository
- THEN `vite build` succeeds
- AND `dist/sitemap.xml` is generated exclusively by the plugin

#### Scenario: Build fails without sitemap plugin

- GIVEN `vite-plugin-sitemap` is temporarily uninstalled
- WHEN `vite build` runs
- THEN the build fails with a clear plugin-not-found error
- AND the error message references `vite-plugin-sitemap`
