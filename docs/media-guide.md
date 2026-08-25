# Media Guide

## Add Project

1. Add the project to `src/content/projects.ts`.
2. Add Spanish copy in `messages/es.json`.
3. Add English copy in `messages/en.json`.
4. Add real media under `public/media/projects/[project-slug]/`.
5. Define a real `cover`.
6. Add `altKey`, captions and accessible video titles.
7. Set `published: true` only when the project has enough real content.
8. Optionally set `featured: true`.

## Add Photo

- Use descriptive filenames, for example `urjcmun-2026-cover.webp`.
- Record width and height in the media object.
- Add a real alt text translation.
- Add a caption only when it gives useful editorial context.
- Set `position` to control order.
- Choose an aspect ratio: `3:2`, `4:3`, `16:9`, `4:5`, `2:3` or `1:1`.

## Add Video

- Choose `provider`: `native`, `youtube` or `vimeo`.
- Add `src` for native video, or `videoId` for YouTube/Vimeo.
- Add a real poster image.
- Add duration when known.
- Add an accessible title.
- Define Sofía's exact role in the project copy.
- Add `sourceUrl` only when the publication URL is verified.

## Naming

Use clear, stable filenames:

```text
urjcmun-2026-cover.webp
urjcmun-2026-01.webp
urjcmun-2026-02.webp
grupo-cadena-media-interview-cover.webp
```

Avoid camera filenames, temporary export names and large originals.

## Formats

- Photography and posters: WebP or AVIF.
- Video: use a specialised platform when available, or optimized native files.
- Do not commit RAW files or oversized originals.
