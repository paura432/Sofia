# UX audit baseline — 2026-08-26

First `/sofia-ux-review` pass after Agent Skills install. **Audit only** — no implementation.

Scope: Home ES/EN, Work, About, Experience, Contact; codebase; deployment fetch timed out.

---

## SCORECARD (0–10)

| Category | Score | Note |
|---|---|---|
| UX | 7 | IA clara; hero comunica rol y CTA; evidencia de trabajo limitada sin proyectos publicados |
| UI | 8 | Ritmo editorial, jerarquía coherente, sin drift SaaS |
| Editorial identity | 9 | Warm mono, serif/sans, rojo acotado, content-first |
| Responsive | 7 | Tokens y breakpoints en CSS; falta verificación sistemática 320–1920 en deployment |
| Typography | 8 | Escalas con clamp; balance en hero y secciones |
| Motion | 8 | LazyMotion acotado; CSS reveals; reduced-motion en panel móvil |
| Accessibility | 7 | Skip link, focus-visible, aria-current; duplicidad nav labels; panel móvil sin trap |
| Performance | 8 | Mayoría RSC; motion bundle parcial; build OK |
| Copy | 8 | ES/EN profesional; "LinkedIn" hardcoded; facts en content files |
| Media readiness | 4 | Arquitectura sólida; 0 proyectos `published`; sin retrato About |

**Overall readiness:** staging pre-media — **NEEDS ANOTHER PASS** antes de media real y launch público.

---

## P0 — breaks experience

Ninguno técnico crítico en preview. Para objetivo recruiter-first con evidencia visual:

### 1. Portfolio sin piezas publicadas

- **Before:** `projects.ts` — todos `published: false`; `getPublishedProjects()` vacío; Home sin reel/featured/selected; Work usa fallback de experiencia.
- **After:** Publicar proyectos verificados (`rights.verified`, cover/media renderizable) cuando assets existan — sin placeholders fake.
- **Why:** Nielsen #2 Match between system and real world — el producto promete trabajo demostrable.
- **Priority:** P0 (producto) / P1 (staging intencional)
- **Files:** `src/content/projects.ts`, `messages/*.json`

---

## P1 — important

### 1. Indexación desactivada

- **Before:** `IS_PUBLIC = false` en `metadata.ts`; `robots` disallow `/`.
- **After:** Flag centralizado; activar solo en launch con checklist.
- **Why:** Conversión y discoverability para recruiters.
- **Files:** `src/lib/metadata.ts`, `src/app/robots.ts`

### 2. Panel navegación móvil — foco y dismiss

- **Before:** Panel animado sin `inert` en main; sin click-outside; Escape cierra (OK).
- **After:** `inert` en `#main` + footer cuando abierto; opcional foco inicial en panel.
- **Why:** WCAG 2.2 SC 2.4.3 Focus order / SC 2.1.2 keyboard traps (edge case).
- **Files:** `src/components/mobile-nav.tsx`

### 3. Duplicidad `aria-label` en header

- **Before:** `<nav aria-label>` + `<div class="desktop-nav-links" aria-label>` con mismo texto.
- **After:** Un solo landmark label; links sin wrapper redundante.
- **Why:** SC 1.3.1 — landmarks redundantes confunden árbol de acceso.
- **Files:** `src/components/site-header.tsx`

### 4. Token drift en OG / theme

- **Before:** Hex hardcoded en `opengraph-image.tsx`, `layout.tsx` themeColor.
- **After:** Referenciar tokens o constantes compartidas con `:root`.
- **Why:** audit-design-tokens — drift en superficies visibles.
- **Files:** `src/app/[locale]/opengraph-image.tsx`, `src/app/[locale]/layout.tsx`

### 5. About sin retrato

- **Before:** `portrait` undefined en `profile.ts`; About sin imagen editorial.
- **After:** Asset real + `altKey` cuando disponible.
- **Why:** Portfolio periodista — identidad visual incompleta.
- **Files:** `src/content/profile.ts`, `src/app/[locale]/about/page.tsx`

---

## P2 — improvements

### 1. "LinkedIn" no traducido

- **Before:** Footer y contact usan string literal "LinkedIn".
- **After:** Label en `messages` si se quiere "LinkedIn" / consistencia ES.
- **Files:** `src/components/site-footer.tsx`, `src/components/contact-block.tsx`, `messages/*.json`

### 2. Languages strip en Home

- **Before:** Bloque idiomas en home puede competir con jerarquía recruiter-first.
- **After:** Evaluar mover a About o reducir peso visual tras primer media pass.
- **Why:** design-review — jerarquía visual.
- **Files:** `src/app/[locale]/page.tsx`, `globals.css`

### 3. Ruta dev expuesta

- **Before:** `/[locale]/dev/media` existe con `noindex`.
- **After:** Confirmar `notFound` fuera dev o protección adicional.
- **Files:** `src/app/[locale]/dev/media/page.tsx`

---

## P3 — polish

- Alinear micro-rhythm hover en nav móvil vs desktop.
- Verificar contraste `--muted` en captions bajo 4.5:1 en edge cases.
- Segunda pasada spacing en `contact-grid` en 390px.

---

## Conflicts logged

| Source | Recommendation | Product decision |
|---|---|---|
| Impeccable craft-floor | Bold distinctive UI | Rechazado — editorial quiet confidence |
| Generic a11y | Avoid near-black | Mantener `#11110f` deliberado |
| design-review heuristics | More visual work samples above fold | Pendiente media real, no fake cards |

---

## Fix this first

**Publicar primera pieza verificada con media** (o documentar staging explícito para stakeholders). Sin evidencia, el resto del polish no cumple el UX primario de portfolio periodista.

---

## Build validation (skills install)

| Check | Result |
|---|---|
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| `pnpm build` | PASS |

---

## Next steps

Ver `docs/ux-review-process.md`: P0/P1 → `/impeccable` passes → re-audit.

---

## Implementation pass — 2026-08-26

### Cambios aplicados

| Finding | Files | Result |
|---|---|---|
| Nav móvil sin `inert` | `mobile-nav.tsx` | `inert` en `#main` + `footer` cuando panel abierto |
| Duplicidad `aria-label` nav | `site-header.tsx` | Un solo landmark label |
| Hex fuera tokens (OG/viewport) | `brand-colors.ts`, `layout.tsx`, `opengraph-image.tsx` | Constantes alineadas con `:root` |
| LinkedIn hardcoded | `contact-block.tsx`, `site-footer.tsx` | `t("linkedin")` / `contact("linkedin")` |
| Languages strip compite en Home | `page.tsx` | Eliminado de Home; permanece en About |
| Launch flag | `metadata.ts` | `NEXT_PUBLIC_IS_PUBLIC=true` para indexación |

### Sin cambio (pendiente assets / launch)

- Proyectos `published` — requiere media verificada
- Retrato About — requiere asset
- `IS_PUBLIC` — false hasta env en Vercel

### Scores revisados (post-fix)

| Category | Before | After |
|---|---|---|
| Accessibility | 7 | 8 |
| Copy | 8 | 8 |
| UX (recruiter-first) | 7 | 7.5 |
| Media readiness | 4 | 4 |

### Build

lint · typecheck · build — PASS

---

## Harden + publish prep — 2026-08-26

### Harden

- `overflow-wrap: anywhere` en títulos, nav móvil, facts, contact
- `min-width: 0` en nav-shell y panel móvil
- `prefers-reduced-motion`: scroll + reveals sin ocultar contenido

### Primer proyecto (prep, sin publicar)

- `Projects.items` completo ES/EN (4 proyectos, roles desde Experience)
- `projects.ts`: `order`, `featured`, `locationKey`, `rights` en GCM y URJCmun
- `docs/first-project-publish.md` — checklist ingest → `published: true`

Sin `published: true` hasta media real verificada (no usar `pipeline-test`).


