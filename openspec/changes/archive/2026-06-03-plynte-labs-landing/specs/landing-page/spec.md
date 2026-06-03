# Landing Page Specification

## Purpose

Single scrollable page aggregating all Plynte Labs org landing sections. Serves as the sole route (`"/"`) replacing the previous 5-route SPA.

## Requirements

### Requirement: Section Composition

LandingPage MUST render all 5 sections in order: HeroSection, EcosystemSection, ArchitectureSection, ContributeSection, MissionSection.

#### Scenario: All sections render in correct order

- GIVEN the app is loaded at `"/"`
- WHEN the LandingPage mounts
- THEN HeroSection is the first visible section
- AND EcosystemSection, ArchitectureSection, ContributeSection, MissionSection follow sequentially

### Requirement: TypeScript Strict Compliance

The page and all its dependencies MUST compile with `tsc -b` under strict mode (noUnusedLocals, noUnusedParameters enabled in tsconfig.app.json).

#### Scenario: TypeScript build passes clean

- GIVEN all source files including new landing page components exist
- WHEN `tsc -b` is executed
- THEN zero TypeScript errors are reported
- AND no unused local variable or parameter warnings appear

### Requirement: LanguageProvider Wrapper

LandingPage MUST render inside the LanguageProvider context via MainLayout, not as a standalone route that bypasses i18n.

#### Scenario: Bilingual toggle covers all sections

- GIVEN the app is rendered on `"/"` via MainLayout
- WHEN the LanguageSwitcher toggles from ES to EN
- THEN text content in all 5 sections updates to English
- AND the `<html lang>` attribute updates accordingly

### Requirement: Smooth Scroll Navigation

The page SHOULD support smooth scroll between sections via anchor links or `scrollIntoView({ behavior: "smooth" })`.

#### Scenario: Nav link scrolls to target section

- GIVEN the landing page is fully rendered
- WHEN a navigation link targeting `"#ecosystem"` is clicked
- THEN the viewport smoothly scrolls to EcosystemSection
- AND the section is visible at the top of the viewport

### Requirement: Single Route Integration

LandingPage MUST be the only non-error route in AppRouter, replacing Home, About, Portfolio, and Details routes.

#### Scenario: Only landing and 404 routes exist

- GIVEN the router configuration
- WHEN a URL `"/"` is requested
- THEN LandingPage renders
- WHEN a URL `"/anything-else"` is requested
- THEN the 404 page renders
