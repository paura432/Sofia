import { ViewTransition, type ReactNode } from "react";

type MorphFrameProps = {
  /** Slug del proyecto: misma clave en la miniatura y en el hero del detalle. */
  slug: string;
  children: ReactNode;
};

/**
 * Continuidad miniatura → detalle con la View Transitions API del navegador
 * (React `<ViewTransition>`). Sin soporte, la navegación funciona igual y
 * simplemente no anima. La duración y el reduced motion viven en motion.css.
 */
export function MorphFrame({ slug, children }: MorphFrameProps) {
  return (
    <ViewTransition default="none" name={`work-${slug}`} share="morph">
      {children}
    </ViewTransition>
  );
}
