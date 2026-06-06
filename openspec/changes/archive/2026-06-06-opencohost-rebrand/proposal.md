# Proposal: OpenCohost Rebrand

## Intent

Rename the VoiceAI project card to OpenCohost, add a green-tinted lattice background treatment to its card, apply bold weight emphasis to key text, keep the "Próximamente" coming-soon status, and link to `www.opencohost.com`. This positions OpenCohost as a visually distinct hero project within the ecosystem grid while VoiceAI transitions out.

## Scope

### In Scope
- Rename project `key: "voiceai"` → `key: "opencohost"`, name → "OpenCohost", update tech stack and description
- Extend `Project` interface with optional `website?: string` field
- Add external website link as an `<a>` element inside the coming-soon card footer (alongside "Próximamente")
- Apply green lattice background (`::before` pseudo-element with `linear-gradient` grid, adapted from ArchitectureSection pattern) scoped to the OpenCohost card only
- Bold font-weight (`var(--font-weight-bold)` / `700`) on the project name and "Próximamente" label for the OpenCohost card
- Update ES/EN translations: `voiceai.*` keys → `opencohost.*` keys, plus `codeExample` commit scope
- Update JSON-LD structured data in `index.html` (VoiceAI → OpenCohost)
- Update README table row (VoiceAI → OpenCohost)

### Out of Scope
- Changing the coming-soon status (remains "Próximamente")
- Making the entire card clickable (website link is an explicit child anchor, per existing GlassCard contract)
- New visual treatments for Brick.draw or LiveAudio cards
- New capability specs — no new system behaviors

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- **ecosystem-section**: Project name changed (VoiceAI → OpenCohost), card content now supports optional external website links on coming-soon cards, visual lattice treatment for one card
- **i18n-org-copy**: VoiceAI translation keys replaced with OpenCohost keys across ES/EN, `codeExample` commit scope updated

## Approach

1. **Data layer** — Update `src/data/orgData.ts` (key, name, desc, tech), add `website` to `src/types/index.ts` `Project` interface
2. **Translations** — Replace `voiceai.*` key group with `opencohost.*` in `src/data/translations.ts` (ES: lines 31-34, EN: lines 123-126), update `codeExample` at ES:63/EN:155
3. **Rendering** — In `EcosystemSection.tsx`, add a conditional `<a>` for `project.website` in the coming-soon footer row, apply a CSS modifier class like `ecosystem__card--featured` for the OpenCohost card
4. **CSS** — Add `.ecosystem__card--featured::before` with green lattice `linear-gradient` (grid pattern), `.ecosystem__card--featured .ecosystem__card-name` with `font-weight: 700`, and `.ecosystem__card--featured .ecosystem__coming-soon` with bolder weight
5. **Static files** — Update `index.html` JSON-LD block (lines 83-89) and `README.md` table row (line 16)

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/orgData.ts` | Modified | VoiceAI entry → OpenCohost entry |
| `src/data/translations.ts` | Modified | voiceai.* keys → opencohost.* keys (ES + EN), codeExample scope |
| `src/types/index.ts` | Modified | `Project` interface: add `website?: string` |
| `src/features/EcosystemSection/EcosystemSection.tsx` | Modified | Website link rendering, featured card class |
| `src/features/EcosystemSection/EcosystemSection.css` | Modified | `.ecosystem__card--featured` with lattice, bold weight |
| `index.html` | Modified | JSON-LD VoiceAI → OpenCohost |
| `README.md` | Modified | Table row VoiceAI → OpenCohost |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Existing engram/SDD artifacts reference `voiceai` key | Low | Key only used in translations and orgData; grep before rename |
| Lattice pattern bleed into other cards | Low | Scoped via `.ecosystem__card--featured` class, not global |
| Website link breaks `rel="noopener noreferrer"` expectation | Low | OpenCohost is same-org domain; still apply `target="_blank"` |

## Rollback Plan

1. Revert `src/data/orgData.ts` — restore `key: "voiceai"`, remove `website`
2. Revert `src/data/translations.ts` — restore `voiceai.*` key group
3. Revert `src/types/index.ts` — remove `website` field
4. Revert `EcosystemSection.tsx` and `.css` — remove featured class and link logic
5. Revert `index.html` and `README.md` — restore VoiceAI references
6. Rebuild and verify all 3 cards render without errors

## Dependencies

- `www.opencohost.com` must be live at deploy time

## Success Criteria

- [ ] OpenCohost card renders with name "OpenCohost", green lattice background, bold name/status
- [ ] "Próximamente" / "Coming Soon" badge still present
- [ ] Website link points to `https://www.opencohost.com` and opens in new tab
- [ ] All 3 ecosystem cards render without layout break at all breakpoints (mobile, tablet, desktop)
- [ ] ES and EN translations resolve correctly via `t("ecosystem.opencohost.name")` and `t("ecosystem.opencohost.desc")`
- [ ] No `voiceai` references remain in source code, translations, or static files
