import Image from "next/image";

import { MediaCaption } from "@/components/media-caption";
import { MediaReveal } from "@/components/motion/media-reveal";
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
}: PortfolioImageProps) {
  if (!media.src || (!media.decorative && !alt)) {
    return null;
  }

  const ratio = media.aspectRatio?.replace(":", " / ");
  const figureClassName = ["portfolio-image", className].filter(Boolean).join(" ");
  const objectPosition = focalPointStyle(media);
  const blur = media.blurDataURL
    ? ({ placeholder: "blur", blurDataURL: media.blurDataURL } as const)
    : ({ placeholder: "empty" } as const);

  const resolvedAlt = media.decorative ? "" : alt;
  const shared = {
    preload,
    sizes: sizes ?? getMediaSizes(media.layout),
    src: media.src,
    style: objectPosition ? { objectPosition } : undefined,
    ...blur,
  };

  /**
   * `mobileSrc` es la excepción: solo cuando el recorte móvil exige otro
   * encuadre. El `<source>` sirve el archivo tal cual, así que por defecto
   * se prefiere una única fuente optimizada por Next más `focalPoint`.
   */
  const withMobileArtDirection = (image: React.ReactNode) =>
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
        <MediaReveal className="portfolio-image-frame">
          <div className="portfolio-image-inner" style={{ aspectRatio: ratio }}>
            {withMobileArtDirection(
              <Image alt={resolvedAlt} fill {...shared} />,
            )}
          </div>
        </MediaReveal>
        {figcaption}
      </figure>
    );
  }

  if (!media.width || !media.height) {
    return null;
  }

  return (
    <figure className={figureClassName}>
      <MediaReveal>
        {withMobileArtDirection(
          <Image
            alt={resolvedAlt}
            height={media.height}
            width={media.width}
            {...shared}
          />,
        )}
      </MediaReveal>
      {figcaption}
    </figure>
  );
}
