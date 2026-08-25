"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Oculta el elemento antes del primer paint y lo revela en el frame siguiente.
 * Para lo que ya está en pantalla al montarse: hero y panel del menú móvil.
 */
export function useMountReveal() {
  const [isHidden, setIsHidden] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setIsHidden(true);

    // Dos frames: el primero deja que el estado oculto se pinte, el segundo
    // dispara la transición.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setIsHidden(false));
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  return isHidden ? ("hidden" as const) : undefined;
}
