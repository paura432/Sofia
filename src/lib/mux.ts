type MuxThumbnailOptions = {
  time: number;
  /** Ancho solicitado a Mux. Sin él, el fotograma sale al tamaño del máster (no se reescala). */
  width?: number;
};

/**
 * Fotograma PNG (sin pérdida) de la Image API de Mux. `next/image` lo recomprime una sola
 * vez al servirlo; con `.webp` el póster sufría dos compresiones y llegaba borroso.
 */
export function getMuxThumbnailUrl(
  playbackId: string,
  { time, width }: MuxThumbnailOptions,
) {
  const url = new URL(`https://image.mux.com/${playbackId}/thumbnail.png`);
  url.searchParams.set("time", String(time));
  if (width) url.searchParams.set("width", String(width));
  return url.toString();
}
