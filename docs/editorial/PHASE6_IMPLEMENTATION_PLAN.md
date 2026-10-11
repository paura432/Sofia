# Fase 6 · Plan de implementación (no ejecutado)

Condición de arranque: aprobación escrita del propietario sobre las variantes elegidas y respuestas de Sofía a las preguntas de `PHASE6_PROPOSED_COPY_ES.md` §9. Sin ellas se implementa solo el bloque A.

## A · Cambios sin dependencia de Sofía (seguros)

| # | Cambio | Archivos | Dependencia |
|---|---|---|---|
| A1 | `Work.reportingText`, `Work.audiovisualText`, `Work.photographyTitle` (ES, luego EN/RU) | `messages/{es,en,ru}.json` | Ninguna (describen lo que hay) |
| A2 | Cargo «Reportera de televisión»; cargo y tira de URJCmun en español con la denominación oficial entre paréntesis | `messages/*.json` (`Experience.items.*.role`, `.progression.*`) | Ninguna |
| A3 | Reel: `roles` → «Reportera — Sofía Chernikova» (una línea); eliminar la segunda | `messages/*.json` | Ninguna |
| A4 | Eliminar las 16 claves sin uso (`Projects.featuredEyebrow`… ver auditoría §1) en los tres idiomas | `messages/*.json`; comprobar con `pnpm typecheck` que ningún componente las lee | Ninguna |
| A5 | Correcciones de traducción que no dependen de textos nuevos: títulos de oficio EN, «Photo archive», «Based in», «Roles held», «Go to homepage», `contact.description` EN; RU: «прогулка на камеру», «СМИ, репортажи…», «спродюсировано агентством», «разруха», «Героиня…», «континьюити», bloque «эдиториал», plural ICU en `archiveTeaser`, «публичные персоны», «В ролях», «Контент и ведение», «Продюсирование…», «Пуэрта-дель-Соль», «Город», «Карьера», «Живая музыка», nombre en cirílico | `messages/{en,ru}.json` | Ninguna |
| A6 | Herramientas en cuatro grupos: `tools` pasa de `string[]` a `{ group, items }[]`; el componente de Perfil renderiza un grupo por línea; etiquetas de grupo en `Profile.tools.*` | `src/content/profile.ts`, `src/app/[locale]/about/page.tsx`, `messages/*.json` | Aprobación del propietario (estructura) |
| A7 | Idiomas en un renglón compacto (si el diseño lo acepta) | `src/app/[locale]/about/page.tsx` | Aprobación del propietario |
| A8 | Música: «Conciertos y festivales en Madrid…» | `messages/*.json` | Ninguna (P0334) |

## B · Cambios que requieren a Sofía

| # | Cambio | Pregunta que lo desbloquea |
|---|---|---|
| B1 | `Profile.bio` → variante B (o A) | §9.1 |
| B2 | `Hero.summary` (cierre) | §9.1 y recomprobar «ruedas de prensa» |
| B3 | Experiencia · Grupo Cadena Media → propuesta 1 | §9.2 |
| B4 | Experiencia · Annie Bonnie → propuesta 1 o 2 | §9.3 |
| B5 | Experiencia · URJCmun → propuesta 1; tira con o sin «Delegada»; «TEEN» | §9.4 |
| B6 | Experiencia · Isocero → propuesta 1 | Aprobación simple |
| B7 | 4 MINUTOS: descripción, proceso, crédito musical | §9.6 |
| B8 | 9‑1‑1: descripción (o vídeo largo) | §9.7 |
| B9 | vivo: descripción y marca | §9.8 |
| B10 | Créditos y años de Tras el sofá, VERSIÓN BETA, Condición Perfecta | §9.9 |
| B11 | Series: títulos («Acampada en Sol» ya aprobado; «Calle» pendiente del propietario), fechas, descripción de Calle, revista, festival | §9.10 |
| B12 | Formación: denominación y estado | §9.5 |
| B13 | Enlaces a Instagram/YouTube | §9.11 |

## C · Orden de ejecución

1. Rama: esta (`content/phase6-editorial-voice-audit`) para los informes; para el código, `content/phase6-copy` sobre `main` una vez aprobado.
2. Español primero (`messages/es.json`), con un comentario de trazabilidad por clave cambiada en `docs/editorial/PHASE6_CHANGELOG.md` (clave, antes, después, `P####`).
3. Inglés y ruso: traducción editorial de cada texto nuevo (no literal); aplicar A5; comprobar que los atenuadores sobreviven («un poco», «bastante», «Creo que»).
4. Código: A6 y A7 (perfil), renombrado de la serie (título en tres idiomas; slug y redirección 308 según el plan de Fase 5).
5. QA: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm media:doctor`; rastreo de las 80 rutas; capturas de Perfil, Experiencia, Trabajo y una ficha en escritorio y móvil, ES/EN/RU; recuento de *mirar*/*contar*/*historia*/*cámara* por página (umbral: tres); comprobar que ninguna sección crece más de lo previsto (Perfil: +1 párrafo; Experiencia: cuatro descripciones de 40–65 palabras).
6. Sin push, merge ni despliegue hasta la autorización del propietario.

## D · Qué no se toca

ALT (121), títulos de medios, interfaz, metadatos ES, `rights`, `published`, orden de piezas (Fase 5.1), selección fotográfica (pendiente de la fase de curación).
