# Content intake — coberturas del reporter reel

Registro interno para catalogar cada cobertura antes de convertirla en Project.
No se publica nada desde aquí: una pieza solo pasa a `src/content/projects.ts`
cuando la fuente está verificada y existen archivo, derechos y créditos.

**Fuente operativa única para reporting pendiente:** esta tabla contiene una fila
por pieza y sus evidencias. `content-inventory.md` solo conserva nombres
candidatos y el resultado de la auditoría de URLs; no es otra fuente de datos.
Experiencias laborales pertenecen a `src/content/experience.ts`, no a Projects.

## Cómo usarlo

1. Una fila por cobertura.
2. Sin dato confirmado, dejar la celda vacía. Nunca rellenar por aproximación.
3. Al completar una fila, crear el Project con `published: false` y añadir media.
4. `published: true` solo con `rights.verified: true` y créditos cerrados.

## Criterio de verificación

Los estados son independientes: una fuente puede estar verificada sin que lo
estén el archivo reproducible, los derechos o la aprobación de publicación.
Para el Reporter Reel actual: **SOURCE VERIFICATION: VERIFIED** (solo el post
de LinkedIn), **MEDIA VERIFICATION: PARTIAL** (hay reel/resumen, pero no un
playback independiente confirmado), **RIGHTS VERIFICATION: UNVERIFIED** y
**PUBLICATION APPROVAL: PENDING**. El post no demuestra permiso para rehostear,
créditos, fuente original por cobertura ni el rol exacto de cada pieza.

## Campos

| Campo | Qué recoge |
|---|---|
| Event | Nombre exacto del evento, estreno o rueda de prensa |
| Date | Fecha de la cobertura |
| Organisation | Medio u organización para la que se realizó |
| Interviewee | Personas entrevistadas |
| Role | Función de Sofía en la pieza |
| Video URL | URL de reproducción independiente (Playback URL), si existe |
| Photos | Archivos fotográficos disponibles |
| Original URL | Publicación original, si existe |
| URL type | ORIGINAL SOURCE URL / PLAYBACK URL / SOCIAL SOURCE / PORTFOLIO URL |
| Platform | Mux / YouTube / Vimeo / LinkedIn / Instagram / TikTok / external |
| Aspect ratio | Ratio original: 9:16 / 16:9 / 1:1 / 4:5 |
| Embed status | Verificado / fallback a fuente / pendiente |
| Poster | Ruta de asset autorizado |
| Featured | yes / no; solo selección editorial verificada |
| Case study route | yes / no; no por defecto para coberturas breves |
| Rights | Titular de los derechos y condiciones de uso |
| Credits | Cámara, edición, producción y demás créditos |
| URL verification status | VERIFIED / PROBABLE / UNVERIFIED / NOT FOUND |
| Source verified | yes / no; yes solo para la fuente concreta, no equivale a aprobación editorial |
| Publication status | pending / published / rejected |
| URL verification note | Evidencia y límites de la verificación |

Al recibir respuestas de Sofía, verificar URL, medio, rol y derechos. Después,
clasificar cada material como **FEATURE / CASE STUDY**, **REPORTING PIECE**,
**REEL COMPONENT** o **EVIDENCE ONLY**. No convertir todas las coberturas en
Projects: seleccionar los trabajos fuertes que sostengan la evidencia y la
calidad, sin fijar una cuota artificial.

## Registro

| Event | Date | Organisation | Interviewee | Role | Video URL | Photos | Original URL | URL type | Platform | Aspect ratio | Embed status | Poster | Featured | Case study route | Rights | Credits | URL verification status | Source verified | Publication status | URL verification note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reporter Reel — resumen de temporada |  |  |  | Publicación propia bajo el perfil de Sofía; rol/créditos de cada segmento pendientes |  |  | https://es.linkedin.com/posts/sofia-chernikova_hace-unos-a%C3%B1os-habr%C3%ADa-visto-muchas-de-estas-activity-7486385459078746112--ATZ | SOCIAL SOURCE (post original del resumen) | LinkedIn |  | Post/transcripción públicos; reproducción/embedding independiente no verificado | pendiente de póster autorizado | no | no | Derechos de uso/reproducción pendientes | Créditos por pieza pendientes | VERIFIED | yes (solo fuente/post-resumen; no es aprobación editorial) | pending | Atribuido al perfil de Sofía enlazado por el portfolio. El texto dice que resume entrevistas de la temporada y que las vivió “con un micrófono en la mano”; la transcripción contiene segmentos de varias candidatas. No demuestra derechos, créditos, organización ni rol exacto en cada pieza. |
| Premios Anillos de Oro |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Premios ALMA |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Espectáculo flamenco / Teatro Gran Vía |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Un hombre de verdad |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Evento Disney (100 años) |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| La más grande / Rocío Jurado |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Scalpers / Fashion Week 2025 |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Evento/cabaret años 30 |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Zootrópolis 2 |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Evento/premios de moda |  |  |  |  |  |  |  |  | LinkedIn (evidencia ambigua) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | UNVERIFIED | no | pending | La transcripción automática de un fragmento es ininteligible; no permite identificar de forma fiable la pieza o el evento candidato. |
| Mágicas Navidades |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Los mejores años de nuestra vida / Hombres G |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| A todos lados de la cama |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
| Nota Blue |  |  |  |  |  |  |  |  | LinkedIn (solo evidencia en resumen) |  | Sin playback individual localizado |  | no | no | Pendiente | Pendientes | PROBABLE | no | pending | El segmento aparece en la transcripción del Reporter Reel; no se localizó publicación original individual ni se confirmaron organización, fecha o rol. |
