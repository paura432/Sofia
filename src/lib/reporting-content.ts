import type { MoreReportingStory } from "@/components/more-reporting";
import type { ReportingStory } from "@/components/reporting-index";
import type { ShortFormStory } from "@/components/short-form-reporting";
import {
  hasMediaAsset,
  hasProjectDetailPage,
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
  roles?: string[];
  media?: Record<string, MediaCopy>;
};

export function toReportingStory(
  project: PortfolioProject,
  copy: ReportingCopy,
  playLabel: string,
): ReportingStory | undefined {
  const media = projectMedia(project);
  const poster = media.find(
    (item) => item.type === "image" && hasMediaAsset(item),
  ) ?? media.find(
    (item) => item.type === "video" && item.poster && hasMediaAsset(item),
  );
  const video = media.find(
    (item) => item.type === "video" && item.aspectRatio && hasMediaAsset(item),
  );
  const posterSrc = poster?.type === "image" ? poster.src : poster?.poster;
  const posterRatio = poster?.aspectRatio?.replace(":", " / ") ??
    (poster?.width && poster.height ? `${poster.width} / ${poster.height}` : undefined);

  if (!poster || !posterSrc || !posterRatio || !project.sourceUrl) return undefined;

  return {
    id: project.id,
    slug: project.slug,
    title: copy.title,
    roles: copy.roles,
    organisation: project.organisation,
    year: publishableYear(project.year),
    sourceUrl: project.sourceUrl,
    detailPage: hasProjectDetailPage(project),
    posterSrc,
    posterAlt: copy.media?.[poster.id]?.alt ?? copy.title,
    posterRatio,
    video,
    playLabel,
  };
}

export function toMoreReportingStory(
  project: PortfolioProject,
  copy: ReportingCopy,
): MoreReportingStory | undefined {
  if (!project.sourceUrl || !copy.title) return undefined;

  return {
    id: project.id,
    title: copy.title,
    role: copy.roles?.join(" · "),
    organisation: project.organisation,
    year: publishableYear(project.year),
    sourceUrl: project.sourceUrl,
  };
}

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
