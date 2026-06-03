# Contribution Section Specification

## Purpose

Guide for contributors: workflow steps (Fork → Branch → PR → Review), community links (GitHub org, Discord), Code of Conduct reference, and conventional commit examples.

## Requirements

### Requirement: Contribution Workflow Steps

ContributeSection MUST display the contribution workflow as a sequence: Fork → Branch → PR → Review, using visual steps or numbered cards.

#### Scenario: Four workflow steps visible

- GIVEN ContributeSection is rendered
- THEN 4 sequential steps are displayed: Fork, Branch, Pull Request, Review
- AND each step has a brief description of what it entails

### Requirement: Community Links

ContributeSection MUST include clickable links to the Plynte Labs GitHub organization and the Discord community server.

#### Scenario: GitHub and Discord links present

- GIVEN ContributeSection renders
- THEN a visible link points to the Plynte Labs GitHub org
- AND a visible link points to the Discord server
- AND both links open in new tabs

### Requirement: Code of Conduct Reference

ContributeSection MUST mention or link to the project Code of Conduct.

#### Scenario: CoC visible

- GIVEN ContributeSection is rendered
- THEN a reference to the Code of Conduct is present in the text
- AND if a separate CoC file exists, a link to it is provided

### Requirement: Bilingual Content

All text in ContributeSection MUST be bilingual (ES/EN) via i18n keys under `contribute.*`.

#### Scenario: Language switch covers contribution content

- GIVEN the language is ES
- WHEN ContributeSection renders
- THEN all text displays in Spanish
- WHEN language switches to EN
- THEN all text updates to English

### Requirement: Conventional Commits Snippet

ContributeSection SHOULD include a code snippet or formatted example showing conventional commit prefixes: `feat:`, `fix:`, `docs:`, `chore:`, etc.

#### Scenario: Commit format examples displayed

- GIVEN ContributeSection is rendered
- THEN a styled code block shows conventional commit format
- AND example prefixes like `feat:` and `fix:` are visible

### Requirement: Section Heading

ContributeSection MUST include a bilingual section heading (e.g., "Contribute" / "Contribuir").

#### Scenario: Heading visible and bilingual

- GIVEN language is EN
- WHEN ContributeSection renders
- THEN the heading reads "Contribute"
- WHEN language switches to ES
- THEN the heading reads "Contribuir"
