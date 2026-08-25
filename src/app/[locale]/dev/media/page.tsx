import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MediaCaption } from "@/components/media-caption";
import type { AspectRatio, MediaLayout } from "@/content/projects";
import { getMediaSizes } from "@/content/projects";

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

const longTitle =
  "Cobertura del pleno extraordinario sobre la financiación autonómica y sus consecuencias para los ayuntamientos del sur de Madrid";

/** Bloque neutro: valida la geometría del sistema sin usar ningún asset. */
function Block({
  ratio,
  label,
}: {
  ratio: AspectRatio;
  label: string;
}) {
  return (
    <div className="portfolio-image-frame">
      <div
        className="dev-media-block portfolio-image-inner"
        style={{ aspectRatio: ratio.replace(":", " / ") }}
      >
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function DevMediaLab() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="dev-media" id="main">
      <section className="section section-first">
        <div className="container">
          <p className="eyebrow">Dev · Media Lab</p>
          <h1 className="display-page">Sistema multimedia sin assets</h1>
          <p>
            Solo disponible en <code>next dev</code>. Valida proporciones,
            layouts, pies de foto y ritmo editorial antes de recibir
            fotografías o vídeos reales.
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
          <h2 className="display-section">{longTitle}</h2>
        </div>
      </section>
    </main>
  );
}
