# seo-bilingual Specification

## Purpose

Defines bilingual SEO metadata requirements for the Plynte Labs landing page. The page MUST serve Spanish as the default language and declare English as an alternate via hreflang tags. Open Graph image dimensions MUST be complete so social platforms render preview cards correctly.

## Requirements

### Requirement: Hreflang Alternate Language Links

The static `index.html` MUST include `<link rel="alternate" hreflang="...">` tags for both Spanish (es) and English (en) variants. The ES tag MUST be a self-reference. The EN tag MUST point to the same URL with `?lang=en`.

#### Scenario: Spanish self-referencing hreflang

- GIVEN a crawler loads the landing page
- WHEN it parses the `<head>` section
- THEN a `<link rel="alternate" hreflang="es" href="{canonical-url}">` tag MUST be present
- AND the URL MUST NOT contain `?lang=en`

#### Scenario: English alternate hreflang

- GIVEN a crawler loads the landing page
- WHEN it parses the `<head>` section
- THEN a `<link rel="alternate" hreflang="en" href="{canonical-url}?lang=en">` tag MUST be present

#### Scenario: Both hreflang tags coexist

- GIVEN the landing page HTML
- WHEN rendered
- THEN at minimum the ES and EN hreflang tags MUST be present
- AND a future `hreflang="x-default"` MAY be added pointing to the Spanish variant

### Requirement: Spanish Default Metadata

The static `index.html` MUST default to Spanish for all SEO-relevant metadata: `<title>`, `<meta property="og:title">`, `<meta name="twitter:title">`, and `<meta property="og:locale">`. The `<html lang>` attribute MUST remain `es`.

#### Scenario: Spanish default title

- GIVEN a crawler loads the landing page without any `?lang` parameter
- WHEN it reads the `<title>` tag
- THEN the content MUST be "Plynte Labs — Laboratorio de Software Open-Source"

#### Scenario: Spanish Open Graph and Twitter defaults

- GIVEN a crawler loads the landing page without `?lang`
- WHEN it reads `<meta property="og:title">` and `<meta name="twitter:title">`
- THEN both MUST contain the Spanish default title
- AND `<meta property="og:locale">` MUST be `es_MX`

#### Scenario: HTML lang attribute unchanged

- GIVEN the static `index.html`
- WHEN rendered
- THEN `<html lang="es">` MUST remain unchanged

### Requirement: Open Graph Image Dimensions

The `SEOHead` component MUST output `<meta property="og:image:width" content="1000">` and `<meta property="og:image:height" content="1000">` alongside the existing `og:image` tag. These dimensions MUST match the actual preview image asset.

#### Scenario: Complete og:image dimensions

- GIVEN any page renders `<SEOHead>` with image props
- WHEN the component mounts
- THEN the `<head>` MUST contain `og:image:width` with `content="1000"`
- AND MUST contain `og:image:height` with `content="1000"`

#### Scenario: Dimensions match referenced image

- GIVEN `og:image` references the Plynte Labs preview image (`og-image.png`)
- WHEN a social platform requests the image
- THEN the image MUST have actual dimensions 1000×1000
- AND `og:image:width` and `og:image:height` values MUST match those dimensions
