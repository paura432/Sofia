import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { FeaturedProject } from "@/components/featured-project";
import { Hero } from "@/components/hero";
import { AnimatedLine } from "@/components/motion/animated-line";
import { MotionLink } from "@/components/motion/motion-link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger";
import { ReporterReel } from "@/components/reporter-reel";
import { ReportingIndex } from "@/components/reporting-index";
import { SectionHeading } from "@/components/section-heading";
import { SelectedProjects } from "@/components/selected-projects";
import { ShortFormReporting } from "@/components/short-form-reporting";
import { Link } from "@/i18n/navigation";
import {
  buildProjectMediaCopy,
  getHomeAudiovisualSelection,
  getHomePhotographySelection,
  getHomeReportingSelection,
  getReporterReel,
  hasMediaAsset,
  type MediaCopy,
  type PortfolioProject,
} from "@/content/projects";
import { currentPositionIds } from "@/content/profile";
import type { Locale } from "@/i18n/routing";
import { toReportingStory, toShortFormStory, type ReportingCopy } from "@/lib/reporting-content";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };
type ProjectCopy = ReportingCopy & { media?: Record<string, MediaCopy> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/",
    title: t("pages.home.title"),
    description: t("pages.home.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function Home() {
  const [home, profile, positions, projectsText, work, navigationText] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Profile"),
    getTranslations("CurrentPositions"),
    getTranslations("Projects"),
    getTranslations("Work"),
    getTranslations("Navigation"),
  ]);
  const copyFor = (project: PortfolioProject) =>
    projectsText.raw(`items.${project.translationKey}`) as ProjectCopy;
  const reportingProjects = getHomeReportingSelection();
  const shortFormStories = reportingProjects.flatMap((project) => {
    if (project.reportingFormat !== "short-form") return [];
    const story = toShortFormStory(project, copyFor(project), projectsText("play"));
    return story ? [story] : [];
  });
  const coverageStories = reportingProjects.flatMap((project) => {
    if (project.reportingFormat === "short-form") return [];
    const copy = copyFor(project);
    const story = toReportingStory(
      project,
      copy,
      projectsText("playCoverage", { title: copy.title }),
    );
    return story ? [story] : [];
  });
  const reel = getReporterReel();
  const reelVideo = reel && [reel.cover, ...(reel.media ?? [])].find(
    (media) => media?.type === "video" && hasMediaAsset(media),
  );
  const reelCopy = reel ? copyFor(reel) : undefined;
  const featuredAudiovisual = getHomeAudiovisualSelection()[0];
  const photography = getHomePhotographySelection();
  const disciplineLabel = (project: PortfolioProject) =>
    project.discipline.map((item) => projectsText(`disciplines.${item}`)).join(" · ");

  return (
    <main id="main">
      <Hero />

      {shortFormStories.length || coverageStories.length ? (
        <section aria-labelledby="home-reporting-title" className="section home-reporting-section">
          <div className="container home-reporting-content">
            <SectionHeading
              eyebrow={work("reportingPortfolioEyebrow")}
              id="home-reporting-title"
              title={work("reportingPortfolioTitle")}
            />
            {shortFormStories.length ? (
              <ShortFormReporting
                label={work("shortFormTitle")}
                opensInNewTabLabel={navigationText("opensInNewTab")}
                projects={shortFormStories}
                showLessLabel={work("shortFormShowLess")}
                showMoreLabel={work("shortFormShowMore", { count: "{count}" })}
                viewOriginalLabel={projectsText("viewOriginal")}
              />
            ) : (
              <ReportingIndex
                closePlayerLabel={projectsText("viewerClose")}
                playLabel={projectsText("play")}
                projects={coverageStories}
                viewOriginalLabel={projectsText("viewOriginal")}
              />
            )}
            <Link className="editorial-link" href="/work/reporting">
              {work("viewReporting")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      ) : null}

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

      {featuredAudiovisual ? (
        <FeaturedProject
          cover={featuredAudiovisual.cover}
          discipline={disciplineLabel(featuredAudiovisual)}
          eyebrow={projectsText("audiovisualEyebrow")}
          headingId="featured-audiovisual"
          href={{ pathname: "/work/[slug]", params: { slug: featuredAudiovisual.slug } }}
          mediaCopy={buildProjectMediaCopy(
            featuredAudiovisual,
            copyFor(featuredAudiovisual).media,
          )}
          playLabel={projectsText("play")}
          title={copyFor(featuredAudiovisual).title}
          tone="film"
          year={featuredAudiovisual.year}
        />
      ) : null}

      <SelectedProjects
        eyebrow={work("photographyTitle")}
        playLabel={projectsText("play")}
        projects={photography.map((project, index) => ({
          discipline: disciplineLabel(project),
          media: project.cover ?? project.media?.[0],
          mediaCopy: buildProjectMediaCopy(project, copyFor(project).media),
          number: String(index + 1).padStart(2, "0"),
          organisation: project.organisation,
          slug: project.slug,
          title: copyFor(project).title,
        }))}
        viewLabel={projectsText("viewProject")}
      />

      <section className="section home-current" aria-labelledby="current">
        <div className="container editorial-grid">
          <SectionHeading
            eyebrow={home("currentEyebrow")}
            id="current"
            title={home("currentTitle")}
          />
          <div className="current-list">
            <AnimatedLine tone="strong" />
            <StaggerGroup className="current-entries">
              {currentPositionIds.map((id) => (
                <div className="current-item" key={id}>
                  <p className="experience-period">{positions(`items.${id}.period`)}</p>
                  <div>
                    <h3>{positions(`items.${id}.company`)}</h3>
                    <p>{positions(`items.${id}.role`)}</p>
                  </div>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <section className="section home-about" aria-labelledby="profile-brief">
        <Reveal className="container profile-brief">
          <p className="eyebrow">{home("profileEyebrow")}</p>
          <p className="display-section profile-statement" id="profile-brief">
            {profile("statement")}
          </p>
          <MotionLink href="/about">{home("moreAbout")}</MotionLink>
        </Reveal>
      </section>

      <ContactBlock />
    </main>
  );
}
