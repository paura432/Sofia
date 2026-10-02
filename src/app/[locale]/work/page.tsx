import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { PHOTO_ARCHIVE_COUNT } from "@/content/photo-archive-count";
import {
  getProjectsInSection,
  type PortfolioProject,
  type ProjectMedia,
} from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };
type ProjectCopy = {
  title: string;
  media?: Record<string, { alt?: string }>;
};

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

function representative(projects: PortfolioProject[], preferShortForm = false) {
  return (preferShortForm
    ? projects.find((project) => project.reportingFormat === "short-form")
    : undefined) ?? projects.find((project) => project.featured) ?? projects[0];
}

function previewMedia(project?: PortfolioProject): ProjectMedia | undefined {
  return project?.cover ?? project?.media?.[0];
}

function previewSrc(media?: ProjectMedia) {
  return media?.type === "image" ? media.src : media?.type === "video" ? media.poster : undefined;
}

export default async function WorkPage() {
  const [t, projectsText] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Projects"),
  ]);
  const reporting = getProjectsInSection("reporting");
  const audiovisual = getProjectsInSection("audiovisual");
  const photography = getProjectsInSection("photography");

  const entries = [
    ...(reporting.length
      ? [{
          href: "/work/reporting" as const,
          title: t("reportingPortfolioTitle"),
          description: t("reportingPortfolioText"),
          action: t("viewReporting"),
          kicker: t("reportingPortfolioEyebrow"),
          project: representative(reporting, true),
          count: reporting.length,
        }]
      : []),
    ...(audiovisual.length
      ? [{
          href: "/work/audiovisual" as const,
          title: t("audiovisualTitle"),
          description: t("audiovisualText"),
          action: t("viewAudiovisual"),
          kicker: t("audiovisualEyebrow"),
          project: representative(audiovisual),
          count: audiovisual.length,
        }]
      : []),
    ...(photography.length
      ? [{
          href: "/work/photography" as const,
          title: t("photographyTitle"),
          description: t("photographyText"),
          action: t("viewPhotography"),
          kicker: t("photographyEyebrow"),
          project: representative(photography),
          count: photography.length,
        }]
      : []),
    {
      href: "/work/photography/archive" as const,
      title: t("archiveTitle"),
      description: t("archiveTeaserGroups"),
      action: t("explorePhotoArchive"),
      kicker: t("archiveTeaserEyebrow"),
      project: representative(photography),
      count: PHOTO_ARCHIVE_COUNT,
    },
  ];

  return (
    <main id="main" className="work-index-page">
      <section className="page-hero section section-first work-page-hero">
        <Reveal className="container page-hero-inner work-index-heading">
          <p className="eyebrow">{t("pageEyebrow")}</p>
          <h1 className="display-page">{t("pageTitle")}</h1>
          <p>{t("pageText")}</p>
        </Reveal>
      </section>

      <section aria-label={t("pageTitle")} className="section work-disciplines">
        <div className="container">
          <ol className="discipline-index">
            {entries.map((entry, index) => {
              const project = entry.project;
              const media = previewMedia(project);
              const src = previewSrc(media);
              const copy = project
                ? projectsText.raw(`items.${project.translationKey}`) as ProjectCopy
                : undefined;
              return (
                <li className="discipline-index-row" key={entry.href}>
                  <Link className="discipline-index-link" href={entry.href}>
                    <span className="discipline-index-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="discipline-index-copy">
                      <p className="eyebrow">{entry.kicker}</p>
                      <h2>{entry.title}</h2>
                      <p>{entry.description}</p>
                      <span className="discipline-index-action">
                        {entry.action} <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                    <p className="discipline-index-count">
                      {String(entry.count).padStart(2, "0")}
                    </p>
                    {src ? (
                      <div
                        className="discipline-index-media"
                        style={{ aspectRatio: media?.aspectRatio?.replace(":", " / ") ?? "16 / 9" }}
                      >
                        <Image
                          alt={copy?.media?.[media?.id ?? ""]?.alt ?? copy?.title ?? entry.title}
                          fill
                          sizes="(max-width: 699px) 92vw, 48vw"
                          src={src}
                        />
                      </div>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </main>
  );
}
