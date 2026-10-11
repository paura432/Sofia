# Fase 5.1 · Cambios aplicados y QA

Todos los cambios están en la rama `audit/sofia-photojournalism-phase5`, en un único commit de implementación sobre el commit del reel. Ninguno toca `rights`, `published`, créditos, autoría, la selección pública de un ensayo, el orden interno de una serie documental ni una imagen de portada (la portada de Calle conserva la misma foto; solo cambia el punto focal). No se ha borrado ningún archivo de medios.

## 1. Cambios seguros implementados

| # | Cambio | Dónde | Hallazgo | Evidencia |
|---|---|---|---|---|
| C1 | Audiovisual: VERSIÓN BETA (3), Condición Perfecta (4), 4 MINUTOS (5), Tras el sofá (6) | `src/content/projects.ts` (`order`) | F5-006, F5-016 | 4 MINUTOS sin audio en Mux; captura `home` después: VERSIÓN BETA como pieza grande |
| C2 | Monitor: MyMUN última (short-form-004 → 3, short-form-003 → 4) | `projects.ts` | F5-022 | Captura `home` |
| C3 | Series: Retrato 12, Estudio 13, Calle 14 | `projects.ts` | F5-009 | Captura `home` (tira) |
| C4 | `estudio-80c82615…` pasa del grupo Estudio al grupo Retrato del Archivo (ID, ruta y ALT sin cambios) | `src/content/photo-archive-data.ts` | F5-012 | Archivo: Retrato 30, Estudio 12; la «Serie completa» de Estudio ya no incluye un exterior |
| C5 | Navegación de Trabajo: «Archivo» sin contador | `src/app/[locale]/work/page.tsx` | F5-017 | Captura `trabajo` |
| C6 | Texto de Fotografía en ES/EN/RU: «Cinco series y un archivo para mirar sin prisa» (antes citaba «74 fotografías») | `messages/{es,en,ru}.json` (`Work.photographyText`) | F5-017 | Captura `home` |
| C7 | Página del Archivo: se elimina «74 fotografías» del encabezado; queda «74 imágenes» en la barra fija | `src/app/[locale]/work/photography/archive/page.tsx` | F5-017 | Captura `archivo` |
| C8 | Portada de Calle: `focalPoint.y` 42 → 56 | `src/content/photo-assets.ts` | F51-1 | Capturas `calle` antes/después |

Además, en esta misma rama y a petición del propietario (commit anterior): el reel de coberturas publicado como primera pieza del monitor, con el monitor adaptado a piezas apaisadas.

## 2. Cambios no implementados (y por qué)

| Cambio | Motivo |
|---|---|
| Ensayos reducidos (plaza 18, música 12, retrato 10, estudio 7, calle 5) y re-exportación de 6317, 4954, 4929, 4748 | Cambian la selección pública y el orden de una serie documental: aprobación |
| Portada de Calle → IMG_4748 | Imagen de portada: aprobación |
| Texto de 4 MINUTOS, ficha de 9‑1‑1, descripción de vivo | Información profesional: Sofía |
| Créditos (Tras el sofá, música de 4 MINUTOS, extras de Condición Perfecta, locución de VERSIÓN BETA, segmentos del reel) | Créditos: Sofía |
| Retirar 5454 del Archivo; eliminar el huérfano 028 | Visibilidad de una obra / borrado de medios |
| Pies de foto (acampada, nocturnas de Calle, festival) | Datos nuevos: Sofía |
| Renombrar a «Acampada en Sol» | Decidido por el propietario; se ejecuta en la fase de implementación con el slug/redirección |
| `rights.verified` / `published` | Solo con confirmaciones anotadas |

## 3. QA

| Comprobación | Resultado |
|---|---|
| `pnpm typecheck` | Sin errores |
| `pnpm lint` | Sin errores |
| `pnpm build` | Correcta (67 páginas estáticas generadas; rutas dinámicas por idioma) |
| `pnpm media:doctor` | 160 archivos, sin incidencias |
| Rastreo de la build local (`pnpm start`, puerto 3123) | 80 páginas en ES/EN/RU, todas 200; 136 imágenes servidas, todas 200; 0 `<img>` sin atributo `alt`; enlaces externos: dos de LinkedIn |
| Capturas de escritorio (1440 px) | Inicio, Trabajo, Archivo, Entre tiendas y tambores, Música, Calle, 4 MINUTOS, Perfil (`/es/sobre-mi`), Experiencia, Contacto, Inicio EN y RU |
| Capturas móviles (390 px) | Inicio ES/EN, Trabajo, Archivo, Entre tiendas y tambores, Música, Calle, Perfil, Contacto |
| Modo claro | Inicio (escritorio y móvil), Entre tiendas y tambores, Archivo, Trabajo (móvil); el fondo cambia a `rgb(244, 239, 231)` y los contrastes se mantienen |
| Antes/después | Inicio, Trabajo, Archivo y Calle capturados antes y después de los cambios; diferencias visibles: pieza grande de Audiovisual, orden de la tira, contador del Archivo, encabezado del Archivo, recorte de la portada de Calle |
| Reproducción de vídeo | Comprobada por endpoints (HLS y miniaturas 200) y, para el reel, por rendición de audio; no se ha reproducido en navegador con sonido |
| Accesibilidad | ALT presente en todas las imágenes; títulos por página; navegación por secciones con `aria-label`. No se ha pasado una auditoría automática de contraste ni de foco de teclado |
| ES/EN/RU | Las tres portadas y la ficha del reel comprobadas en captura; el resto por rastreo |

Capturas y hojas de contacto se generaron en el directorio temporal de la sesión; no se añaden al repositorio para no duplicar píxeles. Las miniaturas de `phase5-review/thumbs/` siguen siendo la referencia visual versionada.

## 4. Limitaciones

- Vídeo: sin escucha humana; las conclusiones de audio vienen de transcripciones automáticas (ver `PHASE5_VIDEO_REVIEW.md`, apéndice).
- Imágenes: reevaluadas a 480 px; la nitidez fina se comprobó en Fase 5 solo en 20 originales.
- Modo claro capturado forzando el atributo `data-theme` por DevTools, no pulsando el conmutador.
- No se ha probado en Safari ni en dispositivos reales.
