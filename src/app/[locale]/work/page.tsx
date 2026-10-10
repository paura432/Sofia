import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { FilmIndex } from "@/components/film-index";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SeriesGrid } from "@/components/series-grid";
import { ShortFormReporting } from "@/components/short-form-reporting";
import { PHOTO_ARCHIVE_COUNT } from "@/content/photo-archive-count";
import { getArchiveGroupPhotos } from "@/content/photo-archive-data";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { getFilmEntries, getReelStories, getSeriesEntries } from "@/lib/showcase";

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

/**
 * Trabajo = todo el portfolio en una página. Antes era un índice de
 * disciplinas que obligaba a uno o dos clics más para ver cualquier pieza.
 */
export default async function WorkPage() {
  const [t, projectsText, navigationText] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Projects"),
    getTranslations("Navigation"),
  ]);
  const reels = getReelStories(projectsText);
  const films = getFilmEntries(projectsText);
  const series = getSeriesEntries(projectsText, (count) => t("seriesCount", { count }));
  // Foto vertical de escenario: distinta de las portadas de serie y legible bajo el "74".
  const archiveCover = getArchiveGroupPhotos("musica").find((photo) => photo.id === "musica-img-4954");

  const sections = [
    { id: "reporting", label: t("reportingNav"), count: reels.length },
    { id: "audiovisual", label: t("audiovisualNav"), count: films.length },
    { id: "photography", label: t("photographyNav"), count: series.length },
  ].filter((section) => section.count > 0);

  return (
    <main id="main" className="work-page">
      <section className="page-hero section-first">
        <Reveal className="container page-hero-inner">
          <h1 className="display-page">{t("pageTitle")}</h1>
          <p className="page-lede">{t("pageText")}</p>
        </Reveal>
        <nav aria-label={t("sectionsAria")} className="section-nav">
          <div className="container">
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    {section.label}
                    <span className="section-nav-count">{section.count}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#archive">
                  {t("archiveNav")}
                  <span className="section-nav-count">{PHOTO_ARCHIVE_COUNT}</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </section>

      {reels.length ? (
        <section aria-labelledby="work-reporting" className="section work-section" id="reporting">
          <div className="container">
            <SectionHeading
              eyebrow={t("reportingKicker")}
              id="work-reporting"
              text={t("reportingText")}
              title={t("reportingTitle")}
            />
            <ShortFormReporting
              label={t("reportingTitle")}
              opensInNewTabLabel={navigationText("opensInNewTab")}
              projects={reels}
              showLessLabel={t("shortFormShowLess")}
              showMoreLabel={t("shortFormShowMore", { count: "{count}" })}
              viewOriginalLabel={projectsText("viewOriginal")}
              viewProjectLabel={projectsText("viewProject")}
            />
          </div>
        </section>
      ) : null}

      {films.length ? (
        <section aria-labelledby="work-audiovisual" className="section work-section" id="audiovisual">
          <div className="container">
            <SectionHeading
              eyebrow={t("audiovisualKicker")}
              id="work-audiovisual"
              text={t("audiovisualText")}
              title={t("audiovisualTitle")}
            />
            <FilmIndex films={films} viewLabel={projectsText("viewProject")} />
          </div>
        </section>
      ) : null}

      {series.length ? (
        <section aria-labelledby="work-photography" className="section work-section" id="photography">
          <div className="container">
            <SectionHeading
              eyebrow={t("photographyKicker")}
              id="work-photography"
              text={t("photographyText")}
              title={t("photographyTitle")}
            />
            <div id="archive">
              <SeriesGrid
                archive={archiveCover ? {
                  href: "/work/photography/archive",
                  title: t("archiveTitle"),
                  countLabel: t("archiveTeaser", { count: PHOTO_ARCHIVE_COUNT }),
                  src: archiveCover.src,
                } : undefined}
                series={series}
              />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
