# Design: Vite Build Optimization

## Technical Approach

Three independent build-config changes with no runtime code modification. Path aliases (`@/` → `src/`) synchronize Vite and TypeScript resolution. Manual chunk splitting via Rollup `manualChunks` isolates `framer-motion` and `react-vendor` for cache-friendly deploys. A `vite-plugin-sitemap` plugin scans the output directory at build time to generate `dist/sitemap.xml`, replacing the static `public/sitemap.xml`. All changes stay within `vite.config.ts`, `tsconfig.app.json`, and `package.json`.

## Architecture Decisions

### Decision: Sitemap Generation Plugin vs Custom Script

| Option | Tradeoff | Chosen |
|--------|----------|--------|
| `vite-plugin-sitemap` v0.8.2 | External dep (37 transitive), generates robots.txt, MPA-first but supports `dynamicRoutes` for SPA | ✅ (spec-mandated) |
| Custom Vite `closeBundle` plugin | Zero deps, 10 LOC, fully transparent, no robots.txt generation | Alternative noted |

**Rationale**: The spec requires `vite-plugin-sitemap`. For a single route SPA (`/`), pass `dynamicRoutes: ['/']` to ensure the route is emitted. The plugin also auto-generates `robots.txt`, which adds SEO value at zero extra cost. If the dependency ever becomes a maintenance burden, replacing it with a custom plugin is trivial.

### Decision: react-router-dom in react-vendor

| Option | Tradeoff | Chosen |
|--------|----------|--------|
| Include `react-router-dom` in `react-vendor` chunk | A router update invalidates the React cache layer | ✅ |
| Separate `router-vendor` chunk | More granular caching but extra HTTP round-trip for small lib | Not chosen |

**Rationale**: `react-router-dom` is tightly coupled to React and small (~15 KB gzipped). Splitting it into a third chunk adds a round-trip for marginal cache gain. Keeping it in `react-vendor` aligns with the proposal scope.

### Decision: Path Alias `@/` via `resolve.alias` + `paths`

| Option | Tradeoff | Chosen |
|--------|----------|--------|
| Vite `resolve.alias` + TS `paths` | Standard, additive, no import migration required | ✅ |
| Vite `resolve.alias` only | TS errors on `@/` imports in IDE | Not viable |

**Rationale**: Vite handles runtime resolution; TypeScript needs `paths` for editor intellisense and type-checking. Both configs must stay synchronized.

## Data Flow

```
vite build
├── [resolve.alias]  @/  ──→  src/                (rewrites import paths)
├── [manualChunks]
│   ├── framer-motion    ──→  framer-motion.[hash].js
│   ├── react-vendor     ──→  react-vendor.[hash].js   (react, react-dom, react-router-dom)
│   └── rest             ──→  vendor.[hash].js          (all other node_modules)
├── [vite-plugin-sitemap]
│   ├── scans dist/**/*.html
│   ├── applies dynamicRoutes: ['/']
│   └── outputs dist/sitemap.xml, dist/robots.txt
└── dist/
    ├── index.html
    ├── sitemap.xml
    ├── robots.txt
    └── assets/
        ├── index.[hash].js
        ├── framer-motion.[hash].js
        ├── react-vendor.[hash].js
        └── vendor.[hash].js
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `vite.config.ts` | Modify | Add `resolve.alias`, `build.rollupOptions.output.manualChunks`, `Sitemap` plugin import |
| `tsconfig.app.json` | Modify | Add `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }` |
| `package.json` | Modify | Add `"vite-plugin-sitemap": "^0.8.2"` to devDependencies |
| `public/sitemap.xml` | Delete | Replaced by build-time generation |

## Interfaces / Contracts

**Vite config additions** (`vite.config.ts`):

```ts
import Sitemap from 'vite-plugin-sitemap'

resolve: {
  alias: { '@': '/src' }
},
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'framer-motion': ['framer-motion'],
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
      }
    }
  }
},
plugins: [
  react(),
  Sitemap({
    hostname: 'https://plynte.com',
    dynamicRoutes: ['/'],
    changefreq: 'weekly',
    priority: 1.0,
  }),
]
```

**TypeScript paths addition** (`tsconfig.app.json`):

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

Both `baseUrl` and `paths` are required — TypeScript uses `baseUrl` to resolve the path root.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | `vite build` succeeds with zero errors | Run build, verify exit code 0 |
| Build | Output chunk structure | Assert `dist/assets/framer-motion.*.js` and `dist/assets/react-vendor.*.js` exist |
| Build | Sitemap output | Assert `dist/sitemap.xml` contains `<loc>https://plynte.com/</loc>` |
| TypeScript | `tsc -b` passes with aliases | Run type-check, verify exit code 0 |
| Integration | `vite preview` serves without console errors | Manual smoke test in browser |
| Regression | Relative imports still resolve | Use existing `src` files as-is — no migration needed |

No unit tests required — this change is pure configuration.

## Migration / Rollout

No migration required. Path aliases are additive — existing relative imports continue to resolve. Delete `public/sitemap.xml` in the same commit that activates the plugin. Build pipeline (`tsc -b && vite build`) runs as before with no new steps.

## Open Questions

- [ ] **Spec inconsistency**: Scenario "Build succeeds without sitemap plugin" describes a *failure* (plugin-not-found error). Title should be "Build fails without sitemap plugin". Needs spec correction.
- [ ] **vite-plugin-sitemap SPA behavior**: The plugin scans `dist/**/*.html`. The SPA outputs only `index.html`. Confirm `dynamicRoutes: ['/']` is sufficient for single-route site. If the plugin auto-detects `/` from `index.html`, `dynamicRoutes` may be optional.
