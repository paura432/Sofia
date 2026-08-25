# Media Guide

Sistema real del portfolio. Incorporar material es:

**asset → metadatos → traducción → curación (`order`) → `rights.verified` → `published: true`**

No hay que rediseñar Home, Work ni el detalle.

- Estructura: `src/content/projects.ts`
- Textos ES/EN: `messages/es.json` y `messages/en.json` (`Projects.items`)
- Archivos: `public/media/projects/[project-slug]/`
- Lab de geometría (solo `next dev`): `/dev/media` y `/en/dev/media`

`projects.ts` solo contiene estructura. Ningún texto visible vive ahí.

---

## Orden editorial

`order` es independiente del año y de la posición en el array.

```ts
{ slug: "pieza-2024", year: "2024", order: 1 }
{ slug: "pieza-2026", year: "2026", order: 2 }
```

Menor `order` = más arriba. Sin `order`, se conserva el orden de declaración.

`getPublishedProjects()`, `getFeaturedProject()`, `getSelectedProjects()`, `getReporterReel()` y `getNextProject()` usan este orden. No mezclar cronología con curaduría.

---

## Rights

Campo interno, no se pinta en la web:

```ts
rights: { verified: true, note: "Embargo del medio, permiso verbal 2026" }
```

Un proyecto `published: true` sin `rights.verified` avisa en desarrollo. No bloquea producción.

Antes de marcar `verified`:

- [ ] ¿Puede Sofía publicar este contenido?
- [ ] ¿Es suyo?
- [ ] ¿Pertenece al medio?
- [ ] ¿Puede embeberse?
- [ ] ¿Necesita atribución?
- [ ] ¿Aparecen menores?
- [ ] ¿Aparecen terceros?
- [ ] ¿Existe música/licencia?
- [ ] ¿Tenemos original source?
- [ ] ¿Conocemos el rol exacto de Sofía?

No es una decisión legal automática. Si hay duda, no se publica.

---

## Add photo

1. Optimizar (WebP/AVIF).
2. Nombrar: `[slug]-01.webp`.
3. `width` / `height`.
4. `aspectRatio`.
5. `focalPoint` (`{ x: 35, y: 40 }` → `object-position: 35% 40%`). Default 50/50.
6. Alt ES.
7. Alt EN.
8. Caption ES (contexto periodístico, no el alt).
9. Caption EN.
10. Credit.
11. `layout`.
12. `position` (opening → development → detail → closing).

`mobileSrc` solo si el recorte móvil exige otro archivo. Por defecto: misma fuente + focalPoint.

`blurDataURL` opcional. Sin él, `placeholder="empty"`. Sin shimmer.

---

## Add video

1. `provider`: `native` | `youtube` | `vimeo`.
2. `src` o `videoId`.
3. Poster real. `mobilePoster` solo si hace falta.
4. `duration`.
5. Title ES.
6. Title EN.
7. `tracks` (VTT reales, nunca ficticios). YouTube/Vimeo: subtítulos en la plataforma, no pistas locales sobre el iframe.
8. `transcript` en la copy si existe. Si no, no se pinta nada.
9. Rol de Sofía.
10. Credits verificados.
11. `sourceUrl`.
12. `rights`.

El player no existe hasta el clic. Nativo: `preload="none"`. YouTube: `youtube-nocookie`.

---

## Add project

1. `id` / `slug`
2. `organisation`
3. `discipline`
4. `experienceId` (para related work en Experience)
5. `year`
6. `locationKey`
7. title / dek / context ES y EN
8. `roles` (qué hizo Sofía)
9. `cover` + `media`
10. `credits`
11. `sourceUrl`
12. `rights`
13. `order`
14. `featured` / `reporterReel`
15. `published: true` solo con media real y copy completa

Mientras `published` sea `false`, el proyecto no existe para la web. Cero placeholders.

---

## Home

| Proyectos publicados | Home |
| --- | --- |
| 0 | igual que ahora: sin huecos |
| 1 | Featured (o Reporter Reel si `reporterReel`) |
| 2 | Featured + 1 selected |
| 3+ | Featured + selected (hasta 3, sin repetir featured ni reel) |

Reporter Reel solo si hay proyecto publicado con `reporterReel === true` y media. Si no: `null`.

---

## Work

0 proyectos → fallback Experience.

≥1 → `ProjectIndex`. 1 pieza dominante, 2 en split, 3+ lista editorial. Filtros: no, hasta tener ≥5 piezas reales.

---

## Experience

`getRelatedProjects(experienceId)` ya está conectado. CTA solo si hay proyectos publicados relacionados.

---

## Reserved, not active

- Shared `layoutId` entre Work y detalle: no activar sin fotos reales.
- Lightbox: primero secuencia de scroll.
- VideoObject schema: cuando haya thumbnail, fecha, duración y URL reales.
