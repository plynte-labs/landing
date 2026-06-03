# Ecosystem Section Specification

## Purpose

Project grid showcasing the 3 Plynte Labs open-source projects: Brick.draw, LiveAudio, and VoiceAI. Each project presented in a glassmorphic card with tech badges and GitHub links.

## Requirements

### Requirement: Project Grid

EcosystemSection MUST display 3 project cards in a responsive grid: Brick.draw, LiveAudio, and VoiceAI.

#### Scenario: All three projects displayed

- GIVEN EcosystemSection is rendered
- THEN 3 cards are visible in a grid layout (single column on mobile, multi-column on desktop)
- AND cards correspond to Brick.draw, LiveAudio, and VoiceAI

### Requirement: GlassCard Wrapper

Each project card MUST use the GlassCard component as its wrapper.

#### Scenario: Glassmorphism styling on all cards

- GIVEN EcosystemSection renders
- THEN every project card has backdrop-filter blur (`12px`) and semi-transparent dark background
- AND cards show a green border tint (`rgba(111, 240, 115, 0.08)`) on hover

### Requirement: Card Content Elements

Each card MUST display: project icon or logo, project name, short description (1-2 sentences), 1-4 tech badges via ProjectBadge component, and a GitHub link.

#### Scenario: Card shows all required information

- GIVEN the Brick.draw card is rendered
- THEN it displays the project name "Brick.draw"
- AND a short description of the drawing tool
- AND at least one tech badge (e.g., "TypeScript", "React")
- AND a clickable GitHub link pointing to the repository

### Requirement: Bilingual Descriptions

All project names and descriptions MUST be bilingual via i18n keys (`ecosystem.brickdraw.name`, `ecosystem.brickdraw.description`, etc.).

#### Scenario: Descriptions switch language

- GIVEN the language is ES
- WHEN EcosystemSection renders
- THEN project descriptions show Spanish text
- WHEN the language switches to EN
- THEN descriptions update to English without remounting

### Requirement: Staggered Entrance Animation

Cards SHOULD use framer-motion for staggered entrance animations (sequential fade-up with increasing delay per card).

#### Scenario: Cards animate sequentially on scroll

- GIVEN the user scrolls toward EcosystemSection
- WHEN the section enters the viewport
- THEN card 1 animates in first, card 2 follows with a short delay, card 3 last
- AND the animation does not trigger again on re-scroll

### Requirement: GitHub Link Visibility

GitHub links MUST be clearly identifiable (icon or text label) and open in a new tab (`target="_blank" rel="noopener noreferrer"`).

#### Scenario: GitHub link opens repository

- GIVEN a project card with a GitHub link
- WHEN the user clicks the link
- THEN the project GitHub repository opens in a new browser tab
