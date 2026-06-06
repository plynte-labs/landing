# type-safety Specification

## Purpose

Compile-time type safety for the i18n translation system, the `t()` lookup function, and the ecosystem badge variant mapping. Ensures TypeScript catches missing keys, `any` escapes, and non-exhaustive unions at build time rather than runtime.

## Requirements

| # | Requirement | Strength |
|---|---|---|
| R1 | Translations typed structure | MUST |
| R2 | `t()` returns `string` without `any` | MUST |
| R3 | `badgeVariantMap` exhaustive | MUST |

### Requirement R1: Translations Typed Structure

The `translations` object MUST have a fully typed structure mirroring all i18n keys. The type MUST be `Record<Locale, TranslationDict>` where `TranslationDict` defines exact nested shapes for every top-level section (banner, navbar, hero, ecosystem, architecture, contribute, mission, notFound, footer, seo). No `unknown`, no `Record<string, ...>` open-ended types.

#### Scenario: Both languages have identical key shape

- GIVEN `TranslationDict` defines all top-level sections with their leaf keys typed as `string`
- WHEN `translations.es` and `translations.en` are assigned literal objects
- THEN TypeScript accepts both — no compile errors

#### Scenario: One language is missing a translation key

- GIVEN `TranslationDict` requires `navbar.inicio` as `string`
- WHEN `translations.en` omits the `inicio` key inside `navbar`
- THEN `tsc --noEmit` MUST emit a compile error identifying the missing property

#### Scenario: Typo in key name at call site

- GIVEN `TranslationDict` defines `hero.tagline` (not `hero.tagLine`)  
- WHEN code calls `t('hero.tagLine')`  
- THEN the string literal is not type-checked against `TranslationDict` directly (out of scope per proposal); however `translations` type assignment catches structural drift

### Requirement R2: `t()` Returns `string` Without `any`

The `t()` function MUST return `string` without using `any` in its implementation or return path. A recursive `TranslationValue` type (`string | { [key: string]: TranslationValue }`) MUST narrow the traversal variable. The `// eslint-disable-next-line @typescript-eslint/no-explicit-any` comment MUST be removed.

#### Scenario: Happy path — nested key resolved

- GIVEN language is `'es'` and `TranslationDict` has `navbar.inicio: string`
- WHEN `t('navbar.inicio')` is called
- THEN `t()` returns the Spanish string `"Inicio"` with return type `string`

#### Scenario: Missing key fallback

- GIVEN language is `'es'` and key `'nonexistent.leaf'` does not exist in `TranslationDict`
- WHEN `t('nonexistent.leaf')` is called
- THEN `t()` returns the key string `"nonexistent.leaf"` — fallback behavior preserved

#### Scenario: Intermediate key hits a leaf (not an object)

- GIVEN `hero.tagline` is a `string` leaf
- WHEN `t('hero.tagline.extra')` is called
- THEN traversal hits a string before exhausting keys — `t()` returns the fallback key

### Requirement R3: `badgeVariantMap` Exhaustive

The `badgeVariantMap` in `EcosystemSection` MUST be typed as `Record<TechLabel, BadgeVariant>` where `TechLabel` is a union derived from all actual project tech labels. The `?? 'green'` fallback in `getBadgeVariant` MUST become dead code — exhaustiveness guarantees every possible `TechLabel` has an entry.

#### Scenario: New tech label added to orgData without map update

- GIVEN a new tech label `'Golang'` is added to a project in `orgData.ts`
- AND `TechLabel` is derived from `typeof projects[number]['tech'][number]`
- AND `badgeVariantMap` is typed `Record<TechLabel, BadgeVariant>`
- WHEN `tsc --noEmit` runs
- THEN TypeScript MUST emit error TS2739 at `badgeVariantMap` — missing property `'Golang'`

#### Scenario: All existing tech labels covered

- GIVEN current tech labels: `TypeScript | Canvas | React | Whisper | Python | Real-time | Ollama | Tauri`
- AND `badgeVariantMap` has an entry for every one
- WHEN `tsc --noEmit` runs
- THEN zero type errors in `EcosystemSection.tsx`

#### Scenario: Extra map entry not in any project

- GIVEN `badgeVariantMap` contains `QwenTTS` but `QwenTTS` is not in any project's `tech` array
- WHEN `TechLabel` is derived from project data only
- THEN `QwenTTS` is NOT in the `TechLabel` union — `Record<TechLabel, BadgeVariant>` rejects it (excess property check)
