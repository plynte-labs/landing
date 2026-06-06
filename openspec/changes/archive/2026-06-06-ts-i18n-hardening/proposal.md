# Proposal: TypeScript i18n Hardening

## Intent

The translation system (`translations.ts`, `LanguageContext.tsx`) and ecosystem badge mapping (`EcosystemSection.tsx`) use loose types that defeat TypeScript's compile-time safety. `translations` is typed as `Record<string, Record<string, unknown>>` losing all key autocomplete. The `t()` function cascades `any`. The `badgeVariantMap` silently falls through to `'green'` for unknown tech labels. This change replaces all three with strict, exhaustive types.

## Scope

### In Scope
- Define `TranslationDict` interface mirroring all actual translation keys (banner, navbar, hero, ecosystem, architecture, mission, contribute, notFound, footer, seo)
- Type `translations` as `Record<Language, TranslationDict>` (removes `unknown` and `Record<string, ...>`)
- Replace `any` in `t()` with a recursive `TranslationValue` type (`string | { [key: string]: TranslationValue }`)
- Define `TechLabel` union from actual project tech arrays, typed `badgeVariantMap` as `Record<TechLabel, BadgeVariant>`

### Out of Scope
- Changing translation key structure or content
- Refactoring `t()` to accept typed dot-path literals (template literal type level)
- Expanding badge variants beyond `'green' | 'blue' | 'purple'`
- Removing unused `QwenTTS` entry from badgeVariantMap (union type exhaustiveness covers this)

## Capabilities

### New Capabilities
None

### Modified Capabilities
None — pure type hardening. No spec-level requirement changes.

## Approach

**H8** — Extract a `TranslationDict` interface from the actual nested object shape. Define leaf values as `string`, nested objects with explicit interfaces. Export alongside type `Locale = 'es' | 'en'`.

**H9** — Define `type TranslationValue = string | { [key: string]: TranslationValue }`. Inside `t()`, cast `translations[language]` to `TranslationValue` instead of `any`. The recursive traversal narrows correctly without `any`. Remove the eslint-disable comment.

**M13** — Derive `TechLabel` from `projects` via `typeof projects[number]['tech'][number]`, or define explicit union `'TypeScript' | 'Canvas' | 'React' | 'Whisper' | 'Python' | 'Real-time' | 'Ollama' | 'Tauri'`. Type `badgeVariantMap` as `Record<TechLabel, BadgeVariant>`. The `?? 'green'` fallback in `getBadgeVariant` becomes dead code — exhaustiveness guarantee makes it unreachable.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/translations.ts` | Modified | Replace `Record<string, Record<string, unknown>>` with `Record<Locale, TranslationDict>` |
| `src/contexts/LanguageContext.tsx` | Modified | Replace `any` with `TranslationValue`; remove eslint-disable comment |
| `src/features/EcosystemSection/EcosystemSection.tsx` | Modified | Define `TechLabel` union; type `badgeVariantMap` exhaustively |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| New type breaks existing `t()` calls if TranslationDict misses a key | Low | Derive from actual translations object structure; verify with `tsc --noEmit` |
| TranslationDict too rigid for future key additions | Low | Only the top-level section shape is locked; leaf values are `string` |

## Rollback Plan

Revert the three files to their pre-change state. No runtime behavior changes — types are erased at compile time.

## Dependencies

None

## Success Criteria

- [ ] `tsc --noEmit` passes with zero errors
- [ ] All existing `t()` calls across the codebase compile without type errors
- [ ] Adding a tech label to `orgData.ts` without updating `badgeVariantMap` produces a compile error
- [ ] Existing tests pass (type-only change, no behavior difference)
