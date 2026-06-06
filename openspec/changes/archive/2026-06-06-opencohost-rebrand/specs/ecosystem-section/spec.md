# Delta for Ecosystem Section

## MODIFIED Requirements

### Requirement: Project Grid

EcosystemSection MUST display 3 project cards in a responsive grid: Brick.draw, LiveAudio, and OpenCohost.
(Previously: VoiceAI was the third project instead of OpenCohost)

#### Scenario: All three projects displayed

- GIVEN EcosystemSection is rendered
- THEN 3 cards are visible in a grid layout (single column on mobile, multi-column on desktop)
- AND cards correspond to Brick.draw, LiveAudio, and OpenCohost

### Requirement: Card Content Elements

Each card MUST display: project icon or logo, project name, short description (1-2 sentences), 1-4 tech badges via ProjectBadge component, and a GitHub link. Coming-soon cards MAY also display an external website link.
(Previously: external website links were not supported)

#### Scenario: Card shows all required information

- GIVEN the Brick.draw card is rendered
- THEN it displays the project name "Brick.draw"
- AND a short description of the drawing tool
- AND at least one tech badge (e.g., "TypeScript", "React")
- AND a clickable GitHub link pointing to the repository

#### Scenario: Coming-soon card displays website link

- GIVEN a coming-soon project card has a `website` property
- WHEN the card renders
- THEN an anchor element with the website URL is displayed in the card footer
- AND the link opens in a new tab (`target="_blank" rel="noopener noreferrer"`)

### Requirement: Bilingual Descriptions

All project names and descriptions MUST be bilingual via i18n keys (`ecosystem.brickdraw.name`, `ecosystem.opencohost.name`, etc.).
(Previously: used `ecosystem.voiceai.*` keys instead of `ecosystem.opencohost.*`)

#### Scenario: Descriptions switch language

- GIVEN the language is ES
- WHEN EcosystemSection renders
- THEN project descriptions show Spanish text
- WHEN the language switches to EN
- THEN descriptions update to English without remounting

#### Scenario: OpenCohost translations resolve

- GIVEN the app calls `t("ecosystem.opencohost.name")` and `t("ecosystem.opencohost.desc")`
- WHEN the component renders
- THEN valid "OpenCohost" name and translated description strings are returned in both ES and EN

## ADDED Requirements

### Requirement: Featured Card Visual Treatment

The OpenCohost card MUST render with a green lattice background pattern, scoped via a CSS modifier class (e.g., `ecosystem__card--featured`). The lattice SHALL use a grid pattern adapted from the ArchitectureSection visual style.

#### Scenario: OpenCohost card has lattice background

- GIVEN the OpenCohost card is rendered in the ecosystem grid
- THEN a green-tinted linear-gradient lattice pattern is visible behind the card content
- AND no other project cards display the lattice treatment

#### Scenario: Lattice does not bleed into other cards

- GIVEN the ecosystem grid renders all 3 cards
- WHEN the OpenCohost card has the featured modifier class
- THEN Brick.draw and LiveAudio cards retain only the default glassmorphic background

### Requirement: Featured Card Bold Text

The OpenCohost card's project name and coming-soon badge MUST use bold font-weight (`var(--font-weight-bold)` / `700`).

#### Scenario: Bold emphasis on featured card name

- GIVEN the OpenCohost card is rendered with the featured modifier class
- THEN the project name text has `font-weight: 700`
- AND the "Próximamente" / "Coming Soon" badge text has `font-weight: 700`

#### Scenario: Other cards retain normal weight

- GIVEN Brick.draw and LiveAudio cards are rendered
- THEN their project names and badges use the default font weight (not 700)
