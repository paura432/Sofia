import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AnimatedLine } from "@/components/motion/animated-line";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger";
import { PeriodDisplay } from "@/components/period-display";
import { experience } from "@/content/experience";
import { getRelatedProjects, hasProjectDetailPage } from "@/content/projects";
import { Link } from "@/i18n/navigation";
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
  progression?: Record<string, string>;
};
type ProjectCopy = { title: string };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/experience",
    title: t("pages.experience.title"),
    description: t("pages.experience.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function ExperiencePage() {
  const [t, projectsText, navigation] = await Promise.all([
    getTranslations("Experience"),
    getTranslations("Projects"),
    getTranslations("Navigation"),
  ]);

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <Reveal className="container page-hero-inner">
          {t("pageEyebrow") ? <p className="eyebrow">{t("pageEyebrow")}</p> : null}
          <h1 className="display-page">{t("pageTitle")}</h1>
          {t("pageText") ? <p>{t("pageText")}</p> : null}
        </Reveal>
      </section>

      <section className="section trajectory" aria-label={t("pageTitle")}>
        <div className="container">
          <AnimatedLine tone="strong" />
          {experience.map((item) => {
            const copy = t.raw(`items.${item.id}`) as ExperienceCopy;
            const relatedProjects = getRelatedProjects(item.id);

            return (
              <StaggerGroup
                as="article"
                className={
                  item.featured ? "trajectory-row featured" : "trajectory-row"
                }
                key={item.id}
                step={30}
              >
                <PeriodDisplay period={copy.period} />
                <div>
                  <p className="case-discipline">{copy.discipline}</p>
                  {item.companyUrl ? (
                    <h2>
                      <a
                        className="company-link"
                        href={item.companyUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.company}
                        <span aria-hidden="true"> ↗</span>
                        <span className="sr-only">
                          {navigation("opensInNewTab")}
                        </span>
                      </a>
                    </h2>
                  ) : (
                    <h2>{item.company}</h2>
                  )}
                  <p className="trajectory-role">{copy.role}</p>
                  {copy.context ? (
                    <p className="company-context">{copy.context}</p>
                  ) : null}
                </div>
                <div>
                  <p>{copy.summary}</p>
                  {item.progressionKeys && copy.progression ? (
                    <p
                      aria-label={t("progressionLabel")}
                      className="progression-strip"
                    >
                      {item.progressionKeys.map((key) => (
                        <span key={`${item.id}-${key}`}>
                          {copy.progression?.[key]}
                        </span>
                      ))}
                    </p>
                  ) : null}
                  <ul aria-label={t("responsibilitiesLabel")}>
                    {item.responsibilityKeys.map((key) => (
                      <li key={`${item.id}-${key}`}>
                        {copy.responsibilities[key]}
                      </li>
                    ))}
                  </ul>
                  {relatedProjects.length ? (
                    <ul className="trajectory-project-links">
                      {relatedProjects.map((project) => {
                        const projectCopy = projectsText.raw(
                          `items.${project.translationKey}`,
                        ) as ProjectCopy;

                        return (
                          <li key={project.id}>
                            {hasProjectDetailPage(project) ? (
                              <Link href={{ pathname: "/work/[slug]", params: { slug: project.slug } }}>
                                {projectCopy.title} <span aria-hidden="true">↗</span>
                              </Link>
                            ) : project.sourceUrl ? (
                              <a href={project.sourceUrl} rel="noopener noreferrer" target="_blank">
                                {projectCopy.title} <span aria-hidden="true">↗</span>
                                <span className="sr-only">{navigation("opensInNewTab")}</span>
                              </a>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              </StaggerGroup>
            );
          })}
        </div>
      </section>
    </main>
  );
}
