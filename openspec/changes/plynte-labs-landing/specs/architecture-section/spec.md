# Architecture Section Specification

## Purpose

Four technical pillars defining Plynte Labs' engineering approach: Local-First, MIT License, CI/CD Pipelines, and Hardware Acceleration. Presented as glassmorphic icon cards with a diagram/blueprint aesthetic.

## Requirements

### Requirement: Four Pillar Cards

ArchitectureSection MUST display 4 technical pillar cards with icon, title, and description: Local-First, MIT License, CI/CD Pipelines, and Hardware Acceleration.

#### Scenario: All four pillars rendered

- GIVEN ArchitectureSection is rendered
- THEN 4 cards are visible in a grid or row layout
- AND each card has a representative icon, a title, and a 1-2 sentence description

### Requirement: Bilingual Content

All pillar titles and descriptions MUST be bilingual (ES/EN) via i18n keys (`architecture.pillars.localFirst.title`, etc.).

#### Scenario: Pillar content switches language

- GIVEN the language is set to ES
- WHEN ArchitectureSection renders
- THEN all pillar content displays in Spanish
- WHEN the language switches to EN
- THEN all pillar content updates to English

### Requirement: Glassmorphism Styling

Each pillar card MUST use glassmorphism styling: backdrop-filter blur, semi-transparent dark background, and a subtle green accent on hover.

#### Scenario: Glass effect on pillar cards

- GIVEN ArchitectureSection is rendered
- THEN cards display backdrop-filter blur
- AND a semi-transparent dark background is visible
- WHEN hovering over a card
- THEN a subtle green glow appears on the border

### Requirement: Blueprint / Diagram Aesthetic

The section SHOULD use a blueprint or technical diagram aesthetic with connecting lines between cards or a grid layout reminiscent of architecture diagrams.

#### Scenario: Diagram-style visual treatment

- GIVEN ArchitectureSection is rendered
- THEN connecting lines or a diagram-like grid layout is visible between cards
- AND the visual treatment reinforces the "technical architecture" message

### Requirement: Section Heading

ArchitectureSection MUST include a section heading or title (e.g., "How We Build" / "Cómo Construimos") using the i18n system.

#### Scenario: Section title displayed

- GIVEN ArchitectureSection renders
- THEN a bilingual section title is visible above the pillar cards
