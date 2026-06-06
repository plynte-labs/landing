# Delta for GlassCard

## MODIFIED Requirements

### Requirement: Props Interface

(Previously: Single GlassCard with conditional `href` → `<a>` and `motionProps` → `motion.div` branching.)

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

### Requirement: Framer Motion Compatibility

(Previously: Single GlassCard conditionally wrapped in `motion.div` when motion props were passed.)

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

## ADDED Requirements

### Requirement: Shared Styling Across Variants

All 4 variants MUST apply the identical CSS class `glass-card`. Glassmorphism styling, hover effect, and CSS-file-based properties from the main spec apply uniformly to every variant.

#### Scenario: All variants share the same CSS class

- GIVEN any of the 4 variants (`GlassCard`, `GlassCardLink`, `GlassCardMotion`, `GlassCardMotionLink`)
- WHEN the component renders
- THEN its root element carries class `glass-card`
- AND visual appearance (blur, background, border, hover) is identical across all variants
