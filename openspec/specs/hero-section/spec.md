# Hero Section Specification

## Purpose

Org hero displaying the Plynte Labs logo with scale animation, bilingual tagline with green text-glow accent, particle background, and primary CTA scrolling to the ecosystem section.

## Requirements

### Requirement: Logo Display

HeroSection MUST display the logo from `public/plynte logo2.png` (1000x1000, black background) centered with a scale animation on mount.

#### Scenario: Logo renders with entrance animation

- GIVEN the landing page loads for the first time
- WHEN HeroSection mounts
- THEN the Plynte Labs logo is visible and horizontally centered
- AND a scale-in or fade-up animation plays on appearance

### Requirement: Bilingual Tagline

HeroSection MUST display the org tagline via the i18n system (`t("hero.tagline")`) in both ES and EN.

#### Scenario: Tagline switches language

- GIVEN the language is set to ES
- WHEN HeroSection renders
- THEN the tagline shows the Spanish version
- WHEN language switches to EN
- THEN the tagline updates to the English version without page reload

### Requirement: ParticleField Background

HeroSection MUST render the existing ParticleField component (`count={150}`) as its background layer.

#### Scenario: Particles animate behind content

- GIVEN HeroSection is mounted
- WHEN the page is viewed
- THEN animated floating particles appear behind the logo and text
- AND text and logo remain legible (particles do not obstruct readability)

### Requirement: Primary CTA Button

HeroSection MUST include a CTA button labeled "Explore Projects" (EN) / "Explorar Proyectos" (ES) that scrolls to EcosystemSection.

#### Scenario: CTA scrolls to ecosystem section

- GIVEN HeroSection is rendered with the ecosystem section present below
- WHEN the CTA button is clicked
- THEN the viewport smoothly scrolls to EcosystemSection

### Requirement: MIT License Badge

HeroSection MUST display an "MIT Licensed" badge near the CTA or logo area.

#### Scenario: MIT badge is visible

- GIVEN HeroSection renders
- THEN an "MIT Licensed" badge is displayed
- AND the badge is styled consistently with the glassmorphism theme

### Requirement: Green Accent with Text Glow

CTA button and highlighted text spans MUST use the brand green accent `#6FF073` with a CSS text-glow (`text-shadow`) effect.

#### Scenario: Green glow visible on accent elements

- GIVEN HeroSection is rendered
- THEN the CTA button background or border uses `#6FF073`
- AND key text highlights show a green text-shadow glow effect

### Requirement: Dark Background

HeroSection background MUST use `#000000` or a near-black variant (`#050505`, `#0a0a0a`).

#### Scenario: Background is pure black

- GIVEN HeroSection is rendered
- THEN the section background color is `#000000` or a near-black variant
- AND the logo with black background blends seamlessly
