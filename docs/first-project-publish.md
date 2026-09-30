# Reporting piece publication checklist

`Grupo Cadena Media`, URJCmun, Annie Bonnie and Isocero are employment or
organizational experiences, not portfolio projects by themselves. Their verified
career history lives in `src/content/experience.ts` and `messages/*/Experience`.

This checklist applies only to a concrete reporting piece or the separate
Reporter Reel. Candidate names in `content-inventory.md` are not publishable work.

## Before adding a piece

- Record one row in `content-intake.md` with an accessible original source URL.
- Verify the exact title/event/date/organization and Sofía's role against sources.
- Confirm the video or photo asset, poster, rights, credits, aspect ratio and
  source attribution. Do not download or rehost third-party social video.
- If a field is not confirmed, leave it blank; do not infer it.

## Publish

Only add a concrete piece to `src/content/projects.ts` when its source, media,
role, copy and rights are verified. Add ES/EN/RU copy under
`Projects.items.[slug]`; require `sourceUrl`, role, poster, rights and `published`
guards for reporting. Keep brief coverages without unnecessary detail pages.

The Reporter Reel is a separate selection, not a company project or a list of
individual coverage cards. Keep it unpublished until its actual reel/master,
credits and rights are verified.

Run `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm media:doctor` and
`pnpm react-doctor` before publication.
