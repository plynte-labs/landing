# Proposal: Align Public License Claims

## Intent

Public copy currently makes absolute MIT-license claims about all Plynte Labs work. OpenCohost is listed as coming soon with no public repository/license, so the site should state the precise policy: public open-source repositories use MIT unless the repository states otherwise.

## Scope

### In Scope
- Replace absolute MIT claims in landing copy, docs, SEO metadata, and JSON-LD.
- Keep existing repo/license files unchanged.
- Add minimal OpenSpec deltas for affected public-copy requirements.

### Out of Scope
- Changing actual repository licenses.
- Publishing or licensing OpenCohost.
- Reworking project status cards or GitHub links.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `mission-section`: License copy must be precise and repository-scoped.
- `architecture-section`: MIT pillar must refer to public open-source repositories, not all projects.
- `hero-section`: MIT badge must avoid implying every project is MIT-licensed.

## Approach

Update source copy where public claims are rendered (`src/i18n/ui.ts`, `src/content/pillars.json`, docs, SEO data). Use concise wording so crawlers and readers see the same legal boundary. Validate with the existing Astro build.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/i18n/ui.ts` | Modified | Landing, mission, hero, and SEO strings. |
| `src/content/pillars.json` | Modified | Architecture pillar card copy. |
| `src/content/docs/*/getting-started.md` | Modified | Public onboarding docs. |
| `src/data/seo.ts` | Modified | JSON-LD organization description. |
| `openspec/changes/align-public-license-claims/` | New | Proposal and delta specs. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Copy becomes too vague for OSS positioning | Low | Keep MIT mentioned, scoped to public repos. |
| SEO metadata diverges from visible copy | Low | Update visible text and JSON-LD together. |

## Rollback Plan

Revert this change folder and copy edits with git. No license files or runtime behavior are changed.

## Dependencies

- None.

## Success Criteria

- [ ] No public copy claims all projects/everything are MIT-licensed.
- [ ] Public policy says public open-source repositories use MIT unless the repo states otherwise.
- [ ] OpenCohost coming-soon copy is not covered by an absolute license claim.
- [ ] `pnpm build` passes.
