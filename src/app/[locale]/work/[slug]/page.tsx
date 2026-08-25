import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { MotionLink } from "@/components/motion/motion-link";
import { Reveal } from "@/components/motion/reveal";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import {
  getNextProject,
  getProjectBySlug,
  getPublishedProjects,
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
  media?: Record<string, { alt?: string; caption?: string; title?: string }>;
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

  return pageMetadata({
    alternateLanguages: alternates.languages,
    canonicalPath: projectPath(project.slug, locale),
    description: copy.description,
    locale,
    ogAlt: metadata("ogAlt"),
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
  const heroMedia = project.cover ?? project.media?.find((media) => media.featured);
  const detailMedia = project.media?.filter((media) => media.id !== heroMedia?.id);
  const nextProject = getNextProject(project.slug);

  return (
    <main id="main">
      <ScrollProgress />
      <section className="page-hero project-detail-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">
            01 / {disciplineLabel(project, t)}
          </p>
          <h1 className="display-page">{copy.title}</h1>
          {copy.dek ? <p>{copy.dek}</p> : null}
          <dl className="project-facts">
            {project.organisation ? (
              <div>
                <dt>{t("organisation")}</dt>
                <dd>{project.organisation}</dd>
              </div>
            ) : null}
            {project.locationKey ? (
              <div>
                <dt>{t("location")}</dt>
                <dd>{t(`locations.${project.locationKey}`)}</dd>
              </div>
            ) : null}
            <div>
              <dt>{t("year")}</dt>
              <dd>{project.year}</dd>
            </div>
            {copy.format ? (
              <div>
                <dt>{t("format")}</dt>
                <dd>{copy.format}</dd>
              </div>
            ) : null}
          </dl>
        </Reveal>
      </section>

      {heroMedia ? (
        <section className="section project-hero-media" aria-label={copy.title}>
          <div className="container">
            <ProjectMediaLayout
              copy={copy.media}
              media={[heroMedia]}
              playLabel={t("play")}
              preloadFirst
            />
          </div>
        </section>
      ) : null}

      {copy.context || copy.roles?.length ? (
        <section className="section project-detail-copy">
          <Reveal className="container editorial-grid">
            {copy.context ? (
              <div>
                <p className="eyebrow">{t("context")}</p>
                <p>{copy.context}</p>
              </div>
            ) : null}
            {copy.roles?.length ? (
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
              copy={copy.media}
              media={detailMedia}
              playLabel={t("play")}
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

      {nextProject ? (
        <section className="section next-project" aria-labelledby="next-project">
          <div className="container">
            <p className="eyebrow" id="next-project">
              {t("nextProject")}
            </p>
            <Link
              className="next-project-link"
              href={{
                pathname: "/work/[slug]",
                params: { slug: nextProject.slug },
              }}
            >
              <span className="next-project-discipline">
                {disciplineLabel(nextProject, t)}
              </span>
              <span className="display-section">
                {
                  (
                    t.raw(
                      `items.${nextProject.translationKey}`,
                    ) as ProjectCopy
                  ).title
                }
              </span>
              <span className="next-project-year">
                {nextProject.year} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
