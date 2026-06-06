# Design: Refactor GlassCard — Explicit Variant Components

## Technical Approach

Split `GlassCard.tsx`'s 4 boolean-driven render paths into 4 explicit named exports, each declaring only the props it needs. A shared internal `GlassCardBase` handles className concatenation and polymorphic element rendering via an `as` prop. All variants apply the same `.glass-card` CSS class. Consumers import the exact variant matching their usage.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `GlassCardBase` with `as` prop | DRY: one className-combine + render path. Introduces `React.ElementType` pattern. Codebase has no polymorphic components today. | **Chosen** — single source of truth for className logic; each variant becomes 1-5 lines. |
| `combineClass()` helper + inline renders per variant | Follows existing codebase patterns (no generics). Duplicates `['glass-card', className].filter(Boolean).join(' ')` in 4 places. | Rejected — DRY violation for a core visual concern. |
| Split into separate files per variant | Satisfies `SHALL NOT import framer-motion` literally. Adds 4 files for 5-line components. | Rejected — tree-shaking already eliminates unused `motion` from bundles; separate files overkill. |

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep `motionProps` as rest spread on `GlassCardMotion` | Spec scenario shows `whileHover`, `initial`, `animate` as direct props. Spreading is simpler for consumers. | **Chosen** — motion props spread naturally via `GlassCardBase` rest; no wrapper object. |
| Wrap motion props in a `motion` object prop | Explicit grouping. Extra nesting in JSX (`motion={{ whileHover: {...} }}`). | Rejected — spec scenarios show direct prop passing, not wrapped. |

## Consumer Mapping

| Consumer | Current Props | Maps To | Reason |
|----------|-------------|---------|--------|
| `HeroSection.tsx` | `<GlassCard className>` | `GlassCard` (div) | No href, no motionProps |
| `ContributeSection.tsx` | `<GlassCard className>` | `GlassCard` (div) | No href, no motionProps |
| `MissionSection.tsx` | `<GlassCard className>` | `GlassCard` (div) | No href, no motionProps |
| `ArchitectureSection.tsx` | `<GlassCard className>` | `GlassCard` (div) | No href, no motionProps |
| `EcosystemSection.tsx` | `<GlassCard href={...} className>` | `GlassCardLink` (a) | href present |

## Component Tree

```
GlassCardBase (internal, as={ElementType})
├── GlassCard          ──→ as="div" (default)
├── GlassCardLink      ──→ as="a"     + target/_blank + rel
├── GlassCardMotion    ──→ as={motion.div} + spread motion props
└── GlassCardMotionLink ──→ as="a" (wraps motion.div children)
```

## Interfaces / Contracts

```tsx
// Internal base — not exported
interface GlassCardBaseProps {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
}

// Public variants — each only declares its needed props
interface GlassCardProps       { children: ReactNode; className?: string; }
interface GlassCardLinkProps   { children: ReactNode; className?: string; href: string; }
interface GlassCardMotionProps { children: ReactNode; className?: string; motionProps?: MotionAttrs; }
interface GlassCardMotionLinkProps { children: ReactNode; className?: string; href: string; motionProps?: MotionAttrs; }
```

`MotionAttrs` carries over from current code: `Omit<HTMLMotionProps<'div'>, 'children' | 'className'>`. Only `GlassCardMotion` and `GlassCardMotionLink` reference framer-motion symbols.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/UI/GlassCard/GlassCard.tsx` | Rewrite | Replace single boolean-branching component with `GlassCardBase` + 4 named exports (`GlassCard`, `GlassCardLink`, `GlassCardMotion`, `GlassCardMotionLink`) |
| `src/components/UI/GlassCard/GlassCard.css` | Unchanged | All variants share `.glass-card` class |
| `src/features/HeroSection/HeroSection.tsx` | Modify | Import `GlassCard` (was already the name) — no JSX change |
| `src/features/ContributeSection/ContributeSection.tsx` | Modify | Import `GlassCard` — no JSX change |
| `src/features/MissionSection/MissionSection.tsx` | Modify | Import `GlassCard` — no JSX change |
| `src/features/ArchitectureSection/ArchitectureSection.tsx` | Modify | Import `GlassCard` — no JSX change |
| `src/features/EcosystemSection/EcosystemSection.tsx` | Modify | Import `GlassCardLink` instead of `GlassCard`; JSX tag changed to `<GlassCardLink>` |

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual regression | All 5 consumer sections | Manual: `npm run dev`, verify Hero/Contribute/Mission/Architecture/Ecosystem cards look identical to production |
| Build | Tree-shaking excludes framer-motion from div-only consumers | `npm run build` — verify no new TS errors, bundle size does not regress |
| Spec conformance | Each variant renders correct DOM element | Manual smoke test: `<GlassCard>` → `<div>`, `<GlassCardLink>` → `<a>`, `<GlassCardMotion>` → `<motion.div>`, `<GlassCardMotionLink>` → `<a><motion.div>` |

No automated unit tests exist for GlassCard. Visual verification against the reference branch suffices.

## Migration / Rollout

No migration required. Consumers update imports and (for EcosystemSection) the tag name. Rollback is a single commit revert of `GlassCard.tsx` and the 5 consumer files.

## Open Questions

None — all 4 variants map directly to existing render paths with zero behavioral change.
