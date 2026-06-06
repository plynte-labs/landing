# Design System Specification

## Purpose

Visual identity constraints for the Plynte Labs landing page. Governs typography distinctiveness, brand-consistent motion, and CSS property validity. Complements `design-tokens` (token definitions) and `motion-accessibility` (reduced-motion compliance).

## Requirements

### Requirement: Distinctive Body Font

The body font SHALL be `'DM Sans'`, a geometric sans-serif visually distinct from Inter. The `--font-body` token MUST resolve to `'DM Sans', sans-serif`. DM Sans weights 400, 500, 700 SHALL be loaded from Google Fonts via preconnect `<link>` and stylesheet in `index.html`.

#### Scenario: Body font renders as DM Sans

- GIVEN the page loads
- WHEN `var(--font-body)` is applied
- THEN the rendered typeface is DM Sans
- AND Inter is absent from the font stack

#### Scenario: Font fallback on load failure

- GIVEN Google Fonts is unreachable
- THEN the browser degrades to the next `sans-serif` system font
- AND all text remains readable and properly laid out

#### Scenario: Font resources loaded efficiently

- GIVEN `index.html` in `<head>`
- THEN `<link rel="preconnect" href="https://fonts.googleapis.com">` exists
- AND a stylesheet `<link>` requests DM Sans at 400, 500, 700

### Requirement: Brand-Consistent LinkButton Animation

The LinkButton hover effect MUST use the brand green palette exclusively. Multi-color rainbow animations SHALL be removed. The primary hover affordance SHALL use `var(--brand-green-glow)` with subtle opacity pulse, consistent with the `color-migration` spec.

#### Scenario: Green glow on hover

- GIVEN LinkButton renders
- WHEN the user hovers
- THEN a green glow derived from `var(--brand-green-glow)` appears
- AND no red, yellow, blue, magenta, or cyan is visible in the effect

#### Scenario: Rainbow keyframes and gradient removed

- GIVEN LinkButton.css after refresh
- THEN `@keyframes rgbAlive` does not exist
- AND no `linear-gradient` with multi-color stops exists on `::before`

#### Scenario: Reduced motion respected

- GIVEN `prefers-reduced-motion: reduce`
- WHEN LinkButton is hovered
- THEN the glow animation is instant or hidden per `motion-accessibility` spec
- AND hover feedback remains via static color/opacity change

#### Scenario: Static fallback

- GIVEN a browser lacks `box-shadow` or `filter` support
- THEN LinkButton hover still provides visual affordance via `opacity` or `color` change

### Requirement: Valid CSS Properties

Every CSS declaration SHALL use valid property names and values per the CSS specification. The `transform` property MUST only accept transform functions (e.g., `translate()`, `scale()`). Transition timing values SHALL NOT be assigned to `transform`.

#### Scenario: No invalid property declarations

- GIVEN any `.css` file
- WHEN parsed by a CSS validator
- THEN no declaration uses an invalid property name
- AND `transform: ease-in-out 0.3s` does NOT appear anywhere

#### Scenario: Transition timing uses transition property

- GIVEN an element requires animated property changes
- WHEN defining timing functions
- THEN `transition` shorthand is used (e.g., `transition: transform 0.3s ease-in-out`)
- AND `transform` carries only transform function values
