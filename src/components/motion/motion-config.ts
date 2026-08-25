/**
 * Espejo en JS de los tokens de motion definidos en globals.css.
 * Solo lo consumen las piezas que animan desde JS (menú móvil, scroll
 * progress); el resto del sistema lee las custom properties desde CSS.
 */
export const motionDuration = {
  fast: 0.18,
  interface: 0.24,
} as const;

export const easeOutEditorial = [0.22, 1, 0.36, 1] as const;

/** Umbral de entrada compartido por todas las primitivas de reveal. */
export const revealViewport = {
  once: true,
  amount: 0.15,
} as const;
