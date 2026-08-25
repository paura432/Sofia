"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { useReveal } from "@/components/motion/use-reveal";

type StaggerGroupProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Separación entre elementos en ms. El sistema trabaja entre 40 y 80. */
  step?: number;
  id?: string;
};

/**
 * Revela los hijos directos en secuencia. El retraso lo aplica CSS por
 * nth-child, así que no hace falta envolver ni clonar cada elemento.
 */
export function StaggerGroup({
  children,
  as: Tag = "div",
  className,
  step,
  id,
}: StaggerGroupProps) {
  const { ref, revealed } = useReveal<HTMLElement>();

  const style = (
    step ? { "--motion-stagger": `${step}ms` } : {}
  ) as CSSProperties;

  return (
    <Tag
      className={className}
      data-revealed={revealed}
      data-stagger=""
      id={id}
      ref={ref}
      style={style}
    >
      {children}
    </Tag>
  );
}
