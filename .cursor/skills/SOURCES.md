# Agent Skills — source provenance

Skills are vendored in-repo. No submodules, no auto-update.

Update procedure: manual review → diff → copy new version → update this file → commit.

## Installed

| Skill | Source | Commit | License | Installed |
|---|---|---|---|---|
| design-review | humbleteam/design-review | e2bc40583741d387a13b0be35a4f406adf3f62d2 | MIT | 2026-08-26 |
| audit-design-tokens | humbleteam/audit-design-tokens | 02409f40fb7e11050be25961cef0c78ec83e5ca2 | MIT | 2026-08-26 |
| design-qa | humbleteam/design-qa | e31ce7c1995ef81c4cbcd0d41c46803d5724b668 | MIT | 2026-08-26 |
| accessibility-audit | humbleteam/accessibility-audit | 89529523877152fc40f118eb94d580b47d20ffb9 | MIT | 2026-08-26 |
| ux-writing | humbleteam/ux-writing | 3037977a6c64790bc73d52f8550df54e6db83d92 | MIT | 2026-08-26 |
| impeccable | pbakaus/impeccable | 63b04e2530f5c7b41ea83c133daab24f34912456 | Apache-2.0 | 2026-08-26 |

### Impeccable install notes

- Copied: `SKILL.md` (adapted), approved `reference/*.md` only
- **Not copied:** `scripts/`, hooks, tests, workflows, live server, npm tooling
- Forbidden sub-commands documented in `.cursor/skills/impeccable/SKILL.md`

### Humbleteam install notes

- Copied: `SKILL.md`, `references/` (where present), `LICENSE`
- **Not copied:** `.github/workflows`, CHANGELOG, README

## Local skills (project-authored)

| Skill | Path | Purpose |
|---|---|---|
| sofia-editorial-ux | `.cursor/skills/sofia-editorial-ux/` | Creative director — identity and constraints |
| sofia-ux-review | `.cursor/skills/sofia-ux-review/` | Manual orchestrator — full audit pipeline |

## Rejected

| Candidate | Reason |
|---|---|
| tyfarrago-hub/taste (34 skills) | Redundant criteria; conflict risk |
| Hitbullets/codex-skills / ui-ux-pro-max | Overlaps design-review + impeccable |
| Impeccable scripts & hooks | Supply-chain policy — markdown-only |
| Impeccable bolder/overdrive/delight/colorize | Conflicts with editorial identity |

## Security review summary

All installed third-party content is Markdown + static reference docs. No executable scripts from externals. No new npm dependencies. No CI workflows copied. No secrets.
