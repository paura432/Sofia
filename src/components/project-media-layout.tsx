import type { ReactNode } from "react";

import { MediaCaption } from "@/components/media-caption";
import { PortfolioImage } from "@/components/portfolio-image";
import { PortfolioVideo } from "@/components/portfolio-video";
import type {
  MediaCopy,
  MediaLayout,
  NarrativeRole,
  ProjectMedia,
} from "@/content/projects";
import { getMediaSizes } from "@/content/projects";

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

/** Layouts that share a row only with the same consecutive token. */
const ROW_LAYOUTS: ReadonlySet<MediaLayout> = new Set([
  "pair",
  "half",
  "triptych",
]);

function rowSize(layout: MediaLayout) {
  if (layout === "triptych") return 3;
  if (layout === "pair" || layout === "half") return 2;
  return 1;
}

/**
 * Marks leftover row tokens so CSS can center them.
 * Does not reorder. Does not pair distinct layouts.
 */
export function markSoloLayouts(media: ProjectMedia[]): boolean[] {
  const layouts = media.map((item) => item.layout ?? "wide");
  const solo = layouts.map((layout) => layout === "portrait");
  let i = 0;

  while (i < layouts.length) {
    const layout = layouts[i];
    if (!layout || !ROW_LAYOUTS.has(layout)) {
      i += 1;
      continue;
    }

    let run = 1;
    while (layouts[i + run] === layout) run += 1;
    const size = rowSize(layout);
    const leftover = run % size;
    for (let offset = run - leftover; offset < run; offset += 1) {
      solo[i + offset] = true;
    }
    i += run;
  }

  return solo;
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

  const solo = markSoloLayouts(usableMedia);

  const items = usableMedia.map((item, index) => {
    const itemCopy = copy[item.id] ?? {};
    const isSolo = solo[index] ?? false;
    const className = [
      "project-media-item",
      item.layout ?? "wide",
      isSolo ? "is-solo" : null,
    ]
      .filter(Boolean)
      .join(" ");
    const captionIndex = String(index + 1).padStart(2, "0");
    const narrativeRole =
      item.narrativeRole ?? inferNarrativeRole(index, usableMedia.length);
    const sizes = getMediaSizes(
      isSolo && (item.layout === "pair" || item.layout === "half" || item.layout === "triptych")
        ? "portrait"
        : item.layout,
    );
    const transcript =
      item.transcriptKey && itemCopy.transcript && transcriptLabel ? (
        <details className="media-transcript">
          <summary>{transcriptLabel}</summary>
          <p>{itemCopy.transcript}</p>
        </details>
      ) : null;

    const wrap = (node: ReactNode) => (
      <div
        className="project-media-narrative"
        data-narrative={narrativeRole}
        key={item.id}
      >
        {node}
      </div>
    );

    if (item.type === "video") {
      return wrap(
        <figure className={className} data-narrative={narrativeRole}>
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
      return wrap(
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
          sizes={sizes}
        />,
      );
    }

    if (!item.externalUrl || !itemCopy.title) {
      return null;
    }

    return wrap(
      <figure className={className} data-narrative={narrativeRole}>
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
