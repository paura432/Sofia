import type { ShortFormStory } from "@/components/short-form-reporting";
import {
  hasMediaAsset,
  publishableYear,
  type MediaCopy,
  type PortfolioProject,
  type ProjectMedia,
} from "@/content/projects";

function projectMedia(project: PortfolioProject): ProjectMedia[] {
  return [project.cover, ...(project.media ?? [])].filter(
    (item): item is ProjectMedia => Boolean(item),
  );
}

export type ReportingCopy = {
  title: string;
  description?: string;
  roles?: string[];
  media?: Record<string, MediaCopy>;
};

export function toShortFormStory(
  project: PortfolioProject,
  copy: ReportingCopy,
  playLabel: string,
): ShortFormStory | undefined {
  const media = projectMedia(project);
  const video = media.find(
    (item) => item.type === "video" && hasMediaAsset(item) &&
      (item.aspectRatio || (item.width && item.height)),
  );
  const poster = video ?? media.find(
    (item) => item.type === "image" && hasMediaAsset(item),
  );
  const posterSrc = poster?.type === "image" ? poster.src : poster?.poster;

  if (!poster || !posterSrc || !copy.title) return undefined;

  return {
    id: project.id,
    title: copy.title,
    description: copy.description || undefined,
    organisation: project.organisation,
    role: copy.roles?.join(" · "),
    year: publishableYear(project.year),
    sourceUrl: project.sourceUrl,
    posterSrc,
    posterAlt: copy.media?.[poster.id]?.alt ?? copy.title,
    posterRatio: poster.aspectRatio?.replace(":", " / ") ??
      (poster.width && poster.height ? `${poster.width} / ${poster.height}` : "9 / 16"),
    video,
    playLabel,
  };
}
