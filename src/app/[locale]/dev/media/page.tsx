import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { Hero } from "@/components/hero";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import { SectionHeading } from "@/components/section-heading";
import { SelectedProjects } from "@/components/selected-projects";
import { ShortFormReporting } from "@/components/short-form-reporting";
import {
  buildProjectMediaCopy,
  getHomePhotographySelection,
  projects,
  sortShortFormProjects,
  type MediaCopy,
  type PortfolioProject,
} from "@/content/projects";
import { currentPositionIds } from "@/content/profile";
import { toShortFormStory, type ReportingCopy } from "@/lib/reporting-content";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type ProjectCopy = ReportingCopy & {
  description?: string;
  format?: string;
  media?: Record<string, MediaCopy>;
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DevMediaLab({ params }: PageProps) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { locale } = await params;
  const [projectsText, workText, navigationText, positionsText, profileText, homeText] =
    await Promise.all([
      getTranslations({ locale, namespace: "Projects" }),
      getTranslations({ locale, namespace: "Work" }),
      getTranslations({ locale, namespace: "Navigation" }),
      getTranslations({ locale, namespace: "CurrentPositions" }),
      getTranslations({ locale, namespace: "Profile" }),
      getTranslations({ locale, namespace: "Home" }),
    ]);
  const copyFor = (project: PortfolioProject) =>
    projectsText.raw(`items.${project.translationKey}`) as ProjectCopy;
  const shortFormProjects = sortShortFormProjects(
    projects.filter(
      (project) => project.reportingFormat === "short-form" &&
        project.published === false && project.cover?.muxPlaybackId && project.cover.poster,
    ),
  );
  const shortFormStories = shortFormProjects.flatMap((project) => {
    const copy = copyFor(project);
    const story = toShortFormStory(project, copy, projectsText("play"));
    return story ? [story] : [];
  });
  const silver = projects.find(
    (project) => project.id === "silver-praxis-condicion-perfecta" &&
      project.published === false && project.cover?.muxPlaybackId && project.cover.poster,
  );
  const silverCopy = silver ? copyFor(silver) : undefined;
  const previewShort = shortFormProjects[0];
  const previewShortCopy = previewShort ? copyFor(previewShort) : undefined;
  const photography = getHomePhotographySelection();

  return (
    <main className="dev-media" id="main">
      <p className="container eyebrow dev-media-label">DEV · REAL PROJECT PREVIEW · UNPUBLISHED DRAFTS</p>

      <Hero
        videoPreview={previewShort?.cover && previewShortCopy ? {
          media: previewShort.cover,
          title: previewShortCopy.title,
          alt: previewShortCopy.media?.[previewShort.cover.id]?.alt ?? previewShortCopy.title,
        } : undefined}
      />

      <section aria-labelledby="dev-reporting-title" className="section home-reporting-section">
        <div className="container home-reporting-content">
          <SectionHeading
            eyebrow={workText("reportingPortfolioEyebrow")}
            id="dev-reporting-title"
            text={workText("reportingPortfolioText")}
            title={workText("reportingPortfolioTitle")}
          />
          <h3 className="eyebrow">{workText("shortFormTitle")}</h3>
          <ShortFormReporting
            label={workText("shortFormTitle")}
            opensInNewTabLabel={navigationText("opensInNewTab")}
            projects={shortFormStories}
            showLessLabel={workText("shortFormShowLess")}
            showMoreLabel={workText("shortFormShowMore", { count: "{count}" })}
            viewOriginalLabel={projectsText("viewOriginal")}
          />
        </div>
      </section>

      {silver && silverCopy?.title ? (
        <section aria-labelledby="dev-silver-title" className="section work-film-section">
          <div className="container">
            <SectionHeading
              eyebrow={`${workText("audiovisualEyebrow")} · DEV DRAFT`}
              id="dev-silver-title"
              text={silverCopy.description}
              title={workText("audiovisualTitle")}
            />
            <article className="selected-project dev-media-silver">
              <p className="case-discipline">{silverCopy.format}</p>
              <h3 className="display-section">{silverCopy.title}</h3>
              <ProjectMediaLayout
                copy={buildProjectMediaCopy(silver, silverCopy.media)}
                media={silver.cover ? [silver.cover] : []}
                playLabel={projectsText("play")}
              />
            </article>
          </div>
        </section>
      ) : null}

      <SelectedProjects
        eyebrow={workText("photographyTitle")}
        playLabel={projectsText("play")}
        projects={photography.map((project, index) => {
          const copy = copyFor(project);
          return {
            discipline: project.discipline
              .map((item) => projectsText(`disciplines.${item}`))
              .join(" · "),
            media: project.cover ?? project.media?.[0],
            mediaCopy: buildProjectMediaCopy(project, copy.media),
            number: String(index + 1).padStart(2, "0"),
            organisation: project.organisation,
            slug: project.slug,
            title: copy.title,
          };
        })}
        viewLabel={projectsText("viewProject")}
      />

      <section aria-labelledby="dev-current-title" className="section home-current">
        <div className="container">
          <p className="eyebrow">{homeText("currentEyebrow")}</p>
          <h2 className="display-section" id="dev-current-title">{homeText("currentTitle")}</h2>
          <div className="current-list">
            {currentPositionIds.map((id) => (
              <article className="current-item" key={id}>
                <p className="experience-period">{positionsText(`items.${id}.period`)}</p>
                <div>
                  <h3>{positionsText(`items.${id}.company`)}</h3>
                  <p>{positionsText(`items.${id}.role`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="dev-about-title" className="section home-about">
        <div className="container profile-brief">
          <p className="eyebrow">{homeText("profileEyebrow")}</p>
          <h2 className="display-section profile-statement" id="dev-about-title">
            {profileText("statement")}
          </h2>
        </div>
      </section>

      <ContactBlock />

      <section aria-labelledby="dev-media-metadata" className="section">
        <div className="container">
          <h2 className="display-section" id="dev-media-metadata">Mux draft metadata</h2>
          <p>Real Project data only. No draft is exposed by the public routes while publication gates remain unmet.</p>
          <div className="dev-media-projects">
            {[...shortFormProjects, ...(silver ? [silver] : [])].map((project) => {
              const cover = project.cover;
              const copy = copyFor(project);
              return (
                <article className="dev-media-project" key={project.id}>
                  <h3>{copy.title}</h3>
                  <dl>
                    <div><dt>Project ID</dt><dd><code>{project.id}</code></dd></div>
                    <div><dt>Playback ID</dt><dd><code>{cover?.muxPlaybackId}</code></dd></div>
                    <div><dt>Duration / aspect</dt><dd>{cover?.duration} · {cover?.aspectRatio}</dd></div>
                    <div><dt>Poster time</dt><dd>{cover?.posterTime}s</dd></div>
                    <div><dt>Title key</dt><dd><code>{cover?.titleKey}</code></dd></div>
                    <div><dt>Featured / order</dt><dd>{String(project.featured ?? false)} · {project.order ?? "—"}</dd></div>
                    <div><dt>Role</dt><dd>{project.roleKeys?.join(", ") || "Pending confirmation"}</dd></div>
                    <div><dt>Rights / published</dt><dd>{project.rights?.verified ? "verified" : "pending"} · {String(project.published)}</dd></div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
