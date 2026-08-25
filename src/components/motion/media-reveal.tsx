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

  return (
    <div
      className={["media-reveal", className].filter(Boolean).join(" ")}
      data-revealed={revealed}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}
