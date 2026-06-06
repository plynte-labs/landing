# Delta for i18n org copy

## MODIFIED Requirements

### Requirement: Add New Section Keys

translations.ts MUST include top-level keys: `hero`, `ecosystem`, `architecture`, `contribute`, `mission`, and `footer`. The `ecosystem` key group MUST contain `opencohost.*` sub-keys (name, description, techStackFinal) replacing the prior `voiceai.*` sub-keys.
(Previously: `ecosystem` contained `voiceai.*` sub-keys)

#### Scenario: OpenCohost keys resolve correctly

- GIVEN the app calls `t("ecosystem.opencohost.name")` and `t("ecosystem.opencohost.desc")`
- WHEN the components render
- THEN valid translated strings are returned for each key in both ES and EN
- AND `ecosystem.voiceai.*` keys no longer exist in translations

#### Scenario: Other ecosystem keys unaffected

- GIVEN the app calls `t("ecosystem.brickdraw.name")` or `t("ecosystem.liveaudio.description")`
- WHEN the component renders
- THEN valid translated strings continue to resolve for Brick.draw and LiveAudio

### Requirement: Complete ES and EN Versions

Both `es` and `en` top-level objects MUST contain complete translations for every new and retained key. No key may exist in one language but not the other.
(Previously: same requirement, now applied to opencohost keys)

#### Scenario: No missing opencohost translation keys

- GIVEN the language is toggled between ES and EN
- WHEN any `t()` call with an `ecosystem.opencohost.*` key is made in either language
- THEN a valid string is returned (not the raw key path)

## ADDED Requirements

### Requirement: Commit Scope References Updated

Any `codeExample` or equivalent translation value whose commit scope previously referenced VoiceAI SHALL reference OpenCohost instead, in both ES and EN.

#### Scenario: Code example commit scope references OpenCohost

- GIVEN a translation value contains a commit scope string that previously referenced VoiceAI
- WHEN that value is resolved via `t()`
- THEN the commit scope text references "OpenCohost" not "VoiceAI"
- AND the updated string is valid in both ES and EN
