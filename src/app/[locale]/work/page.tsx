import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ExperienceHighlights } from "@/components/experience-highlights";
import { AnimatedLine } from "@/components/motion/animated-line";
import { MotionLink } from "@/components/motion/motion-link";
import { PhotoArchive } from "@/components/photo-archive";
import { ProjectIndex } from "@/components/project-index";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/content/experience";
import { currentPositionIds } from "@/content/profile";
import {
  buildProjectMediaCopy,
  getPublishedProjects,
  type MediaCopy,
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
  media?: Record<string, MediaCopy>;
};

const reportingItems = currentPositionIds
  .map((id) => experience.find((item) => item.id === id))
  .filter((item): item is (typeof experience)[number] => Boolean(item));

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
  const [t, experienceText, projectsText] = await Promise.all([
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

      <section className="section" aria-labelledby="work-reporting" id="trayectoria">
        <div className="container editorial-grid">
          <SectionHeading
            eyebrow={t("reportingEyebrow")}
            id="work-reporting"
            text={t("reportingText")}
            title={t("reportingTitle")}
          />
          <div>
            <ExperienceHighlights
              copyFor={(id) =>
                experienceText.raw(`items.${id}`) as ExperienceCopy
              }
              items={reportingItems}
              numberFor={(index) => String(index + 1).padStart(2, "0")}
              responsibilityKeysFor={(item) => item.responsibilityKeys.slice(0, 3)}
            />
            <div className="work-section-footer">
              <MotionLink href="/experience">{t("viewExperience")}</MotionLink>
            </div>
          </div>
        </div>
      </section>

      {publishedProjects.length > 0 ? (
        <section
          aria-labelledby="work-photography"
          className="section"
          data-portfolio-pieces={publishedProjects.length}
          id="fotografia"
        >
          <div className="container editorial-grid">
            <SectionHeading
              eyebrow={t("photographyEyebrow")}
              id="work-photography"
              text={t("photographyText")}
              title={t("photographyTitle")}
            />
            <ProjectIndex
              copyFor={(project) => {
                const raw = projectsText.raw(
                  `items.${project.translationKey}`,
                ) as ProjectCopy;
                const location = project.locationKey
                  ? projectsText(`locations.${project.locationKey}`)
                  : undefined;

                return {
                  title: raw.title,
                  media: buildProjectMediaCopy(project, raw.media, {
                    date: project.year,
                    location,
                  }),
                };
              }}
              disciplineLabel={disciplineLabel}
              playLabel={projectsText("play")}
              projects={publishedProjects}
              viewLabel={projectsText("viewProject")}
            />
          </div>
        </section>
      ) : null}

      {publishedProjects.length > 0 ? (
        <>
          <div className="container work-archive-separator">
            <AnimatedLine tone="strong" />
          </div>
          <PhotoArchive
            closeLabel={t("archiveClose")}
            groups={[
              { id: "musica", title: t("archiveMusicaFull") },
              { id: "retrato", title: t("archiveRetratoFull") },
              { id: "estudio", title: t("archiveEstudioFull") },
              { id: "calle", title: t("archiveCalleFull") },
            ]}
            nextLabel={t("archiveNext")}
            prevLabel={t("archivePrev")}
            title={t("archiveTitle")}
            totalLabel={t("archiveTotal")}
          />
        </>
      ) : null}
    </main>
  );
}
