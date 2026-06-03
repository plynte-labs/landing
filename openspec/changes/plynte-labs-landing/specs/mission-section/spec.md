# Mission Section Specification

## Purpose

Plynte Labs mission statement, explicit MIT license commitment, and brief maintainer information with subtle personal links.

## Requirements

### Requirement: Mission Statement

MissionSection MUST display the Plynte Labs mission and philosophy statement, conveying the org's purpose as an open-source software laboratory for productivity tooling and AI-driven audio infrastructure.

#### Scenario: Mission text displayed

- GIVEN MissionSection is rendered
- THEN a mission statement paragraph is visible
- AND it mentions open-source, productivity tooling, and AI audio infrastructure

### Requirement: Explicit MIT License

MissionSection MUST explicitly mention the MIT license as the org's licensing commitment.

#### Scenario: MIT license referenced in text

- GIVEN MissionSection is rendered
- THEN the phrase "MIT license" or "MIT" appears in the section text
- AND it conveys that all org projects are MIT-licensed

### Requirement: Maintainer Information

MissionSection MUST include brief maintainer information: name and role (e.g., "Gustavo Francisco — Founder & Lead Engineer"), but NOT a full personal portfolio.

#### Scenario: Maintainer visible without personal portfolio

- GIVEN MissionSection is rendered
- THEN the maintainer's name and role are visible
- AND the content is limited to 1-2 lines (not a full biography)

### Requirement: Bilingual Content

All text in MissionSection MUST be bilingual (ES/EN) via i18n keys under `mission.*`.

#### Scenario: Mission content switches language

- GIVEN language switches from ES to EN
- WHEN MissionSection renders
- THEN all text updates to the correct language

### Requirement: Subtle Personal Links

MissionSection SHOULD include subtle links to the maintainer's personal GitHub and/or LinkedIn, styled as secondary text links (not primary CTAs).

#### Scenario: Personal links present but understated

- GIVEN MissionSection is rendered
- THEN links to personal GitHub/LinkedIn exist
- AND they are styled as subtle secondary links (not competing with org CTAs)

### Requirement: Section Heading

MissionSection MUST include a bilingual heading (e.g., "Mission" / "Misión").

#### Scenario: Heading visible

- GIVEN language is EN
- WHEN MissionSection renders
- THEN the heading reads "Mission"
- WHEN language switches to ES
- THEN the heading reads "Misión"
