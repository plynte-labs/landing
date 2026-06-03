# Color Migration Specification

## Purpose

Replace the personal brand orange color scheme with the Plynte Labs brand green scheme across CSS design tokens, keeping complementary blue/cyan accents and dark backgrounds intact.

## Requirements

### Requirement: Primary Color Replacement

`--color-primary` MUST change from `#ff8903` to `#6FF073` in `design-tokens.css`. `--color-primary-hover` MUST change from `#e67a00` to `#4CAF50`.

#### Scenario: Primary green applied globally

- GIVEN the page is rendered after migration
- WHEN any element uses `var(--color-primary)`
- THEN the rendered color is `#6FF073` (neon/mint green)
- AND elements using `var(--color-primary-hover)` render `#4CAF50` on hover

### Requirement: Accent Color Replacement

`--color-accent` MUST change from `#ff9900` to `#6FF073`. `--color-bg-primary` MUST change from `#ff9900` to `#6FF073`.

#### Scenario: Accent and background accent are green

- GIVEN the CSS after migration
- THEN `--color-accent` resolves to `#6FF073`
- THEN `--color-bg-primary` resolves to `#6FF073`

### Requirement: Brand Orange Token Replacement

`--color-brand-orange` and `--color-brand-orange-2` tokens MUST be replaced with green equivalents using the brand green palette: `#6FF073` and `#173218` at appropriate opacities.

#### Scenario: No orange tokens remain

- GIVEN design-tokens.css after migration
- WHEN inspecting color variables
- THEN no token named `--color-brand-orange` or `--color-brand-orange-2` exists
- AND green equivalents are defined in their place

### Requirement: Scrollbar Thumb Color

Scrollbar thumb color MUST change from `var(--color-primary, #ff9900)` to `#6FF073` in `App.css` scrollbar rules.

#### Scenario: Scrollbar thumb is green

- GIVEN the page renders with scrollable content
- WHEN the scrollbar is visible
- THEN the thumb color is `#6FF073`

### Requirement: Selection Background Color

`::selection` background in `App.css` MUST change from `var(--color-bg-primary)` to `rgba(111, 240, 115, 0.30)` (30% opacity of `#6FF073`).

#### Scenario: Text selection uses green tint

- GIVEN the user selects text on the page
- THEN the selection background shows a green tint at 30% opacity
- AND selected text remains readable against the background

### Requirement: GlassUpgrades.css Orange References

All orange references in `GlassUpgrades.css` (`.PhilosophyCard` border-top, `.skill-category` hover shadow, `.skill-tag` hover) MUST be updated to green equivalents.

#### Scenario: GlassUpgrades uses green accents

- GIVEN GlassUpgrades.css after migration
- WHEN a glass card hovers
- THEN the accent border and glow use green (`#6FF073` or derivatives)
- AND no `#ff8903` or `#ff9900` references remain

### Requirement: Preserve Complementary Accents

Brand blue/cyan tokens (`--color-brand-blue: #0CFADA`, `--color-brand-blue-2: #0081A7`) MUST remain unchanged as complementary visual accents.

#### Scenario: Blue tokens survive migration

- GIVEN design-tokens.css after migration
- THEN `--color-brand-blue` and `--color-brand-blue-2` still exist with their original values
- AND the tokens remain available for use (e.g., hover states, decorative elements)

### Requirement: Dark Background Tokens

Dark background tokens (`--color-dark-bg: #0a0a0a`, `--color-dark-surface: #121212`, `--color-bg-secondary: black`) MUST remain unchanged. The site is dark-theme only.

#### Scenario: Dark theme preserved

- GIVEN the app renders after migration
- THEN the background color is black or near-black
- AND no light theme CSS is active
