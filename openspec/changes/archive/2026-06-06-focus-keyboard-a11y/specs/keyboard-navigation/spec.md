# Delta for Keyboard Navigation

## ADDED Requirements

### Requirement: Visible Focus Indicators

Interactive elements (navbar links, buttons) MUST display a visible focus indicator on `:focus-visible`. The indicator MUST use `var(--brand-green)`, 2px outline width, and 2px offset. Mouse/touch activation MUST NOT leave a persistent focus ring.

#### Scenario: Tab navigation shows focus on navbar links

- GIVEN any page is loaded
- WHEN the user presses Tab through the navbar links
- THEN each link displays a visible outline as it receives focus

#### Scenario: Buttons display focus indicator on keyboard navigation

- GIVEN a button is in the tab order
- WHEN the button receives keyboard focus via Tab
- THEN the button displays a visible `:focus-visible` outline

#### Scenario: Mouse click does not show persistent focus ring

- GIVEN the user interacts via mouse
- WHEN a navbar link or button is clicked
- THEN no persistent focus outline remains visible on the element

### Requirement: Navigation Landmark Label

The `<nav>` element containing main navigation MUST have `aria-label="Main navigation"` so assistive technology identifies the landmark distinctly from other page regions.

#### Scenario: Screen reader identifies navigation landmark

- GIVEN a screen reader is active
- WHEN the user reaches the `<nav>` landmark
- THEN the screen reader announces "Main navigation"

### Requirement: Native Button Keyboard Handling

Button elements MUST rely on native HTML `<button>` keyboard behavior (Enter/Space to activate). Custom `onKeyDown` handlers that duplicate native activation MUST NOT be present on interactive button elements.

#### Scenario: Enter key activates button without custom handler

- GIVEN the LanguageSwitcher button is focused
- WHEN the user presses Enter or Space
- THEN the language dropdown opens via native `<button>` behavior
- AND no custom `onKeyDown` handler intercepts the event

### Requirement: New-Tab Link Announcement

Links opening in a new tab MUST communicate this behavior to assistive technology. The MaintainerBanner link MUST include "opens in new tab" in its accessible name.

#### Scenario: Screen reader warns about new-tab link

- GIVEN the MaintainerBanner link targets a new tab
- WHEN a screen reader user focuses the banner link
- THEN the link's accessible name includes "opens in new tab"

### Requirement: Decorative Elements Hidden from Accessibility Tree

Purely decorative visual elements (particles) MUST be hidden from the accessibility tree using `aria-hidden="true"` on their container elements.

#### Scenario: Screen reader skips particle elements

- GIVEN the ParticleField renders decorative particles
- WHEN a screen reader traverses the DOM
- THEN no particle elements are announced or reachable
- AND the accessibility tree excludes all particle container elements

### Requirement: MaintainerBanner Component Extraction

The MaintainerBanner MUST be an extracted component in its own file, not defined inline within MainLayout, avoiding unnecessary re-mount cycles tied to parent re-renders.

#### Scenario: Banner renders from standalone component file

- GIVEN MainLayout renders the banner section
- WHEN the application mounts
- THEN banner content is rendered from `src/layouts/banner/MaintainerBanner`
- AND no inline banner definition exists within MainLayout
