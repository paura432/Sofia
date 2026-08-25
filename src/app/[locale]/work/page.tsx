import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AnimatedLine } from "@/components/motion/animated-line";
import { MotionLink } from "@/components/motion/motion-link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import { featuredWork } from "@/content/experience";
import {
  getPublishedProjects,
  type PortfolioProject,
} from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ExperienceCopy = {
  discipline: string;
  role: string;
  period: string;
  summary: string;
  context?: string;
  responsibilities: Record<string, string>;
};

type ProjectCopy = {
  title: string;
  description?: string;
  media?: Record<string, { alt?: string; caption?: string; title?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/work",
    title: t("pages.work.title"),
    description: t("pages.work.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function WorkPage() {
  const [t, experience, projectsText] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Experience"),
    getTranslations("Projects"),
  ]);
  const publishedProjects = getPublishedProjects();
  const showProjectFilters = publishedProjects.length >= 5;
  const disciplineLabel = (project: PortfolioProject) =>
    project.discipline
      .map((discipline) => projectsText(`disciplines.${discipline}`))
      .join(" · ");

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">{t("pageEyebrow")}</p>
          <h1 className="display-page">{t("pageTitle")}</h1>
          <p>{t("pageText")}</p>
        </Reveal>
      </section>

      <section
        aria-label={publishedProjects.length > 0 ? t("aria") : t("fallbackAria")}
        className="section"
        data-portfolio-pieces={publishedProjects.length}
      >
        <div className="container">
          {publishedProjects.length > 0 ? (
            <>
              {showProjectFilters ? (
                <nav className="project-filter-bar" aria-label={t("aria")}>
                  {[
                    "reporting",
                    "interview",
                    "photography",
                    "video",
                    "communication",
                  ].map((discipline) => (
                    <a href={`#${discipline}`} key={discipline}>
                      {projectsText(`disciplines.${discipline}`)}
                    </a>
                  ))}
                </nav>
              ) : null}

              <div className="project-list">
                {publishedProjects.map((project, index) => {
                  const copy = projectsText.raw(
                    `items.${project.translationKey}`,
                  ) as ProjectCopy;
                  const cover = project.cover ?? project.media?.[0];

                  return (
                    <StaggerGroup
                      as="article"
                      className="project-row"
                      key={project.id}
                      step={40}
                    >
                      <p className="case-number">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      {cover ? (
                        <ProjectMediaLayout
                          copy={copy.media}
                          media={[cover]}
                          playLabel={projectsText("play")}
                        />
                      ) : null}
                      <div>
                        <p className="case-discipline">
                          {disciplineLabel(project)}
                        </p>
                        <h2>{copy.title}</h2>
                        {project.organisation ? (
                          <p className="case-role">
                            {project.organisation} · {project.year}
                          </p>
                        ) : null}
                        {copy.description ? <p>{copy.description}</p> : null}
                        <MotionLink
                          href={{
                            pathname: "/work/[slug]",
                            params: { slug: project.slug },
                          }}
                        >
                          {projectsText("viewProject")}
                        </MotionLink>
                      </div>
                    </StaggerGroup>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="case-list">
              <AnimatedLine tone="strong" />
              {featuredWork.map((item) => {
                const copy = experience.raw(`items.${item.id}`) as ExperienceCopy;

                return (
                  <StaggerGroup
                    as="article"
                    className="case-row"
                    key={item.id}
                    step={30}
                  >
                    <p className="case-number">{item.number}</p>
                    <div>
                      <p className="case-discipline">{copy.discipline}</p>
                      <h2>{item.company}</h2>
                      <p className="case-role">
                        {copy.role} · {copy.period}
                      </p>
                      {copy.context ? (
                        <p className="company-context">{copy.context}</p>
                      ) : null}
                    </div>
                    <div>
                      <p>{copy.summary}</p>
                      <ul>
                        {item.responsibilityKeys.map((key) => (
                          <li key={`${item.id}-${key}`}>
                            {copy.responsibilities[key]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerGroup>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
