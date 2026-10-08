# Benchmark de repositorios: rediseño del portfolio de Sofía

**Fecha:** 2026-10-08
**Contexto:** portfolio Next.js 16 / React 19 de una reportera de TV que también hace cortometrajes y fotografía (documental, conciertos, retrato). Inventario: 4 reels verticales 9:16 en Mux, 4 piezas 16:9, 5 series fotográficas y un archivo de 74 imágenes, en ES/EN/RU.
**Stack actual de Sofía (VERIFICADO en `package.json` del repo):** `next 16.3.3`, `react`/`react-dom 19.2.8`, `motion 13.1.0`, `@mux/mux-player-react ^3.13.3`, `next-intl 4.13.7`.

## Método y leyenda

- Los metadatos (estrellas, último push, archivado, licencia) vienen de `https://api.github.com/repos/OWNER/REPO`, consultada el 2026-10-08. Las dependencias salen de `package.json` vía `raw.githubusercontent.com` (rama `HEAD`). De cada repo se descargaron e inspeccionaron entre 1 y 4 ficheros de código fuente con búsquedas dirigidas (aria, role, focus, prefers-reduced-motion, preload, etc.).
- **No se ha ejecutado ninguna demo ni se ha visto nada renderizado.** Todo lo que se dice sobre lo visual o la sensación de las interacciones se deduce del código o de los textos de README/docs, y se etiqueta así.
- Etiquetas:
  - **VERIFICADO**: visto en código fuente, `package.json` o la API de GitHub.
  - **OBSERVADO**: visto en README, documentación o la descripción del repo, sin contrastar con código.
  - **INFERIDO**: deducción razonada a partir de lo anterior.
  - **NO COMPROBADO**: no se pudo verificar (404, límite de la API, no se inspeccionó).
- No se copia código. Solo se describen técnicas y patrones.

---

## 1. Librerías y fundamentos

### 1.1 motiondivision/motion
- **URL:** https://github.com/motiondivision/motion
- **Tipo de experiencia:** librería de animación declarativa para React/JS (VERIFICADO, descripción de la API).
- **Stack:** TypeScript, monorepo con `packages/framer-motion`, `packages/motion` y `motion-dom` (VERIFICADO).
- **Librerías principales:** `motion-dom` y `motion-utils` 14.0.0 (VERIFICADO).
- **Mantenimiento:** último push el 2026-10-08, no archivado, ~33.9k estrellas (VERIFICADO).
- **Licencia:** MIT (VERIFICADO).
- **React 19 / Next 16:** `peerDependencies` de `motion` y de `framer-motion` 14.0.0 son `react ^18.0.0 || ^19.0.0` (VERIFICADO). En HEAD ya está la 14.0.0 y Sofía tiene fijada la 13.1.0, así que antes de subir de mayor hay que leer el changelog (INFERIDO).
- **Técnica visual destacada:** `MotionConfig` define transición y `reducedMotion` para todo el árbol (VERIFICADO en `components/MotionConfig/index.tsx`). `useReducedMotion` lee la preferencia del sistema (VERIFICADO en `utils/reduced-motion/use-reduced-motion.ts`).
- **Calidad de interacciones:** gestos, layout animations y `AnimatePresence` para salidas (OBSERVADO en la documentación; `AnimatePresence/index.tsx` existe en el árbol, VERIFICADO).
- **Experiencia móvil:** soporta gestos táctiles (OBSERVADO). No medido.
- **Accesibilidad observable:** el hook lee la preferencia una sola vez al montar (`useState(prefersReducedMotion.current)`) y avisa con `warnOnce` (VERIFICADO). `MotionConfig` acepta `reducedMotion` (VERIFICADO).
- **Riesgo de performance:** bajo-medio. Es la dependencia que ya existe, sin coste añadido (INFERIDO).
- **Complejidad:** baja (ya integrada).
- **Aplicación a Sofía:** envolver la app en un `MotionConfig reducedMotion="user"` global. Usarlo para revelados de texto editorial y transiciones de UI pequeñas, no para cambios de ruta, que ya cubre `<ViewTransition>` (INFERIDO).
- **Qué evitar:** duplicar `framer-motion` y `motion` en el bundle, como hace 5araang (ver 2.5). Animar `filter: blur` en grids grandes (INFERIDO).

### 1.2 greensock/GSAP
- **URL:** https://github.com/greensock/GSAP
- **Tipo:** motor de animación imperativo, con ScrollTrigger, SplitText, etc.
- **Stack:** JavaScript. `package.json` versión 3.15.0 (VERIFICADO).
- **Mantenimiento:** último push el 2026-04-13, no archivado, ~28.9k estrellas (VERIFICADO). Más de 5 meses sin push en el repo público (VERIFICADO por fecha).
- **Licencia:** la API devuelve **sin licencia SPDX** (VERIFICADO). `package.json` declara `"Standard 'no charge' license: https://gsap.com/standard-license"` y la cabecera de `src/gsap-core.js` dice "Copyright 2008-2026, GreenSock. All rights reserved" (VERIFICADO). Según la página de la licencia (OBSERVADO, vía WebFetch): es propietaria de Webflow, **no es open source OSI**, permite uso comercial gratuito en webs, pero prohíbe usarla en herramientas visuales de animación sin código que compitan con Webflow, prohíbe eliminar avisos de copyright y es revocable si se incumplen los términos.
- **React 19 / Next 16:** no declara peers, es agnóstico (VERIFICADO). La integración con React va por `@gsap/react`, que no se inspeccionó (NO COMPROBADO).
- **Técnica visual destacada:** `gsap.matchMedia()` con revert automático de contextos (VERIFICADO en `gsap-core.js`, en torno a las líneas 2844-2865). ScrollTrigger con `scrub` y `pin` (VERIFICADO en el uso que hace Yes526, ver 2.4).
- **Accesibilidad:** el core no comprueba reduced-motion por sí mismo; hay que pasarle `(prefers-reduced-motion: reduce)` mediante `matchMedia` (INFERIDO, por grep sin coincidencias de "reduce" relativas a motion).
- **Riesgo de performance:** medio. Los pins largos con scrub y muchos elementos cuestan en móvil (INFERIDO).
- **Complejidad:** media-alta: es imperativo y hay que limpiar a mano en React.
- **Aplicación a Sofía:** **no recomendado como dependencia nueva.** Motion y `<ViewTransition>` cubren las necesidades. Solo se justificaría para una secuencia editorial concreta con scroll y pin (INFERIDO).
- **Qué evitar:** añadir GSAP y Motion a la vez. Asumir que su licencia es MIT.

### 1.3 darkroomengineering/lenis
- **URL:** https://github.com/darkroomengineering/lenis
- **Tipo:** smooth scroll.
- **Stack:** TypeScript, paquetes `core`, `react`, `vue` (VERIFICADO).
- **Mantenimiento:** último push el 2026-10-02, ~16.2k estrellas, no archivado (VERIFICADO). Versión 1.3.26.
- **Licencia:** MIT (VERIFICADO).
- **React 19 / Next 16:** peer `react >=17.0.0` (VERIFICADO).
- **Técnica destacada:** interpolación del scroll, `syncTouch` desactivado por defecto, `anchors`, `allowNestedScroll`, `stopInertiaOnNavigate` (VERIFICADO en `packages/core/src/lenis.ts`).
- **Accesibilidad:** la opción `respectReducedMotion` viene a `true` por defecto. Con reduced-motion activo, el scroll programático pasa a ser un salto inmediato y el del usuario sigue el input 1:1 (`lerp = 1`) (VERIFICADO, líneas ~132 y ~755). Es un buen ejemplo de cómo degradar con elegancia.
- **Experiencia móvil:** por defecto no intercepta el táctil (`syncTouch = false`, VERIFICADO), así que en móvil conserva el scroll nativo (INFERIDO).
- **Riesgo de performance:** bajo-medio. Puede chocar con `position: sticky`, con scroll anidado (lightbox, modales) y con la restauración de scroll entre rutas (INFERIDO).
- **Complejidad:** baja de instalar y media de afinar.
- **Aplicación a Sofía:** opcional. Si se usa, solo en escritorio y nunca dentro de la lightbox. Hay que detenerlo cuando se abra un diálogo (INFERIDO).
- **Qué evitar:** smooth scroll como seña de identidad sin más. En un portfolio periodístico, el scroll nativo transmite rigor (INFERIDO, juicio de diseño).

### 1.4 dimsemenov/PhotoSwipe
- **URL:** https://github.com/dimsemenov/PhotoSwipe
- **Tipo:** lightbox de imágenes, agnóstica de framework.
- **Stack:** JavaScript, sin dependencias, v5.4.4 (VERIFICADO).
- **Mantenimiento:** último push el 2025-12-04, ~25.3k estrellas, no archivado (VERIFICADO). Más de 10 meses sin push (VERIFICADO por fecha).
- **Licencia:** MIT (VERIFICADO).
- **React 19 / Next 16:** no tiene peers de React (VERIFICADO). Se integra con `useEffect` e import dinámico, como en agarun/photos (VERIFICADO, ver 2.8).
- **Técnica visual destacada:** zoom de apertura y cierre desde la miniatura (`showHideAnimationType`: zoom/fade/none), pinch-zoom y pan (VERIFICADO en `opener.js`).
- **Calidad de interacciones:** referente del sector en gestos táctiles (OBSERVADO en README; no se ejecutó).
- **Accesibilidad:** `role="dialog"`, `aria-roledescription="carousel"`, `aria-live="off"` en el contenedor, focus trap con opción `trapFocus`, devolución del foco con `returnFocus`, Escape y Tab gestionados (VERIFICADO en `photoswipe.js` y `keyboard.js`). Desactiva las animaciones con `(prefers-reduced-motion), (update: slow)` (VERIFICADO, línea ~793).
- **Riesgo de performance:** bajo. El módulo se carga perezosamente con `pswpModule: () => import(...)` (VERIFICADO en el uso de agarun).
- **Complejidad:** media, porque hay que pasarle las dimensiones de cada imagen.
- **Aplicación a Sofía:** candidata para el archivo de 74 imágenes y las series. Exige tener `width`/`height` reales en los datos (INFERIDO).
- **Qué evitar:** UI personalizada sin etiquetas, como el botón de descarga de agarun (ver 2.8). Los textos de la interfaz deben traducirse a ES/EN/RU (INFERIDO).

### 1.5 davidjerleke/embla-carousel
- **URL:** https://github.com/davidjerleke/embla-carousel
- **Tipo:** motor de carrusel ligero.
- **Mantenimiento:** último push el 2026-10-08, ~8.4k estrellas (VERIFICADO). HEAD está en `9.0.0-rc03`, una release candidate (VERIFICADO).
- **Licencia:** MIT (VERIFICADO).
- **React 19 / Next 16:** `embla-carousel-react` peer `react ^16.8 || ... || ^19.0.0` (VERIFICADO).
- **Técnica destacada:** nuevo paquete `embla-carousel-accessibility` (VERIFICADO en el árbol de v9).
- **Accesibilidad:** el plugin pone `role`, `aria-roledescription`, `aria-label` en raíz, slides, dots y botones prev/next, añade una live region opcional (`announceChanges: false` por defecto) y gestiona `tabindex` de los elementos enfocables fuera de vista (VERIFICADO en `Accessibility.ts` y `Options.ts`). Las etiquetas aceptan callbacks, lo que permite traducirlas a ES/EN/RU (VERIFICADO: `slideAriaLabel`, `dotButtonAriaLabel`, `liveRegionContent`).
- **Experiencia móvil:** swipe preciso (OBSERVADO en la descripción).
- **Riesgo de performance:** bajo (INFERIDO).
- **Complejidad:** baja-media.
- **Aplicación a Sofía:** carrusel de los 4 reels 9:16 en móvil o tira de series fotográficas. La versión estable es v8 (ECarry usa `^8.6.0`, VERIFICADO). No se comprobó si el plugin de accesibilidad existe para v8 (NO COMPROBADO).
- **Qué evitar:** autoplay en carruseles con vídeo, y adoptar la RC en producción sin fijar la versión.

### 1.6 radix-ui/primitives
- **URL:** https://github.com/radix-ui/primitives
- **Tipo:** primitivas accesibles sin estilos.
- **Mantenimiento:** último push el 2026-10-08, ~19.4k estrellas (VERIFICADO).
- **Licencia:** MIT (VERIFICADO).
- **React 19:** `@radix-ui/react-dialog` 1.2.0 peer `react ^16.8 … || ^19.0` (VERIFICADO).
- **Accesibilidad:** Dialog con `FocusScope` (trap y loop), `RemoveScroll`, `hideOthers` de `aria-hidden` para ocultar el resto del árbol a los lectores de pantalla, `aria-haspopup`/`aria-expanded`/`aria-controls` en el trigger y conteo de Title/Description (VERIFICADO en `dialog.tsx`). `FocusScope` expone `onMountAutoFocus`/`onUnmountAutoFocus` (VERIFICADO).
- **Riesgo de performance:** bajo.
- **Complejidad:** baja.
- **Aplicación a Sofía:** base del modal de vídeo de los reels y del menú de idioma. Si no se adopta YARL ni PhotoSwipe, también puede servir de cáscara para una lightbox propia (INFERIDO).
- **Qué evitar:** construir diálogos a mano sin trap de foco (ver Magic UI, 1.10).

### 1.7 muxinc/elements
- **URL:** https://github.com/muxinc/elements
- **Tipo:** custom elements y wrappers React para vídeo Mux.
- **Mantenimiento:** último push el 2026-10-06, 364 estrellas (VERIFICADO).
- **Licencia:** MIT (VERIFICADO).
- **React 19 / Next 16:** `@mux/mux-player-react` 3.14.0 peer `react ^17.0.2 || ^18 || ^19` (VERIFICADO). Depende de `media-chrome ~4.19.3` (VERIFICADO). Sofía está en `^3.13.3`, compatible (INFERIDO).
- **Técnica destacada:** `lazy.tsx` combina `React.lazy` con `useIsIntersecting` (IntersectionObserver) y un placeholder (imagen o blurhash) como variable CSS. El player solo se descarga cuando entra en el viewport (VERIFICADO).
- **Accesibilidad:** los controles los aporta media-chrome (OBSERVADO). No se auditó media-chrome (NO COMPROBADO).
- **Riesgo de performance:** alto si se montan 8 players a la vez. Bajo con `@mux/mux-player-react/lazy` y un póster estático (INFERIDO).
- **Complejidad:** baja.
- **Aplicación a Sofía:** usar siempre la variante `lazy` con `placeholder`. En la cuadrícula, pósters estáticos de Mux y el player solo al activarlo. Para los 9:16, contenedor con `aspect-ratio: 9/16` reservado para evitar CLS (INFERIDO).
- **Qué evitar:** autoplay con sonido. Varios players reproduciéndose a la vez en el home.

### 1.8 pmndrs/react-three-fiber
- **URL:** https://github.com/pmndrs/react-three-fiber
- **Tipo:** renderer de React para Three.js.
- **Mantenimiento:** último push el 2026-10-06, ~32.8k estrellas (VERIFICADO).
- **Licencia:** MIT (VERIFICADO).
- **React 19:** `@react-three/fiber` 9.8.1 peer `react >=19 <19.4` (VERIFICADO). Compatible con 19.2.8, pero el techo `<19.4` obliga a vigilar futuras subidas de React (INFERIDO).
- **Técnica destacada:** `Canvas` con `fallback` (contenido alternativo "similar a alt", VERIFICADO en un comentario de `Canvas.tsx`) y `dpr`, `frameloop` y `eventSource` configurables (VERIFICADO).
- **Accesibilidad:** solo la `fallback`. El contenido 3D no es accesible por sí mismo (INFERIDO).
- **Riesgo de performance:** alto: three.js pesa (INFERIDO) y consume GPU y batería en móvil.
- **Complejidad:** alta.
- **Aplicación a Sofía:** **ninguna en el núcleo.** Como mucho, un único efecto aislado con `frameloop="demand"` y que no esté en la ruta crítica (INFERIDO).
- **Qué evitar:** WebGL en el hero de una reportera. Compite con su trabajo.

### 1.9 pmndrs/drei
- **URL:** https://github.com/pmndrs/drei
- **Mantenimiento:** último push el 2026-10-05, ~9.9k estrellas (VERIFICADO). **Licencia:** MIT (VERIFICADO).
- **React 19:** peer `@react-three/fiber ^9`, `react ^19`, `three >=0.159` (VERIFICADO).
- **Técnica destacada:** `VideoTexture` con import perezoso de `hls.js` en singleton, `muted`/`playsInline` por defecto y `crossOrigin="anonymous"` (VERIFICADO en `src/core/VideoTexture.tsx`). `ScrollControls` con `damping` (VERIFICADO).
- **Riesgo de performance:** alto. Arrastra muchas dependencias (mediapipe, troika, camera-controls…) (VERIFICADO en `dependencies`).
- **Aplicación a Sofía:** ninguna recomendada. El patrón de cargar hls.js de forma perezosa es la lección útil (INFERIDO).
- **Qué evitar:** texturas de vídeo HLS en WebGL para reels que ya tienen un player de Mux.

### 1.10 magicuidesign/magicui
- **URL:** https://github.com/magicuidesign/magicui
- **Tipo:** registro de componentes animados de copiar y pegar, estilo shadcn.
- **Mantenimiento:** último push el 2026-10-05, ~22.5k estrellas (VERIFICADO). **Licencia:** MIT (VERIFICADO).
- **React 19:** los componentes importan `motion/react` (VERIFICADO en `hero-video-dialog.tsx`). El `package.json` raíz no declara peers (VERIFICADO).
- **Técnica destacada:** `blur-fade.tsx` anima opacidad y `filter: blur()` al entrar en el viewport con `useInView({ once: true })` (VERIFICADO).
- **Accesibilidad:** `blur-fade.tsx` **no** comprueba reduced-motion (VERIFICADO, sin coincidencias). `hero-video-dialog.tsx` tiene `aria-label="Play video"` en el trigger, pero el overlay es un `div role="button"`, el botón de cerrar no tiene etiqueta y no hay `role="dialog"` ni trap de foco (VERIFICADO).
- **Riesgo de performance:** medio. Los blurs animados en muchos elementos son caros (INFERIDO).
- **Aplicación a Sofía:** inspiración puntual para microtransiciones. Reescribirlas sobre Radix y `MotionConfig` (INFERIDO).
- **Qué evitar:** pegar componentes tal cual, en especial el diálogo de vídeo, y el exceso de efectos de "landing SaaS".

### 1.11 shadcn-ui/ui
- **URL:** https://github.com/shadcn-ui/ui
- **Mantenimiento:** último push el 2026-10-08, ~125k estrellas (VERIFICADO). **Licencia:** MIT (VERIFICADO).
- **React 19:** el registro `new-york-v4` importa `radix-ui` (paquete unificado) y usa `data-slot` (VERIFICADO en `dialog.tsx`).
- **Accesibilidad:** Dialog con un `sr-only "Close"` y animaciones `animate-in`/`fade`/`zoom` por `data-state` (VERIFICADO). Carousel sobre Embla con `role="region"`, `aria-roledescription`, flechas de teclado y `sr-only` "Previous slide"/"Next slide" **escritos en inglés en el código** (VERIFICADO).
- **Riesgo de performance:** bajo.
- **Aplicación a Sofía:** buen punto de partida para el diálogo y el carrusel si se reutiliza, pero hay que pasar todos los `sr-only` por `next-intl` (INFERIDO).
- **Qué evitar:** heredar la estética genérica de shadcn en un portfolio de autor.

### 1.12 vercel/next.js (guía de view transitions)
- **URL:** https://github.com/vercel/next.js (fichero `docs/01-app/02-guides/view-transitions.mdx` en `canary`)
- **Mantenimiento:** último push el 2026-10-08, ~143k estrellas (VERIFICADO). **Licencia:** MIT (VERIFICADO).
- **Contenido:** cuatro patrones (morph de elemento compartido miniatura→detalle, revelado de Suspense con `enter`/`exit`, navegación direccional con `transitionTypes` en `<Link>` y `router.push`, y crossfade en la misma ruta con `key`). Incluye una sección "Respecting reduced motion" (VERIFICADO en el `.mdx`).
- **Compatibilidad:** la guía de `canary` dice que "funcionan en el App Router sin configuración" y que "React 19.3 incluye `<ViewTransition>` y `addTransitionType`" (VERIFICADO en el texto). **Sofía está en React 19.2.8 / Next 16.3.3.** No se comprobó si su versión necesita `experimental.viewTransition`; el demo de vercel-labs, con Next ^16.2.2, sí lo activa (ver 2.1). El `node_modules/next/dist/docs` local no se pudo leer desde Windows (NO COMPROBADO). **Hay que verificarlo en las docs locales antes de implementar** (AGENTS.md lo exige).
- **Ejemplo `examples/with-cloudinary`:** las rutas probadas devolvieron 404 (NO COMPROBADO, no se describe).
- **Aplicación a Sofía:** es el patrón principal para miniatura de serie → foto y para reel → página de pieza (INFERIDO).

### 1.13 igordanchenko/yet-another-react-lightbox (YARL), añadido por búsqueda
- **URL:** https://github.com/igordanchenko/yet-another-react-lightbox
- **Tipo:** lightbox nativa de React con plugins (zoom, video, captions…).
- **Mantenimiento:** último push el 2026-10-05, ~1.3k estrellas (VERIFICADO). **Licencia:** MIT (VERIFICADO).
- **React 19:** peer `react ^16.8.0 || ^17 || ^18 || ^19` y desarrollo contra React 19.3.0 (VERIFICADO).
- **Accesibilidad:** el portal pone `role="dialog"` + `aria-modal`, aplica `inert` y `aria-hidden` a los hermanos y restaura el foco al cerrar (VERIFICADO en `Portal.tsx`). El carrusel tiene `role="region"`, `aria-live` que cambia a `off` durante el autoplay salvo si hay foco dentro, y slides con `aria-roledescription` y contador (VERIFICADO en `Carousel.tsx`). Todas las etiquetas pasan por `translateLabel(labels, …)`, así que son traducibles a ES/EN/RU (VERIFICADO). Hook `useMotionPreference` sobre `prefers-reduced-motion` (VERIFICADO). Su uso exacto en las animaciones no se comprobó (INFERIDO: desactiva o acorta animaciones).
- **Vídeo:** el plugin renderiza `<video>` nativo con `sources`, `poster`, `controls` y `playsInline` (VERIFICADO en `VideoSlide.tsx`). Para HLS de Mux haría falta un render de slide personalizado con mux-player (INFERIDO).
- **Riesgo de performance:** bajo-medio (INFERIDO).
- **Complejidad:** baja.
- **Aplicación a Sofía:** **la candidata más alineada con React 19 + i18n** para las 5 series y el archivo de 74 imágenes. Frente a PhotoSwipe, gana en integración con React y en traducción de etiquetas, y pierde en madurez de gestos (INFERIDO).
- **Qué evitar:** activar todos los plugins. Basta con zoom y captions, y quizá counter.

---

## 2. Portfolios y demos de referencia

### 2.1 vercel-labs/react-view-transitions-demo (muy relevante)
- **URL:** https://github.com/vercel-labs/react-view-transitions-demo
- **Tipo:** galería fotográfica de demostración con morph de elementos compartidos (OBSERVADO en la descripción).
- **Stack:** `next ^16.2.2`, `react 19.2`, `@base-ui/react`, Tailwind 4, shadcn (VERIFICADO).
- **Mantenimiento:** último push el 2026-07-23, 31 estrellas, no archivado (VERIFICADO).
- **Licencia:** **ninguna** según la API (VERIFICADO). No se puede reutilizar su código. Los patrones equivalentes están documentados en la guía de Next (1.12).
- **React 19 / Next 16:** `next.config.ts` activa `experimental.viewTransition: true` y `cacheComponents: true` (VERIFICADO). Importa `ViewTransition` desde `"react"` con React 19.2 (VERIFICADO). Funciona porque el App Router usa su React canary interno (INFERIDO).
- **Técnica visual destacada:** cada miniatura y la imagen de detalle comparten `ViewTransition name="photo-{id}" share="morph" default="none"`. `Link` usa `transitionTypes={["nav-forward"]}` y las flechas prev/next envían `nav-back`/`nav-forward`. El CSS define `::view-transition-*` por clase (morph, nav-forward, nav-back, slide-up/down) y fija la cabecera y los controles con `view-transition-name` propios para que no se animen (VERIFICADO en `photo-grid.tsx`, `photo-content.tsx` y `globals.css`). El esqueleto de carga reserva el `aspect-ratio` (VERIFICADO).
- **Calidad de interacciones:** navegación con las flechas del teclado y `useEffectEvent` (VERIFICADO). No se vio el resultado visual (NO COMPROBADO).
- **Experiencia móvil:** grid de 1→2→3 columnas y `max-h` en vh para la imagen de detalle (VERIFICADO). No hay swipe (VERIFICADO, sin handlers táctiles en los ficheros inspeccionados).
- **Accesibilidad:** bloque `@media (prefers-reduced-motion: reduce)` que anula las animaciones de los pseudo-elementos (VERIFICADO). `alt` descriptivo con título y ubicación (VERIFICADO). Tiene carencias: las flechas son `Link` cuyo único texto es "←"/"→", sin `aria-label`; el estado deshabilitado es un `span` sin semántica; y el listener global de `keydown` no comprueba si el foco está en un input (VERIFICADO).
- **Riesgo de performance:** bajo, con `next/image`, `sizes`, `priority` en las 3 primeras y `placeholder="blur"` (VERIFICADO).
- **Complejidad:** baja-media.
- **Aplicación a Sofía:** patrón base de serie → foto con morph y navegación direccional. El hover que muestra título y lugar sirve de pie de foto editorial (INFERIDO).
- **Qué evitar:** sus fallos de accesibilidad en las flechas. Depender de un flag experimental sin verificar la versión.

### 2.2 ECarry/photography-website
- **URL:** https://github.com/ECarry/photography-website
- **Tipo:** portfolio fotográfico con CMS propio, mapas, blog y dashboard (OBSERVADO en la descripción).
- **Stack:** `next 16.3.0`, `react 19.2.4`, `motion ^12.23`, `embla-carousel-react ^8.6`, Radix (más de 20 paquetes), tRPC, TanStack Query, Drizzle/Neon, S3, Mapbox, Tiptap (VERIFICADO).
- **Mantenimiento:** último push el 2026-09-11, 371 estrellas (VERIFICADO). **Licencia:** MIT (VERIFICADO).
- **React 19 / Next 16:** sí, versiones casi idénticas a las de Sofía (VERIFICADO). `reactCompiler: true` (VERIFICADO).
- **Técnica destacada:** `BlurImage` pinta un blurhash y hace un fundido de opacidad de 500 ms al cargar (VERIFICADO en `blur-image.tsx`). `images.qualities: [65, 75]` y loader opcional de Cloudflare (VERIFICADO en `next.config.ts`). Ruta `/p/[id]` con `generateMetadata` por foto (VERIFICADO). Hay una ruta `/screensaver` (VERIFICADO en el árbol) cuyo contenido no se inspeccionó (NO COMPROBADO).
- **Accesibilidad:** `BlurImage` reenvía `alt` (VERIFICADO). No se inspeccionó la vista de detalle (NO COMPROBADO).
- **Riesgo de performance:** medio. El bundle es grande por el dashboard y Mapbox, aunque está separado por grupos de rutas (INFERIDO).
- **Complejidad:** alta (CMS completo).
- **Aplicación a Sofía:** página por foto con metadatos propios (SEO y compartir), placeholder blurhash o LQIP y limitar `qualities` (INFERIDO).
- **Qué evitar:** el CMS, el mapa y la base de datos. Para 79 imágenes bastan datos estáticos (INFERIDO).

### 2.3 aitezazdev/Portfolio
- **URL:** https://github.com/aitezazdev/Portfolio
- **Tipo:** portfolio de desarrollador muy animado (OBSERVADO).
- **Stack:** `next ^15.5.9`, `react 19.1.0`, `gsap ^3.13`, `@gsap/react`, `lenis ^1.3.26`, `next-transition-router` (VERIFICADO).
- **Mantenimiento:** último push el 2026-09-29, 11 estrellas (VERIFICADO). **Licencia:** MIT (VERIFICADO).
- **React 19 / Next 16:** React 19 sí, Next 15, no 16 (VERIFICADO).
- **Técnica destacada:** Lenis enganchado al `gsap.ticker` con `lagSmoothing(0)`. **Se desactiva en dispositivos táctiles o con un ancho menor de 768 px**, y entonces solo hace `ScrollTrigger.refresh()` (VERIFICADO en `SmoothScrollProvider.tsx`). El preloader se muestra una vez por sesión con `sessionStorage` (VERIFICADO).
- **Accesibilidad:** hook `useReducedMotion` propio con listener de cambio (VERIFICADO). El cursor personalizado se desactiva en táctil o con reduced-motion (VERIFICADO) y es `pointer-events-none`. Los adornos del preloader llevan `aria-hidden` (VERIFICADO).
- **Riesgo de performance:** medio: canvas `FlowField`/`AmbientGeometry` y cursor (VERIFICADO por los nombres de fichero, contenido NO COMPROBADO).
- **Aplicación a Sofía:** el patrón "mejora progresiva solo en escritorio y respetando las preferencias" y el preloader de una sola vez por sesión, si llegara a hacer falta uno (INFERIDO).
- **Qué evitar:** cursor personalizado, preloader y textos divididos letra a letra, que retrasan el acceso a su trabajo.

### 2.4 Yes526-tech/cinematic-website
- **URL:** https://github.com/Yes526-tech/cinematic-website
- **Tipo:** portfolio "cinemático" de storytelling con vídeo al hacer scroll (OBSERVADO).
- **Stack:** `next ^15.1.7`, `react ^19`, `framer-motion ^11`, `gsap ^3.12`, `lenis ^1.1` (VERIFICADO).
- **Mantenimiento:** último push el 2026-08-31, 0 estrellas (VERIFICADO). **Licencia:** **ninguna** (VERIFICADO), por lo que no es reutilizable.
- **Técnica destacada:** ScrollTrigger con pin de `end: "+=9000"` y `scrub: 0.8` que encadena **10 vídeos** ajustando `currentTime` en un bucle de RAF con control de `seeked` (VERIFICADO en `VideoScrollJourney.tsx`). Ambiente sonoro sintetizado con Web Audio, activable por botón (VERIFICADO en `AudioAmbience.tsx`).
- **Accesibilidad:** sin comprobaciones de reduced-motion ni ARIA en los ficheros inspeccionados (VERIFICADO por grep). El audio es opt-in, lo cual está bien (VERIFICADO).
- **Riesgo de performance:** **muy alto**: 10 `<video preload="auto">` y seeks continuos (VERIFICADO). El scrubbing con `currentTime` depende de keyframes densos (INFERIDO).
- **Complejidad:** alta.
- **Aplicación a Sofía:** solo como antirreferencia.
- **Qué evitar:** "scroll-jacking" de 9000 px, precarga masiva de vídeo y mezclar tres librerías de animación.

### 2.5 5araang/Nextjs-cinematic-portfolio
- **URL:** https://github.com/5araang/Nextjs-cinematic-portfolio
- **Tipo:** plantilla de portfolio "premium/cinemático" con panel de administración (OBSERVADO).
- **Stack:** `next ^15.0.0`, `react 19.2.4`, `gsap`, `lenis`, `framer-motion` **y** `motion`, R3F + drei + postprocessing, `ogl`, `three`, Supabase, Mongoose y Resend (VERIFICADO).
- **Mantenimiento:** último push el 2026-07-30, 20 estrellas (VERIFICADO). **Licencia:** MIT (VERIFICADO).
- **Técnica destacada:** `CircularGallery` en WebGL con `ogl`, `dpr` limitado a 2 y navegación por rueda y arrastre (VERIFICADO). La procedencia del componente (posible React Bits) no se verificó (NO COMPROBADO).
- **Accesibilidad:** `CircularGallery` no tiene ARIA ni teclado, y registra `wheel` con `passive: false`, lo que bloquea el scroll (VERIFICADO). `layout.js` incluye `lang="en"` fijo y un `aria-hidden` decorativo (VERIFICADO).
- **Riesgo de performance:** alto: varios motores 3D y dos librerías de animación (VERIFICADO en `dependencies`).
- **Aplicación a Sofía:** ninguna directa. Sirve para ilustrar el coste de apilar efectos.
- **Qué evitar:** galerías en WebGL sin alternativa accesible, `lang` fijo en un sitio trilingüe y dependencias duplicadas.

### 2.6 naeemsabir1/VideoGrapher-Portfolio, añadido por búsqueda (muy relevante para 9:16)
- **URL:** https://github.com/naeemsabir1/VideoGrapher-Portfolio
- **Tipo:** feed vertical de vídeo estilo TikTok para filmmakers (OBSERVADO).
- **Stack:** `next 16.3.1`, `react 19.2.8`, `framer-motion ^13.1.1`, `@base-ui/react`, `@imagekit/next`, shadcn (VERIFICADO). Es el más cercano al stack de Sofía.
- **Mantenimiento:** último push el 2026-08-22, 1 estrella (VERIFICADO). **Licencia:** **ninguna** (VERIFICADO), así que solo sirve como inspiración.
- **Técnica destacada:** contenedor `h-[100dvh]` con `snap-y snap-mandatory` y `overscroll-y-contain`. IntersectionObserver que llama a `play()`/`pause()` en el vídeo activo. Swipe táctil manual y ArrowUp/ArrowDown (VERIFICADO en `VideoFeedClient.tsx`). El player tiene una máquina de estados idle/loading/playing/buffering con spinner (VERIFICADO en `VideoPlayer.tsx`).
- **Accesibilidad:** `aria-label` en el feed y en cada vídeo ("Video n: título"), botón de silencio con etiqueta dinámica, `focus-visible` con outline y `tabIndex=0` (VERIFICADO). No comprueba reduced-motion (VERIFICADO por grep). El listener global de teclado no filtra inputs (INFERIDO, solo se vio `window.addEventListener('keydown')`).
- **Experiencia móvil:** pensada mobile-first, con `dvh` y `playsInline` (VERIFICADO).
- **Riesgo de performance:** medio-bajo: `preload="metadata"` + `poster` (VERIFICADO).
- **Aplicación a Sofía:** modelo para un "modo reel" a pantalla completa con los 4 verticales: snap nativo en vez de JS, autoplay silenciado solo para el visible y silencio global persistente (INFERIDO). Con Mux, cambiar `<video>` por mux-player o `mux-video` (INFERIDO).
- **Qué evitar:** convertir el home en un feed infinito. Con 4 reels basta un visor modal o una ruta dedicada.

### 2.7 brunosimon/folio-2019
- **URL:** https://github.com/brunosimon/folio-2019
- **Tipo:** portfolio 3D jugable (conduces un coche) (OBSERVADO, por fama y código).
- **Stack:** three 0.164, cannon (física), howler (audio), gsap y Vite. No usa React (VERIFICADO).
- **Mantenimiento:** último push el 2024-05-25, ~4.75k estrellas, sin actividad en más de 2 años (VERIFICADO). **Licencia:** MIT (VERIFICADO en la API y en `license.md`).
- **Técnica destacada:** `EffectComposer` con pases propios de blur y glow y shaders GLSL a medida (VERIFICADO en `Application.js` y el árbol `src/shaders`). Controles de teclado más un joystick táctil creado en el DOM (VERIFICADO en `Controls.js`).
- **Accesibilidad:** ninguna observable (VERIFICADO por grep sin coincidencias).
- **Riesgo de performance:** alto (INFERIDO).
- **Aplicación a Sofía:** solo como lección conceptual: una idea de interacción memorable y coherente con la autora. En Sofía, esa idea debería salir del lenguaje televisivo (rótulos, tally light, timecode), no del 3D (INFERIDO).
- **Qué evitar:** WebGL, física y audio como experiencia principal.

### 2.8 agarun/photos, añadido por búsqueda
- **URL:** https://github.com/agarun/photos
- **Tipo:** portfolio fotográfico con álbumes, galerías y globos (OBSERVADO).
- **Stack:** `next 14.2.33`, `react ^18.3.1`, `photoswipe` + `react-photoswipe-gallery`, `masonic`, `cobe`, `react-globe.gl`, R3F v8 (VERIFICADO).
- **Mantenimiento:** último push el 2026-10-02, 56 estrellas (VERIFICADO). **Licencia:** **ninguna** (VERIFICADO).
- **React 19 / Next 16:** **no**, sigue en React 18 / Next 14 (VERIFICADO).
- **Técnica destacada:** PhotoSwipe con `showHideAnimationType: 'zoom'`, módulo cargado de forma perezosa, `tapAction: 'close'` y un botón de descarga registrado en la UI (VERIFICADO en `use-lightbox.tsx`). Masonry virtualizado con `masonic` (VERIFICADO).
- **Accesibilidad:** las imágenes del masonry tienen `alt=""` (VERIFICADO), así que el lector de pantalla no anuncia nada. El botón de descarga no tiene etiqueta (VERIFICADO).
- **Riesgo de performance:** medio por los globos 3D (INFERIDO).
- **Aplicación a Sofía:** integrar PhotoSwipe en React con un hook y el import perezoso. El masonry virtualizado no hace falta para 74 imágenes (INFERIDO).
- **Qué evitar:** `alt` vacío en fotografía documental, donde el pie de foto es contenido.

---

## 3. Matriz resumen

| Repo | Tipo | Licencia | Último push | React 19 / Next 16 | Accesibilidad (código) | Riesgo de performance | Uso para Sofía |
|---|---|---|---|---|---|---|---|
| motiondivision/motion | Librería de animación | MIT | 2026-10-08 | Sí (peer ^18 \|\| ^19) | `reducedMotion` y `useReducedMotion` | Bajo | **Adoptar** (ya está) |
| greensock/GSAP | Librería de animación | **Propietaria "no charge"** | 2026-04-13 | Agnóstico | Manual (`matchMedia`) | Medio | Evitar como dependencia nueva |
| darkroomengineering/lenis | Smooth scroll | MIT | 2026-10-02 | Sí (react >=17) | `respectReducedMotion` por defecto | Bajo-medio | Opcional, solo escritorio |
| dimsemenov/PhotoSwipe | Lightbox | MIT | 2025-12-04 | Agnóstico | dialog, trap, returnFocus, reduced-motion | Bajo | Candidata |
| igordanchenko/yet-another-react-lightbox | Lightbox React | MIT | 2026-10-05 | Sí (peer ^19) | dialog, aria-modal, inert, i18n de etiquetas | Bajo-medio | **Candidata principal** |
| davidjerleke/embla-carousel | Carrusel | MIT | 2026-10-08 | Sí | Plugin a11y v9 RC, etiquetas traducibles | Bajo | Carrusel de reels |
| radix-ui/primitives | Primitivas | MIT | 2026-10-08 | Sí | FocusScope, hideOthers, RemoveScroll | Bajo | **Adoptar** (diálogos) |
| muxinc/elements | Vídeo | MIT | 2026-10-06 | Sí (peer ^19) | media-chrome (sin auditar) | Bajo con `lazy` | **Adoptar `lazy`** |
| pmndrs/react-three-fiber | 3D | MIT | 2026-10-06 | Sí (<19.4) | Solo `fallback` | Alto | Evitar |
| pmndrs/drei | 3D helpers | MIT | 2026-10-05 | Sí | — | Alto | Evitar |
| shadcn-ui/ui | Registro UI | MIT | 2026-10-08 | Sí | sr-only en inglés fijo | Bajo | Base reutilizable con i18n |
| magicuidesign/magicui | Registro de efectos | MIT | 2026-10-05 | Sí (motion/react) | Débil (sin trap ni reduced-motion) | Medio | Solo inspiración |
| vercel/next.js (guía VT) | Docs | MIT | 2026-10-08 | Guía canary: React 19.3 | Sección reduced-motion | Bajo | **Patrón principal** |
| vercel-labs/react-view-transitions-demo | Galería demo | **Sin licencia** | 2026-07-23 | Sí (16.2 + flag) | reduced-motion en CSS; flechas sin label | Bajo | Patrón (no copiar) |
| ECarry/photography-website | Portfolio fotográfico + CMS | MIT | 2026-09-11 | Sí (16.3.0 / 19.2.4) | `alt` reenviado | Medio | Página por foto y blurhash |
| naeemsabir1/VideoGrapher-Portfolio | Feed vertical de vídeo | **Sin licencia** | 2026-08-22 | Sí (16.3.1 / 19.2.8) | aria-labels, focus-visible | Medio-bajo | Modo reel 9:16 (inspiración) |
| aitezazdev/Portfolio | Portfolio animado | MIT | 2026-09-29 | React 19 / Next 15 | Hook reduced-motion, cursor off en táctil | Medio | Mejora progresiva |
| agarun/photos | Portfolio fotográfico | **Sin licencia** | 2026-10-02 | No (18 / 14) | `alt=""`, botón sin label | Medio | Integración de PhotoSwipe |
| 5araang/Nextjs-cinematic-portfolio | Plantilla cinemática | MIT | 2026-07-30 | React 19 / Next 15 | Galería WebGL sin a11y, `lang` fijo | Alto | Antirreferencia |
| Yes526-tech/cinematic-website | Scroll-video cinemático | **Sin licencia** | 2026-08-31 | React 19 / Next 15 | Ninguna observada | Muy alto | Antirreferencia |
| brunosimon/folio-2019 | Portfolio 3D jugable | MIT | 2024-05-25 | No usa React | Ninguna | Alto | Solo concepto |

---

## 4. Aprendizajes aplicables

1. **`<ViewTransition>` es la columna vertebral del movimiento.** Morph miniatura → foto con `name` compartido y `share="morph"`, y dirección de navegación con `transitionTypes` en `Link` y `router.push`. Sustituye a cualquier librería de transición de página. Antes de implementar hay que verificar en `node_modules/next/dist/docs` si Next 16.3.3 con React 19.2.8 requiere `experimental.viewTransition` (VERIFICADO el flag en el demo; la compatibilidad local queda NO COMPROBADA).
2. **Reduced-motion en tres capas:** CSS sobre `::view-transition-*` (como el demo de Vercel), un `MotionConfig reducedMotion="user"` global, y librerías que ya lo respetan (Lenis por defecto, PhotoSwipe, YARL). La guía de Next sugiere conservar los fundidos y quitar solo el desplazamiento.
3. **Lightbox: YARL o PhotoSwipe, nunca una hecha a mano sin trap.** YARL encaja mejor con React 19 y con ES/EN/RU porque todas sus etiquetas pasan por `labels`. PhotoSwipe tiene los gestos más maduros. Las dos ofrecen `role="dialog"`, gestión de foco y respeto de reduced-motion (VERIFICADO).
4. **Vídeo de Mux siempre en modo `lazy` con póster.** La variante `lazy` de mux-player-react ya combina IntersectionObserver, `React.lazy` y placeholder. Hay que reservar `aspect-ratio` 9/16 y 16/9 para tener CLS cero y reproducir solo un vídeo a la vez.
5. **Modo reel vertical con scroll-snap nativo** (`100dvh`, `snap-mandatory`, `overscroll-contain`) e IntersectionObserver para play y pause, silenciado por defecto, con el botón de sonido etiquetado y el estado de silencio persistente (patrón VERIFICADO en VideoGrapher-Portfolio, cuyo código no es reutilizable por falta de licencia).
6. **Mejora progresiva por dispositivo:** cualquier extra (smooth scroll, cursor, hover reveal) se activa solo con `pointer: fine`, en escritorio y sin reduced-motion, como hace aitezazdev. En móvil, scroll y gestos nativos.
7. **Las imágenes son contenido periodístico:** `alt` y pie de foto descriptivos (lugar, fecha, contexto) en los tres idiomas, nunca `alt=""` (antipatrón VERIFICADO en agarun). Página por foto o serie con `generateMetadata` propio (ECarry).
8. **Toda etiqueta accesible debe pasar por `next-intl`.** shadcn trae los `sr-only` en inglés escritos en el código, y 5araang fija `lang="en"`. Embla v9, YARL y PhotoSwipe permiten inyectar textos traducidos.
9. **Una sola librería de animación.** Motion ya está instalada. Añadir GSAP supone otra licencia propietaria y más bundle; tres librerías (Yes526, 5araang) son un antipatrón. WebGL y 3D quedan fuera del núcleo.
10. **Teclado completo, pero con respeto:** las flechas del visor deben tener `aria-label` traducido y estado `disabled` semántico, y los listeners globales de `keydown` deben ignorar inputs y diálogos abiertos (carencias VERIFICADAS en el demo de Vercel y en VideoGrapher).

## 5. Banderas rojas de licencia

- **GSAP:** licencia propietaria "Standard no charge" de Webflow, no OSI. Permite uso comercial gratuito, prohíbe usarla en constructores visuales que compitan con Webflow y es revocable si se incumple.
- **Sin licencia** (todos los derechos reservados por defecto; no copiar código): `vercel-labs/react-view-transitions-demo`, `naeemsabir1/VideoGrapher-Portfolio`, `agarun/photos`, `Yes526-tech/cinematic-website`.
- El resto de los repos inspeccionados son MIT según la API.

## 6. Limitaciones (2026-10-08)

- **No se ejecutó ni se vio ninguna demo.** Las valoraciones visuales y de "sensación" son inferencias a partir del código y los README.
- La API anónima de GitHub agotó su cuota (60 peticiones/hora) a mitad del análisis. A partir de ahí los ficheros se obtuvieron por rutas directas de `raw.githubusercontent.com`. Algunas rutas devolvieron 404: `examples/with-cloudinary` de Next.js, `viewTransition.mdx` de la referencia de configuración, `LICENSE` de GSAP y `Navigation.tsx` de YARL (NO COMPROBADO).
- Solo se inspeccionaron entre 1 y 4 ficheros por repo, con búsquedas dirigidas. Puede haber accesibilidad o comprobaciones de reduced-motion en ficheros no revisados.
- No se pudo leer `node_modules/next/dist/docs` del proyecto desde Windows (`next` parece ser un enlace simbólico en WSL), así que la necesidad del flag `experimental.viewTransition` en Next 16.3.3 sigue NO COMPROBADA.
- Las estrellas y fechas corresponden a la consulta del 2026-10-08 y cambiarán.
- No se midieron tamaños de bundle ni métricas Core Web Vitals. Los riesgos de performance son estimaciones.
