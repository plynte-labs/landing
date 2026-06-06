# Keyboard Navigation Specification

## Purpose

Keyboard bypass mechanism for repeated navigation blocks per WCAG 2.4.1 (Level A). Provides a skip-to-content link as the first focusable element on every page.

## Requirements

### Requirement: Skip-to-content Link

The application MUST provide a skip-to-main-content link as the first focusable element in the DOM on all pages. The link MUST be visually hidden until focused via keyboard navigation.

#### Scenario: Skip link becomes visible on Tab

- GIVEN any page has loaded
- WHEN the user presses Tab as the first keyboard action
- THEN a "Skip to content" link becomes visible at the top of the viewport
- AND the link is the first and currently focused element

#### Scenario: Skip link moves focus to main content

- GIVEN the skip link is visible and focused
- WHEN the user activates the link (Enter or click)
- THEN focus moves to the `<main>` element (identified by `id="main-content"`)
- AND the skip link returns to its visually hidden state

#### Scenario: Skip link is visually hidden when not focused

- GIVEN any page is loaded and the skip link is not focused
- THEN the skip link is not visible on screen
- AND the skip link does not affect page layout or visual rendering

#### Scenario: Skip link available on all pages

- GIVEN the user navigates to any route (LandingPage, NotFoundPage, or future pages)
- WHEN the page loads
- THEN the skip-to-content link is present as the first focusable element
- AND it targets the `<main>` landmark on that page

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
