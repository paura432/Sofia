"use client";

import type { CSSProperties, ReactNode } from "react";

import { useReveal } from "@/components/motion/use-reveal";

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Envoltorio para fotografía, vídeo o media futura: descubre el encuadre con
 * una máscara y contiene el zoom de hover. No anima width ni height.
 */
export function MediaReveal({ children, className, delay = 0 }: MediaRevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const style = (
    delay ? { "--reveal-delay": `${delay}ms` } : {}
  ) as CSSProperties;

  // El observer va en un ancla sin clip-path: si observamos el mismo nodo que
  // ocultamos con inset(), intersectionRatio queda en 0 y la foto nunca revela.
  return (
    <div ref={ref} className="media-reveal-anchor">
      <div
        className={["media-reveal", className].filter(Boolean).join(" ")}
        data-revealed={revealed}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}
