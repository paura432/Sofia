"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Barra de progreso de lectura para piezas largas (`/work/[slug]`).
 * Todavía no se monta en ninguna ruta: no hay reportajes publicados.
 * Requiere MotionProvider como ancestro.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
    />
  );
}
