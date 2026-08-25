import Image from "next/image";

import { MediaCaption } from "@/components/media-caption";
import { MediaReveal } from "@/components/motion/media-reveal";
import type { ProjectMedia } from "@/content/projects";

type PortfolioImageProps = {
  media: ProjectMedia;
  alt: string;
  caption?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

const defaultSizes =
  "(max-width: 699px) 100vw, (max-width: 1023px) 50vw, 720px";

export function PortfolioImage({
  media,
  alt,
  caption,
  className,
  fill = false,
  priority = false,
  sizes = defaultSizes,
}: PortfolioImageProps) {
  if (!media.src || (!media.decorative && !alt)) {
    return null;
  }

  const ratio = media.aspectRatio?.replace(":", " / ");
  const figureClassName = ["portfolio-image", className].filter(Boolean).join(" ");

  if (fill) {
    return (
      <figure className={figureClassName}>
        <MediaReveal className="portfolio-image-frame">
          <div className="portfolio-image-inner" style={{ aspectRatio: ratio }}>
            <Image
              alt={media.decorative ? "" : alt}
              fill
              priority={priority}
              sizes={sizes}
              src={media.src}
            />
          </div>
        </MediaReveal>
        <MediaCaption caption={caption} />
      </figure>
    );
  }

  if (!media.width || !media.height) {
    return null;
  }

  return (
    <figure className={figureClassName}>
      <MediaReveal>
        <Image
          alt={media.decorative ? "" : alt}
          height={media.height}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes={sizes}
          src={media.src}
          width={media.width}
        />
      </MediaReveal>
      <MediaCaption caption={caption} />
    </figure>
  );
}
