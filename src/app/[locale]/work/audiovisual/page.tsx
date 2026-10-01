import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProjectIndex } from "@/components/project-index";
import { Reveal } from "@/components/motion/reveal";
import { getProjectsInSection, buildProjectMediaCopy, type PortfolioProject } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };
type ProjectCopy = { title: string; description?: string; media?: Parameters<typeof buildProjectMediaCopy>[1] };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as Locale;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });
  return pageMetadata({
    locale: lang,
    pathname: "/work/audiovisual",
    title: t("pages.audiovisual.title"),
    description: t("pages.audiovisual.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function AudiovisualPage() {
  const [t, projectsText] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Projects"),
  ]);
  const projects = getProjectsInSection("audiovisual");
  const copyFor = (project: PortfolioProject) =>
    projectsText.raw(`items.${project.translationKey}`) as ProjectCopy;

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">{t("audiovisualEyebrow")}</p>
          <h1 className="display-page">{t("audiovisualTitle")}</h1>
          <p>{t("audiovisualText")}</p>
          <Link className="work-back-link" href="/work">← {t("backToWork")}</Link>
        </Reveal>
      </section>
      <section aria-label={t("audiovisualTitle")} className="section work-film-section">
        <div className="container">
          <ProjectIndex
            copyFor={(project) => ({
              title: copyFor(project).title,
              media: buildProjectMediaCopy(project, copyFor(project).media),
            })}
            disciplineLabel={(project) => project.discipline.map((item) => projectsText(`disciplines.${item}`)).join(" · ")}
            playLabel={projectsText("play")}
            projects={projects}
            viewLabel={projectsText("viewProject")}
          />
        </div>
      </section>
    </main>
  );
}
