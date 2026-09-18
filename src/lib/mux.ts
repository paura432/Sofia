type MuxThumbnailOptions = {
  time: number;
  width: number;
};

export function getMuxThumbnailUrl(
  playbackId: string,
  { time, width }: MuxThumbnailOptions,
) {
  const url = new URL(`https://image.mux.com/${playbackId}/thumbnail.webp`);
  url.searchParams.set("time", String(time));
  url.searchParams.set("width", String(width));
  return url.toString();
}
