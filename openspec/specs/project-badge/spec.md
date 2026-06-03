# ProjectBadge Component Specification

## Purpose

Reusable tech stack badge rendered as a small pill/tag with glassmorphism styling and optional color variants. Extends patterns from the existing SkillBadge component.

## Requirements

### Requirement: Props Interface

ProjectBadge MUST accept: `label` (string, required) and optional `icon` (ReactNode).

#### Scenario: Badge renders with label text

- GIVEN `<ProjectBadge label="TypeScript" />`
- WHEN the component renders
- THEN the text "TypeScript" is visible inside a pill-shaped badge

#### Scenario: Badge renders label with icon

- GIVEN `<ProjectBadge label="React" icon={<ReactLogo />} />`
- WHEN the component renders
- THEN the ReactLogo icon appears to the left of the "React" text

### Requirement: Glassmorphism Styling

ProjectBadge MUST use glassmorphism styling: semi-transparent dark background, subtle border, and compact pill shape.

#### Scenario: Glass effect applied to badge

- GIVEN ProjectBadge is rendered
- THEN it has `background: rgba(255, 255, 255, 0.04)`
- AND a subtle border (`rgba(255, 255, 255, 0.08)`)
- AND `border-radius` creates a pill/rounded shape

### Requirement: Color Variants

ProjectBadge SHOULD support color variants via a `variant` prop: `"green"` (default), `"blue"`, `"purple"` to differentiate tech categories.

#### Scenario: Green variant renders

- GIVEN `<ProjectBadge label="Node.js" variant="green" />`
- WHEN the component renders
- THEN the badge border and text use green accent

#### Scenario: Blue variant renders

- GIVEN `<ProjectBadge label="TypeScript" variant="blue" />`
- WHEN the component renders
- THEN the badge uses blue accent colors

#### Scenario: Default variant when omitted

- GIVEN `<ProjectBadge label="React" />` with no variant prop
- WHEN the component renders
- THEN the badge uses the default green variant styling

### Requirement: Reusability Across Sections

ProjectBadge MUST be reusable across all project cards in EcosystemSection and any other component context without style collisions.

#### Scenario: Multiple instances render correctly

- GIVEN 6 ProjectBadge instances with different labels and variants render on the same page
- WHEN the page renders
- THEN all badges display correctly with their respective colors
- AND no style collisions or layout issues occur
