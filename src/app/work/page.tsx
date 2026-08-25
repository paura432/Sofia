import type { Metadata } from "next";

import { featuredWork } from "@/content/experience";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Trabajo",
  description:
    "Trabajo seleccionado de Sofía Chernikova: reporterismo de televisión, comunicación digital, contenido corporativo y fotografía.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">TRABAJO</p>
          <h1 className="display-page">Trabajo seleccionado.</h1>
          <p>
            Cuatro contextos profesionales donde se ha construido el perfil:
            televisión, comunicación digital, contenido corporativo y fotografía.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Trabajo seleccionado">
        <div className="container">
          <div className="case-list">
            {featuredWork.map((item) => (
              <article className="case-row" key={item.company}>
                <p className="case-number">{item.number}</p>
                <div>
                  <p className="case-discipline">{item.discipline}</p>
                  <h3>{item.company}</h3>
                  <p className="case-role">
                    {item.role} · {item.period}
                  </p>
                  {item.context ? (
                    <p className="company-context">{item.context}</p>
                  ) : null}
                </div>
                <div>
                  <p>{item.summary}</p>
                  <ul>
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
