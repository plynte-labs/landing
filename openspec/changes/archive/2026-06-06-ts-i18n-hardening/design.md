# Design: TypeScript i18n Hardening

## Technical Approach

Replace three loose type sites with strict, exhaustive types: (1) `translations` object gets a `TranslationDict` interface matching all section keys; (2) `t()` drops `any` for recursive `TranslationValue` narrowing; (3) `badgeVariantMap` gets an explicit `TechLabel` union sourced from `projects` tech arrays. Zero runtime changes — pure compile-time hardening validated by `tsc --noEmit`.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `TechLabel` explicit union | Must update when new tech labels added; guarantees exhaustiveness | **Chosen** — `Project.tech` is `string[]`, so `typeof projects[number]['tech'][number]` resolves to `string`, not literals. Explicit union is the only path without widening the `Project` type. |
| Derive `TechLabel` from `projects` via `as const` | Requires `as const` on every `tech` array, changes `Project.tech` to `readonly string[]` | Rejected — cascading type changes to `Project` interface and all consumers. |
| Keep `getBadgeVariant` wrapper | Extra indirection, dead fallback code | Rejected — `badgeVariantMap[techLabel]` is exhaustive, no fallback needed. Inline the lookup. |
| New `Locale` type vs reuse existing `Language` | `Language` already exported from `LanguageContext.tsx` | **Chosen**: export `Locale` from `translations.ts`. `translations.ts` is imported by `LanguageContext.tsx`, so dependency flows from data → context. Renaming avoids a circular import concern. The `Language` type in context can alias `Locale`. |

## Data Flow

```
translations.ts                           LanguageContext.tsx
┌──────────────────────┐                  ┌─────────────────────┐
│ type Locale          │── import ──────→ │ type Language alias  │
│ interface TranslationDict              │ t(key: string)       │
│   banner, navbar, ... │                │   → TranslationValue  │
│ translations: Record<Locale, ...>      │     (no any)          │
└──────────────────────┘                  └─────────────────────┘
                                                      │
                                              t() called by components
                                                      │
EcosystemSection.tsx                                  ↓
┌──────────────────────────────────────┐    t('ecosystem.heading')
│ type TechLabel = 'TypeScript' | ...  │
│ type BadgeVariant = 'green'|'blue'|'purple'
│ badgeVariantMap: Record<TechLabel, BadgeVariant>
│ → direct lookup, no fallback         │
└──────────────────────────────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/translations.ts` | Modify | Add `Locale` type, `TranslationDict` interface, type export as `Record<Locale, TranslationDict>`. Export `TranslationValue` for use by context. |
| `src/contexts/LanguageContext.tsx` | Modify | Remove `// eslint-disable-next-line @typescript-eslint/no-explicit-any`. Type `current` as `TranslationValue` instead of `any`. Optionally alias `Language = Locale`. |
| `src/features/EcosystemSection/EcosystemSection.tsx` | Modify | Add `TechLabel` union, `BadgeVariant` type alias. Type `badgeVariantMap` as `Record<TechLabel, BadgeVariant>`. Remove `QwenTTS` entry. Inline `getBadgeVariant` into direct lookup. |

## Interfaces / Contracts

### New exports from `translations.ts`

```ts
export type Locale = 'es' | 'en';

export type TranslationValue = string | { [key: string]: TranslationValue };

export interface TranslationDict {
  banner: { text: string };
  navbar: { inicio: string; proyectos: string; contribuir: string; langToggle: string; maintainer: string };
  hero: { tagline: string; subtagline: string; cta: string; mitBadge: string };
  ecosystem: {
    heading: string;
    'brick-draw': { name: string; desc: string };
    liveaudio: { name: string; desc: string };
    opencohost: { name: string; desc: string };
    comingSoon: string;
    viewOnGithub: string;
  };
  architecture: {
    heading: string;
    'local-first': { title: string; desc: string };
    'mit-license': { title: string; desc: string };
    'ci-cd': { title: string; desc: string };
    'hardware-acceleration': { title: string; desc: string };
  };
  contribute: { heading: string; step1: string; step2: string; step3: string; step4: string; codeExample: string; githubLink: string };
  mission: { heading: string; statement: string; mitNotice: string; maintainer: { name: string; role: string; github: string } };
  footer: { builtWith: string; license: string; orgLink: string };
  seo: { title: string; description: string };
  notFound: { title: string; description: string; btnGithub: string };
}

export const translations: Record<Locale, TranslationDict> = { /* ... unchanged values */ };
```

### New types in `EcosystemSection.tsx`

```ts
type TechLabel = 'TypeScript' | 'Canvas' | 'React' | 'Whisper' | 'Python' | 'Real-time' | 'Ollama' | 'Tauri';
type BadgeVariant = 'green' | 'blue' | 'purple';

const badgeVariantMap: Record<TechLabel, BadgeVariant> = {
  TypeScript: 'blue', Canvas: 'purple', React: 'blue',
  Whisper: 'green', Python: 'blue', 'Real-time': 'green',
  Ollama: 'purple', Tauri: 'purple',
};
// QwenTTS removed — not in any project's tech array
```

### `t()` in `LanguageContext.tsx` (updated)

```ts
import { translations, type TranslationValue } from '../data/translations';

const t = (key: string): string => {
  const keys = key.split('.');
  let current: TranslationValue = translations[language];
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
};
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Compile | `tsc --noEmit` passes | Run on all 3 modified files + dependents |
| Type exhaustiveness | Adding a tech label to `orgData.ts` without updating `TechLabel` union errors | Manual verification — TS error on new label in `projects` side, or error if added to `TechLabel` but missing from `badgeVariantMap` |
| Runtime regression | Existing tests pass (type-only change) | `npm test` (if test suite exists) |

## Migration / Rollout

No migration required. Types are erased at compile time. Rollback: revert 3 files.

## Open Questions

None — all design decisions resolved with clear rationale.
