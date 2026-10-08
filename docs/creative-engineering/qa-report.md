# QA report — Creative Engineering 3.0

Fecha: 2026-10-08. Entorno: espejo Windows del repo (WSL no ejecutable desde el host), Node 24.5, pnpm 10.24, Chrome estable vía `playwright-core` (herramienta de QA fuera del repo, no añadida como dependencia). Producción local (`next build && next start`). *Antes* = `a9b991f` construido en paralelo con las mismas dependencias.

## Checks del proyecto

| Check | Antes | Después |
|---|---|---|
| `pnpm typecheck` | PASS | PASS |
| `pnpm lint` | PASS | PASS (0 avisos) |
| `pnpm build` | PASS (61 páginas) | PASS (52 páginas: 3 rutas de disciplina ×3 idiomas sustituidas por redirecciones) |
| `pnpm media:doctor` | — | PASS (160 ficheros, sin incidencias) |
| `pnpm react-doctor --score` | 83 | 87 (5 avisos restantes, todos en código previo) |

## Pruebas funcionales en navegador (17/17 PASS)

Reel del hero se reproduce tras clic **con sonido** (`muted=false`) · cambiar de pieza en la escaleta mantiene un único `<mux-player>` · pausa/reanudar no vuelve a silenciar (bug anterior) · en Trabajo sólo un reel activo · `document.startViewTransition` se invoca al navegar Trabajo → detalle · visor de fotos: abre con teclado, Escape cierra y devuelve el foco · 3 redirecciones 308 a anclas (ES/EN/RU) · sitemap sin URLs de reels y las 45 URLs devuelven 200 · skip link es el primer tabulador · `lang` correcto en ES/EN/RU · sin errores de página.

Capturas sin desbordamiento horizontal ni errores de consola en 320, 375, 390, 430, 768, 1024, 1366, 1440, 1920 y 2560 px; tema claro y oscuro; ES/EN/RU.

## Rendimiento (laboratorio, mediana de 5)

Móvil emulado: 390×844 @3x, CPU ×4, 1,6 Mbps / 150 ms RTT. No son datos de campo.

| Página | LCP antes | LCP después | CLS | JS | Fuentes |
|---|---|---|---|---|---|
| Home | 1,66 s (retrato) | 2,18 s (póster del reel) | 0 → 0 | 248 → 245 KB | 158 → 159 KB |
| Trabajo | 2,71 s | 2,98 s | 0 → 0 | 241 → 246 KB | 158 → 159 KB |
| Entre tiendas y tambores | 2,62 s | 3,28 s | 0 → 0 | 253 → 253 KB | = |
| Perfil | 1,67 s | 1,70 s | 0 → 0 | 240 → 240 KB | = |

Escritorio sin limitar: LCP 88–252 ms en todas las páginas.

**Regresiones detectadas y corregidas durante el QA**
1. Fuentes 158 → 408 KB (LCP Home 4,7 s): `next/font` precargaba latín + cirílico y la cursiva. Ahora sólo se precarga latín (el cirílico llega por `unicode-range` en ruso) y se eliminó la cursiva.
2. Pósters de reels pedidos a 1080 px aunque los vídeos miden 576–720 px: `sizes` ajustado a la resolución nativa.
3. `sizes` heredado del carrusel (78vw) en la rejilla de Trabajo: corregido (Trabajo 3,9 → 3,0 s).
4. Probado y **descartado**: servir pósters directamente desde Mux con un loader propio — más lento (5,2 s) porque Mux genera cada ancho bajo demanda; el optimizador de Next los cachea.

**Trade-offs aceptados**
- Home: el LCP es ahora una pieza de trabajo (póster del reel) en lugar del retrato; +0,5 s en 3G lento, dentro del objetivo de 2,5 s.
- Entre tiendas y tambores: la nueva portada nocturna tiene mucho más detalle (1,26 MB de origen frente a 0,67 MB) y pesa más tras optimizar; +0,7 s en 3G lento. Decisión editorial (ver `photo-curation-v2.md`).
- Mux Player (≈314 KB gzip) sólo se descarga tras el primer clic en un vídeo.

## Accesibilidad

- Foco visible, skip link, `lang` por idioma, diálogo nativo con foco atrapado y restaurado.
- Monitor del hero: botones con `aria-label` ("Reproducir: título"), `aria-current` en la pieza activa, objetivos táctiles ≥ 44 px.
- Visor: swipe táctil añadido sin anular el zoom nativo (`touch-action: pan-y pinch-zoom`).
- `prefers-reduced-motion`: reveals, piloto REC, fundidos del visor y View Transitions quedan en 0 s.
- Contraste de texto secundario ≥ 5:1 en ambos temas (tokens en `globals.css`).
- Se eliminó el `tabIndex` de la antigua región desplazable de reels (ya no hay carrusel).

## Limitaciones

- Métricas de laboratorio en una sola máquina; sin datos reales de Vercel Speed Insights.
- No se probó en Safari/iOS ni Firefox reales (sólo Chrome). En navegadores sin View Transitions la navegación funciona sin morph.
- Sin lector de pantalla real (NVDA/VoiceOver); la verificación de semántica es por código y árbol DOM.
- `git fetch` no fue posible (clave SSH no accesible desde el host): no se confirmó si `origin/main` avanzó tras `a9b991f`.
