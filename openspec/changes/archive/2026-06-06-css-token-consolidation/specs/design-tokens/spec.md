# Delta for Design Tokens

## MODIFIED Requirements

### Requirement: Single Token Source of Truth

The project MUST define all CSS custom properties (design tokens) in exactly one file: `src/styles/design-tokens.css`. All components MUST reference tokens via `var(--token-name)`, never hardcoded values. Any token used by components MUST be defined in this single source.

(Previously: CSS custom properties were scattered across `colors.css`, `design-tokens.css`, and `variables.css` with conflicting values for the same token names.)

#### Scenario: Single token file after consolidation

- GIVEN the project after CSS token consolidation
- WHEN inspecting `src/styles/`
- THEN only `design-tokens.css` defines CSS custom properties
- AND `colors.css` does not exist in the project
- AND `variables.css` does not exist in the project

#### Scenario: No conflicting token values

- GIVEN `design-tokens.css` as the sole token source
- WHEN resolving any `--color-*` custom property
- THEN exactly one value is defined per token name
- AND no token is overridden by a second file

#### Scenario: App.css imports only design-tokens.css

- GIVEN `src/styles/App.css`
- WHEN inspecting its `@import` directives
- THEN it imports `design-tokens.css` as the only token file
- AND no import references `colors.css` or `variables.css`

#### Scenario: Used token survives consolidation

- GIVEN the consolidated `design-tokens.css`
- THEN `--color-bg-secondary: black` is present (carried from `colors.css`)
- AND `--color-dark-bg: #0a0a0a` is present
- AND `--color-primary: #6FF073` is present
