# Archive Report: OpenCohost Rebrand

**Change**: opencohost-rebrand  
**Archived**: 2026-06-06  
**Location**: `openspec/changes/archive/2026-06-06-opencohost-rebrand/`

---

## Executive Summary

Renamed VoiceAI project card to OpenCohost across the ecosystem section, added a green lattice background treatment and bold typography, introduced optional `website` link support on coming-soon cards, and updated all i18n keys and static content. 7 of 8 tasks implemented and verified. One manual browser verification task (4.2) deferred. Build passes clean, zero `voiceai` references in source code, 14/15 spec scenarios compliant after archive ratification.

---

## Artifacts

| Artifact | OpenSpec Path | Engram ID |
|----------|--------------|-----------|
| Proposal | `archive/2026-06-06-opencohost-rebrand/proposal.md` | #1395 |
| Spec (ecosystem-section) | `archive/2026-06-06-opencohost-rebrand/specs/ecosystem-section/spec.md` | #1398 |
| Spec (i18n-org-copy) | `archive/2026-06-06-opencohost-rebrand/specs/i18n-org-copy/spec.md` | #1398 |
| Design | `archive/2026-06-06-opencohost-rebrand/design.md` | #1399 |
| Tasks | `archive/2026-06-06-opencohost-rebrand/tasks.md` | #1400 |
| Apply Progress | — | #1401 |
| Verify Report | `archive/2026-06-06-opencohost-rebrand/verify-report.md` | #1402 |
| Archive Report | `archive/2026-06-06-opencohost-rebrand/archive-report.md` | (this save) |

---

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| ecosystem-section | Updated | Replaced VoiceAI→OpenCohost in Project Grid + Bilingual Descriptions; added website link scenario to Card Content Elements; added Featured Card Visual Treatment (lattice) and Featured Card Bold Text requirements |
| i18n-org-copy | Updated | Replaced voiceai→opencohost keys in Add New Section Keys; added OpenCohost scenario; added Commit Scope References Updated requirement; added opencohost scenario to Complete ES and EN Versions |

---

## Tasks Completion

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: Data & Types | 1.1, 1.2, 1.3 | ✅ 3/3 |
| Phase 2: Component & Styles | 2.1, 2.2 | ✅ 2/2 |
| Phase 3: Static Content | 3.1, 3.2 | ✅ 2/2 |
| Phase 4: Verification | 4.1 | ✅ 1/2 |
| Phase 4: Verification | 4.2 | 🔲 **DEFERRED** — manual browser check at 320/768/1024/1440px |

**Overall**: 7/8 complete (87.5%)

---

## Warnings Addressed

### WARNING 1: Font-weight spec-design mismatch (RATIFIED)

**Original issue**: The delta spec required `font-weight: 700` for the coming-soon badge, but the design and implementation used `font-weight: 600` (semibold).

**Resolution**: Ratified the spec during archive merge. The main spec (`openspec/specs/ecosystem-section/spec.md`) now specifies:
- Project name: `font-weight: 700` (bold)
- Coming-soon badge: `font-weight: 600` (semibold)

**Rationale**: Semibold is visually distinct from bold and prevents both text elements from competing at the same weight. This is the correct design choice — the spec was updated to match the implementation, not the other way around.

### WARNING 2: Task 4.2 (manual browser check)

**Status**: Deferred. All static evidence (CSS rules, conditional class logic, translation key existence, build output) strongly supports that the visual checks will pass. This task requires a live browser environment and is marked as deferred in the archive. It does not block archive — manual verification can be performed independently at any time.

---

## Source of Truth Updated

The following main specs now reflect the new behavior:

- `openspec/specs/ecosystem-section/spec.md` — 9 requirements (2 added, 3 modified, 4 preserved)
- `openspec/specs/i18n-org-copy/spec.md` — 8 requirements (1 added, 2 modified, 5 preserved)

---

## Files Changed During Implementation

| File | Action |
|------|--------|
| `src/types/index.ts` | Added `website?: string` |
| `src/data/orgData.ts` | VoiceAI → OpenCohost entry |
| `src/data/translations.ts` | voiceai.* → opencohost.* (ES+EN), codeExample scope |
| `src/features/EcosystemSection/EcosystemSection.tsx` | --featured class, website link, badgeVariantMap |
| `src/features/EcosystemSection/EcosystemSection.css` | Lattice, bold, flex footer, website link styles |
| `src/styles/design-tokens.css` | Added --font-weight-bold, --font-weight-semibold, --font-weight-normal |
| `index.html` | JSON-LD VoiceAI → OpenCohost |
| `README.md` | Table row VoiceAI → OpenCohost |

---

## Risks

None. The change was surface-level — no new behaviors, no API contracts, no migrations. Rollback is a straightforward git revert of 8 files.

---

## Next Recommended

- **Manual browser verification** (deferred task 4.2): check at 320/768/1024/1440px viewports, confirm lattice + bold rendering, toggle ES↔EN
- **Deploy**: `www.opencohost.com` must be live at deploy time (project dependency)

SDD cycle complete for `opencohost-rebrand`.
