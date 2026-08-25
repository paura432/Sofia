"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { useReveal } from "@/components/motion/use-reveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Retraso en ms dentro de una secuencia editorial. */
  delay?: number;
  /** Recorrido del translate. Por defecto usa el token de reveal. */
  distance?: string;
  /** "none" revela solo con opacidad, para bloques discretos como el footer. */
  direction?: "up" | "none";
  once?: boolean;
  id?: string;
};

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  distance,
  direction = "up",
  once = true,
  id,
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>({ once });

  const style = {
    ...(delay ? { "--reveal-delay": `${delay}ms` } : null),
    ...(distance ? { "--reveal-distance": distance } : null),
  } as CSSProperties;

  return (
    <Tag
      className={className}
      data-reveal=""
      data-reveal-direction={direction === "up" ? undefined : direction}
      data-revealed={revealed}
      id={id}
      ref={ref}
      style={style}
    >
      {children}
    </Tag>
  );
}
