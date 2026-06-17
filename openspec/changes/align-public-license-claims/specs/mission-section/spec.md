# mission-section Specification Delta

## MODIFIED Requirements

### Requirement: Precise MIT License Notice

MissionSection MUST mention MIT licensing only as a policy for public open-source repositories. It MUST NOT claim that all Plynte Labs projects, all unpublished work, or coming-soon products are MIT-licensed.

#### Scenario: Repository-scoped MIT notice

- GIVEN MissionSection is rendered
- THEN the section text states that public open-source repositories use MIT unless a repository states otherwise
- AND it does not say all projects, everything built, or every line of code is MIT-licensed
