import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { MediaCaption } from "@/components/media-caption";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import {
  buildProjectMediaCopy,
  getMediaSizes,
  projects,
  publishableYear,
  type AspectRatio,
  type MediaCopy,
  type MediaLayout,
  type PortfolioProject,
  type ProjectMedia,
} from "@/content/projects";

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
  const projectsText = await getTranslations("Projects");
  const title = locale === "en" ? longTitle.en : longTitle.es;
  const draftPhotos = draftPhotoSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(isDraftProject);

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
    </main>
  );
}
