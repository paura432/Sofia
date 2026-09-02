import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { MoreFromSeries } from "@/components/more-from-series";
import { MotionLink } from "@/components/motion/motion-link";
import { Reveal } from "@/components/motion/reveal";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import {
  getAdditionalPhotosForProject,
} from "@/content/photo-archive-data";
import {
  buildProjectMediaCopy,
  getNextProject,
  getPrevProject,
  getProjectBySlug,
  getPublishedProjects,
  publishableYear,
  type MediaCopy,
  type PortfolioProject,
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
  result?: string;
  roles?: string[];
  credits?: Record<string, string>;
  media?: Record<string, MediaCopy>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedProjects().map((project) => ({
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
  const additionalPhotos = getAdditionalPhotosForProject(project.slug);

  const published = getPublishedProjects();
  const projectIndex = published.findIndex((item) => item.slug === project.slug);
  const projectOrdinal = String(projectIndex + 1).padStart(2, "0");
  const projectTotal = String(published.length).padStart(2, "0");
  const visibleYear = publishableYear(project.year);
  const facts = [
    copy.format,
    locationLabel,
    visibleYear,
  ].filter(Boolean) as string[];

  return (
    <main id="main">
      <ScrollProgress />
      <section className="page-hero project-detail-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">
            {projectOrdinal} / {projectTotal}
          </p>
          <p className="project-kicker">{disciplineLabel(project, t)}</p>
          <h1 className="display-page">{copy.title}</h1>
          {copy.dek ? <p>{copy.dek}</p> : null}
          {facts.length > 0 ? (
            <p className="project-story-meta">{facts.join(" · ")}</p>
          ) : null}
        </Reveal>
      </section>

      {heroMedia ? (
        <section className="section project-hero-media" aria-label={copy.title}>
          <div className="container">
            <ProjectMediaLayout
              copy={mediaCopy}
              media={[heroMedia]}
              playLabel={t("play")}
              preloadFirst
              transcriptLabel={t("transcript")}
            />
          </div>
        </section>
      ) : null}

      {copy.context ? (
        <section className="section project-detail-copy">
          <Reveal className="container editorial-grid">
            <div>
              <p className="eyebrow">{t("context")}</p>
              <p>{copy.context}</p>
            </div>
            {copy.roles && copy.roles.length > 1 ? (
              <div>
                <p className="eyebrow">{t("role")}</p>
                <ul className="project-role-list">
                  {copy.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        </section>
      ) : null}

      {detailMedia && detailMedia.length > 0 ? (
        <section className="section">
          <div className="container">
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

      {copy.result || project.sourceUrl ? (
        <section className="section project-publication">
          <Reveal className="container editorial-grid">
            <p className="eyebrow">{t("publication")}</p>
            <div>
              {copy.result ? <p>{copy.result}</p> : null}
              {project.sourceUrl ? (
                <MotionLink external href={project.sourceUrl}>
                  {t("viewOriginal")}
                </MotionLink>
              ) : null}
            </div>
          </Reveal>
        </section>
      ) : null}

      {copy.credits ? (
        <section className="section project-credits">
          <Reveal className="container editorial-grid">
            <p className="eyebrow">{t("credits")}</p>
            <dl>
              {Object.entries(copy.credits).map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
      ) : null}

      {additionalPhotos.length > 0 ? (
        <MoreFromSeries
          closeLabel={t("viewerClose")}
          countLabel={t("moreFromSeriesCount", {
            count: additionalPhotos.length,
          })}
          items={additionalPhotos}
          nextLabel={t("viewerNext")}
          prevLabel={t("viewerPrev")}
          title={t("moreFromSeries")}
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
                <span className="eyebrow">{t("prevProject")}</span>
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
                <span className="eyebrow">{t("nextProject")}</span>
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
    </main>
  );
}
