import { MediaCaption } from "@/components/media-caption";
import { PortfolioImage } from "@/components/portfolio-image";
import { PortfolioVideo } from "@/components/portfolio-video";
import type { ProjectMedia } from "@/content/projects";

type MediaCopy = {
  alt?: string;
  caption?: string;
  title?: string;
};

type ProjectMediaLayoutProps = {
  media?: ProjectMedia[];
  copy?: Record<string, MediaCopy>;
  playLabel: string;
  priorityFirst?: boolean;
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
  priorityFirst = false,
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

        if (item.type === "video") {
          return (
            <figure className={className} key={item.id}>
              <PortfolioVideo
                media={item}
                playLabel={playLabel}
                title={itemCopy.title ?? ""}
              />
              <MediaCaption
                caption={itemCopy.caption}
                index={String(index + 1).padStart(2, "0")}
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
              fill
              key={item.id}
              media={item}
              priority={priorityFirst && index === 0}
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
              index={String(index + 1).padStart(2, "0")}
            />
          </figure>
        );
      })}
    </div>
  );
}
