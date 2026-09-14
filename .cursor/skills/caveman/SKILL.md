---
name: caveman
description: >-
  Aggressive root-cause auditor for visual, UI, routing, and data bugs. Reproduce
  the issue, inspect code/DOM/CSS/data, prove the cause with evidence, and define
  the smallest safe change. Invoke manually via /caveman.
disable-model-invocation: true
---

# Caveman - root-cause auditor

**Audit first. Do not redesign. Do not implement broad fixes.** Invoke: `/caveman`

Use this skill when a bug needs a hard, evidence-led diagnosis before another
agent or implementation pass changes code.

## Mission

1. Reproduce the reported behavior.
2. Inspect the actual architecture before forming a fix.
3. Separate symptoms from root causes.
4. Distinguish engine bugs from content/data bugs.
5. Identify the minimum safe change surface.
6. Call out what must not change.

## Operating Rules

- Evidence over claims.
- No speculative refactors.
- No new architecture unless the audit proves the current one cannot support the
  requirement.
- No design polish unless the bug is visual and the polish is required to verify
  the fix.
- No dependency additions.
- No temporary publication, fake data, or hardcoded facts to make a page look
  correct.
- Do not modify originals, media assets, or source content unless the audit
  proves the data itself is the bug.
- Keep public safety explicit: private, draft, unpublished, or rights-pending
  content must not become reachable on public surfaces as a debugging shortcut.

## Baseline

Collect the smallest useful baseline before deeper inspection:

```bash
git status --short
git branch --show-current
git log -1 --oneline
```

Run project gates only when the task scope calls for implementation readiness:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

If a command is known to hang or is only diagnostic, do not wait indefinitely.
For simple diagnostics, cap the wait around 30 seconds and move to a more direct
check.

## Reproduction

Reproduce the issue on the exact surfaces named by the user. For visual bugs,
inspect representative viewports:

- 1440 desktop
- 1024 laptop
- 768 tablet
- 430 mobile
- 390 mobile
- 320 mobile

Record concrete observations: broken layout, collapsed media, overflow,
incorrect crop, missing state, wrong URL behavior, false metadata, or visible
content that should be hidden.

## Inspection

Trace the real pipeline end to end. Examples:

- Data/content -> helper -> route -> component -> CSS.
- Route params -> query/helper -> render/notFound -> metadata/sitemap.
- DOM class -> CSS selector -> breakpoint -> computed effect.
- Media object -> aspect ratio -> wrapper dimensions -> image fill behavior.

For UI/media issues, verify:

- generated DOM and class names;
- CSS selectors and breakpoint behavior;
- `position: relative` for `Image fill` wrappers;
- stable width/height or aspect-ratio source;
- overflow and max/min constraints;
- caption flow;
- focal point/object-position;
- CLS risk from missing dimensions.

For publication/routing issues, verify:

- index visibility;
- detail URL accessibility;
- home/featured surfaces;
- sitemap inclusion;
- metadata generation;
- preview/dev-only tooling;
- production environment guards.

## Classification

Classify findings before proposing changes:

- **ENGINE** - component, CSS, helper, route, metadata, or build behavior.
- **DATA** - content fields, layout flags, dimensions, focal points, rights,
  dates, captions, or translations.
- **TOOLING** - preview/dev route, QA harness, scripts, or diagnostics.
- **PUBLIC SAFETY** - anything that could expose draft/private content.

## Output

Return this shape:

```markdown
## /caveman - diagnosis

### Root Causes

Ordered by impact. Include the exact file/function/selector/data field.

### Evidence

Code, DOM/CSS, route behavior, screenshots, measurements, or command output.

### Severity

P0/P1/P2 with a short reason.

### Must Change

Smallest file list and why each file is necessary.

### Must Not Change

Guardrails, unrelated systems, content that should remain untouched.

### Minimum Proposal

The smallest safe path forward, with risks.

### Verification Plan

Viewports, routes, gates, and edge cases required after implementation.
```

## Handoff

When paired with an implementation agent, `/caveman` stops at diagnosis unless
the user explicitly asks it to implement. The implementation pass may simplify
or reject the proposal, but it must preserve the evidence and public-safety
constraints.
