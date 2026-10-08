# visual-storytelling

**Concepto.** Revista cultural: masthead, retrato real a 4 columnas, nombre en Literata 800 + 200 itálica descolgada, entradilla con capitular (solo hechos reales, sin citas inventadas) y un índice "En este número" con reels, los cuatro trabajos audiovisuales y fotografía. Cambio de ritmo a una doble página nocturna con un extracto del ensayo *Entre tiendas y tambores* (038, 037, 013) en rejilla asimétrica con pies de foto, y después "Otras series" escalonadas.

**Interacción implementada.** Solo hover/focus: el índice pasa a itálica y color, las fotos de series hacen zoom leve (anulado con `prefers-reduced-motion`). Sin JS.

**Fortalezas.** Comunica las tres facetas en una sola composición; retrato humano; la foto de la plaza de Madrid de noche es la imagen más potente del archivo; en móvil se recompone (el retrato se monta bajo el nombre, rejilla de 6) en vez de encogerse.

**Riesgos.**
- Los reels de TV (su trabajo principal) solo aparecen como línea de índice: no hay imagen de Sofía en cámara.
- Más texto y más imágenes locales (WebP grandes): LCP depende del retrato; conviene servir tamaños responsive.
- Pies de 037 y 013 genéricos: faltan pies reales (lugar/fecha) por foto.
- La estética "revista" puede leerse como fotógrafa/editora más que como periodista de TV.

**En 3 segundos dice:** "Autora con mirada propia: periodista, cine y foto". Con menos inmediatez televisiva.
