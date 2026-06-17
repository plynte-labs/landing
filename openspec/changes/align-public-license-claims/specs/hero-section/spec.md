# hero-section Specification Delta

## MODIFIED Requirements

### Requirement: Repository-Scoped MIT Badge

HeroSection MUST display a short badge about the public open-source MIT policy without implying all Plynte Labs work is MIT-licensed.

#### Scenario: Badge avoids absolute license claim

- GIVEN HeroSection renders
- THEN a badge communicates that public open-source repositories are MIT by default
- AND it does not imply unpublished or coming-soon projects are MIT-licensed
