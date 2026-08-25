"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "motion/react";

const loadDomAnimation = () =>
  import("motion/react").then((features) => features.domAnimation);

/**
 * Punto único donde se carga el runtime de Motion. Solo las piezas que usan
 * `m` (menú móvil, scroll progress) dependen de él; los reveals editoriales
 * son CSS y no cargan nada.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadDomAnimation} strict>
      {children}
    </LazyMotion>
  );
}
