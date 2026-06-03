# GlassCard Component Specification

## Purpose

Reusable glassmorphic card component with backdrop-filter blur, semi-transparent dark background, subtle border, and green glow on hover. Compatible with framer-motion for animation.

## Requirements

### Requirement: Props Interface

GlassCard MUST accept: `children` (ReactNode), optional `className` (string), and optional `href` (string — renders as `<a>` if provided, otherwise renders as `<div>`).

#### Scenario: Card renders children inside a div

- GIVEN `<GlassCard><p>Content</p></GlassCard>`
- WHEN the component renders
- THEN a `<div>` wraps the `<p>` and displays "Content"

#### Scenario: Card renders as anchor link

- GIVEN `<GlassCard href="https://github.com/plynte-labs"><p>Link</p></GlassCard>`
- WHEN the component renders
- THEN it renders as an `<a>` tag with `href="https://github.com/plynte-labs"`

### Requirement: Glassmorphism Styling

GlassCard MUST apply: `backdrop-filter: blur(12px)`, `background: rgba(0, 0, 0, 0.3)`, `border: 1px solid rgba(111, 240, 115, 0.08)`.

#### Scenario: Glass visual effect rendered

- GIVEN GlassCard is rendered on a non-solid background
- WHEN the browser supports backdrop-filter
- THEN the background behind the card is blurred
- AND the card has a semi-transparent dark appearance
- AND a subtle green-tinted border is visible

### Requirement: Hover Effect

GlassCard MUST apply a hover effect: slight scale up (`transform: scale(1.02)`) and green glow border (`rgba(111, 240, 115, 0.12)`).

#### Scenario: Hover triggers scale and glow

- GIVEN GlassCard is rendered
- WHEN the user hovers the pointer over the card
- THEN the card scales up slightly
- AND the border color intensifies to a green glow

### Requirement: CSS Modules or BEM

All styling MUST be defined in a `.css` or `.module.css` file using class names. No inline `style={{}}` for the glass effect properties.

#### Scenario: Styles sourced from external file

- GIVEN the GlassCard component source
- WHEN inspecting the component JSX
- THEN no inline `style` attributes define backdrop-filter, background, or border
- AND glassmorphism properties come from a CSS class

### Requirement: Framer Motion Compatible

GlassCard MUST support receiving framer-motion props (e.g., `whileHover`, `initial`, `animate`) without conflicts. If motion props are passed, GlassCard wraps content in `motion.div`.

#### Scenario: Motion props forwarded correctly

- GIVEN `<GlassCard whileHover={{ scale: 1.05 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p>Animated</p></GlassCard>`
- WHEN the component renders
- THEN the entrance animation plays (opacity 0→1)
- AND hover triggers scale to 1.05 without overriding the built-in hover effect
