# Media Guide

Cómo entra una fotografía o un vídeo en el portfolio. La arquitectura ya está
cerrada: incorporar material es **asset + metadatos + traducción + publicar**.
No hay que rediseñar Home, Work ni el detalle de proyecto.

- Estructura y rutas de archivo: `src/content/projects.ts`
- Textos ES/EN: `messages/es.json`, `messages/en.json` (namespace `Projects.items`)
- Archivos: `public/media/projects/[project-slug]/`
- Validar el sistema sin assets: `pnpm dev` y abrir `/dev/media`

`projects.ts` **solo contiene estructura**. Ningún texto visible vive ahí.

---

## Intención de cada media

Toda pieza responde a una intención. Nunca "poner una imagen porque queda
vacío".

| Intención | Cómo se expresa |
| --- | --- |
| HERO | `cover`, o `featured: true` dentro de `media` |
| FEATURED | `featured: true` en el proyecto |
| STORY | `layout: "wide"` o `"full"` en mitad de la secuencia |
| SEQUENCE | `pair` o `triptych` consecutivos |
| DETAIL | `layout: "half"` o `"portrait"` |
| CAPTION | `captionKey` con contexto periodístico real |
| EVIDENCE | `sourceUrl`, o media de tipo `embed` |

### Secuencia narrativa

El orden de `position` cuenta la historia. No hace falta un enum nuevo:
`position` más `layout` ya lo resuelven.

1. **Opening** (`position: 1`) — `full` o `wide`. Sitúa la escena.
2. **Development** (`2..n`) — `wide` alternado con `pair`.
3. **Detail** — `half` o `portrait`. Gestos, objetos, primeros planos.
4. **Closing** — `wide` o `full`. Cierra.

En un reportaje de 20 fotografías, agrupa: no conviertas cada imagen en un
evento de animación.

---

## Añadir proyecto

1. Añade la entrada en `src/content/projects.ts`.
2. Añade la copy en `messages/es.json` y `messages/en.json`.
3. Sube los archivos a `public/media/projects/[project-slug]/`.
4. Define un `cover` real.
5. Rellena `altKey`, `captionKey` y títulos accesibles de vídeo.
6. Pon `published: true` **solo** cuando el proyecto tenga contenido real.
7. Opcionalmente `featured: true` (Home) o `reporterReel: true`.

Mientras `published` sea `false`, el proyecto no existe para la web: no aparece
en Home, ni en Work, ni en el sitemap, ni genera página estática. No se muestra
ningún placeholder.

### Project checklist

- [ ] Title ES / EN
- [ ] Description ES / EN (se usa en metadatos)
- [ ] Dek
- [ ] Context
- [ ] Roles (qué hizo Sofía exactamente)
- [ ] Organisation
- [ ] Year
- [ ] `locationKey` (y la entrada correspondiente en `Projects.locations`)
- [ ] Media con `position`
- [ ] Credits (solo los verificados)
- [ ] `sourceUrl` (solo si la URL está comprobada)
- [ ] `featured?`
- [ ] `reporterReel?`
- [ ] `published`

---

## Añadir fotografía

### Photo checklist

- [ ] Proyecto al que pertenece
- [ ] Nombre de archivo estable
- [ ] Año
- [ ] `aspectRatio`: `3:2`, `4:3`, `16:9`, `4:5`, `2:3` o `1:1`
- [ ] `width`
- [ ] `height`
- [ ] Alt ES
- [ ] Alt EN
- [ ] Caption ES
- [ ] Caption EN
- [ ] Credit
- [ ] `focalPoint`
- [ ] `layout`
- [ ] `position`

### Alt frente a caption

Se escriben por separado y **nunca** se reutiliza uno como el otro.

- **Alt**: descripción accesible de lo que se ve. "Una reportera sostiene un
  micrófono frente a la fachada del ayuntamiento."
- **Caption**: contexto periodístico. "Madrid — 2026. Sofía cubre la sesión de
  investidura para Cadena Media."

Si la imagen es puramente decorativa, marca `decorative: true` y omite el alt.

### Focal point

Evita que un recorte corte caras. Los valores son porcentajes y se traducen a
`object-position: x% y%`.

```ts
focalPoint: { x: 35, y: 40 }
```

- Sujeto a la izquierda: `x` bajo (25–35).
- Sujeto a la derecha: `x` alto (65–75).
- Retrato con cabeza arriba: `y` bajo (25–35).
- Centrado: omite el campo.

La misma fotografía sirve en desktop, tablet y móvil.

### Art direction móvil

`mobileSrc` es la **excepción**, no la norma. Solo cuando el recorte móvil
exige un encuadre distinto por una razón editorial real. Ese archivo se sirve
tal cual, sin pasar por el optimizador, así que por defecto: una sola fuente
más `focalPoint`.

### Placeholder

`blurDataURL` es opcional. Con él, la imagen entra con un desenfoque de su
propio color; sin él, aparece limpia. No hay skeletons, ni shimmer, ni fondos
grises animados.

### Sizes

`getMediaSizes(layout)` calcula el `sizes` real por layout. No lo sobreescribas
salvo que la composición sea excepcional: el objetivo es que el navegador nunca
descargue 2400px para pintar 500px.

---

## Añadir vídeo

### Video checklist

- [ ] `provider`: `native`, `youtube` o `vimeo`
- [ ] `videoId` (externo) o `src` (nativo)
- [ ] Poster real
- [ ] `aspectRatio`
- [ ] `duration`
- [ ] Title ES / EN
- [ ] `tracks` (subtítulos), si existen
- [ ] `sourceUrl`
- [ ] Credits
- [ ] Rol de Sofía
- [ ] Derechos comprobados

### Comportamiento

El player nunca se carga antes del clic: solo se ve el poster. Al pulsar, el
poster se desvanece y el player ocupa exactamente el mismo frame, sin salto de
layout.

- **Nativo**: `preload="none"`, `controls`, `playsInline`. No se descarga nada
  hasta que el usuario lo pide.
- **YouTube**: `youtube-nocookie.com`, iframe creado solo tras el clic.
- **Vimeo**: player estándar, mismo comportamiento.

Nunca hay autoplay al cargar la página.

### Subtítulos

Para vídeo **nativo**, declara las pistas:

```ts
tracks: [
  { src: "/media/projects/x/x-es.vtt", srcLang: "es", labelKey: "es", kind: "captions", default: true },
  { src: "/media/projects/x/x-en.vtt", srcLang: "en", labelKey: "en", kind: "subtitles" },
]
```

Para YouTube y Vimeo los subtítulos dependen del contenido alojado en la
plataforma. **No se simulan pistas locales sobre un iframe**: hay que subirlos
al vídeo original.

### Transcripción

`transcriptKey` está previsto en el modelo pero no se renderiza todavía. Mejora
accesibilidad, SEO y consumo sin sonido. No se pinta ningún bloque vacío
mientras no exista el texto.

---

## Nombres de archivo

```text
urjcmun-2026-cover.webp
urjcmun-2026-01.webp
urjcmun-2026-02.webp
grupo-cadena-media-interview-poster.webp
grupo-cadena-media-interview-es.vtt
```

Nada de nombres de cámara (`IMG_4821.JPG`), exportaciones temporales ni
originales sin comprimir.

## Formatos

- Fotografía y posters: WebP o AVIF.
- Vídeo: plataforma especializada cuando exista; si no, archivo nativo
  optimizado.
- No se suben RAW ni originales de decenas de megas al repositorio.

---

## RIGHTS CHECK

Antes de publicar cualquier pieza. Es una lista de comprobación, no una
decisión automática: ante la duda, no se publica.

- [ ] ¿Sofía puede mostrar este material?
- [ ] ¿Requiere atribución? ¿A quién exactamente?
- [ ] ¿Es una pieza propiedad del medio? ¿Hay permiso?
- [ ] ¿Puede embeberse desde la fuente original?
- [ ] ¿Puede alojarse localmente o solo enlazarse?
- [ ] ¿Aparecen menores? ¿Hay consentimiento?
- [ ] ¿Contiene información sensible o identificable de terceros?
- [ ] ¿La música o los recursos del vídeo tienen licencia?

Los créditos **no se infieren**. Si no consta quién hizo cámara, edición o
producción, no se atribuye a Sofía: simplemente no hay sección de créditos.

---

## Avisos de desarrollo

Con `pnpm dev`, la consola avisa de metadatos incompletos: proyecto publicado
sin cover, imagen sin `altKey`, imagen sin `aspectRatio` ni `width`/`height`,
vídeo sin poster o sin título, `id` o `position` duplicados. En producción no
se ejecuta ninguna comprobación.

## Reservado para más adelante

- **Shared transition**: los componentes están preparados para compartir un
  `layoutId` entre la portada en Work y el hero del proyecto. No se activa
  hasta tener fotografías reales que justifiquen la transición.
- **Lightbox**: primero se evalúa con fotos reales. En un reportaje manda la
  secuencia de scroll; el lightbox es secundario.
- **Filtros de disciplina**: la UI aparece automáticamente a partir de cinco
  proyectos publicados.
- **VideoObject (schema.org)**: solo cuando existan thumbnail, fecha de
  publicación, duración, título, descripción y URL reales.
