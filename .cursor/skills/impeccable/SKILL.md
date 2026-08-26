---
name: impeccable
description: >-
  Implementation specialist for the Sofía Chernikova portfolio. Use when the user
  invokes /impeccable with an approved sub-command (critique, audit, layout,
  typeset, adapt, clarify, animate, harden, optimize, polish, distill) to
  improve UX/UI in code. Not for backend-only work. Always subordinate to
  sofia-editorial-ux. Forbidden without explicit user request: bolder, quieter,
  delight, colorize, overdrive, live, init, shape, extract, hooks, doctor.
disable-model-invocation: true
version: 4.1.2-adapted
license: Apache-2.0
---

# Impeccable (Sofía portfolio — markdown-only)

Markdown playbooks for **implementation** passes on this repo. No scripts, no hooks, no PRODUCT.md/DESIGN.md workflow.

## Authority order

1. `sofia-editorial-ux` + `docs/design-context.md` — creative director
2. This skill — implementation playbooks
3. External reviewer skills — evidence, not auto-apply

If Impeccable recommends bolder motion, cards, glass, or startup landing patterns → **reject** unless it clearly improves a journalism portfolio.

## Setup (no scripts)

Before editing UI:

1. Read `docs/design-context.md` and apply `sofia-editorial-ux`.
2. Inspect incumbent truth: `src/app/globals.css`, `src/styles/`, target components, `messages/*.json`.
3. Load `reference/craft-floor.md` before code edits — but **Sofía anti-patterns override** craft-floor when they conflict.
4. Load the sub-command reference from the table below.

**Do not** run `context.mjs`, hooks, live server, pin, or doctor. **Do not** install npm dependencies because a reference suggests it.

## Mode

This portfolio is **Experience**: artifacts lead; interface recedes. Subtle editorial motion only.

## Approved commands

| Command | Reference | Use when |
|---|---|---|
| `critique` | [reference/critique.md](reference/critique.md) | Heuristic UX review before coding |
| `audit` | [reference/audit.md](reference/audit.md) | Technical a11y/perf/responsive check |
| `layout` | [reference/layout.md](reference/layout.md) | Spacing, rhythm, hierarchy |
| `typeset` | [reference/typeset.md](reference/typeset.md) | Typography scale and roles |
| `adapt` | [reference/adapt.md](reference/adapt.md) | Responsive breakpoints |
| `clarify` | [reference/clarify.md](reference/clarify.md) | Microcopy labels/CTAs (facts preserved) |
| `animate` | [reference/animate.md](reference/animate.md) | Motion **after** layout/a11y; reduced-motion required |
| `harden` | [reference/harden.md](reference/harden.md) | i18n, overflow, edge cases, empty states |
| `optimize` | [reference/optimize.md](reference/optimize.md) | Justified perf (images, RSC boundaries, fonts) |
| `polish` | [reference/polish.md](reference/polish.md) | Final 2–4px pass — no redesign |
| `distill` | [reference/distill.md](reference/distill.md) | Remove complexity without losing evidence |

## Forbidden commands (this project)

`bolder`, `quieter`, `delight`, `colorize`, `overdrive`, `live`, `init`, `document`, `extract`, `shape`, `onboard`, `craft`, `new-work`, `hooks`, `doctor`

If the user explicitly requests a forbidden command, warn that it conflicts with editorial identity and confirm first.

## Routing

- User says `/impeccable layout` (or similar) → load that reference and implement.
- User says only `/impeccable` → list approved commands; do not auto-run.
- Conflicting recommendations from multiple skills → `sofia-editorial-ux` wins.

## Implementation contract

Each change should state: FINDING → WHY → CHANGE → FILES → EXPECTED UX RESULT. No unrelated refactors.
