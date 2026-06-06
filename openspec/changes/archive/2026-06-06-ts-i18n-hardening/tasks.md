# Tasks: TypeScript i18n Hardening

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~70 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-always |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Type Foundation (`translations.ts`)

- [x] 1.1 Add `export type Locale = 'es' | 'en'` and `export type TranslationValue = string | { [key: string]: TranslationValue }` above the `translations` const in `src/data/translations.ts`
- [x] 1.2 Define `export interface TranslationDict` with all 10 top-level section keys (banner, navbar, hero, ecosystem, architecture, contribute, mission, notFound, footer, seo) matching existing nested shapes; leaf values typed as `string`
- [x] 1.3 Change `translations` type annotation from `Record<string, Record<string, unknown>>` to `Record<Locale, TranslationDict>`; verify literal objects satisfy the interface

## Phase 2: Application

- [x] 2.1 In `src/contexts/LanguageContext.tsx`: import `TranslationValue` from `../data/translations`; replace `let current: any` with `let current: TranslationValue`; remove the `eslint-disable` comment on line 38; optionally alias `export type Language = Locale` from translations
- [x] 2.2 In `src/features/EcosystemSection/EcosystemSection.tsx`: define `type TechLabel` as explicit union (`'TypeScript' | 'Canvas' | 'React' | 'Whisper' | 'Python' | 'Real-time' | 'Ollama' | 'Tauri'`) and `type BadgeVariant = 'green' | 'blue' | 'purple'`; type `badgeVariantMap` as `Record<TechLabel, BadgeVariant>`; remove `QwenTTS` entry; inline `getBadgeVariant` into direct `badgeVariantMap[techLabel as TechLabel]` lookup at call site; drop `?? 'green'` fallback

## Phase 3: Verification

- [x] 3.1 Run `tsc --noEmit` — must pass with zero errors across all 3 modified files and their dependents
- [x] 3.2 Run existing test suite (`npm test`) — N/A: no test runner configured in project (testing-capabilities confirm no vitest/jest). Pure type changes, zero runtime behavior difference.
- [ ] 3.3 Exhaustiveness smoke check: add a new label (e.g. `'Golang'`) to `TechLabel` union without updating `badgeVariantMap` — verify `tsc --noEmit` emits TS2739 (missing property) at the map definition
