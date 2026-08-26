---
name: sofia-editorial-ux
description: >-
  Use when reviewing, modifying or implementing UX/UI for the Sofía Chernikova
  journalism and audiovisual portfolio. Preserves its editorial newsroom identity,
  content-first hierarchy, responsive behaviour, restrained motion and media-first
  architecture. Auto-apply on UI work in src/app, src/components, src/styles,
  messages. Not for backend-only or media pipeline scripts unless UI is affected.
---

# Sofía editorial UX — creative director

**This skill has authority** over external reviewer and Impeccable recommendations when they conflict with the portfolio identity.

Full product truth: [docs/design-context.md](../../docs/design-context.md)

## PRODUCT

Portfolio profesional de periodista y comunicadora audiovisual.

## AUDIENCE

Recruiters; television; editorial teams; media; production companies; communication agencies; cultural organisations.

## PRIMARY UX

En menos de 15 segundos debe quedar claro:

1. quién es
2. qué hace
3. qué trabajo puede demostrar
4. dónde ha trabajado
5. cómo contactarla

## INFORMATION ARCHITECTURE

| Section | Purpose |
|---|---|
| HOME | Posicionamiento + mejores piezas |
| WORK | Evidencia real |
| ABOUT | Quién es |
| EXPERIENCE | Trayectoria profesional |
| CONTACT | Conversión |

## VISUAL LANGUAGE

Editorial. Quiet confidence. Warm monochrome. Red accent. Typography-led. Content-first.

## DO NOT

SaaS cards; glassmorphism; gradients decorativos; excessive shadows; random blobs; overly rounded UI; huge button systems; aggressive motion; scroll hijacking; cursor effects; WebGL; autoplay; fake magazine decoration; newspaper clichés; developer-portfolio; startup landing; generic bento; scroll-showcase.

## MEDIA

Photography and video are evidence. Not decoration.

## MOTION

Subtle. Use existing system (`src/components/motion/`, `src/styles/motion.css`). One motion idea per block. `prefers-reduced-motion` required.

## RESPONSIVE

Mobile is designed, not compressed desktop. Breakpoints: 320–1920 (see design-context).

## COPY

Facts > adjectives. Evidence > claims. Source: `src/content/*`, `messages/*.json`. Never invent professional facts.

## ACCESSIBILITY

WCAG 2.2-aware. HTML semantics first; minimal ARIA.

## PERFORMANCE

Media-heavy future must remain lightweight.

## Scope paths

Apply when editing:

- `src/app/**/*.tsx`, `src/app/**/*.css`
- `src/components/**/*.tsx`
- `src/styles/**/*.css`
- `messages/**/*.json`

Skip when work is database, backend, or `scripts/media` unless it affects rendered UI.

## Conflict resolution

External skill says "avoid pure black" but we use deliberate near-black → keep ours.

Recommends cards, bolder design, more animation → reject unless it clearly helps a journalist's portfolio.

Document conflict in implementation notes when rejecting.

## Final gate question

**¿Esto mejora el portfolio de una periodista?** If no → reject.
