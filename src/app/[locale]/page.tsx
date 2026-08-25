import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { FeaturedProject } from "@/components/featured-project";
import { Hero } from "@/components/hero";
import { LanguagesStrip } from "@/components/languages-strip";
import { AnimatedLine } from "@/components/motion/animated-line";
import { MotionLink } from "@/components/motion/motion-link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger";
import { PracticeIndex } from "@/components/practice-index";
import { SectionHeading } from "@/components/section-heading";
import { SelectedProjects } from "@/components/selected-projects";
import {
  getFeaturedProject,
  getSelectedProjects,
  type PortfolioProject,
} from "@/content/projects";
import { currentPositionIds } from "@/content/profile";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ProjectCopy = {
  title: string;
  media?: Record<string, { alt?: string; title?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  const [home, profile, positions, projectsText] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Profile"),
    getTranslations("CurrentPositions"),
    getTranslations("Projects"),
  ]);
  const featuredProject = getFeaturedProject();
  const selectedProjects = getSelectedProjects(3);
  const disciplineLabel = (project: PortfolioProject) =>
    project.discipline
      .map((discipline) => projectsText(`disciplines.${discipline}`))
      .join(" · ");
  const projectCopy = (project: PortfolioProject) =>
    projectsText.raw(`items.${project.translationKey}`) as ProjectCopy;

  return (
    <main id="main">
      <Hero />

      {featuredProject ? (
        <FeaturedProject
          cover={featuredProject.cover}
          discipline={disciplineLabel(featuredProject)}
          eyebrow={projectsText("featuredEyebrow")}
          href={{
            pathname: "/work/[slug]",
            params: { slug: featuredProject.slug },
          }}
          mediaCopy={projectCopy(featuredProject).media}
          organisation={featuredProject.organisation}
          playLabel={projectsText("play")}
          title={projectCopy(featuredProject).title}
          video={featuredProject.media?.find((media) => media.type === "video")}
          year={featuredProject.year}
        />
      ) : null}

      <section className="section" aria-labelledby="current">
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
                  <p className="experience-period">
                    {positions(`items.${id}.period`)}
                  </p>
                  <div>
                    <h3>
                      {id === "grupo-cadena-media"
                        ? "Grupo Cadena Media"
                        : "URJCmun"}
                    </h3>
                    <p>{positions(`items.${id}.role`)}</p>
                  </div>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="practice">
        <div className="container editorial-grid">
          <SectionHeading
            eyebrow={home("practiceEyebrow")}
            id="practice"
            text={home("practiceText")}
            title={home("practiceTitle")}
          />
          <PracticeIndex />
        </div>
      </section>

      <SelectedProjects
        eyebrow={projectsText("selectedEyebrow")}
        playLabel={projectsText("play")}
        projects={selectedProjects.map((project, index) => ({
          discipline: disciplineLabel(project),
          media: project.cover ?? project.media?.[0],
          mediaCopy: projectCopy(project).media,
          number: String(index + 1).padStart(2, "0"),
          organisation: project.organisation,
          slug: project.slug,
          title: projectCopy(project).title,
        }))}
        viewLabel={projectsText("viewProject")}
      />

      <section className="section" aria-labelledby="about-preview">
        <Reveal className="container about-preview">
          <p className="eyebrow">{home("aboutEyebrow")}</p>
          <h2 className="display-section" id="about-preview">
            {profile("aboutPreview")}
          </h2>
          <p>{profile("aboutContinuation")}</p>
          <div className="split-heading-links">
            <MotionLink href="/experience">{home("viewExperience")}</MotionLink>
            <MotionLink href="/about">{home("moreAbout")}</MotionLink>
          </div>
        </Reveal>
      </section>

      <section className="section compact-section" aria-labelledby="languages">
        <Reveal className="container">
          <LanguagesStrip />
        </Reveal>
      </section>

      <ContactBlock />
    </main>
  );
}
