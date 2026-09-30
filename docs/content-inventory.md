# Content inventory — Reporting

Registro interno de coberturas potenciales detectadas en el reporter reel de Sofía Chernikova.
**No son proyectos verificados.** No se publican hasta completar verificación, archivo y derechos.

Relacionado: [`content-intake.md`](content-intake.md) (tabla operativa por pieza).

La lista de candidatos de este documento es únicamente una ayuda de
investigación; no representa proyectos publicados ni reemplaza la tabla
operativa de `content-intake.md`. Experiencias como Grupo Cadena Media y
URJCmun viven en `experience.ts`; solo una pieza concreta y verificable vive
en `projects.ts`.

## Estado global

| Campo | Valor |
|---|---|
| Reporter Reel — source | VERIFIED: publicación bajo el perfil de Sofía; acredita el post/resumen, no permiso de republicación |
| Reporter Reel — playback/media | PARTIAL: existe el reel/resumen social; playback independiente no verificado ni disponible |
| Reporter Reel — rights | UNVERIFIED: derechos de reutilización y rehost pendientes |
| Reporter Reel — publication | PENDING; `published: false`, aprobación editorial pendiente |
| 14 coberturas | 13 PROBABLE y 1 UNVERIFIED; fragmentos visibles o aparentes en el reel, pendientes de URL original individual y confirmación de Sofía. `SOURCE ORIGINAL NOT FOUND` no significa `PIECE NOT FOUND`: la evidencia está en el reel |
| Proyecto en `projects.ts` | `reporter-reel`, `published: false` |
| Status por defecto | `pending-piece-verification` |

## URL audit

No publicar las coberturas candidatas: no se localizaron publicaciones originales
individuales, posters autorizados ni créditos/roles confirmados. La publicación
social del Reporter Reel es evidencia del resumen y de sus segmentos, no reemplaza
la fuente original de cada cobertura. El enlace de perfil en `src/content/profile.ts`
no se trata como URL de pieza.

| URL | Provider | Tipo / acceso | Contenido / rol | Verificación | Decisión |
|---|---|---|---|---|---|
| https://es.linkedin.com/posts/sofia-chernikova_hace-unos-a%C3%B1os-habr%C3%ADa-visto-muchas-de-estas-activity-7486385459078746112--ATZ | LinkedIn | SOCIAL SOURCE; post público con transcripción; enlace a la publicación, no playback independiente | Resumen de temporada publicado bajo el perfil de Sofía; el texto refiere entrevistas con micrófono y el transcript incluye menciones de las candidatas | SOURCE: VERIFIED para el post/resumen; MEDIA: PARTIAL; RIGHTS: UNVERIFIED; PUBLICATION: PENDING. Piezas individuales: 13 PROBABLE, 1 UNVERIFIED | Integrar solo como `reporter-reel.sourceUrl`; conservar `published: false`; el post no confirma derechos, créditos, URLs originales, playback independiente ni roles individuales |

## Reglas

1. Sin dato confirmado → celda vacía. Nunca inferir.
2. Una fila por cobertura potencial.
3. `published: true` solo con `rights.verified: true` y créditos cerrados.
4. Ver [`profile-content-source.md`](profile-content-source.md) para fuentes verificadas del perfil.

Cuando llegue la información de Sofía, verificar URL, medio, rol y derechos;
clasificar cada material como **FEATURE / CASE STUDY**, **REPORTING PIECE**,
**REEL COMPONENT** o **EVIDENCE ONLY**. Considerar unas 3–5 piezas fuertes
individuales solo si la evidencia y calidad lo justifican; no forzar ese número.

---

# Reporter Reel — Potential Stories

| Title | Event | Date | Location | Organisation | Interviewee | Role | Video source | Photos | Original publication | Credits | Rights | Verification status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Premios Anillos de Oro | Premios Anillos de Oro | | | | | | | | | | | pending-piece-verification |
| Premios ALMA | Premios ALMA | | | | | | | | | | | pending-piece-verification |
| Espectáculo flamenco / Teatro Gran Vía | Espectáculo flamenco / Teatro Gran Vía | | | | | | | | | | | pending-piece-verification |
| Un hombre de verdad | Un hombre de verdad | | | | | | | | | | | pending-piece-verification |
| Evento Disney | Evento Disney | | | | | | | | | | | pending-piece-verification |
| La más grande / Rocío Jurado | La más grande / Rocío Jurado | | | | | | | | | | | pending-piece-verification |
| Scalpers / Fashion Week 2025 | Scalpers / Fashion Week 2025 | | | | | | | | | | | pending-piece-verification |
| Evento/cabaret años 30 | Evento/cabaret de ambientación años 30 | | | | | | | | | | | pending-piece-verification |
| Zootrópolis 2 | Zootrópolis 2 | | | | | | | | | | | pending-piece-verification |
| Evento/premios de moda | Evento/premios relacionados con moda | | | | | | | | | | | pending-piece-verification |
| Mágicas Navidades | Mágicas Navidades | | | | | | | | | | | pending-piece-verification |
| Los mejores años de nuestra vida / Hombres G | Los mejores años de nuestra vida / Hombres G | | | | | | | | | | | pending-piece-verification |
| A todos lados de la cama | A todos lados de la cama | | | | | | | | | | | pending-piece-verification |
| Nota Blue | Nota Blue | | | | | | | | | | | pending-piece-verification |
