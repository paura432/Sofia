"use client";

import type { CSSProperties } from "react";

import { useReveal } from "@/components/motion/use-reveal";

type AnimatedLineProps = {
  /** Intensidad del trazo dentro del sistema editorial. */
  tone?: "line" | "strong" | "accent";
  delay?: number;
  className?: string;
};

/** Divisor editorial que crece con scaleX, sin tocar el layout. */
export function AnimatedLine({
  tone = "line",
  delay = 0,
  className,
}: AnimatedLineProps) {
  const { ref, revealed } = useReveal<HTMLSpanElement>();

  const style = (
    delay ? { "--reveal-delay": `${delay}ms` } : {}
  ) as CSSProperties;

  return (
    <span
      aria-hidden="true"
      className={["animated-line", className].filter(Boolean).join(" ")}
      data-line-tone={tone === "line" ? undefined : tone}
      data-revealed={revealed}
      ref={ref}
      style={style}
    />
  );
}
