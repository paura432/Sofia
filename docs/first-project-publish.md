# Primer proyecto publicable

Checklist para pasar de `published: false` a Home/Work con evidencia real. Sin placeholders en producción.

## Orden recomendado

1. **Grupo Cadena Media** (`order: 1`, `featured: true`) — reportera TV, prioridad recruiter.
2. URJCmun — cuando haya foto/vídeo verificable.
3. Annie Bonnie · Isocero — según derechos y material.

## Antes de `published: true`

- [ ] Asset master en `public/media/projects/[slug]/`
- [ ] `pnpm media:doctor` sin errores
- [ ] Copy en `messages/*/Projects.items.[slug]` (title, description, roles)
- [ ] `alt` ES/EN en `media.cover.altKey` → claves en `items.[slug].media`
- [ ] `rights.verified: true` + nota interna si aplica
- [ ] Revisión visual original vs WebP
- [ ] `pnpm dev` → `/dev/media` solo en desarrollo

## Ingest de imagen

```bash
pnpm media:inspect -- --input "/ruta/original.jpg"
pnpm media:image -- --input "/ruta/original.jpg" \
  --project grupo-cadena-media \
  --name grupo-cadena-media-cover \
  --profile photo
```

Poster de vídeo: mismo comando con `--profile poster`.

```ts
cover: {
  id: "cover",
  type: "image",
  src: "/media/projects/grupo-cadena-media/grupo-cadena-media-cover.webp",
  aspectRatio: "16:9",
  width: 1920,
  height: 1080,
  altKey: "cover",
  captionKey: "cover",
  creditKey: "cover",
},
```

## Pegar en `projects.ts`

Pegar bloque `cover` en `src/content/projects.ts`.

Añadir en `messages/es.json` y `messages/en.json` bajo `Projects.items.grupo-cadena-media`:

```json
"media": {
  "cover": {
    "alt": "…",
    "caption": "…",
    "credit": "Foto: …"
  }
}
```

## Publicar proyecto

```ts
published: true,
rights: { verified: true, note: "…" },
```

Verificar:

- Home: featured + selected
- `/trabajo/grupo-cadena-media` y `/en/work/grupo-cadena-media`
- Build: `pnpm build`

## No publicar

- Assets sin `rights.verified`
- Imágenes de stock o placeholders
- Masters de prueba del pipeline en `public/media/`

## Estado actual

| Slug | Copy ES/EN | Media | published | Notas |
|---|---|---|---|---|
| grupo-cadena-media | ✓ | pendiente | false | Prioridad 1 — reportera TV |
| urjcmun | ✓ | pendiente | false | |
| annie-bonnie | ✓ | pendiente | false | |
| isocero | ✓ | pendiente | false | |
| retrato-editorial | ✓ 14 alts ES/EN | ✓ 14 WebP | false | `year` pendiente confirmación editorial |
| musica-en-directo | ✓ 6 alts ES/EN | ✓ 6 WebP | false | `year` pendiente confirmación editorial |
| calle-documental | ✓ 4 alts ES/EN | ✓ 4 WebP | false | `year` pendiente confirmación editorial |

Masters web de los 3 proyectos fotográficos: `public/media/projects/` — pendiente de commit.
Originales y ZIPs: `incoming-media/` — ignorado por Git, intactos.
