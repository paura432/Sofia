import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProjectIndex } from "@/components/project-index";
import { ReportingIndex, type ReportingStory } from "@/components/reporting-index";
import { ReporterReel } from "@/components/reporter-reel";
import { ShortFormReporting, type ShortFormStory } from "@/components/short-form-reporting";
import { SectionHeading } from "@/components/section-heading";
import { SelectedProjects } from "@/components/selected-projects";
import { Reveal } from "@/components/motion/reveal";
import { PHOTO_ARCHIVE_COUNT } from "@/content/photo-archive-count";
import {
  buildProjectMediaCopy,
  getProjectsInSection,
  getReporterReel,
  hasPublishedReporting,
  hasMediaAsset,
  sortShortFormProjects,
  type MediaCopy,
  type PortfolioProject,
} from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { toReportingStory, toShortFormStory, type ReportingCopy } from "@/lib/reporting-content";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as Locale;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });

  return pageMetadata({
    locale: lang,
    pathname: "/work",
    title: t("pages.work.title"),
    description: t("pages.work.description"),
    ogAlt: t("ogAlt"),
  });
}

type ProjectCopy = ReportingCopy & { format?: string };

export default async function WorkPage() {
  const [t, projectsText, navigationText] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Projects"),
    getTranslations("Navigation"),
  ]);
  const reporting = getProjectsInSection("reporting");
  const audiovisual = getProjectsInSection("audiovisual");
  const photography = getProjectsInSection("photography");
  const reel = getReporterReel();
  const reelVideo = reel && [reel.cover, ...(reel.media ?? [])].find(
    (media) => media?.type === "video" && hasMediaAsset(media),
  );
  const reelCopy = reel
    ? projectsText.raw(`items.${reel.translationKey}`) as ProjectCopy
    : undefined;
  const selectedReporting = reporting
    .filter((project) => project !== reel && project.reportingFeatured)
    .slice(0, 3)
    .flatMap((project): ReportingStory[] => {
      const copy = projectsText.raw(`items.${project.translationKey}`) as ProjectCopy;
      const story = toReportingStory(
        project,
        copy,
        projectsText("playCoverage", { title: copy.title }),
      );
      return story ? [story] : [];
    });
  const shortFormStories = sortShortFormProjects(
    reporting.filter(
      (project) => project !== reel && project.reportingFormat === "short-form",
    ),
  ).flatMap((project): ShortFormStory[] => {
    const copy = projectsText.raw(`items.${project.translationKey}`) as ReportingCopy;
    const story = toShortFormStory(project, copy, projectsText("play"));
    return story ? [story] : [];
  });
  const audiovisualPreview = [
    ...audiovisual.filter((project) => project.featured),
    ...audiovisual.filter((project) => !project.featured),
  ].slice(0, 1);
  const photographyPreview = [
    ...photography.filter((project) => project.featured),
    ...photography.filter((project) => !project.featured),
  ].slice(0, 3);
  const copyFor = (project: PortfolioProject) =>
    projectsText.raw(`items.${project.translationKey}`) as ProjectCopy;
  const mediaCopyFor = (project: PortfolioProject) =>
    buildProjectMediaCopy(project, copyFor(project).media);
  const disciplineLabel = (project: PortfolioProject) =>
    project.discipline.map((item) => projectsText(`disciplines.${item}`)).join(" · ");

  return (
    <main id="main">
      <section className="page-hero work-page-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">{t("pageEyebrow")}</p>
          <h1 className="display-page">{t("pageTitle")}</h1>
          <p>{t("pageText")}</p>
        </Reveal>
      </section>

      {hasPublishedReporting() ? (
        <section aria-labelledby="work-reporting" className="section">
          <div className="container work-project-section">
            <SectionHeading
              eyebrow={t("reportingPortfolioEyebrow")}
              id="work-reporting"
              title={t("reportingPortfolioTitle")}
              text={t("reportingPortfolioText")}
            />
            {reel && reelVideo && reelCopy ? (
              <ReporterReel
                eyebrow={projectsText("reelEyebrow")}
                href={{ pathname: "/work/[slug]", params: { slug: reel.slug } }}
                media={reelVideo}
                mediaCopy={buildProjectMediaCopy(reel, reelCopy.media)}
                meta={reelCopy.roles?.join(" · ")}
                playLabel={projectsText("play")}
                title={reelCopy.title}
                viewLabel={projectsText("viewReel")}
              />
            ) : null}
            {shortFormStories.length ? (
              <>
                <SectionHeading
                  eyebrow={t("shortFormEyebrow")}
                  id="work-short-form"
                  title={t("shortFormTitle")}
                  text={t("shortFormText")}
                />
                <ShortFormReporting
                  label={t("shortFormTitle")}
                  opensInNewTabLabel={navigationText("opensInNewTab")}
                  projects={shortFormStories}
                  showLessLabel={t("shortFormShowLess")}
                  showMoreLabel={t("shortFormShowMore", { count: "{count}" })}
                  viewOriginalLabel={projectsText("viewOriginal")}
                />
              </>
            ) : null}
            {selectedReporting.length ? (
              <ReportingIndex
                closePlayerLabel={projectsText("viewerClose")}
                playLabel={projectsText("play")}
                projects={selectedReporting}
                viewOriginalLabel={projectsText("viewOriginal")}
              />
            ) : null}
            <Link className="work-preview-cta" href="/work/reporting">
              {t("viewReporting")}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      ) : null}

      {audiovisualPreview.length ? (
        <section aria-labelledby="work-audiovisual" className="section work-film-section">
          <div className="container work-project-section">
            <SectionHeading
              eyebrow={t("audiovisualEyebrow")}
              id="work-audiovisual"
              title={t("audiovisualTitle")}
              text={t("audiovisualText")}
            />
            <ProjectIndex
              copyFor={(project) => ({
                title: copyFor(project).title,
                media: mediaCopyFor(project),
              })}
              disciplineLabel={disciplineLabel}
              playLabel={projectsText("play")}
              projects={audiovisualPreview}
              viewLabel={projectsText("viewProject")}
            />
            <Link className="work-preview-cta" href="/work/audiovisual">
              {t("viewAudiovisual")}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      ) : null}

      {photographyPreview.length ? (
        <section aria-labelledby="work-photography" className="section">
          <div className="container work-project-section">
            <SectionHeading
              eyebrow={t("photographyEyebrow")}
              id="work-photography"
              title={t("photographyTitle")}
              text={t("photographyText")}
            />
            <SelectedProjects
              eyebrow={t("photographyPreviewLabel")}
              playLabel={projectsText("play")}
              projects={photographyPreview.map((project, index) => ({
                discipline: disciplineLabel(project),
                media: project.cover ?? project.media?.[0],
                mediaCopy: mediaCopyFor(project),
                number: String(index + 1).padStart(2, "0"),
                organisation: project.organisation,
                slug: project.slug,
                title: copyFor(project).title,
              }))}
              viewLabel={projectsText("viewProject")}
            />
            <div className="work-preview-actions">
              <Link className="work-preview-cta" href="/work/photography">
                {t("viewPhotography")}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="work-preview-cta" href="/work/photography/archive">
                {t("explorePhotoArchive")}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="work-archive" className="section work-archive-teaser">
        <div className="container">
          <div>
            <p className="eyebrow">{t("archiveTeaserEyebrow")}</p>
            <h2 className="display-section" id="work-archive">{t("archiveTitle")}</h2>
            <p>{t("archiveTeaserGroups")}</p>
          </div>
          <p className="work-archive-count">
            <span>{PHOTO_ARCHIVE_COUNT}</span> {t("archiveCountLabel")}
          </p>
          <Link className="work-preview-cta" href="/work/photography/archive">
            {t("explorePhotoArchive")}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
