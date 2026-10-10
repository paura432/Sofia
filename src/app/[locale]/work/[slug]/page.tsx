import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { MoreFromSeries, SeriesModeNav } from "@/components/more-from-series";
import { MorphFrame } from "@/components/motion/morph-frame";
import { MotionLink } from "@/components/motion/motion-link";
import { Reveal } from "@/components/motion/reveal";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import { ProjectPhotoViewer } from "@/components/project-photo-viewer";
import { Prose } from "@/components/prose";
import type { PhotoViewerItem } from "@/components/photo-viewer-dialog";
import {
  getArchivePhotosForProject,
} from "@/content/photo-archive-data";
import {
  buildProjectMediaCopy,
  getDetailedProjects,
  getNextProject,
  getPrevProject,
  getProjectBySlug,
  publishableYear,
  type MediaCopy,
  type PortfolioProject,
  type ProjectMedia,
} from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import {
  pageMetadata,
  projectAlternates,
  projectPath,
} from "@/lib/metadata";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type ProjectCopy = {
  title: string;
  description: string;
  dek?: string;
  format?: string;
  context?: string;
  /** Papel de Sofía y decisiones de la pieza, en prosa. */
  process?: string[];
  result?: string;
  roles?: string[];
  credits?: Record<string, string>;
  creditLabels?: Record<string, string>;
  media?: Record<string, MediaCopy>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getDetailedProjects().map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [metadata, projectsText] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "Projects" }),
  ]);
  const copy = projectsText.raw(
    `items.${project.translationKey}`,
  ) as ProjectCopy;
  const alternates = projectAlternates(project.slug);

  const coverSrc =
    project.cover?.type === "image" && project.cover.src
      ? project.cover.src
      : undefined;

  return pageMetadata({
    alternateLanguages: alternates.languages,
    canonicalPath: projectPath(project.slug, locale),
    description: copy.description,
    locale,
    ogAlt: metadata("ogAlt"),
    ogImage: coverSrc,
    pathname: "/work/[slug]",
    title: copy.title,
  });
}

function essayViewerItems(
  pieces: (ProjectMedia | undefined)[],
  copy: Record<string, MediaCopy>,
  fallback: string,
): PhotoViewerItem[] {
  const items: PhotoViewerItem[] = [];
  const seen = new Set<string>();

  for (const media of pieces) {
    if (
      !media ||
      media.type !== "image" ||
      !media.src ||
      !media.width ||
      !media.height ||
      seen.has(media.id)
    ) {
      continue;
    }
    seen.add(media.id);
    const piece = copy[media.id];
    items.push({
      id: media.id,
      src: media.src,
      width: media.width,
      height: media.height,
      blurDataURL: media.blurDataURL,
      label: piece?.caption || fallback,
      alt: piece?.alt,
    });
  }

  return items;
}

function disciplineLabel(project: PortfolioProject, t: (key: string) => string) {
  return project.discipline
    .map((discipline) => t(`disciplines.${discipline}`))
    .join(" · ");
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations("Projects");
  const copy = t.raw(`items.${project.translationKey}`) as ProjectCopy;
  const locationLabel = project.locationKey
    ? t(`locations.${project.locationKey}`)
    : undefined;
  const mediaCopy = buildProjectMediaCopy(project, copy.media, {
    location: locationLabel,
  });
  const heroMedia = project.cover ?? project.media?.find((media) => media.featured);
  const detailMedia = project.media?.filter((media) => media.id !== heroMedia?.id);
  const nextProject = getNextProject(project.slug);
  const prevProject = getPrevProject(project.slug);
  const seriesPhotos = getArchivePhotosForProject(project.slug);
  const visibleYear = publishableYear(project.year);
  const isFilm = project.discipline.includes("audiovisual");
  const roleLabels = copy.roles?.filter(Boolean) ?? [];
  const essayPhotos = essayViewerItems(
    [heroMedia, ...(detailMedia ?? [])],
    mediaCopy,
    copy.title,
  );

  return (
    <main className={isFilm ? "project-detail-film" : undefined} id="main">
      <ProjectPhotoViewer
        closeLabel={t("viewerClose")}
        items={essayPhotos}
        nextLabel={t("viewerNext")}
        prevLabel={t("viewerPrev")}
      >
      <ScrollProgress />
      <section className="page-hero project-detail-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="project-kicker">{disciplineLabel(project, t)}</p>
          <h1 className="display-page project-title">{copy.title}</h1>
          {copy.dek ? <p>{copy.dek}</p> : null}
        </Reveal>
      </section>

      {heroMedia ? (
        <section
          aria-label={copy.title}
          className="section project-hero-media"
          id="historia"
        >
          <div className="project-media-canvas">
            {seriesPhotos.length > 0 ? (
              <header className="more-from-series-header">
                <SeriesModeNav
                  active="story"
                  sectionLabel={t("seriesNavigation")}
                  seriesLabel={t("seriesComplete")}
                  storyLabel={t("seriesStory")}
                />
              </header>
            ) : null}
            <MorphFrame slug={project.slug}>
              <div>
                <ProjectMediaLayout
                  copy={mediaCopy}
                  media={[heroMedia]}
                  playLabel={t("play")}
                  preloadFirst
                  transcriptLabel={t("transcript")}
                />
              </div>
            </MorphFrame>
          </div>
        </section>
      ) : null}

      {roleLabels.length || project.organisation || copy.format || locationLabel || visibleYear || project.sourceUrl ? (
        <section className="section project-detail-meta" aria-label={copy.title}>
          <div className="container project-detail-meta-inner">
            <dl className="project-detail-facts">
              {roleLabels.length ? (
                <div className="project-detail-primary-fact">
                  <dt>{t("role")}</dt>
                  <dd>{roleLabels.join(" · ")}</dd>
                </div>
              ) : null}
              {project.organisation ? (
                <div><dt>{t("organisation")}</dt><dd>{project.organisation}</dd></div>
              ) : null}
              {copy.format ? (
                <div><dt>{t("format")}</dt><dd>{copy.format}</dd></div>
              ) : null}
              {locationLabel ? (
                <div><dt>{t("location")}</dt><dd>{locationLabel}</dd></div>
              ) : null}
              {visibleYear ? (
                <div><dt>{t("year")}</dt><dd>{visibleYear}</dd></div>
              ) : null}
            </dl>
            {project.sourceUrl ? (
              <MotionLink external href={project.sourceUrl}>{t("viewOriginal")}</MotionLink>
            ) : null}
          </div>
        </section>
      ) : null}

      {copy.context || copy.process?.length ? (
        <section className="section project-detail-copy prose-section">
          <Reveal className="container editorial-grid">
            {copy.context ? (
              <>
                <p className="eyebrow">{t("context")}</p>
                <Prose paragraphs={[copy.context]} />
              </>
            ) : null}
            {copy.process?.length ? (
              <>
                <p className="eyebrow">{t("processLabel")}</p>
                <Prose paragraphs={copy.process} />
              </>
            ) : null}
          </Reveal>
        </section>
      ) : null}

      {detailMedia && detailMedia.length > 0 ? (
        <section className="section">
          <div className="project-media-canvas">
            <ProjectMediaLayout
              copy={mediaCopy}
              media={detailMedia}
              playLabel={t("play")}
              rhythm={
                project.slug === "calle-documental"
                  ? "sparse"
                  : project.slug === "estudio-editorial"
                    ? "studio"
                    : "default"
              }
              transcriptLabel={t("transcript")}
            />
          </div>
        </section>
      ) : null}

      {copy.result ? (
        <section className="section project-publication">
          <Reveal className="container editorial-grid">
            <p className="eyebrow">{t("publication")}</p>
            <div>
              {copy.result ? <p>{copy.result}</p> : null}
            </div>
          </Reveal>
        </section>
      ) : null}

      {copy.credits ? (
        <section className="section project-credits">
          <Reveal className="container editorial-grid">
            <p className="eyebrow">{t("credits")}</p>
            <dl>
              {Object.entries(copy.credits).map(([key, value]) => (
                <div key={key}>
                  <dt>{copy.creditLabels?.[key] ?? key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
      ) : null}

      {seriesPhotos.length > 0 ? (
        <MoreFromSeries
          closeLabel={t("viewerClose")}
          countLabel={t("seriesCompleteCount", {
            count: seriesPhotos.length,
          })}
          copy={copy.media}
          items={seriesPhotos}
          nextLabel={t("viewerNext")}
          prevLabel={t("viewerPrev")}
          sectionLabel={t("seriesNavigation")}
          seriesLabel={t("seriesComplete")}
          storyLabel={t("seriesStory")}
        />
      ) : null}

      {prevProject || nextProject ? (
        <section
          aria-label={t("projectNavAria")}
          className="section project-nav-footer"
        >
          <div className="container project-nav-footer-inner">
            {prevProject ? (
              <Link
                className="project-nav-link project-nav-prev"
                href={{
                  pathname: "/work/[slug]",
                  params: { slug: prevProject.slug },
                }}
              >
                <span className="project-nav-heading">
                  <span aria-hidden="true" className="project-nav-arrow">←</span>
                  <span className="eyebrow">{t("prevProject")}</span>
                </span>
                <span className="project-nav-title">
                  {
                    (
                      t.raw(
                        `items.${prevProject.translationKey}`,
                      ) as ProjectCopy
                    ).title
                  }
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject ? (
              <Link
                className="project-nav-link project-nav-next"
                href={{
                  pathname: "/work/[slug]",
                  params: { slug: nextProject.slug },
                }}
              >
                <span className="project-nav-heading">
                  <span className="eyebrow">{t("nextProject")}</span>
                  <span aria-hidden="true" className="project-nav-arrow">→</span>
                </span>
                <span className="project-nav-title">
                  {
                    (
                      t.raw(
                        `items.${nextProject.translationKey}`,
                      ) as ProjectCopy
                    ).title
                  }
                </span>
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
      </ProjectPhotoViewer>
    </main>
  );
}
