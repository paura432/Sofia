# Fase 5 · Plan de implementación (propuesta; nada ejecutado)

Se separa lo que puede hacerse en la siguiente fase sin más confirmaciones de lo que depende de Sofía, de los clientes o del criterio legal del propietario. No se borran medios originales en ningún caso. Sin nuevas dependencias ni suites de test; sin rediseño.

## A. Cambios seguros (orden interno, selección sobre material ya en el sitio, presentación)

| # | Cambio | Dónde | Esfuerzo |
|---|---|---|---|
| A1 | Reordenar los ensayos según `PHASE5_PHOTO_SELECTION.md` §3 para Plaza (17), Retrato (10), Estudio (7) y Calle (5) con las imágenes ya exportadas a 2 800 px | `src/content/photo-assets.ts` (arrays `*_media`, `layout`, `position`, `narrativeRole`) | 1–2 h |
| A2 | Música: nuevo orden de 12, incluyendo 4 fotos que hoy solo están a 960 px (6317, 4989, 4954, 4929): re-exportar desde `incoming-media/originals` con el pipeline existente (`scripts/media`) y añadirlas a `selectedOriginals` y a `photo-assets.ts` | `src/content/photo-archive-data.ts`, `photo-assets.ts`, `public/media/projects/musica-en-directo/` | 2 h |
| A3 | Portada de Calle: `calle-documental-04` → la imagen de IMG_4748 (hoy `calle-img-4748` solo en Archivo a 960 px: re-exportar) | `photo-assets.ts` (`calle_documental_cover`) | 30 min |
| A4 | Orden de series: Entre tiendas, Música, Retrato, Estudio, Calle; Archivo como anexo sin contador en la navegación de Trabajo; quitar «74 fotografías» del texto de Fotografía y «Reportajes» de la navegación (mantener «Ante la cámara») | `projects.ts` (`order`), `work/page.tsx`, `messages/*.json` (`Work.photographyText`, `Work.reportingNav`) | 1 h |
| A5 | Orden de verticales (9‑1‑1, Madrid a pie, vivo, MyMUN) y de Audiovisual (4 MINUTOS, VERSIÓN BETA, Condición Perfecta, Tras el sofá) | `projects.ts` (`order`) | 15 min |
| A6 | Póster de 4 MINUTOS: `posterTime` 145 → 186 (comprobar visualmente) | `projects.ts` | 15 min |
| A7 | Eliminar el huérfano `entre-tiendas-y-tambores-028.webp` de `public/` (el original sigue en el ZIP) | `public/media/projects/entre-tiendas-y-tambores/` | 5 min |
| A8 | Completar créditos ya visibles en pantalla y de autoría clara: extras de Condición Perfecta; crédito de música de 4 MINUTOS como «Sonido final: losniñosdelcaminito» (texto literal de pantalla) | `messages/*.json` (`credits`, `creditLabels`) | 30 min |
| A9 | Mover `estudio-80c82615` del grupo `estudio` al grupo `retrato` del Archivo | `photo-archive-data.ts` | 15 min |
| A10 | Verificar tras cada cambio: `pnpm lint`, `pnpm typecheck`, `pnpm build`, paridad de ALT (las claves `media.*.alt` no cambian), capturas de las páginas de serie en escritorio y móvil | — | 30 min |

## B. Cambios que requieren aprobación

| # | Cambio | Quién aprueba | Depende de |
|---|---|---|---|
| B1 | Mantener publicadas las cinco series fotográficas y los tres cortos (registro de autorización en `rights`) | Sofía + propietario | P0-1, P0-5 |
| B2 | Entre tiendas y tambores en portada del sitio y con personas identificables/policía | Propietario (criterio legal) + Sofía | P0-2 |
| B3 | Reescribir o retirar «Un solo plano, sin cortes» y «la cámara se queda mirando el espacio vacío» en 4 MINUTOS (ES/EN/RU) | Sofía (tras ver el vídeo) | P0-3 |
| B4 | Créditos completos de Tras el sofá (grafías y reparto) | Sofía | P1-2 |
| B5 | Retirar `retrato-img-5454` del Archivo público | Sofía | P1-6 |
| B6 | Portada de Calle con `calle-img-4705` (menores a distancia) en lugar de 4748 | Propietario | P1-7 |
| B7 | Captions con datos nuevos: fecha de la acampada, evento de las nocturnas de Calle, nombre del festival, artistas, revista | Sofía | §7 de la selección |
| B8 | Abrir Música con 6385 si es la foto de Kinder Malo | Sofía | P0343 |
| B9 | Publicar el reel de TV o piezas emitidas; incorporar *Lo que vibra no muere* | Sofía + cadena | P1-1 |
| B10 | Confirmar permisos de clientes (Yoigo/Annie Bonnie, URJCmun, revista, artistas de estudio) y música de Madrid a pie y VERSIÓN BETA | Sofía / clientes | P1-8 |
| B11 | Cambiar `rights.verified` a `true` en cualquier obra | Propietario, con la confirmación anotada | B1, B10 |

## B bis. Cambio ya decidido por el propietario (2026-10-11): «Entre tiendas y tambores» → «Acampada en Sol»

Instrucción recibida durante esta fase. Se ejecuta en la siguiente, no aquí (auditoría de solo lectura). Alcance recomendado:

| Qué | Dónde | Nota |
|---|---|---|
| Título de la serie en ES/EN/RU (`Projects.items.entre-tiendas-y-tambores.title`) y su `description` | `messages/{es,en,ru}.json` | EN «Camp in Sol» / RU «Лагерь на Соль» como propuesta; la descripción ya dice «acampada en Sol» |
| Slug público `/trabajo/entre-tiendas-y-tambores` | `src/content/projects.ts` (`slug`), `src/app/sitemap.ts` | Dos opciones: (a) mantener el slug y cambiar solo el título (cero riesgo, URLs estables); (b) nuevo slug `acampada-en-sol` con redirección 308 desde el antiguo en `next.config.ts`, como ya se hizo con `/trabajo/reportajes`. Recomendada (b) si el sitio aún no está indexado; (a) si ya hay enlaces externos |
| IDs internos (`entre-tiendas-y-tambores-001…038`), claves de ALT (`media.entre-tiendas-y-tambores-*`), nombres de archivo en `public/media/projects/entre-tiendas-y-tambores/` | código y assets | **No renombrar**: 38 ficheros, 114 claves de ALT y la tabla de curación dependen de ellos; el ID interno no se ve en la web |
| Referencias en documentación (`photo-curation-v2.md`, informes de fase) | docs | Añadir una nota de alias; no reescribir históricos |
| Pie/contexto | `description` | El nuevo título ya sitúa el lugar; la descripción debe conservar «movilizaciones por el derecho a la vivienda» y, cuando Sofía la confirme, la fecha |

El nuevo título es más preciso periodísticamente (lugar y hecho) y elimina la ambigüedad de «tambores»; a cambio pierde la referencia a la música con la que la serie abre y cierra. La secuencia propuesta no cambia.

## C. Orden sugerido de la siguiente fase

1. Enviar a Sofía la lista de materiales y confirmaciones (`PHASE5_PHOTO_SELECTION.md` §8) junto con `phase5-review/index.html`.
2. Ejecutar A1–A10 en una rama `content/phase-6-curation` sobre `main`.
3. Con las respuestas de Sofía, ejecutar B3–B8 y los captions.
4. Solo con B1, B2 y B10 resueltos, tocar `rights` (B11) y, en su caso, publicar el reel (B9).

## D. Control de calidad de esta fase

- Inventario: 111 archivos distintos, 157 usos, 112 miniaturas revisadas (incluido el huérfano 028); cada una con ID y decisión en la matriz.
- Series: las cinco auditadas; secuencias propuestas para las cinco.
- Duplicados: no se ha tratado como obra distinta ninguna copia de ensayo; el huérfano 028 identificado.
- Conclusiones visuales: todas sobre imágenes inspeccionadas (hojas de contacto para 112; originales para 20; fotogramas para los 8 vídeos).
- Créditos: comparados con los créditos en pantalla de 4 MINUTOS, Tras el sofá y Condición Perfecta.
- Texto público: no se propone añadir párrafos; solo pies factuales de una línea donde faltan datos.
- Word y `main` intactos: comprobado (`git status`, `git rev-parse main` = `bfad55a`).
