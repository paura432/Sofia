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

## Separación de responsabilidades

| Capa | Responsabilidad |
| --- | --- |
| **Media ingest (CLI)** | Orientación EXIF, resize master, WebP, sRGB, strip metadata, dimensiones, blurDataURL |
| **Modelo portfolio** | alt, caption, credit, focalPoint, role, asociación a proyecto, rights |
| **Next/Image** | anchos responsive, delivery por dispositivo, lazy loading, formato moderno del navegador, LCP |

Un master WebP de alta calidad es suficiente. Next/Image genera los cortes responsive en runtime. No generar 6 variantes a mano.

---

## IMAGE INGEST

Pipeline local (`pnpm media:*`). Sin Cloudinary, S3 ni APIs externas. No corre en `next build` ni en Vercel.

### Originales

Los originales **no** viven en `public/`.

- Rutas externas: `D:\Sofia-Originals\…`, `~/Pictures/…`
- Opcional local: `.media-source/` (está en `.gitignore`)
- Nunca: `public/media/originals/`

| Qué | Git |
| --- | --- |
| Originales (JPG/PNG de cámara) | **No** |
| Masters web (`public/media/projects/**`) | **Sí** |

### Flujo

```text
01  Guardar originales fuera de public.
02  Inspect:   pnpm media:inspect --input "…"
03  Dry run:   pnpm media:image … --dry-run
04  Convert:   pnpm media:image …
05  Revisar visualmente original vs WebP master (100% si hace falta).
06  Añadir en copy: alt ES/EN, caption, credit, focalPoint, rights.
07  Pegar el bloque COPY en projects.ts (decisión editorial humana).
08  Publicar solo cuando esté validado (rights + published).
```

### Comandos

```bash
pnpm media:inspect --input "/ruta/photo.jpg"

pnpm media:image --input "/ruta/photo.jpg" \
  --project urjcmun \
  --name urjcmun-stage \
  --profile photo

pnpm media:folder --input "/ruta/fotos" \
  --project urjcmun \
  --profile photo \
  --dry-run

pnpm media:doctor
```

Flags útiles: `--quality 70–95`, `--max-edge`, `--overwrite`, `--dry-run`, `--json-output <path>`, `--destination profile`.

`pnpm media:image --help` resume las flags. Este documento es la guía completa.

### Perfiles

| Perfil | Uso | Max edge | Quality |
| --- | --- | --- | --- |
| `photo` | reportaje / editorial | 2800px | 90 |
| `portrait` | retrato About | 2000px | 90 |
| `poster` | poster de vídeo | 1920px | 86 |
| `graphic` | UI / texto / logos | 2400px | 92 (PNG si es menor) |

Defaults. Calibrar con fotos reales; no cambiar globales por un caso aislado.

### Qué hace el conversor

1. Auto-orientación EXIF (`sharp.rotate()`) **antes** del resize
2. Normalización a **sRGB** (sin auto-enhance)
3. Resize `fit: inside` + `withoutEnlargement: true` (sin crop, sin upscale)
4. WebP master de alta calidad (`smartSubsample` en foto)
5. **Strip** de EXIF/GPS/orientation (no `withMetadata`)
6. Dimensiones + aspect ratio (solo presets con tolerancia; si no → `custom`)
7. `blurDataURL` diminuto (no archivo público aparte)
8. Bloque terminal listo para copiar a `projects.ts`

### Qué NO hace

- No modifica ni borra el original
- No sobrescribe output sin `--overwrite`
- No edita `projects.ts`
- No inventa alt, caption, credit ni focalPoint
- No publica automáticamente
- No genera AVIF/JPG/variantes responsive a mano

### Privacidad

Los créditos van en el portfolio visible, no en EXIF. El master web sale sin GPS ni datos de cámara.

### focalPoint

El conversor **no** lo adivina. Tras ver la foto:

```ts
focalPoint: { x: 34, y: 42 }
```

- `x`: 0 izquierda · 50 centro · 100 derecha  
- `y`: 0 arriba · 50 centro · 100 abajo  

Default del renderer: 50/50.

### Antes de publicar una foto

Comparar original vs WebP master. Revisar caras, piel, cabello, texto, gradientes, sombras, luces, ruido, bokeh, detalle fino.

Si quality 88–90 degrada de forma visible: `--quality 92` **en esa imagen**. No cambiar el perfil global sin evidencia.

### Batch

`media:folder` numera de forma determinista (`urjcmun-001.webp`…). Detecta duplicados binarios (SHA-256). Un fallo no deja archivos parciales; el lote continúa; exit code ≠ 0 si hubo errores.

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

1. Ingest con `pnpm media:image` (o folder).
2. Revisar master en `public/media/projects/[slug]/`.
3. Pegar `src` / `width` / `height` / `aspectRatio` / `blurDataURL` desde el terminal.
4. `focalPoint` si el sujeto no está centrado.
5. Alt ES + Alt EN.
6. Caption ES + EN (contexto periodístico, no el alt).
7. Credit.
8. `layout` + `position` (opening → development → detail → closing).

`mobileSrc` solo si el recorte móvil exige otro archivo. Por defecto: misma fuente + focalPoint.

Sin `blurDataURL`, `placeholder="empty"`. Sin shimmer.

---

## Add video

1. `provider`: `native` | `youtube` | `vimeo`.
2. `src` o `videoId`.
3. Poster real (`pnpm media:image --profile poster`). `mobilePoster` solo si hace falta.
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
