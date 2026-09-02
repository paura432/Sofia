# UX audit baseline — 2026-09-02

Segunda pasada `/sofia-ux-review` tras implementación de fixes P0–P2.

Scope: Home ES/EN, Work, About, Experience, Contact; código; `localhost:3000`.

---

## SCORECARD (0–10)

| Category | Score | Note |
|---|---|---|
| UX | 9 | Trayectoria TV/comunicación visible en `/trabajo`; hero con dateline/ubicación; gap reel TV hasta publicar assets |
| UI | 9 | Footer editorial, contacto sin duplicar LinkedIn, secciones work claras |
| Editorial identity | 10 | Identidad newsroom intacta y reforzada |
| Responsive | 9 | Tokens y touch targets; QA manual 320px pendiente de pasada dedicada |
| Typography | 9 | Tokens `--text-2xs` a `--text-ui`; escala display sin cambios |
| Motion | 9 | Sistema existente; reduced-motion OK |
| Accessibility | 9 | Contraste `--muted` corregido; archivo con labels descriptivos; focus global |
| Performance | 9 | Build OK; RSC mayoritario; client boundaries acotados |
| Copy | 10 | ES/EN/RU alineados; keys muertas activadas; i18n empresas |
| Media readiness | 8 | 4 proyectos foto + archivo 74; falta `portrait.webp` y reel/TV publicados |

**Overall readiness:** pre-launch con evidencia fotográfica + trayectoria textual — **READY** salvo assets de retrato y reel TV.

---

## Cambios implementados (2026-09-02)

1. **Contraste WCAG** — `--muted: #625c54` (≥4.5:1 sobre background y surface).
2. **Hero** — `dateline` y `location` renderizados.
3. **Footer** — tagline editorial (`Footer.line`); LinkedIn oculto en página contacto.
4. **Work** — sección «Televisión y comunicación» antes de fotografía; copy alineado.
5. **Archivo fotográfico** — `aria-label` descriptivos (`{group}, imagen {index}`).
6. **Home** — nombres de empresa en i18n (`CurrentPositions.items.*.company`).
7. **Tokens** — tipografía micro (`--text-*`), z-index (`--z-*`), `brand-colors.ts` sync.

---

## Pendiente para 10/10 real (contenido, no código)

| Item | Acción |
|---|---|
| Retrato About | `pnpm media:image` → `public/media/profile/portrait.webp` + `profile.ts` |
| Reporter reel | Ingest vídeo + `published: true` en `reporter-reel` |
| Proyectos TV/comunicación | Publicar cuando `rights.verified` |
| Indexación pública | `NEXT_PUBLIC_IS_PUBLIC=true` en launch |

---

## Fix this first (si se continúa)

Ingest del **retrato editorial** y del **reporter reel** — son los dos gaps que impiden 10 en Media readiness y el salto final en UX para recruiters de televisión.
