# i18n Org Copy Specification

## Purpose

Replace all personal portfolio translation content in `src/data/translations.ts` with Plynte Labs org landing copy while preserving the nested key structure used by `LanguageContext.t()`.

## Requirements

### Requirement: Preserve Navbar Key Structure

translations.ts MUST keep the `navbar.*` key structure (`navbar.inicio`, `navbar.sobreMi`, `navbar.portfolio`, etc.). Values MUST be updated to org link labels (e.g., "PROYECTOS" instead of "PORTFOLIO").

#### Scenario: Navbar keys resolve to org labels

- GIVEN the app calls `t("navbar.inicio")`
- WHEN the component renders
- THEN a valid string like "INICIO" (ES) or "HOME" (EN) is returned — never the raw key

### Requirement: Add New Section Keys

translations.ts MUST add new top-level keys: `hero`, `ecosystem`, `architecture`, `contribute`, `mission`, and `footer`. Each key MUST contain nested sub-keys for all translatable content within that section.

#### Scenario: New section keys resolve correctly

- GIVEN the app calls `t("hero.tagline")` and `t("ecosystem.brickdraw.description")`
- WHEN the components render
- THEN valid translated strings are returned for each key in the current language

### Requirement: Complete ES and EN Versions

Both `es` and `en` top-level objects MUST contain complete translations for every new and retained key. No key may exist in one language but not the other.

#### Scenario: No missing translation keys

- GIVEN the language is toggled between ES and EN
- WHEN any `t()` call with a new or retained key is made in either language
- THEN a valid string is returned (not the raw key path)

### Requirement: Remove Personal Copy

translations.ts MUST remove all personal copy keys: `home`, `about`, `story`, `philosophy`, `insights`, `contact`, `portfolio`, and `featureSelector`.

#### Scenario: Old keys return fallback

- GIVEN the new translations.ts is loaded
- WHEN `t("home.intro")` is called
- THEN the raw key string `"home.intro"` is returned as fallback (no matching entry exists)

### Requirement: Retain Not Found Keys

translations.ts SHOULD retain the `notFound` key structure if the 404 page is preserved in the new SPA.

#### Scenario: 404 translations preserved

- GIVEN the NotFoundPage component is kept
- WHEN the app uses `t("notFound.title")` and `t("notFound.btnHome")`
- THEN valid 404 messages are returned in the current language

### Requirement: localStorage Key Migration

The localStorage key in LanguageContext MUST change from `"portfolio_lang"` to `"plynte_lang"`.

#### Scenario: Language preference persists with new key

- GIVEN the user switches language to EN
- WHEN the page is reloaded
- THEN the language remains EN (read from `"plynte_lang"` in localStorage)
- AND the old `"portfolio_lang"` key is no longer read or written

### Requirement: Nested Object Structure

The translation object MUST maintain the nested structure consumed by `LanguageContext.t()` (dot-separated key traversal). No flattening of keys.

#### Scenario: Nested key traversal works

- GIVEN translations look like `{ es: { hero: { tagline: "..." } } }`
- WHEN `t("hero.tagline")` is called
- THEN the nested value is resolved correctly
