# Rediseño del header móvil · navegación visible

Fecha: 2026-10-13. Rama `ux/mobile-header-nav`. Capturas en `docs/editorial/mobile-header-captures/{before,after}/`.

## 1. Auditoría del header anterior

Archivos revisados: `site-header.tsx`, `mobile-nav.tsx`, `nav-link.tsx`, `locale-switcher.tsx`, `theme-toggle.tsx`, `globals.css` (bloque «header»), `showcase.css` (`.section-nav`, `.work-rail`, `--reel-stage-chrome`), `motion.css` (view transition del header) y `layout.tsx`.

- **En móvil y tablet (< 980 px)** solo se veían SOFÍA CHERNIKOVA (izquierda) y MENÚ (derecha). Las cuatro secciones vivían únicamente dentro del panel. Header de 68 px (+1 px de borde) en todos los anchos hasta 979 px; la tablet de 768 px usaba el mismo header que un móvil pese a tener sitio de sobra.
- **Panel MENÚ**: cabecera que repite marca + «MENÚ», cuatro enlaces numerados 01–04, selector ES / EN / RU y tema. Diálogo con `aria-modal`, foco atrapado, Escape, `inert` sobre main/footer/marca/nav, `overflow: hidden` en el body. Se cierra al navegar (contexto `MobileNavCloseProvider`) y devuelve el foco al botón.
- **Idioma**: `LocaleSwitcher` conserva la ruta actual (incluido `/work/[slug]`). Rutas localizadas: `/trabajo`, `/sobre-mi`, `/experiencia`, `/contacto` · `/en/work…` · `/ru/rabota`, `/ru/o-sebe`, `/ru/opyt`, `/ru/kontakty`.
- **Sticky**: `--header-height` alimenta `.mobile-nav-panel`/backdrop (`top`), `.section-nav` de Trabajo y `.work-rail` de detalle (`top`), los `scroll-margin-top` de anclas y `--reel-stage-chrome` del monitor de portada (fijo en 340 px, con el header de 68 px incluido a mano).
- **Primer viewport de portada (antes)**: nombre a y = 137 px; marco del vídeo a 307–325 px según ancho. En 320×568 el marco llegaba al borde inferior.
- **Duplicados**: los mismos cuatro `NavLink` estaban en `.desktop-nav` (oculta < 980 px) y en el panel. La nav de escritorio era el candidato natural para reutilizar en móvil.

## 2. Diseño elegido y justificación

Se compararon dos opciones:

- **Opción A — header superior + tira horizontal visible.** Fila de marca + MENÚ y, debajo, TRABAJO · PERFIL · EXPERIENCIA · CONTACTO. Coste: +29 px de header en móvil.
- **Opción B — header compacto con navegación integrada.** Una sola fila con marca + secciones (+ MENÚ). Inviable por debajo de ~600 px: «SOFÍA CHERNIKOVA» más cuatro nombres sin truncar no caben en 320–430 px, y quitar MENÚ obligaría a sacar idioma y tema a la tira, que ya va justa.

**Elegida: A en móvil, B en tablet.** La misma `nav.site-nav` se coloca por CSS grid: en < 700 px ocupa una segunda fila (`"brand menu" / "nav nav"`); en 700–979 px va en la única fila entre la marca y MENÚ (`"brand nav menu"`); en ≥ 980 px desaparece MENÚ y aparecen idioma y tema como hasta ahora (`"brand nav"`). No hay ningún componente de navegación nuevo: la tira es la antigua `.desktop-nav` renombrada, envuelta en `SiteNavStrip` (cliente, 40 líneas) que solo marca el desbordamiento y centra el enlace activo.

Para contener la altura, la fila de la marca baja de 68 a 52 px (la marca y MENÚ siguen teniendo 44 px de alto táctil) y la tira mide 44 px: **97 px en total frente a 69 px**, es decir 28 px más. MENÚ se conserva porque sigue siendo la única puerta a idioma y tema en móvil y ofrece el índice numerado; la redundancia con la tira es solo en los cuatro enlaces y se asume a cambio de no inventar un tercer patrón.

Identidad: misma tipografía (Onest 760, versalitas 0,76 rem), blanco cálido con `--foreground-soft` en reposo, acento rojo únicamente en la sección activa (texto + subrayado de 1 px apoyado en el borde inferior), hairline `--line` entre las dos filas, sin sombras.

## 3. Comportamiento de la tira

- Enlaces con `flex: 0 0 auto`, `white-space: nowrap`, `min-height: 44px`, 6 px de aire lateral, 10 px de separación; sangrada a los bordes de pantalla con `env(safe-area-inset-*)`, `scroll-snap-type: x proximity`, sin barra de scroll.
- En 320 px la tira mide 354 px: CONTACTO queda cortado y un degradado de 64 px (`--background` → transparente) en el borde indica que hay más. Al desplazarse, aparece el degradado izquierdo. `SiteNavStrip` actualiza `data-overflow-start/end` con `ResizeObserver` + `scroll`; el CSS usa `:has()` para encender los degradados. En 360 px y superiores caben los cuatro nombres en ES, EN y RU.
- Al cambiar de ruta, si la tira desborda, el enlace activo se centra con `scrollLeft` (sin tocar el scroll vertical). Probado en Experiencia a 320 px.
- Activo: `aria-current="page"` desde `NavLink` (Trabajo también activa en `/trabajo/*`). Portada sin activo.

## 4. Indicador «Descubre su trabajo ↓»

No se añade. En todos los anchos probados el primer viewport muestra nombre, oficio y el marco del vídeo, y por debajo asoman cortados el pie del monitor o la tira de miniaturas (320×568: pie y botones; 375×667: pie y «Ver proyecto»; 390×844 y 430×932: tira de miniaturas). Ese recorte ya comunica la continuidad, y la nueva tira de secciones responde a la pregunta «qué puedo explorar» desde el header. Una tercera franja compitiría con el nombre y el vídeo.

## 5. Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/components/site-header.tsx` | `nav.desktop-nav` → `nav.site-nav`; enlaces dentro de `SiteNavStrip`; idioma + tema agrupados en `.site-nav-tools`. |
| `src/components/site-nav-strip.tsx` | Nuevo: contenedor cliente de la tira (desbordamiento + centrado del activo). |
| `src/components/mobile-nav.tsx` | `querySelector(".site-nav")` para el `inert` (antes `.desktop-nav`). |
| `src/app/globals.css` | `--header-row: 52px`, `--header-strip: 44px`, `--header-height = fila + tira + 1px` en móvil; 68 px desde 700 px; 72 px desde 980 px. `.nav-shell` en grid con áreas; estilos de `.site-nav`, `.site-nav-links`, degradados, `.site-nav-tools`; reglas de 700 px (una fila) y 980 px (idioma/tema). |
| `src/styles/showcase.css` | `--reel-stage-chrome: calc(var(--header-height) + 272px)` para que el marco del vídeo siga saliendo de la altura disponible real. |
| `docs/editorial/MOBILE_HEADER_NAV.md`, `mobile-header-captures/` | Este informe y 18 capturas. |

Sin cambios en textos editoriales, proyectos, vídeos, créditos ni `messages/*.json`.

## 6. QA

### Lint, typecheck, build

`pnpm exec tsc --noEmit`, `pnpm lint` y `pnpm build` limpios.

### Medidas (Chromium 1243, DPR 2, `reducedMotion: reduce`)

| Viewport | Header antes → después | Nombre (y) antes → después | Tira (scroll / visible) | Enlaces |
|---|---|---|---|---|
| 320×568 | 69 → 98 | 137 → 166 | 354 / 320 · desborda, degradado | 70·54·94·80 × 44 |
| 360×740 | 69 → 98 | 137 → 166 | 360 / 360 · cabe justo | idem |
| 375×667 | 69 → 98 | 137 → 166 | 375 / 375 | idem |
| 390×844 (ES/EN/RU, claro/oscuro) | 69 → 98 | 137 → 166 | cabe en los tres idiomas | RU: 64·75·49·80 × 44 |
| 430×932 | 69 → 98 | 137 → 166 | cabe | idem |
| 768×1024 tablet | 69 → 69 | 148 → 148 | una fila junto a MENÚ | 70·54·94·80 × 44 |
| 1280×800 escritorio | 73 → 73 | 280 → 280 | sin cambios | sin cambios |

Marco del vídeo en portada: 320×568 pasa de 307–472 a 336–501 (apaisado, sigue entero en pantalla); 390×844 de 315–517 a 344–546. El vertical 9:16 pierde 16 px de ancho en 375×667 por el nuevo `--reel-stage-chrome` (sigue cabiendo entero con su pie).

### Pruebas funcionales (`header-functional.mjs`, 43/43 OK en 320×568, 390×844 y 1280×800)

- Tira con los cuatro `href` correctos en ES, EN (tras cambiar idioma desde el panel en Experiencia → `/en/experience`) y RU.
- Orden de tabulación: saltar al contenido → marca → Trabajo → Perfil → Experiencia → Contacto → MENÚ. Anillo de foco `2px solid` visible en la tira.
- Enter sobre Perfil navega, `aria-current` cambia, `scrollY = 0`, el enlace activo queda dentro de la pantalla.
- MENÚ: panel abierto exactamente bajo el header (±1 px), `aria-expanded`, tira `inert`, `overflow: hidden` en body; Escape cierra y devuelve el foco a MENÚ; body restaurado; navegar desde el panel lo cierra.
- Header sticky tras 600 px de scroll; «siguiente» del monitor cambia a 02/06 con un único `mux-player`.
- Altura del header idéntica sin JavaScript y tras hidratar (98 = 98): sin salto de maquetación.
- Ancla `/trabajo#audiovisual` queda bajo el header + `.section-nav` (161 ≥ 98).
- Consola: solo los dos avisos preexistentes (404 transitorio de dev y el `script` JSON-LD en el layout).

### Revisión como diseñador (capturas `after/`)

- ¿Se entiende que hay secciones? Sí: cuatro nombres completos bajo la marca, sin abrir nada.
- ¿Profesional / cargado? Dos filas finas con una hairline; el peso tipográfico es el del sistema. En tablet queda incluso más limpio que antes (una fila completa).
- ¿El nombre conserva protagonismo? Sí: baja 29 px pero sigue siendo lo primero y lo mayor; el marco del vídeo sigue entero en el primer viewport en todos los anchos.
- ¿Fáciles de usar? 44 px de alto, ≥ 49 px de ancho, snapping, activo en rojo.
- ¿Justifica el espacio? 28 px (3–5 % del alto de pantalla) a cambio de descubrir las cuatro secciones de inmediato.

## 7. Pendientes y límites

- **Trabajo en 320 px**: la `.section-nav` de secciones (Reportajes · Audiovisual · Fotografía · Archivo) ya se partía en dos filas antes del cambio; ahora el conjunto sticky (header 98 + 135 px) ocupa ~41 % de la pantalla. Convertirla en una tira de una sola fila, como la del header, sería el siguiente paso; fuera del alcance de esta tarea.
- **Detalle de proyecto**: header (98) + `work-rail` (48) = 146 px sticky en móvil; la miga «Trabajo / Reportajes» convive con TRABAJO activo en la tira. Es coherente (la miga aporta sección y paginador), pero se puede valorar ocultar la palabra «Trabajo» de la miga en móvil.
- La tira no se oculta al hacer scroll; se ha preferido una altura estable para no mover los elementos sticky ni las anclas.
- `:has()` y `ResizeObserver` tienen soporte en todos los navegadores evergreen; sin ellos la tira sigue siendo desplazable, solo sin degradado.
