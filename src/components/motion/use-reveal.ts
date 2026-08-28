"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { revealViewport } from "@/components/motion/motion-config";

// Los componentes cliente también se renderizan en el servidor: allí no existe
// fase de layout y React avisaría por usar useLayoutEffect.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type RevealOptions = {
  once?: boolean;
  amount?: number;
};

function isInViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}

/**
 * Oculta el elemento justo antes del primer paint del cliente y lo revela
 * cuando entra en viewport. El HTML del servidor sale visible, así que sin JS
 * o con reduced motion el contenido nunca se pierde.
 */
export function useReveal<T extends HTMLElement>({
  once = revealViewport.once,
  amount = revealViewport.amount,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isHidden, setIsHidden] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;

    if (
      !node ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    setIsHidden(true);

    let frame = 0;

    const show = () => {
      setIsHidden(false);

      if (once) {
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
          } else if (!once) {
            setIsHidden(true);
          }
        }
      },
      { threshold: amount },
    );

    observer.observe(node);

    // Respaldo para piezas above-the-fold cuando el observer no dispara a tiempo.
    if (isInViewport(node)) {
      frame = requestAnimationFrame(show);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [amount, once]);

  return { ref, revealed: isHidden ? ("hidden" as const) : undefined };
}
