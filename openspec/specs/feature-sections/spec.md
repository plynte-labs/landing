# Feature Sections

## Requirements

### Requirement: Token-Based Backgrounds

Feature section background colors MUST use CSS custom property references (`var(--color-dark-bg)`), not hardcoded hex values. This ensures visual consistency across sections and enables future theme switching.

#### Scenario: HeroSection background uses design token

- GIVEN `src/features/HeroSection/HeroSection.css`
- WHEN inspecting the `.hero` class background property
- THEN it is `var(--color-dark-bg)`
- AND no hardcoded `#000000` background value remains

#### Scenario: ArchitectureSection background uses design token

- GIVEN `src/features/ArchitectureSection/ArchitectureSection.css`
- WHEN inspecting the `.architecture` class background property
- THEN it is `var(--color-dark-bg)`
- AND no hardcoded `#000000` background value remains

#### Scenario: MissionSection background uses design token

- GIVEN `src/features/MissionSection/MissionSection.css`
- WHEN inspecting the `.mission` class background property
- THEN it is `var(--color-dark-bg)`
- AND no hardcoded `#000000` background value remains
