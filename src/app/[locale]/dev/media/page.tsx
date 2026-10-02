import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { MediaCaption } from "@/components/media-caption";
import { MoreReporting, type MoreReportingStory } from "@/components/more-reporting";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import { ReportingIndex, type ReportingStory } from "@/components/reporting-index";
import { SectionHeading } from "@/components/section-heading";
import {
  ShortFormReporting,
  type ShortFormStory,
} from "@/components/short-form-reporting";
import {
  buildProjectMediaCopy,
  getMediaSizes,
  projects,
  publishableYear,
  sortShortFormProjects,
  type AspectRatio,
  type MediaCopy,
  type MediaLayout,
  type PortfolioProject,
  type ProjectMedia,
} from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const aspectRatios: AspectRatio[] = [
  "3:2",
  "4:3",
  "16:9",
  "4:5",
  "2:3",
  "1:1",
];

const layouts: MediaLayout[] = [
  "full",
  "wide",
  "half",
  "portrait",
  "pair",
  "triptych",
];

const draftPhotoSlugs = [
  "retrato-editorial",
  "musica-en-directo",
  "calle-documental",
] as const;

const longTitle = {
  es: "Cobertura del pleno extraordinario sobre la financiación autonómica y sus consecuencias para los ayuntamientos del sur de Madrid",
  en: "Coverage of the extraordinary plenary on regional funding and its consequences for municipalities in southern Madrid",
} as const;

type ProjectCopy = {
  title: string;
  format?: string;
  media?: Record<string, MediaCopy>;
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

function isDraftProject(
  project: PortfolioProject | undefined,
): project is PortfolioProject {
  return Boolean(project && project.published === false);
}

function isProjectMedia(media: ProjectMedia | undefined): media is ProjectMedia {
  return Boolean(media);
}

function Block({
  ratio,
  label,
  focal,
}: {
  ratio: AspectRatio;
  label: string;
  focal?: string;
}) {
  return (
    <div className="portfolio-image-frame">
      <div
        className="dev-media-block portfolio-image-inner"
        style={{
          aspectRatio: ratio.replace(":", " / "),
          backgroundPosition: focal,
        }}
      >
        <span>{label}</span>
      </div>
    </div>
  );
}

export default async function DevMediaLab({ params }: PageProps) {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const { locale } = await params;
  const translationLocale = locale as Locale;
  const projectsText = await getTranslations({ locale: translationLocale, namespace: "Projects" });
  const workText = await getTranslations({ locale: translationLocale, namespace: "Work" });
  const navigationText = await getTranslations({ locale: translationLocale, namespace: "Navigation" });
  const title = locale === "en" ? longTitle.en : longTitle.es;
  const draftPhotos = draftPhotoSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(isDraftProject);
  const shortFormDrafts = sortShortFormProjects(
    projects.filter(
      (project) =>
        project.published === false && project.reportingFormat === "short-form",
    ),
  );
  const fixturePoster = projects.find(
    (project) => project.slug === "musica-en-directo",
  )?.cover;

  if (
    !fixturePoster ||
    fixturePoster.type !== "image" ||
    !fixturePoster.src ||
    !fixturePoster.aspectRatio
  ) {
    notFound();
  }
  const fixturePosterSrc = fixturePoster.src;
  const fixturePosterRatio = "9 / 16";
  const fixtureAlt = locale === "en"
    ? "Existing portfolio image used only as a development layout fixture"
    : locale === "ru"
      ? "Существующее фото портфолио только для теста макета"
      : "Imagen existente usada solo como muestra de maquetación";

  const shortFormFixtures = (count: number): ShortFormStory[] =>
    Array.from({ length: count }, (_, index) => {
      const storyTitle = index === 0
        ? title
        : locale === "en"
        ? `QA sample ${String(index + 1).padStart(2, "0")}`
        : locale === "ru"
          ? `Образец QA ${String(index + 1).padStart(2, "0")}`
          : `Muestra de diseño ${String(index + 1).padStart(2, "0")}`;

      return {
        id: `short-form-fixture-${count}-${index}`,
        title: storyTitle,
        organisation: "Dev fixture",
        role: locale === "en" ? "Sample role" : "Rol de muestra",
        year: "2026",
        sourceUrl: "/dev/media",
        posterSrc: fixturePosterSrc,
        posterAlt: fixtureAlt,
        posterRatio: fixturePosterRatio,
        playLabel: projectsText("playCoverage", { title: storyTitle }),
      };
    });
  const shortFormOrderFixture = sortShortFormProjects([
    { id: "A", featured: true, order: 3 },
    { id: "B", featured: true, order: 1 },
    { id: "C", featured: false, order: 2 },
    { id: "D", featured: true, order: 2 },
    { id: "E", featured: false, order: 1 },
  ]);
  const expectedShortFormOrder = ["B", "D", "A", "E", "C"];
  const shortFormOrderPassed = shortFormOrderFixture.every(
    (item, index) => item.id === expectedShortFormOrder[index],
  );
  const fixtureReportingStories: ReportingStory[] = Array.from(
    { length: 5 },
    (_, index) => ({
      id: `reporting-selected-fixture-${index + 1}`,
      slug: `fixture-${index + 1}`,
      title: `${locale === "en" ? "Dev fixture" : locale === "ru" ? "Тест макета" : "Muestra de diseño"} · ${String(index + 1).padStart(2, "0")}`,
      sourceUrl: "/dev/media",
      detailPage: false,
      posterSrc: fixturePosterSrc,
      posterAlt: fixtureAlt,
      posterRatio: fixturePosterRatio,
      playLabel: projectsText("play"),
    }),
  );
  const fixtureMoreStories: MoreReportingStory[] = Array.from(
    { length: 10 },
    (_, index) => ({
      id: `reporting-more-fixture-${index + 1}`,
      title: `${locale === "en" ? "Dev fixture" : locale === "ru" ? "Тест макета" : "Muestra de diseño"} · ${String(index + 6).padStart(2, "0")}`,
      sourceUrl: "/dev/media",
    }),
  );

  return (
    <main className="dev-media" id="main">
      <section className="section section-first">
        <div className="container">
          <p className="eyebrow">Dev · Media Lab</p>
          <h1 className="display-page">Sistema multimedia sin assets</h1>
          <p>
            Solo disponible en <code>next dev</code>. Valida proporciones,
            layouts, pies de foto, focal points y ritmo editorial. Reduced
            motion: el contenido permanece visible.
          </p>
        </div>
      </section>

      {shortFormDrafts.length > 0 ? (
        <section aria-labelledby="reel-ingest-drafts" className="section">
          <div className="container">
            <p className="eyebrow">Ingest · private drafts</p>
            <h2 className="display-section" id="reel-ingest-drafts">
              Short-form review
            </h2>
            <p>
              Mux upload is blocked until server credentials and the approved
              ingest path are available. No source videos or playback IDs are
              exposed here; posters, role, provenance and rights remain pending.
            </p>
            <div className="project-media-layout">
              {shortFormDrafts.map((project) => (
                <article className="selected-project" key={project.id}>
                  <div className="featured-project-meta">
                    <span>
                      <span>Draft · order {project.order} · {project.featured ? "featured candidate" : "not featured"}</span>
                      <h3 className="display-section">{project.id}</h3>
                    </span>
                    <span>
                      {project.cover?.duration ?? "Duration pending"} · {project.cover?.width}×{project.cover?.height} · poster {project.cover?.posterTime}s
                    </span>
                  </div>
                  <p>
                    Mux: NOT UPLOADED · playback: missing · poster: candidate only ·
                    published: {String(project.published)} · rights: {project.rights?.verified ? "verified" : "pending"}
                  </p>
                  <p>Pending: public title/copy, role, source URL, organisation, year, credits and publication permission.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <p className="eyebrow">Aspect ratios</p>
          <div className="project-media-layout">
            {aspectRatios.map((ratio) => (
              <figure className="project-media-item half" key={ratio}>
                <Block label={ratio} ratio={ratio} />
                <MediaCaption caption={`aspectRatio: ${ratio}`} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Layouts</p>
          <div className="project-media-layout">
            {layouts.map((layout, index) => (
              <figure
                className={`project-media-item ${layout}`}
                key={`${layout}-a`}
              >
                <Block
                  label={layout}
                  ratio={layout === "portrait" ? "2:3" : "3:2"}
                />
                <MediaCaption
                  caption={`sizes: ${getMediaSizes(layout)}`}
                  index={String(index + 1).padStart(2, "0")}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Pair y triptych — comprobar el stack</p>
          <div className="project-media-layout">
            <figure className="project-media-item pair">
              <Block label="pair 1" ratio="3:2" />
            </figure>
            <figure className="project-media-item pair">
              <Block label="pair 2" ratio="3:2" />
            </figure>
            <figure className="project-media-item triptych">
              <Block label="triptych 1" ratio="4:5" />
            </figure>
            <figure className="project-media-item triptych">
              <Block label="triptych 2" ratio="4:5" />
            </figure>
            <figure className="project-media-item triptych">
              <Block label="triptych 3" ratio="4:5" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Focal point</p>
          <div className="project-media-layout">
            <figure className="project-media-item half">
              <Block focal="20% 40%" label="20 40" ratio="3:2" />
              <MediaCaption caption="object-position: 20% 40%" />
            </figure>
            <figure className="project-media-item half">
              <Block focal="80% 30%" label="80 30" ratio="3:2" />
              <MediaCaption caption="object-position: 80% 30%" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Vídeo — poster y play target</p>
          <div className="project-media-layout">
            <figure className="project-media-item wide">
              <div className="portfolio-video" style={{ aspectRatio: "16 / 9" }}>
                <div className="dev-media-block portfolio-video-poster">
                  <span className="portfolio-video-play" aria-hidden="true">
                    ▶
                  </span>
                  <span className="portfolio-video-duration">01:42</span>
                </div>
              </div>
              <MediaCaption
                caption="El player sustituye al poster en el mismo frame, sin salto de layout."
                credit="Vídeo: Grupo Cadena Media"
                date="2026"
                index="01"
                location="Madrid"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Caption — todos los campos y ninguno</p>
          <MediaCaption
            caption="Sofía entrevista al portavoz municipal minutos antes del pleno."
            credit="Foto: Sofía Chernikova"
            date="2026"
            index="01"
            location="Madrid"
          />
          <MediaCaption caption="Solo pie, sin metadatos." />
          <MediaCaption credit="Foto: Sofía Chernikova" />
          <MediaCaption />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Títulos largos</p>
          <h2 className="display-section">{title}</h2>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Draft Photo QA</p>
          {draftPhotos.map((project) => {
            const copy = projectsText.raw(
              `items.${project.translationKey}`,
            ) as ProjectCopy;
            const mediaCopy = buildProjectMediaCopy(project, copy.media);
            const media = [project.cover, ...(project.media ?? [])].filter(
              isProjectMedia,
            );

            return (
              <article className="selected-project" key={project.id}>
                <div className="featured-project-meta">
                  <span>
                    <span>{copy.format ?? project.discipline.join(" · ")}</span>
                    <h2 className="display-section">{copy.title}</h2>
                  </span>
                  <span>
                    {publishableYear(project.year) ?? "Draft"} ·{" "}
                    {project.rights?.verified ? "Rights OK" : "Rights pending"}
                  </span>
                </div>
                <ProjectMediaLayout
                  copy={mediaCopy}
                  media={media}
                  playLabel={projectsText("play")}
                />
              </article>
            );
          })}
        </div>
      </section>

      {[1, 3, 4, 8, 20].map((count) => (
        <section className="section" key={`short-form-${count}`}>
          <div className="container">
            <p className="eyebrow">Dev fixture · {count} short-form cards</p>
            <h2 className="display-section">
              {workText("shortFormTitle")}
            </h2>
            <ShortFormReporting
              label={workText("shortFormTitle")}
              opensInNewTabLabel={navigationText("opensInNewTab")}
              projects={shortFormFixtures(count)}
              showLessLabel={workText("shortFormShowLess")}
              showMoreLabel={workText("shortFormShowMore", { count: "{count}" })}
              viewOriginalLabel={projectsText("viewOriginal")}
            />
          </div>
        </section>
      ))}

      <section aria-labelledby="reporting-layout-fixture" className="section">
        <div className="container">
          <p className="eyebrow">Dev fixture · Reporting hierarchy</p>
          <h2 className="display-section" id="reporting-layout-fixture">
            Reporter Reel → {workText("shortFormTitle")} → {workText("reportingCoverageTitle")} → {workText("reportingMoreTitle")}
          </h2>
          <p>
            {locale === "en"
              ? "Layout-only sample. No draft content, credits or publication rights are represented."
              : locale === "ru"
                ? "Только тест макета. Не представляет черновой контент, авторство или права на публикацию."
                : "Muestra solo de maquetación. No representa contenido, créditos ni derechos de publicación."}
          </p>
          <p data-short-form-order={shortFormOrderPassed ? "pass" : "fail"}>
            {locale === "en" ? "Editorial order fixture" : locale === "ru" ? "Проверка редакционного порядка" : "Fixture de orden editorial"}: {shortFormOrderFixture.map((item) => item.id).join(" → ")} · {shortFormOrderPassed ? "PASS" : "FAIL"}
          </p>
        </div>
      </section>

      <section aria-labelledby="reporting-reel-fixture" className="section reporter-reel">
        <div className="container work-project-section">
          <p className="eyebrow">Dev fixture · {projectsText("reelEyebrow")}</p>
          <h2 className="display-section" id="reporting-reel-fixture">
            {projectsText("reelEyebrow")}
          </h2>
          <ProjectMediaLayout
            copy={{ "reporting-reel-fixture-poster": { alt: fixtureAlt } }}
            media={[{
              id: "reporting-reel-fixture-poster",
              type: "image",
              layout: "wide",
              aspectRatio: "16:9",
              src: fixturePosterSrc,
            }]}
            playLabel={projectsText("play")}
          />
        </div>
      </section>

      <section aria-labelledby="reporting-short-form-fixture" className="section reporting-followup-section" id="reporting-short-form-fixture-section">
        <div className="container work-project-section">
          <SectionHeading eyebrow="Dev fixture" id="reporting-short-form-fixture" title={workText("shortFormTitle")} />
          <ShortFormReporting
            label={workText("shortFormTitle")}
            opensInNewTabLabel={navigationText("opensInNewTab")}
            projects={shortFormFixtures(4)}
            showLessLabel={workText("shortFormShowLess")}
            showMoreLabel={workText("shortFormShowMore", { count: "{count}" })}
            viewOriginalLabel={projectsText("viewOriginal")}
          />
        </div>
      </section>

      <section aria-labelledby="reporting-selected-fixture" className="section reporting-followup-section">
        <div className="container work-project-section">
          <SectionHeading eyebrow="Dev fixture" id="reporting-selected-fixture" title={workText("reportingCoverageTitle")} />
          <ReportingIndex
            closePlayerLabel={projectsText("viewerClose")}
            playLabel={projectsText("play")}
            projects={fixtureReportingStories}
            viewOriginalLabel={projectsText("viewOriginal")}
          />
        </div>
      </section>

      <section className="section reporting-followup-section">
        <div className="container">
          <MoreReporting
            opensInNewTabLabel={navigationText("opensInNewTab")}
            projects={fixtureMoreStories}
            startAt={6}
            title={workText("reportingMoreTitle")}
            viewOriginalLabel={projectsText("viewOriginal")}
          />
        </div>
      </section>
    </main>
  );
}
