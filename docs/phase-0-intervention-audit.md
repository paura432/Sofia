# FASE 0 — Intervention Audit

Snapshot created before implementing the remaining polish phases. Items below
describe the pre-polish state that guided the intervention.

## CURRENT ARCHITECTURE

- Next.js 16.3.3 with App Router under `src/app`.
- TypeScript strict is enabled; no `use client` components are present.
- Package manager is pnpm 10.24.0, but several dependencies remain declared as `latest`.
- Styling is centralized in `src/app/globals.css`; no Tailwind or component library.
- Fonts use `next/font`: Geist for sans and Newsreader for editorial display.
- Content source of truth lives in `src/content/profile.ts`, `src/content/experience.ts`, and `src/content/projects.ts`.
- Reusable components are intentionally few: header, footer, hero, section heading, practice index, experience list, contact block.
- Routes exist for `/`, `/work`, `/about`, `/experience`, `/contact`, plus `robots`, `sitemap`, `opengraph-image`, and custom 404.
- Vercel Analytics and Speed Insights are installed and wired in `src/app/layout.tsx`.
- Preview indexing is blocked with `robots: noindex/nofollow` and `robots.ts disallow: /`.

## PROBLEMS FOUND

- Layout has multiple width authorities: `.section`, `.page-shell`, `.contact-block`, `.site-footer`, and `.nav-shell` each calculate container width independently.
- There is no explicit `.container` primitive, so future sections risk inconsistent gutters and double constraining.
- `.page-shell` combined with nested `.section` creates a real risk of uneven vertical and horizontal rhythm across internal pages.
- Global tokens use `--max` and `--gutter`; naming is compact but not semantically clear enough for long-term design-system use.
- Current max width is 1180px, which keeps pages controlled but may make large desktop/ultrawide compositions feel narrower than intended.
- Mobile gutters derive from `clamp(20px, 4vw, 56px)`, then hero overrides to `100% - 32px`; this introduces competing mobile gutter rules.
- `li { list-style: none; }` is global and can harm future editorial lists.
- Several `aria-labelledby` references point to missing IDs: home practice and experience sections use `SectionHeading`, but `SectionHeading` cannot receive an `id`.
- Header exposes `ES / EN` even though English is not implemented; this is a non-functional affordance.
- Mobile menu uses `<details>`, which is lightweight, but lacks `aria-expanded`, Escape handling, and close-on-navigation behavior.
- The public copy still exposes development/process language: “Archivo en curaduría”, “Archive in curation”, “fase”, “Sin piezas ficticias”, “Trayectoria verificada”.
- `/contact` duplicates the contact composition: page hero says “Hablemos.” and then `ContactBlock` repeats “Hablemos.”
- `/work` currently presents future filters as static labels and development-state copy rather than useful professional evidence.
- Home does not yet surface “Disponible para nuevas oportunidades” or an immediate contact CTA in the hero.
- Grupo Cadena Media is present but not visually dominant enough relative to its importance as Reportera TV experience.
- Languages have strong visual presence on home; likely too dominant for recruiter-first reading.
- Metadata and sitemap use old canonical host `https://sofia-chernikova.vercel.app`; requested deployment URL is `https://sofiachernikova.vercel.app`.
- There is no single `SITE_URL` source of truth.
- `noindex` is not centralized behind an `IS_PUBLIC` or equivalent flag.
- Page metadata titles are generic English labels: `Work`, `About`, `Experience`, `Contact`.
- No JSON-LD Person structured data exists.
- Open Graph is visually aligned but hardcodes style values separately from design tokens.
- `package.json` still uses `latest` for critical runtime and deployment dependencies despite lockfile-resolved versions.
- Current CSS has useful editorial identity, but spacing is not tokenized beyond raw `clamp()` values.

## FILES AFFECTED

- `src/app/globals.css`: layout authority, tokens, responsive gutters, list reset, typography wrapping, spacing system.
- `src/app/page.tsx`: recruiter-first home, remove development copy, improve evidence-based work section.
- `src/app/work/page.tsx`: replace pseudo-project archive with useful professional work categories.
- `src/app/about/page.tsx`: remove process language and tune narrative.
- `src/app/experience/page.tsx`: strengthen editorial timeline and hierarchy.
- `src/app/contact/page.tsx`: remove duplicate contact composition.
- `src/components/site-header.tsx`: remove temporary `ES / EN`, revisit mobile menu semantics.
- `src/components/section-heading.tsx`: allow optional `id` for accessible `aria-labelledby`.
- `src/components/contact-block.tsx`: support page-specific/non-duplicated contact variants if still needed.
- `src/lib/metadata.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`: canonical URL, centralized indexing flag, page metadata, JSON-LD.
- `src/app/layout.tsx`: possible JSON-LD injection and centralized metadata config.
- `package.json`, `pnpm-lock.yaml`: pin resolved versions, keep dependency surface stable.

## IMPLEMENTATION PLAN

- Phase 1: introduce one layout authority with `.container`/section primitives; remove competing width calculations and validate mobile gutters.
- Phase 1: revise responsive typography, especially hero H1 at 320-430px and desktop/ultrawide scale.
- Phase 1: keep breakpoints minimal: mobile base, tablet, desktop, large desktop only where content demands it.
- Phase 2: formalize semantic design tokens for colors, spacing, typography roles, borders, and metadata treatments.
- Phase 3: rewrite home to be recruiter-first, remove development copy, add professional availability signal, and elevate Grupo Cadena Media.
- Phase 4: make `/work`, `/about`, `/experience`, and `/contact` useful without images or fake projects.
- Phase 5: fix missing `aria-labelledby` IDs, scope list resets, refine focus/hover states, and decide whether `<details>` is sufficient for mobile nav.
- Phase 6: centralize `SITE_URL` and `IS_PUBLIC`, update canonical to `https://sofiachernikova.vercel.app`, add Person JSON-LD, pin dependencies.
- Phase 7: final editorial pass for copy, repetition, unused CSS, consistency, and deployment readiness.

## STATUS

- The initial Fase 0 pass stopped after this audit.
- Later phases used this map to complete the responsive, editorial, UX, SEO,
  and hardening work.
- No automated tests or extra tooling were added.
