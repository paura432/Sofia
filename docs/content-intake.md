# Content intake — coberturas del reporter reel

Registro interno para catalogar cada cobertura antes de convertirla en Project.
No se publica nada desde aquí: una pieza solo pasa a `src/content/projects.ts`
cuando `Verified` es `yes` y existen archivo y derechos.

**Fuente operativa única para reporting pendiente:** esta tabla contiene una fila
por pieza y sus evidencias. `content-inventory.md` solo conserva nombres
candidatos y el resultado de la auditoría de URLs; no es otra fuente de datos.
Experiencias laborales pertenecen a `src/content/experience.ts`, no a Projects.

## Cómo usarlo

1. Una fila por cobertura.
2. Sin dato confirmado, dejar la celda vacía. Nunca rellenar por aproximación.
3. Al completar una fila, crear el Project con `published: false` y añadir media.
4. `published: true` solo con `rights.verified: true` y créditos cerrados.

## Campos

| Campo | Qué recoge |
|---|---|
| Event | Nombre exacto del evento, estreno o rueda de prensa |
| Date | Fecha de la cobertura |
| Organisation | Medio u organización para la que se realizó |
| Interviewee | Personas entrevistadas |
| Role | Función de Sofía en la pieza |
| Video | Archivo o enlace del vídeo |
| Photos | Archivos fotográficos disponibles |
| Original URL | Publicación original, si existe |
| Platform | Mux / YouTube / Vimeo / LinkedIn / Instagram / TikTok / external |
| Aspect ratio | Ratio original: 9:16 / 16:9 / 1:1 / 4:5 |
| Embed status | Verificado / fallback a fuente / pendiente |
| Poster | Ruta de asset autorizado |
| Featured | yes / no; solo selección editorial verificada |
| Case study route | yes / no; no por defecto para coberturas breves |
| Rights | Titular de los derechos y condiciones de uso |
| Credits | Cámara, edición, producción y demás créditos |
| Verified | yes / no |
| Publication status | pending / published / rejected |

## Registro

| Event | Date | Organisation | Interviewee | Role | Video URL | Photos | Original URL | Platform | Aspect ratio | Embed status | Poster | Featured | Case study route | Rights | Credits | Verified | Publication status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |  |  |  | no | no |  |  | no | pending |
