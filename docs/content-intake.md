# Content intake — coberturas del reporter reel

Registro interno para catalogar cada cobertura antes de convertirla en Project.
No se publica nada desde aquí: una pieza solo pasa a `src/content/projects.ts`
cuando `Verified` es `yes` y existen archivo y derechos.

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
| Rights | Titular de los derechos y condiciones de uso |
| Credits | Cámara, edición, producción y demás créditos |
| Verified | yes / no |

## Registro

| Event | Date | Organisation | Interviewee | Role | Video | Photos | Original URL | Rights | Credits | Verified |
|---|---|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |  | no |
