import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AnimatedLine } from "@/components/motion/animated-line";
import { PhotoArchive } from "@/components/photo-archive";
import { ProjectIndex } from "@/components/project-index";
import {
  ReportingIndex,
  type ReportingStory,
} from "@/components/reporting-index";
import { ReporterReel } from "@/components/reporter-reel";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  buildProjectMediaCopy,
  hasMediaAsset,
  hasProjectDetailPage,
  getPublishedProjects,
  publishableYear,
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
  roles?: string[];
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
  const reportingProjects = publishedProjects.filter((project) =>
    project.discipline.includes("reporting") &&
      !project.discipline.includes("audiovisual"),
  );
  const reporterReel = reportingProjects.find((project) => project.reporterReel);
  const reporterReelMedia = [reporterReel?.cover, ...(reporterReel?.media ?? [])]
    .find((media) => media?.type === "video");
  const reporterReelCopy = reporterReel
    ? (projectsText.raw(
        `items.${reporterReel.translationKey}`,
      ) as ProjectCopy)
    : undefined;
  const reportingPieces = reportingProjects.filter(
    (project) => project !== reporterReel,
  );
  const reportingStories = reportingPieces.flatMap((project): ReportingStory[] => {
    const raw = projectsText.raw(
      `items.${project.translationKey}`,
    ) as ProjectCopy;
    const media = [project.cover, ...(project.media ?? [])].filter(
      Boolean,
    ) as NonNullable<typeof project.cover>[];
    const poster =
      media.find((item) => item.type === "image" && hasMediaAsset(item)) ??
      media.find((item) => item.type === "video" && item.poster && hasMediaAsset(item));
    const video = media.find(
      (item) =>
        item.type === "video" && item.aspectRatio && hasMediaAsset(item),
    );
    const posterSrc = poster?.type === "image" ? poster.src : poster?.poster;
    const posterRatio = poster?.aspectRatio?.replace(":", " / ") ??
      (poster?.width && poster.height
        ? `${poster.width} / ${poster.height}`
        : undefined);

    if (!poster || !posterSrc || !posterRatio || !project.sourceUrl) return [];

    return [{
      id: project.id,
      slug: project.slug,
      title: raw.title,
      roles: raw.roles,
      organisation: project.organisation,
      year: publishableYear(project.year),
      sourceUrl: project.sourceUrl,
      detailPage: hasProjectDetailPage(project),
      posterSrc,
      posterAlt: raw.media?.[poster.id]?.alt ?? raw.title,
      posterRatio,
      video,
      playLabel: projectsText("playCoverage", { title: raw.title }),
    }];
  });
  const photographyProjects = publishedProjects.filter((project) =>
    project.discipline.includes("photography") &&
      !project.discipline.includes("audiovisual") &&
      !project.discipline.includes("reporting"),
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

      {reportingProjects.length > 0 ? (
        <section
          aria-labelledby="work-reporting"
          className="section"
          id="reporting"
        >
          <div className="container work-project-section">
            <SectionHeading
              eyebrow={t("reportingPortfolioEyebrow")}
              id="work-reporting"
              text={t("reportingPortfolioText")}
              title={t("reportingPortfolioTitle")}
            />
            {reporterReel && reporterReelMedia && reporterReelCopy ? (
              <ReporterReel
                eyebrow={projectsText("reelEyebrow")}
                href={{
                  pathname: "/work/[slug]",
                  params: { slug: reporterReel.slug },
                }}
                media={reporterReelMedia}
                mediaCopy={buildProjectMediaCopy(
                  reporterReel,
                  reporterReelCopy.media,
                )}
                meta={reporterReelCopy.roles?.join(" · ")}
                playLabel={projectsText("play")}
                title={reporterReelCopy.title}
                viewLabel={projectsText("viewReel")}
              />
            ) : null}
            {reportingPieces.length > 0 ? (
              <div className="work-project-section">
                <SectionHeading
                  eyebrow={t("reportingCoverageEyebrow")}
                  id="work-reporting-coverage"
                  text={t("reportingCoverageText")}
                  title={t("reportingCoverageTitle")}
                />
                <ReportingIndex
                  closePlayerLabel={projectsText("viewerClose")}
                  playLabel={projectsText("play")}
                  projects={reportingStories}
                  viewOriginalLabel={projectsText("viewOriginal")}
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

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
