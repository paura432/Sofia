import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AnimatedLine } from "@/components/motion/animated-line";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger";
import { ProjectIndex } from "@/components/project-index";
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
            <ProjectIndex
              copyFor={(project) =>
                projectsText.raw(`items.${project.translationKey}`) as ProjectCopy
              }
              disciplineLabel={disciplineLabel}
              playLabel={projectsText("play")}
              projects={publishedProjects}
              viewLabel={projectsText("viewProject")}
            />
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
