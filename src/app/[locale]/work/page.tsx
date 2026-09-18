import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AnimatedLine } from "@/components/motion/animated-line";
import { PhotoArchive } from "@/components/photo-archive";
import { ProjectIndex } from "@/components/project-index";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
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

type ProjectCopy = {
  title: string;
  media?: Record<string, MediaCopy>;
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
  const [t, projectsText] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Projects"),
  ]);
  const publishedProjects = getPublishedProjects();
  const audiovisualProjects = publishedProjects.filter((project) =>
    project.discipline.includes("audiovisual"),
  );
  const photographyProjects = publishedProjects.filter((project) =>
    project.discipline.includes("photography") && !project.discipline.includes("audiovisual"),
  );
  const disciplineLabel = (project: PortfolioProject) =>
    project.discipline
      .map((discipline) => projectsText(`disciplines.${discipline}`))
      .join(" · ");

  return (
    <main id="main">
      <section className="page-hero work-page-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">{t("pageEyebrow")}</p>
          <h1 className="display-page">{t("pageTitle")}</h1>
          <p>{t("pageText")}</p>
        </Reveal>
      </section>

      {audiovisualProjects.length > 0 ? (
        <section aria-labelledby="work-audiovisual" className="section work-film-section" id="audiovisual">
          <div className="container work-project-section">
            <SectionHeading
              eyebrow={t("audiovisualEyebrow")}
              id="work-audiovisual"
              text={t("audiovisualText")}
              title={t("audiovisualTitle")}
            />
            <ProjectIndex
              copyFor={(project) => {
                const raw = projectsText.raw(`items.${project.translationKey}`) as ProjectCopy;
                return { title: raw.title, media: buildProjectMediaCopy(project, raw.media) };
              }}
              disciplineLabel={disciplineLabel}
              playLabel={projectsText("play")}
              projects={audiovisualProjects}
              viewLabel={projectsText("viewProject")}
            />
          </div>
        </section>
      ) : null}

      {photographyProjects.length > 0 ? (
        <section
          aria-labelledby="work-photography"
          className="section"
          data-portfolio-pieces={photographyProjects.length}
          id="fotografia"
        >
          <div className="container work-project-section">
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
              projects={photographyProjects}
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
