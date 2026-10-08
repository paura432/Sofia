# CREATIVE_AUDIT — Sofía Chernikova · Creative Direction 2.0

Fecha: 2026-10-08 · Rama: `feat/sofia-creative-direction-v2` · Base: `main` @ `a9b991f`

## 0. Estado del repositorio y del entorno

| Comprobación | Resultado |
|---|---|
| Rama inicial | `main`, limpio salvo 6 ficheros no versionados en raíz (MP4 de reels, `videos_reels.zip`, JPG de SaveVid). No se tocan ni se versionan. |
| `HEAD` / `origin/main` (ref local) | `a9b991f` / `a9b991f` |
| `git fetch origin` | **Falló**: el remoto usa el alias SSH `github-paura432`, sin clave accesible desde el host Windows. No se pudo confirmar si `origin/main` avanzó. |
| Ejecución en WSL | **No disponible** (`Wsl/Service/E_UNEXPECTED`). Se trabajó leyendo/escribiendo por `\\wsl$` y compilando en un espejo Windows (Node 24, pnpm 10.24, dependencias reinstaladas con `--frozen-lockfile`). |
| Baseline técnico | `typecheck` PASS · `lint` PASS · `build` PASS (61 páginas). |
| Navegador | Chrome local vía `playwright-core` (herramienta de QA fuera del repo). Capturas reales de producción (`next start`). |
| Vercel | Sólo `@vercel/analytics` y `speed-insights`; sus scripts dan 404 fuera de Vercel (esperado). |

Las capturas *antes* están en el scratchpad de la sesión (no versionadas): rutas ES (todas), EN/RU home, a 390 y 1440 px (página completa) y 320/375/430/768/1024/1920/2560 px (primer viewport). Se capturaron con `prefers-reduced-motion: reduce` porque los reveals por IntersectionObserver no se disparan durante un scroll programático rápido (artefacto de captura, no fallo para usuarios reales — se verificó leyendo `use-reveal.ts`).

## 1. Mapa real de pantallas (antes)

```
/                       Hero (nombre + retrato) → REPORTING (4 reels) → 4 MINUTOS → Fotografía (2) → Actual y reciente → Perfil → Contacto
/trabajo                Índice de 4 disciplinas (Reporting, Audiovisual, Fotografía, Archivo) — sin piezas reproducibles
  /reportajes           "FORMATO BREVE": 4 reels
  /audiovisual          4 obras en lista
  /fotografia           5 series
  /fotografia/archivo   74 fotos con filtros
  /[slug]               9 detalles (4 audiovisual + 5 foto). Los reels no tienen detalle.
/sobre-mi · /experiencia · /contacto
```
Navegación: header (4 items + ES/EN/RU + tema) **más** un segundo rail en Trabajo (Índice · Reporting · Audiovisual · Fotografía · Archivo 74).

## 2. Auditoría por pantalla

### Home
- **A. Primera impresión**: "una persona con nombre grande y un retrato bonito". No dice *reportera* hasta leer la línea en versalitas; no hay prueba de trabajo en el primer viewport.
- **B. Jerarquía**: nombre → retrato → cargo. El trabajo aparece tras un scroll completo.
- **C. Narrativa**: "Reportajes, entrevistas y vídeo desde Madrid" — correcto pero intercambiable.
- **D. Identidad**: Newsreader en mayúsculas + negro + rojo: elegante pero genérico; podría ser cualquier portfolio editorial.
- **E. Contenido**: los 4 reels sí aparecen, con títulos provisionales ("Micrófono", "Smartphone · exteriores") que describen el objeto, no la pieza.
- **F. Interacción**: el vídeo arranca **silenciado y se vuelve a silenciar en cada `play`** (P0, ver §3).
- **G. Responsive**: en móvil el retrato ocupa ~70 % del primer viewport; la primera prueba de trabajo queda a >1,5 pantallas. A 2560 px "CHERNIKOVA" **colisiona con el retrato** (P1).
- **H. Problemas**: "REPORTING" en inglés y mayúsculas dentro de la versión española; la sección "Actual y reciente" duplica Experiencia; "Perfil" repite el cargo por tercera vez.

### Trabajo (índice)
- Página intermedia sin piezas: 4 filas enormes con imagen + enlace. Para ver un reel hacen falta 2 clics; para una serie, 3.
- La misma foto de concierto se usa para "Fotografía" y "Archivo fotográfico" (P1).
- Doble navegación: header + rail con 5 enlaces que repiten el índice (P1).
- Contadores ("04", "05", "74") sin etiqueta: no se entienden.

### Reportajes
- Título "REPORTING" + "FORMATO BREVE": jerga interna; ninguna frase explica qué hace Sofía en estas piezas.
- Grid de 4 cards 9:16 correcto en desktop; en móvil es un carrusel horizontal sin indicación clara.
- Posters: dos de cuatro con grafismos grandes sobre la cara o encima ("ESTÍMULOS", "DOSSIER DE PARTICIPANTE").

### Audiovisual
- Lista de reproductores, no filmografía: rol, formato y duración están escondidos en el detalle.
- Poster de 4 MINUTOS con subtítulo quemado ("o quemarla").

### Fotografía
- 5 series con portadas sin relación entre sí en tamaño; mosaico irregular sin intención clara.
- **Entre tiendas y tambores** abre con una pancarta "P.P. MALTRATA LA INFANCIA": como portada, convierte un ensayo de observación en un titular partidista que el portfolio de una periodista no debería firmar por omisión (P0 editorial — ver `photo-curation-v2.md`).
- En la serie completa la cuadrícula deja huecos vacíos al final (P2).

### Detalle de proyecto
- Bien resuelto en lo técnico (visor con teclado, Escape, foco), pero cabecera con "01 / 09" sin significado y un hero que separa título y obra con mucho vacío.

### Perfil
- "Reportera de televisión." como H1 + "Sobre mí" con una columna vacía de ~450 px a la izquierda; formación, idiomas y herramientas en bloques de CV.
- No dice qué le interesa ni cómo trabaja (no hay fuente; se registran preguntas).

### Experiencia
- Cronología desordenada (2024, **2022**, 2025, 2023): el orden no es cronológico ni explicado (P1).
- Responsabilidades largas y repetidas.

### Contacto
- "¿Hablamos?" + email. Correcto y directo, pero la página es casi vacía y el footer repite LinkedIn.

### Sistema
- Ruso: Newsreader no tiene cirílico y sólo se carga el subset `latin` de Geist → **todo el ruso cae en fuentes del sistema** (P1 identidad/calidad).
- Sitemap: lista `/trabajo/short-form-00X` para los 4 reels, que **no tienen página** (404 indexables) (P1 SEO).
- Header sticky correcto; selector de idioma claro; tema claro/oscuro funciona.

## 3. Reproducción de vídeo (`PortfolioVideo`)
- `muted` + `onPlay → player.muted = true` + `ref → muted = true`: el usuario puede desmutear, pero cualquier pausa/reanudación vuelve a silenciar. En reporterismo la voz *es* el trabajo → **P0**.
- Bien: sólo se monta el reproductor tras clic; un único vídeo activo (evento global); `preload="none"`; poster con `next/image`.
- Mejorable: no hay estado de carga visible; el botón de play es un círculo genérico; no se ve qué se va a reproducir en móvil (título bajo el poster, fuera del área táctil).

## 4. Hallazgos priorizados

| P | Hallazgo | Acción |
|---|---|---|
| P0 | Primer viewport sin prueba de trabajo; reportera no reconocible en 3 s | Hero con pieza ante cámara reproducible |
| P0 | Vídeo forzado a silencio | Reproducción con sonido tras clic, *fallback* silenciado si el navegador lo bloquea |
| P0 | Títulos provisionales de reels | Títulos editoriales verificables + registro de preguntas |
| P0 | Portada política en Entre tiendas y tambores | Nueva portada y secuencia (curación v2) |
| P1 | Índice de Trabajo = página intermedia; doble navegación | Trabajo como escaparate único con secciones ancladas |
| P1 | Ruso sin tipografía propia | Familias con cirílico |
| P1 | Sitemap con URLs 404 | Sólo proyectos con detalle |
| P1 | Experiencia fuera de orden | Cronología inversa por fecha de inicio |
| P1 | Colisión del nombre a 2560 px | Nuevo hero |
| P1 | Misma imagen en dos entradas de Trabajo | Portadas diferenciadas |
| P2 | Huecos en grid de serie completa, contadores sin etiqueta, "01 / 09" | Pulido |

## 5. Oportunidades
1. El material más fuerte es **Sofía ante cámara**: debe ser el hero, no un retrato posado.
2. El lenguaje del oficio (piloto rojo de grabación, timecode, rótulo) puede dar identidad sin caer en estética de telediario.
3. Trabajo puede mostrar *todo* en una página: 4 reels + 4 obras + 5 series caben sin fragmentar.
4. Perfil puede ganar humanidad con el retrato existente y una composición asimétrica, sin inventar biografía.
