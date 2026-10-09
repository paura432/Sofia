import { notFound } from "next/navigation";

/**
 * Rutas desconocidas dentro de un idioma. Sin este catch-all, Next sirve su
 * 404 genérico en inglés en lugar de `[locale]/not-found.tsx`.
 */
export default function CatchAllPage() {
  notFound();
}
