import type { getTranslations } from "next-intl/server";

import type { FilmEntry } from "@/components/film-index";
import type { SeriesEntry } from "@/components/series-grid";
import type { ShortFormStory } from "@/components/short-form-reporting";
import { getArchivePhotosForProject } from "@/content/photo-archive-data";
import {
  focalPointStyle,
  getProjectsInSection,
  sortShortFormProjects,
  type MediaCopy,
  type PortfolioProject,
} from "@/content/projects";
import { toShortFormStory, type ReportingCopy } from "@/lib/reporting-content";

type ProjectsTranslator = Awaited<ReturnType<typeof getTranslations<"Projects">>>;

type ProjectCopy = ReportingCopy & {
  format?: string;
  roles?: string[];
  media?: Record<string, MediaCopy>;
};

function copyFor(t: ProjectsTranslator, project: PortfolioProject) {
  return t.raw(`items.${project.translationKey}`) as ProjectCopy;
}

/** Piezas ante cámara, en el orden editorial de Reportajes. */
export function getReelStories(t: ProjectsTranslator): ShortFormStory[] {
  const reels = sortShortFormProjects(
    getProjectsInSection("reporting").filter(
      (project) => project.reportingFormat === "short-form",
    ),
  );

  return reels.flatMap((project) => {
    const story = toShortFormStory(project, copyFor(t, project), t("play"));
    return story ? [story] : [];
  });
}

/** "Dirección — Sofía Chernikova" → "Dirección": en su propio portfolio el nombre sobra. */
function roleLabel(roles?: string[]) {
  const labels = roles?.flatMap((role) => role.split(" — ")[0]?.trim() || []);
  return labels?.length ? labels.join(" · ") : undefined;
}

export function getFilmEntries(t: ProjectsTranslator): FilmEntry[] {
  return getProjectsInSection("audiovisual").flatMap((project) => {
    const cover = project.cover;
    if (!cover?.poster) return [];
    const copy = copyFor(t, project);
    return [{
      slug: project.slug,
      title: copy.title,
      description: copy.description || undefined,
      format: copy.format,
      role: roleLabel(copy.roles),
      duration: cover.duration,
      posterSrc: cover.poster,
      posterAlt: copy.media?.[cover.id]?.alt ?? copy.title,
    }];
  });
}

export function getSeriesEntries(
  t: ProjectsTranslator,
  countLabel: (count: number) => string,
): SeriesEntry[] {
  return getProjectsInSection("photography").flatMap((project) => {
    const cover = project.cover;
    if (cover?.type !== "image" || !cover.src) return [];
    const copy = copyFor(t, project);
    const storyCount = 1 + (project.media?.length ?? 0);
    const fullCount = getArchivePhotosForProject(project.slug).length;
    return [{
      slug: project.slug,
      title: copy.title,
      countLabel: countLabel(Math.max(storyCount, fullCount)),
      src: cover.src,
      alt: copy.media?.[cover.id]?.alt ?? copy.title,
      blurDataURL: cover.blurDataURL,
      objectPosition: focalPointStyle(cover),
    }];
  });
}
