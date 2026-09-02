import type { ReactNode } from "react";

import { MediaCaption } from "@/components/media-caption";
import { PortfolioImage } from "@/components/portfolio-image";
import { PortfolioVideo } from "@/components/portfolio-video";
import type { MediaCopy, NarrativeRole, ProjectMedia } from "@/content/projects";

type MediaCopyProps = MediaCopy;

type ProjectMediaLayoutProps = {
  media?: ProjectMedia[];
  copy?: Record<string, MediaCopyProps>;
  playLabel: string;
  /** Marca la primera pieza como LCP. Solo en heros above the fold. */
  preloadFirst?: boolean;
  trackLabels?: Record<string, string>;
  transcriptLabel?: string;
  className?: string;
  rhythm?: "default" | "sparse" | "studio";
};

function sortMedia(media: ProjectMedia[]) {
  return media
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

function inferNarrativeRole(index: number, total: number): NarrativeRole {
  if (total <= 1) return "opening";
  if (index === 0) return "opening";
  if (index === 1) return "context";
  if (index === total - 1) return "closing";
  if (index === Math.max(2, Math.floor(total * 0.65))) return "peak";
  return "development";
}

function narrativeWrapper(
  role: NarrativeRole,
  key: string,
  children: ReactNode,
) {
  return (
    <div className="project-media-narrative" data-narrative={role} key={key}>
      {children}
    </div>
  );
}

export function ProjectMediaLayout({
  media,
  copy = {},
  playLabel,
  preloadFirst = false,
  trackLabels,
  transcriptLabel,
  className,
  rhythm = "default",
}: ProjectMediaLayoutProps) {
  const usableMedia = sortMedia(media ?? []);

  if (usableMedia.length === 0) {
    return null;
  }

  const items = usableMedia.map((item, index) => {
    const itemCopy = copy[item.id] ?? {};
    const className = `project-media-item ${item.layout ?? "wide"}`;
    const captionIndex = String(index + 1).padStart(2, "0");
    const narrativeRole =
      item.narrativeRole ?? inferNarrativeRole(index, usableMedia.length);
    const transcript =
      item.transcriptKey && itemCopy.transcript && transcriptLabel ? (
        <details className="media-transcript">
          <summary>{transcriptLabel}</summary>
          <p>{itemCopy.transcript}</p>
        </details>
      ) : null;

    if (item.type === "video") {
      return narrativeWrapper(
        narrativeRole,
        item.id,
        <figure className={className}>
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
          {transcript}
        </figure>,
      );
    }

    if (item.type === "image") {
      return narrativeWrapper(
        narrativeRole,
        item.id,
        <PortfolioImage
          alt={itemCopy.alt ?? ""}
          caption={itemCopy.caption}
          className={className}
          credit={itemCopy.credit}
          date={itemCopy.date}
          fill
          index={captionIndex}
          location={itemCopy.location}
          media={item}
          preload={preloadFirst && index === 0}
          reveal
        />,
      );
    }

    if (!item.externalUrl || !itemCopy.title) {
      return null;
    }

    return narrativeWrapper(
      narrativeRole,
      item.id,
      <figure className={className}>
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
      </figure>,
    );
  });

  return (
    <div
      className={["project-media-layout", className].filter(Boolean).join(" ")}
      data-rhythm={rhythm === "default" ? undefined : rhythm}
    >
      {items}
    </div>
  );
}
