# Tasks: OpenCohost Rebrand

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~90-100 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Data & Types (Foundation)

- [x] 1.1 Add `website?: string` to `Project` interface in `src/types/index.ts`
- [x] 1.2 Rename VoiceAI→OpenCohost in `src/data/orgData.ts`: key→`opencohost`, name→`OpenCohost`, desc→new ES copy, tech→`['TypeScript','Ollama','Python','Tauri']`, add `website: 'https://www.opencohost.com'`
- [x] 1.3 Replace `voiceai`→`opencohost` ecosystem keys in `src/data/translations.ts` ES (lines 31-34) + EN (lines 123-126); update `contribute.codeExample` ES line 63 + EN line 155: `feat(voiceai)`→`feat(opencohost)`

## Phase 2: Component & Styles (Core)

- [x] 2.1 Apply `ecosystem__card-wrap--featured` class in `src/features/EcosystemSection/EcosystemSection.tsx` when `project.key === 'opencohost'`; conditional `<a>` website link in coming-soon footer; add `Tauri`/`TypeScript` to `badgeVariantMap`
- [x] 2.2 Add featured-card styles to `src/features/EcosystemSection/EcosystemSection.css`: `--featured::before` green lattice grid (60px, z-index 0), `z-index: 1` on card, bold font-weight selectors for `__card-name` + `__coming-soon`, `__card-footer--row` flex, `__website-link` styles

## Phase 3: Static Content

- [x] 3.1 Update JSON-LD `SoftwareApplication` block in `index.html` (lines 83-89): `"VoiceAI"`→`"OpenCohost"`, update description and `applicationCategory`
- [x] 3.2 Update README table (line 16): `**VoiceAI**`→`**OpenCohost**`, update tech description

## Phase 4: Verification

- [x] 4.1 Run `tsc -b` + `vite build`; confirm zero `voiceai` references with `rg voiceai` (only `openspec/archive/` allowed)
- [ ] 4.2 Manual check: 3 cards render at 320/768/1024/1440px; OpenCohost card shows lattice + bold; ES↔EN toggle resolves all `ecosystem.opencohost.*` keys
