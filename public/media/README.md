# Media Folder

Convención de archivos del portfolio:

```text
public/media/projects/[project-slug]/
  [project-slug]-cover.webp
  [project-slug]-01.webp
  [project-slug]-02.webp
  [project-slug]-poster.webp
  [project-slug]-es.vtt
  [project-slug]-en.vtt

public/media/profile/
  portrait.webp
```

No se añaden placeholders, imágenes de stock ni sustitutos generados: la
carpeta permanece vacía hasta que llegue material real.

**Originales** → fuera de `public/` (p. ej. `.media-source/`, no en git).  
**Masters web** → `public/media/**` (sí en git).

Ingest local:

```bash
pnpm media:inspect --input "…"
pnpm media:image --input "…" --project urjcmun --name urjcmun-stage --profile photo
pnpm media:folder --input "…" --project urjcmun --profile photo
pnpm media:doctor
```

Proceso completo, checklists y derechos en
[`docs/media-guide.md`](../../docs/media-guide.md).
