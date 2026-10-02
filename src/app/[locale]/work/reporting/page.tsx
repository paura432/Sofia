import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { MoreReporting, type MoreReportingStory } from "@/components/more-reporting";
import { ReportingIndex } from "@/components/reporting-index";
import { ReporterReel } from "@/components/reporter-reel";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ShortFormReporting, type ShortFormStory } from "@/components/short-form-reporting";
import {
  buildProjectMediaCopy,
  getProjectsInSection,
  getReporterReel,
  hasPublishedReporting,
  hasMediaAsset,
  sortShortFormProjects,
} from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  toMoreReportingStory,
  toReportingStory,
  toShortFormStory,
  type ReportingCopy,
} from "@/lib/reporting-content";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as Locale;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });

  return pageMetadata({
    locale: lang,
    pathname: "/work/reporting",
    title: t("pages.reporting.title"),
    description: t("pages.reporting.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function ReportingPage() {
  const [t, projectsText, navigationText] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Projects"),
    getTranslations("Navigation"),
  ]);
  const projects = getProjectsInSection("reporting");
  if (!hasPublishedReporting()) notFound();
  const reel = getReporterReel();
  const reelVideo = reel && [reel.cover, ...(reel.media ?? [])].find(
    (media) => media?.type === "video" && hasMediaAsset(media),
  );
  const reelCopy = reel
    ? projectsText.raw(`items.${reel.translationKey}`) as ReportingCopy
    : undefined;
  const coverages = projects.filter(
    (project) => project !== reel && project.reportingFormat !== "short-form",
  );
  const selected = coverages.filter((project) => project.reportingFeatured).slice(0, 6);
  const selectedStories = selected.flatMap((project) => {
    const copy = projectsText.raw(`items.${project.translationKey}`) as ReportingCopy;
    const story = toReportingStory(
      project,
      copy,
      projectsText("playCoverage", { title: copy.title }),
    );
    return story ? [story] : [];
  });
  const selectedIds = new Set(selectedStories.map((story) => story.id));
  const moreStories = coverages.flatMap((project): MoreReportingStory[] => {
    if (selectedIds.has(project.id)) return [];
    const copy = projectsText.raw(`items.${project.translationKey}`) as ReportingCopy;
    const story = toMoreReportingStory(project, copy);
    return story ? [story] : [];
  });
  const shortFormStories = sortShortFormProjects(
    projects.filter((project) => project !== reel && project.reportingFormat === "short-form"),
  )
    .flatMap((project): ShortFormStory[] => {
      const copy = projectsText.raw(`items.${project.translationKey}`) as ReportingCopy;
      const story = toShortFormStory(
        project,
        copy,
        projectsText("play"),
      );
      return story ? [story] : [];
    });

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <Reveal className="container page-hero-inner">
          {t("reportingPortfolioEyebrow") ? <p className="eyebrow">{t("reportingPortfolioEyebrow")}</p> : null}
          <h1 className="display-page">{t("reportingPortfolioTitle")}</h1>
          {t("reportingPortfolioText") ? <p>{t("reportingPortfolioText")}</p> : null}
          <Link className="work-back-link" href="/work">← {t("backToWork")}</Link>
        </Reveal>
      </section>

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
        <section aria-labelledby="reporting-short-form" className="section reporting-followup-section">
          <div className="container work-project-section">
            <SectionHeading
              eyebrow={t("shortFormEyebrow")}
              id="reporting-short-form"
              text={t("shortFormText")}
              title={t("shortFormTitle")}
            />
            <ShortFormReporting
              label={t("shortFormTitle")}
              opensInNewTabLabel={navigationText("opensInNewTab")}
              projects={shortFormStories}
              showLessLabel={t("shortFormShowLess")}
              showMoreLabel={t("shortFormShowMore", { count: "{count}" })}
              viewOriginalLabel={projectsText("viewOriginal")}
            />
          </div>
        </section>
      ) : null}

      {selectedStories.length ? (
        <section aria-labelledby="reporting-selected" className="section reporting-followup-section">
          <div className="container work-project-section">
            <SectionHeading
              eyebrow={t("reportingCoverageEyebrow")}
              id="reporting-selected"
              text={t("reportingCoverageText")}
              title={t("reportingCoverageTitle")}
            />
            <ReportingIndex
              closePlayerLabel={projectsText("viewerClose")}
              playLabel={projectsText("play")}
              projects={selectedStories}
              viewOriginalLabel={projectsText("viewOriginal")}
            />
          </div>
        </section>
      ) : null}

      {moreStories.length ? (
        <section className="section reporting-followup-section">
          <div className="container">
            <MoreReporting
              opensInNewTabLabel={navigationText("opensInNewTab")}
              projects={moreStories}
              startAt={selectedStories.length + 1}
              title={t("reportingMoreTitle")}
              viewOriginalLabel={projectsText("viewOriginal")}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}
