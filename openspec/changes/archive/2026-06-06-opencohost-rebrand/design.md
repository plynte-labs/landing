# Design: OpenCohost Rebrand

## Technical Approach

Surface-level rename + visual accent. No new behaviors, no data migrations. Modify 5 source files + 2 static files. The OpenCohost card is visually distinguished from BrickDraw/LiveAudio via a scoped CSS modifier class `.ecosystem__card-wrap--featured` applied on the card wrapper, which carries the green lattice background, bold typography, and a conditional website link in the coming-soon footer.

## Architecture Decisions

| Decision | Options | Tradeoff | Decision |
|----------|---------|----------|----------|
| **Where to place lattice** | `.ecosystem__card-wrap` wrapper vs `.glass-card` itself | Wrapper avoids pseudo-element collision with GlassCard's own styling; card sits at `z-index: 1` above the lattice `::before` at `z-index: 0`. GlassCard `--featured` would require z-index dancing on the card's inner children. | Wrapper `.ecosystem__card-wrap--featured` |
| **Website link position** | Replace badge vs alongside it | "Próximamente" badge communicates status; replacing it with a link loses that signal. Alongside in a flex row keeps both. | Alongside, in `.ecosystem__card-footer` flex row |
| **Bold emphasis mechanism** | `<strong>` tags in translations vs CSS descendant selectors | `t()` returns plain strings (see `LanguageContext.tsx` line 49); HTML injection needs `dangerouslySetInnerHTML` or parser. CSS descendant selectors under `--featured` are zero-risk, zero-i18n-change. Proposal scope is card NAME + coming-soon label only. | CSS-only: `.ecosystem__card-wrap--featured .ecosystem__card-name` + `.ecosystem__card-wrap--featured .ecosystem__coming-soon` |
| **Lattice pattern adaptation** | Single center crosshair vs repeating grid | ArchitectureSection uses a single crosshair across the entire grid (4 cards connected). A single crosshair on one card looks like a plus sign — too sparse. A 60px repeating grid of thin green lines (`background-size: 60px 60px`) reads as a "blueprint lattice" and fills the card visibly. | 60px repeating grid via `background-image` with `linear-gradient` lines |

## Data Flow

```
orgData.ts (projects[]) → EcosystemSection.tsx
                              │
   project.key === 'opencohost' → wrapper class 'ecosystem__card-wrap--featured'
                              │
   project.website → <a> in footer (coming-soon cards only)
                              │
   translations.ts → t('ecosystem.opencohost.*') → name + desc text
```

No store, no API. All data is static at build time.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/types/index.ts` | Modify | Add `website?: string` to `Project` interface |
| `src/data/orgData.ts` | Modify | Rename entry: key→`opencohost`, name→`OpenCohost`, desc→new ES copy, tech→`['TypeScript', 'Ollama', 'Python', 'Tauri']`, add `website: 'https://www.opencohost.com'` |
| `src/data/translations.ts` | Modify | ES lines 31-34 + EN lines 123-126: `voiceai` key→`opencohost` with updated name/desc; ES line 63 + EN line 155: `feat(voiceai)`→`feat(opencohost)` in codeExample |
| `src/features/EcosystemSection/EcosystemSection.tsx` | Modify | Apply `ecosystem__card-wrap--featured` class when `project.key === 'opencohost'`; conditional `<a>` in coming-soon footer when `project.website` exists |
| `src/features/EcosystemSection/EcosystemSection.css` | Modify | Add `--featured::before` lattice (green grid, `background-size: 60px 60px`), descendant bold selectors, `.ecosystem__website-link` styles, footer flex row |
| `index.html` | Modify | JSON-LD block lines 83-89: `"VoiceAI"`→`"OpenCohost"`, update description + applicationCategory |
| `README.md` | Modify | Table row line 16: `**VoiceAI**`→`**OpenCohost**`, update tech description |

## Interfaces / Contracts

```typescript
// src/types/index.ts — modified
export interface Project {
    key: string;
    name: string;
    description: string;
    github?: string;
    website?: string;   // ← NEW: external project URL
    status: 'live' | 'coming-soon';
    tech: string[];
}
```

No new components. No API contract changes.

## CSS Architecture

```css
/* Lattice — adapted from ArchitectureSection::before */
.ecosystem__card-wrap--featured::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background-image:
    linear-gradient(to right, rgba(111, 240, 115, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(111, 240, 115, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

.ecosystem__card-wrap--featured {
  position: relative;
}

/* Ensure card content sits above lattice */
.ecosystem__card-wrap--featured .ecosystem__card {
  position: relative;
  z-index: 1;
}

/* Bold emphasis on featured card */
.ecosystem__card-wrap--featured .ecosystem__card-name {
  font-weight: var(--font-weight-bold);
}

.ecosystem__card-wrap--featured .ecosystem__coming-soon {
  font-weight: var(--font-weight-semibold);
}

/* Footer flex row for badge + website link */
.ecosystem__card-footer--row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ecosystem__website-link {
  font-size: var(--font-size-xs);
  color: var(--brand-green);
  text-decoration: none;
}

.ecosystem__website-link:hover {
  text-decoration: underline;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Type-check | `Project` interface compiles with `website` field | `tsc -b` |
| Build | All 7 changed files produce valid output | `vite build` |
| Visual | Card renders at 320px, 768px, 1024px, 1440px | Manual browser check |
| i18n | `t('ecosystem.opencohost.name')` resolves in ES + EN | Manual lang toggle |
| Regression | All 3 cards render; no layout break | Visual sweep |
| Cleanup | Zero `voiceai` references in source | `rg voiceai` — expect 0 matches outside `openspec/archive/` |

No unit tests exist in this repo. `tsc -b` + `vite build` serve as smoke tests.

## Migration / Rollout

No migration required. All data is static, no feature flags.

## Open Questions

None.
