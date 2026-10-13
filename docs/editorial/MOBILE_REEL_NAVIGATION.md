# Mejora UX del reproductor móvil · portada

Fecha: 2026-10-13. Rama `ux/mobile-reel-navigation` (sin push ni merge). Capturas en `docs/editorial/mobile-reel-captures/{before,after}/`.

## 1. Diagnóstico

Archivos revisados: `reel-stage.tsx`, `portfolio-video.tsx`, `hero.tsx`, `short-form-reporting.tsx`, `showcase.css`, `media.css` y la página Trabajo.

- **Portada (`ReelStage`)**: sí tiene el problema. La pantalla del monitor medía `min(76vw, 360px)` de ancho, es decir, un vertical de ~526 px de alto en un iPhone de 390 px; con el pie, 594 px. Debajo iba una escaleta en rejilla de 4 columnas en dos grupos (~300 px). Medido antes del cambio al pulsar el primer vertical: en 390×844 la escaleta empezaba en y = 848 (fuera del viewport); en 375×667, 360×740 y 320×568 el reproductor quedaba a −435…−468 px (totalmente fuera) y la visitante veía solo la lista. Cada cambio de pieza obligaba a desplazarse arriba y abajo.
- **Trabajo (`ShortFormReporting`)**: no afectada. Cada tarjeta reproduce en su propio marco con `aspect-ratio` fijo; medido: la tarjeta mide 420,9 px antes y después de reproducir. No se ha tocado.
- **`portfolio-video.tsx` / `media.css`**: sin cambios. El reproductor ya se monta solo tras un gesto explícito y el evento `portfolio-video-activate` ya garantiza un único reproductor.

## 2. Cambios (< 700 px; escritorio intacto)

| Requisito | Implementación |
|---|---|
| A. Reproductor compacto | El ancho pasa del `<figure>` al marco del vídeo: `clamp(156px, (100svh − 340px) · 9/16, min(76vw, 360px))`. El 9:16 y el 16:9 se conservan (`aspect-ratio` del vídeo); la altura del vertical sale de la altura real del viewport, sin recortes. Apaisado: `min(92vw, 520px)` como antes. El pie ocupa todo el ancho del contenedor, así los títulos caben en 1–2 líneas en ES/EN/RU. |
| B. Selector horizontal | La misma escaleta (mismo DOM, mismos grupos «Coberturas» / «Verticales», orden editorial con el reel de coberturas primero) se convierte en tira horizontal: `overflow-x: auto`, `scroll-snap`, sin barra, sangrada a los márgenes de página con `env(safe-area-inset-*)`. Miniaturas de 56 px de alto con su formato real; numeración y duración debajo; la seleccionada lleva borde + número en rojo. Al cambiar de pieza, la miniatura activa se centra en la tira (`scrollTo` sobre la tira, no sobre la página). |
| C. Anterior / siguiente | Dos botones de 44×44 px en el pie, junto al contador `03/06`, con `aria-label` traducido + título de la pieza destino; `disabled` en los extremos. Usan la misma función `select()` que la escaleta: dispara `portfolio-video-activate` (para el reproductor anterior), cambia la pieza (`key` remonta `PortfolioVideo`, así que el anterior se desmonta) y arranca con el mismo comportamiento de audio de siempre. Nada se reproduce sin gesto. Ocultos en ≥ 700 px. |
| D. Scroll inteligente | `useEffect` sobre la pieza seleccionada, solo cuando el cambio es de la visitante (`userSwitched` ref). Si pantalla y tira ya están dentro del viewport por debajo de la cabecera, no hace nada; si no, `window.scrollTo` hasta dejar la pantalla a `header + 12px`, con `behavior: "smooth"` o `"auto"` si `prefers-reduced-motion: reduce`. |

Claves nuevas en `messages/*.json` (`Hero.previousPiece`, `Hero.nextPiece`) en ES/EN/RU. Sin bibliotecas nuevas. Sin tocar vídeos, Playback IDs, créditos ni textos.

## 3. Accesibilidad

- Botones y miniaturas ≥ 44×44 px (comprobado por script: todos los objetivos de la portada cumplen).
- `aria-label` en anterior/siguiente; `aria-current="true"` en la pieza activa; contador `aria-hidden` (el título ya lleva «En pantalla:» en `sr-only`).
- Teclado: Tab recorre pie → botones → miniaturas; Enter en «Pieza siguiente» cambia de pieza (probado). `:focus-visible` con anillo de acento en botones y miniaturas.
- El foco no se mueve al cambiar: tras pulsar «siguiente» el foco sigue en ese botón (medido: `activeElement = BUTTON.reel-stage-nav-button`); tras pulsar una miniatura, en la miniatura.
- Los controles de Mux no se tocan: los botones viven en el pie, fuera del marco del vídeo.

## 4. QA

### Medidas tras pulsar el primer vertical (la pantalla queda a 82 px, bajo la cabecera de 68 px)

| Viewport | Alto pantalla+pie | Fin de la tira | Viewport | ¿Todo visible? |
|---|---|---|---|---|
| 320×568 | 358 | 580 | 568 | tira sobresale 12 px (antes: reproductor a −452 px) |
| 360×740 | 481 | 703 | 740 | sí |
| 375×667 | 408 | 630 | 667 | sí |
| 390×844 ES/EN/RU, claro y oscuro | 585 | 807 | 844 | sí |
| 844×390 (apaisado) | — | — | 390 | usa la maqueta de escritorio (≥ 700 px): pantalla a la izquierda, lista a la derecha; el vertical supera el alto del viewport, como antes |

### Prueba funcional (390×844, movimiento normal, no reducido)

1. Abrir la portada → reel apaisado en pantalla. 2. Pulsar la pieza 03 (vertical) → reproduce, pantalla a 81 px, tira visible. 3. «Siguiente» → 04, mismo scroll (234), 1 `mux-player`. 4. «Siguiente» → 05, igual. 5. Pulsar 01 (apaisada) → pantalla 16:9 a 81 px, 1 `mux-player`. 6. Enter sobre «Pieza siguiente» → 02. 7. Volver a pulsar una pieza con todo visible → `scrollY` no cambia (234 → 234). 8. En ningún paso hay más de un reproductor en el DOM.

### Escritorio

1280×900 y 1920×900: maqueta idéntica a la anterior (pantalla + lista en columna con títulos), botones anterior/siguiente ocultos. Capturas `after/desktop-*.jpg`.

### Herramientas

`pnpm lint` ✓ · `pnpm typecheck` ✓ · `pnpm build` ✓. Consola: en una pasada aparecieron dos `404` de recursos que no se han vuelto a reproducir en portada, Trabajo ni escritorio; no proceden de este cambio (no añade recursos).

## 5. Límites conocidos

- 320×568 (iPhone SE 1.ª gen.): la tira asoma 12 px por debajo; el resto de tamaños cabe entero.
- Teléfono apaisado (alto < 500 px): se aplica la maqueta de escritorio sin cambios; el vertical no cabe en alto y requiere scroll o pantalla completa del reproductor. Mejorable en una iteración aparte con una regla `(max-height: 500px)`.
- Los grupos «Coberturas»/«Verticales» se mantienen en la tira como rótulos; si se prefiere una tira plana sin rótulos, basta con ocultar `.reel-stage-group-label` en móvil.
