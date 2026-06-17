# architecture-section Specification Delta

## MODIFIED Requirements

### Requirement: MIT Pillar Is Repository-Scoped

ArchitectureSection MUST keep the MIT License pillar, but its description MUST scope the MIT policy to public open-source repositories unless a repository states otherwise.

#### Scenario: MIT pillar avoids absolute project claims

- GIVEN ArchitectureSection is rendered
- THEN the MIT License pillar says public open-source repositories use MIT unless a repository states otherwise
- AND it does not claim every project is open source or MIT-licensed
