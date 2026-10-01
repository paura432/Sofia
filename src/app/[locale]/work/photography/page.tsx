import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProjectIndex } from "@/components/project-index";
import { Reveal } from "@/components/motion/reveal";
import { getProjectsInSection, buildProjectMediaCopy, type PortfolioProject } from "@/content/projects";
import { PHOTO_ARCHIVE_COUNT } from "@/content/photo-archive-count";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };
type ProjectCopy = { title: string; media?: Parameters<typeof buildProjectMediaCopy>[1] };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as Locale;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });
  return pageMetadata({
    locale: lang,
    pathname: "/work/photography",
    title: t("pages.photography.title"),
    description: t("pages.photography.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function PhotographyPage() {
  const [t, projectsText] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Projects"),
  ]);
  const projects = getProjectsInSection("photography");
  const copyFor = (project: PortfolioProject) =>
    projectsText.raw(`items.${project.translationKey}`) as ProjectCopy;

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">{t("photographyEyebrow")}</p>
          <h1 className="display-page">{t("photographyTitle")}</h1>
          <p>{t("photographyText")}</p>
          <Link className="work-back-link" href="/work">← {t("backToWork")}</Link>
        </Reveal>
      </section>
      <section aria-label={t("photographyTitle")} className="section">
        <div className="container">
          <ProjectIndex
            copyFor={(project) => ({
              title: copyFor(project).title,
              media: buildProjectMediaCopy(project, copyFor(project).media, {
                date: project.year,
                location: project.locationKey
                  ? projectsText(`locations.${project.locationKey}`)
                  : undefined,
              }),
            })}
            disciplineLabel={(project) => project.discipline.map((item) => projectsText(`disciplines.${item}`)).join(" · ")}
            playLabel={projectsText("play")}
            projects={projects}
            viewLabel={projectsText("viewProject")}
          />
          <Link
            className="photo-archive-cta work-preview-cta"
            href="/work/photography/archive"
          >
            <span>{t("explorePhotoArchive")}</span>
            <span>{PHOTO_ARCHIVE_COUNT} {t("archiveCountLabel")}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
