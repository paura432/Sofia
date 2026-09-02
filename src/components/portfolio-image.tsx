"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { MediaCaption } from "@/components/media-caption";
import { MediaReveal } from "@/components/motion/media-reveal";
import { useProjectPhotoOpen } from "@/components/project-photo-viewer";
import {
  focalPointStyle,
  getMediaSizes,
  type ProjectMedia,
} from "@/content/projects";

type PortfolioImageProps = {
  media: ProjectMedia;
  alt: string;
  caption?: string;
  location?: string;
  date?: string;
  credit?: string;
  index?: string;
  className?: string;
  fill?: boolean;
  /** Solo cuando la imagen es realmente el LCP: inserta un `<link rel=preload>`. */
  preload?: boolean;
  sizes?: string;
  /** False en photo essays largos: un solo MediaReveal envuelve el grupo. */
  reveal?: boolean;
};

export function PortfolioImage({
  media,
  alt,
  caption,
  location,
  date,
  credit,
  index,
  className,
  fill = false,
  preload = false,
  sizes,
  reveal = true,
}: PortfolioImageProps) {
  const openPhoto = useProjectPhotoOpen(media.id);

  if (!media.src || (!media.decorative && !alt)) {
    return null;
  }

  const ratio =
    media.aspectRatio?.replace(":", " / ") ??
    (media.width && media.height
      ? `${media.width} / ${media.height}`
      : undefined);
  const figureClassName = ["portfolio-image", className].filter(Boolean).join(" ");
  const objectPosition = focalPointStyle(media);
  const blur = media.blurDataURL
    ? ({ placeholder: "blur", blurDataURL: media.blurDataURL } as const)
    : ({ placeholder: "empty" } as const);

  const resolvedAlt = media.decorative ? "" : alt;
  const canOpen =
    Boolean(openPhoto) &&
    !media.decorative &&
    Boolean(media.src && media.width && media.height);

  const frame = (inner: ReactNode) =>
    reveal ? (
      <MediaReveal className="portfolio-image-frame">{inner}</MediaReveal>
    ) : (
      <div className="portfolio-image-frame">{inner}</div>
    );

  const frameInner = (inner: ReactNode) => {
    const revealed = frame(inner);
    if (!canOpen || !openPhoto) return revealed;
    return (
      <button
        aria-haspopup="dialog"
        aria-label={resolvedAlt || undefined}
        className="portfolio-image-open"
        onClick={openPhoto}
        type="button"
      >
        {revealed}
      </button>
    );
  };

  const shared = {
    preload,
    sizes: sizes ?? getMediaSizes(media.layout),
    src: media.src,
    style: { objectPosition },
    ...blur,
  };

  /**
   * `mobileSrc` es la excepción: solo cuando el recorte móvil exige otro
   * encuadre. El `<source>` sirve el archivo tal cual, así que por defecto
   * se prefiere una única fuente optimizada por Next más `focalPoint`.
   */
  const withMobileArtDirection = (image: ReactNode) =>
    media.mobileSrc ? (
      <picture>
        <source media="(max-width: 699px)" srcSet={media.mobileSrc} />
        {image}
      </picture>
    ) : (
      image
    );

  const figcaption = (
    <MediaCaption
      caption={caption}
      credit={credit}
      date={date}
      index={index}
      location={location}
    />
  );

  if (fill) {
    return (
      <figure className={figureClassName}>
        {frameInner(
          <div className="portfolio-image-inner" style={{ aspectRatio: ratio }}>
            {withMobileArtDirection(
              <Image alt={resolvedAlt} fill {...shared} />,
            )}
          </div>,
        )}
        {figcaption}
      </figure>
    );
  }

  if (!media.width || !media.height) {
    return null;
  }

  return (
    <figure className={figureClassName}>
      {frameInner(
        withMobileArtDirection(
          <Image
            alt={resolvedAlt}
            height={media.height}
            width={media.width}
            {...shared}
          />,
        ),
      )}
      {figcaption}
    </figure>
  );
}
