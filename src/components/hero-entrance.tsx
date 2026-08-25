"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { useMountReveal } from "@/components/motion/use-mount-reveal";

type HeroEntranceProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
  "aria-label"?: string;
};

/**
 * Entrada del hero: no espera al scroll porque ya está en pantalla. La
 * secuencia completa cierra por debajo de 800ms para poder leer de inmediato.
 */
export function HeroEntrance({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  id,
  "aria-label": ariaLabel,
}: HeroEntranceProps) {
  const revealed = useMountReveal();

  const style = (
    delay ? { "--reveal-delay": `${delay}ms` } : {}
  ) as CSSProperties;

  return (
    <Tag
      aria-label={ariaLabel}
      className={className}
      data-reveal="hero"
      data-revealed={revealed}
      id={id}
      style={style}
    >
      {children}
    </Tag>
  );
}
