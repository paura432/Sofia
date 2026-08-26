# Design context — Sofía Chernikova portfolio

Source of truth for product and visual direction. Skills reference this file instead of duplicating long rules.

## Product

Professional portfolio of **journalist + audiovisual communicator + visual storyteller**.

Stack: Next.js App Router, next-intl (ES/EN), CSS tokens in `globals.css`, Motion library, no Tailwind.

Deployment: `https://sofiachernikova.vercel.app`

## Audience

Recruiters, television, editorial teams, media, production companies, communication agencies, cultural organisations.

## Positioning

Editorial contemporary — newsroom, cultural magazine, broadcast. Quiet confidence. Content-first.

In under 15 seconds visitors should grasp: who she is, what she does, demonstrable work, where she has worked, how to contact.

## Information architecture

| Route | Role |
|---|---|
| HOME | Positioning + best pieces |
| WORK | Real evidence |
| ABOUT | Who she is |
| EXPERIENCE | Professional trajectory |
| CONTACT | Conversion |

Content source: `src/content/profile.ts`, `experience.ts`, `projects.ts`; copy in `messages/es.json` and `messages/en.json`.

## Editorial direction

- Warm monochrome background (`#f6f1e8` family)
- Near-black text (`#11110f`)
- Limited editorial red accent (`#a52522`)
- Serif editorial (Newsreader) + functional sans (Geist)
- Whitespace, hierarchy, composition
- Subtle motion — one idea per block

## Colours (tokens)

Defined in `src/app/globals.css`: `--background`, `--foreground`, `--accent`, `--line`, `--muted`, spacing and motion variables. Do not introduce decorative gradients or new palette families without explicit approval.

## Typography

Typography-led hierarchy. Balance and restraint over display excess. ES/EN may differ in length — layout must absorb longer English without breaking rhythm.

## Motion

Use existing motion system (`src/components/motion/`, `src/styles/motion.css`). Opacity/transform, subtle lines, micro-interactions. **prefers-reduced-motion** mandatory. No scroll hijacking, parallax showcases, bounce springs, cursor effects.

## Responsive

Mobile is designed, not compressed desktop. Test 320, 360, 375, 390, 430, 600, 768, 820, 900, 1024, 1100, 1280, 1366, 1440, 1600, 1920. Future: photo stories, portrait video, captions, reporter reel.

## Media

Photography and video are **evidence**, not decoration. Architecture must scale to 1, 3, 10 projects and mixed media — no fake placeholders in production.

## Copy

Facts > adjectives. Evidence > claims. Do not invent experience. Verified facts live in content files.

## Accessibility

WCAG 2.2-aware. Correct HTML first; minimal ARIA. Focus, keyboard, landmarks, contrast, language switch, media controls, captions, touch targets, reduced motion.

## Performance

Media-heavy future must stay lightweight: `next/image`, sensible client boundaries, font loading, avoid layout shift.

## Anti-patterns (do not)

SaaS cards, glassmorphism, decorative gradients, heavy shadows, random blobs, overly rounded UI, huge button systems, aggressive motion, scroll hijacking, WebGL, autoplay, fake magazine decoration, newspaper clichés, developer-portfolio aesthetic, startup landing, generic bento, maximalist scroll-showcase.

## When external skills conflict

Skill output = evidence. This document + `sofia-editorial-ux` = authority. Document the conflict; choose the solution that improves a **journalist's portfolio**.
