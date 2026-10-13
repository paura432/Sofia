"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { usePathname } from "@/i18n/navigation";

/**
 * Contenedor de los enlaces de sección del header. En móvil es una tira
 * horizontal desplazable: marca con `data-overflow-start/end` si hay enlaces
 * ocultos a cada lado (el CSS pinta un degradado) y, al cambiar de página,
 * coloca el enlace activo a la vista sin mover el scroll vertical.
 */
export function SiteNavStrip({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const strip = ref.current;
    if (!strip) return;

    const update = () => {
      const overflow = strip.scrollWidth - strip.clientWidth > 1;
      strip.dataset.overflowStart = String(overflow && strip.scrollLeft > 1);
      strip.dataset.overflowEnd = String(
        overflow && strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 1,
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(strip);
    strip.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      strip.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const strip = ref.current;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;
    const active = strip.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!active) return;
    strip.scrollLeft = active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2;
  }, [pathname]);

  return (
    <div className="site-nav-links" ref={ref}>
      {children}
    </div>
  );
}
