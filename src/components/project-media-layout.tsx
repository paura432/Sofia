import { MediaCaption } from "@/components/media-caption";
import { PortfolioImage } from "@/components/portfolio-image";
import { PortfolioVideo } from "@/components/portfolio-video";
import type { ProjectMedia } from "@/content/projects";

type MediaCopy = {
  alt?: string;
  caption?: string;
  title?: string;
  location?: string;
  date?: string;
  credit?: string;
};

type ProjectMediaLayoutProps = {
  media?: ProjectMedia[];
  copy?: Record<string, MediaCopy>;
  playLabel: string;
  /** Marca la primera pieza como LCP. Solo en heros above the fold. */
  preloadFirst?: boolean;
  trackLabels?: Record<string, string>;
};

function sortMedia(media: ProjectMedia[]) {
  return media
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

export function ProjectMediaLayout({
  media,
  copy = {},
  playLabel,
  preloadFirst = false,
  trackLabels,
}: ProjectMediaLayoutProps) {
  const usableMedia = sortMedia(media ?? []);

  if (usableMedia.length === 0) {
    return null;
  }

  return (
    <div className="project-media-layout">
      {usableMedia.map((item, index) => {
        const itemCopy = copy[item.id] ?? {};
        const className = `project-media-item ${item.layout ?? "wide"}`;
        const captionIndex = String(index + 1).padStart(2, "0");

        if (item.type === "video") {
          return (
            <figure className={className} key={item.id}>
              <PortfolioVideo
                media={item}
                playLabel={playLabel}
                title={itemCopy.title ?? ""}
                trackLabels={trackLabels}
              />
              <MediaCaption
                caption={itemCopy.caption}
                credit={itemCopy.credit}
                date={itemCopy.date}
                index={captionIndex}
                location={itemCopy.location}
              />
            </figure>
          );
        }

        if (item.type === "image") {
          return (
            <PortfolioImage
              alt={itemCopy.alt ?? ""}
              caption={itemCopy.caption}
              className={className}
              credit={itemCopy.credit}
              date={itemCopy.date}
              fill
              index={captionIndex}
              key={item.id}
              location={itemCopy.location}
              media={item}
              preload={preloadFirst && index === 0}
            />
          );
        }

        if (!item.externalUrl || !itemCopy.title) {
          return null;
        }

        return (
          <figure className={className} key={item.id}>
            <a
              className="project-embed-link"
              href={item.externalUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {itemCopy.title} <span aria-hidden="true">↗</span>
            </a>
            <MediaCaption
              caption={itemCopy.caption}
              credit={itemCopy.credit}
              date={itemCopy.date}
              index={captionIndex}
              location={itemCopy.location}
            />
          </figure>
        );
      })}
    </div>
  );
}
