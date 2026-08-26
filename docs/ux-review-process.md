# UX review process

Agentic UX system for this repo. **Five responsibilities** — not thirty skills.

## Installed skills

| Skill | Role | Invocation |
|---|---|---|
| `sofia-editorial-ux` | Creative director — identity, constraints | Auto on UI work |
| `sofia-ux-review` | Orchestrator — full audit pipeline | Manual `/sofia-ux-review` |
| `design-review` | UX critique, scoring, Before/After/Why | Manual |
| `audit-design-tokens` | Token drift in CSS/components | Manual |
| `design-qa` | Pre-ship gate (states, contrast, keyboard) | Manual |
| `accessibility-audit` | WCAG 2.2 expert pass | Manual |
| `ux-writing` | Microcopy ES/EN, AI-tell strip | Manual |
| `impeccable` | Implementation playbooks | Manual sub-commands only |

Provenance: `.cursor/skills/SOURCES.md`

## Rejected (redundant)

- `tyfarrago-hub/taste` — 34 skills, criterion overlap
- `Hitbullets/codex-skills` / `ui-ux-pro-max` — overlaps design-review + impeccable
- Impeccable scripts/hooks — security policy; markdown-only install

## Official workflow

```
AUDIT → FIX P0 → FIX P1 → ACCESSIBILITY → HARDEN → OPTIMIZE → POLISH → RE-AUDIT
```

### Step 1 — Audit only

`/sofia-ux-review` — no implementation.

### Step 2 — P0

Fix experience breakers. No polish.

### Step 3 — P1

`/impeccable layout`, `/impeccable adapt`, or `/impeccable clarify` as needed.

### Step 4 — Accessibility

`accessibility-audit` + `design-qa` on changed surfaces.

### Step 5 — Harden

`/impeccable harden` — i18n, overflow, long titles, missing media, mobile nav, reduced motion.

### Step 6 — Optimize

`/impeccable optimize` — only justified wins.

### Step 7 — Animate

`/impeccable animate` — only if a real interaction gap exists.

### Step 8 — Polish

`/impeccable polish` — max two passes, then stop.

### Step 9 — Re-audit

`/sofia-ux-review` — compare to `docs/ux-audit-baseline.md`.

## What not to run

- Impeccable `bolder`, `overdrive`, `delight`, `colorize`, `live`, hooks
- Parallel agents editing the same CSS
- Auto-applying reviewer output without `sofia-editorial-ux` filter
- External skill scripts or npm deps from third-party skills

## Validation

After implementation passes: `pnpm lint`, `pnpm typecheck`, `pnpm build`.
