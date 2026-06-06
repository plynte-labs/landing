# GlassCard Component Specification

## Purpose

Reusable glassmorphic card component with backdrop-filter blur, semi-transparent dark background, subtle border, and green glow on hover. Compatible with framer-motion for animation.

## Requirements

### Requirement: Props Interface

The GlassCard component family MUST export 4 explicit variants with single-purpose props:

| Variant | Renders As | Required Props | Optional Props |
|---------|-----------|---------------|----------------|
| `GlassCard` | `<div>` | `children` | `className` |
| `GlassCardLink` | `<a>` | `children`, `href` | `className` |
| `GlassCardMotion` | `<motion.div>` | `children` | `className`, motion props |
| `GlassCardMotionLink` | `<a>` wrapping `<motion.div>` | `children`, `href` | `className`, motion props |

No variant SHALL accept props that change its DOM element type. Consumers MUST import the specific variant they need.

#### Scenario: GlassCard renders as plain div

- GIVEN `import { GlassCard } from '...'`
- WHEN `<GlassCard className="extra"><p>Content</p></GlassCard>` renders
- THEN a `<div class="glass-card extra">` wraps `<p>Content</p>`
- AND no `<a>` or `<motion.div>` is rendered

#### Scenario: GlassCardLink renders as anchor

- GIVEN `import { GlassCardLink } from '...'`
- WHEN `<GlassCardLink href="https://example.com"><p>Link</p></GlassCardLink>` renders
- THEN an `<a class="glass-card" href="https://example.com">` wraps the content

#### Scenario: GlassCardMotion renders as motion.div

- GIVEN `import { GlassCardMotion } from '...'`
- WHEN `<GlassCardMotion initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p>Animated</p></GlassCardMotion>` renders
- THEN a `<motion.div class="glass-card">` wraps the content and plays the entrance animation

#### Scenario: GlassCardMotionLink renders as anchor with motion

- GIVEN `import { GlassCardMotionLink } from '...'`
- WHEN `<GlassCardMotionLink href="/page" whileHover={{ scale: 1.05 }}><p>Link</p></GlassCardMotionLink>` renders
- THEN an `<a href="/page">` wraps a `<motion.div class="glass-card">` which wraps the content
- AND hover triggers scale 1.05

#### Scenario: Consumer imports exact variant

- GIVEN a consumer needs a static card with no link or animation
- WHEN it writes `import { GlassCard } from '@/components/UI/GlassCard/GlassCard'`
- THEN only the div-only variant code is bundled
- AND no framer-motion code is included in its import graph

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

### Requirement: Framer Motion Compatibility

`GlassCardMotion` and `GlassCardMotionLink` SHALL render as `motion.div`. `GlassCard` and `GlassCardLink` SHALL NOT import framer-motion. Motion props forwarded to motion variants MUST NOT override the built-in hover effect.

#### Scenario: Motion props forwarded correctly

- GIVEN `<GlassCardMotion whileHover={{ scale: 1.05 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p>Animated</p></GlassCardMotion>`
- WHEN the component renders
- THEN entrance animation plays (opacity 0→1)
- AND hover triggers scale 1.05 without overriding the built-in glass hover effect

#### Scenario: Non-motion variants exclude framer-motion

- GIVEN a bundle using only `GlassCard` and `GlassCardLink`
- WHEN the bundle is tree-shaken
- THEN framer-motion code is absent from the output

### Requirement: Shared Styling Across Variants

All 4 variants MUST apply the identical CSS class `glass-card`. Glassmorphism styling, hover effect, and CSS-file-based properties from the main spec apply uniformly to every variant.

#### Scenario: All variants share the same CSS class

- GIVEN any of the 4 variants (`GlassCard`, `GlassCardLink`, `GlassCardMotion`, `GlassCardMotionLink`)
- WHEN the component renders
- THEN its root element carries class `glass-card`
- AND visual appearance (blur, background, border, hover) is identical across all variants
