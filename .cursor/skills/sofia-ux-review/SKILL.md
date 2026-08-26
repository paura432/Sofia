---
name: sofia-ux-review
description: >-
  Runs the complete UX/UI review pipeline for the Sofía Chernikova portfolio using
  the project editorial rules and installed specialist skills. Produces prioritized
  findings before any implementation. Invoke manually via /sofia-ux-review.
disable-model-invocation: true
---

# Sofía UX review — orchestrator

**Does not design or implement.** Audits only. Invoke: `/sofia-ux-review`

## Pipeline order

1. Load `sofia-editorial-ux` and [docs/design-context.md](../../docs/design-context.md)
2. Read current implementation (`src/app`, `src/components`, `src/styles`, `messages`, `src/content`)
3. Inspect deployment if accessible: `https://sofiachernikova.vercel.app`
4. Apply criteria from `design-review` (review mode, rubric in references)
5. Run `audit-design-tokens` on CSS/tokens/components/motion
6. Responsive pass — `impeccable` adapt criteria + `design-qa` breakpoints
7. `accessibility-audit` on markup + `design-qa` gate
8. `ux-writing` on ES/EN microcopy (facts preserved)
9. Visual performance scan — client boundaries, images, fonts, motion bundle
10. Media architecture — 1/3/10 projects, mixed media (structure only, no fake content)
11. Merge into **one backlog** — no implementation in this phase

## Specialist invocation

Read each installed skill's SKILL.md and references as needed. Specialists are **advisors**; `sofia-editorial-ux` filters recommendations.

Do not launch parallel agents that all edit CSS. Analysis may be parallel; implementation is single-agent later.

## Surfaces (default scope)

Home ES, Home EN, Work, About, Experience, Contact — plus deployment if reachable.

## Output format

```markdown
# Sofía UX review — <date>

## SCORECARD (0–10)

| Category | Score | Note |
|---|---|---|
| UX | | |
| UI | | |
| Editorial identity | | |
| Responsive | | |
| Typography | | |
| Motion | | |
| Accessibility | | |
| Performance | | |
| Copy | | |
| Media readiness | | |

## P0 — breaks experience

Max 3–6 per category. Before / After / Why / Priority / Files affected.

## P1 — important

## P2 — improvements

## P3 — polish

## Conflicts logged

External skill recommendation vs product decision.

## Fix this first

Single highest-impact item.
```

Cap findings: 3–6 principal per category. No laundry lists.

## After review

Save baseline to `docs/ux-audit-baseline.md` when requested.

Implementation follows [docs/ux-review-process.md](../../docs/ux-review-process.md).
