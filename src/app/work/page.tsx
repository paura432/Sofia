import type { Metadata } from "next";

import { featuredWork } from "@/content/experience";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Trabajo",
  description:
    "Trabajo profesional de Sofía Chernikova entre televisión, fotografía, eventos y comunicación digital.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">WORK</p>
          <h1 className="display-page">Trabajo entre televisión, imagen y comunicación.</h1>
          <p>
            Experiencia profesional en reporterismo televisivo, contenido visual,
            comunicación digital y fotografía.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="professional-work">
        <div className="container">
          <div className="section-heading section-heading-spaced">
            <p className="eyebrow">PROFESSIONAL WORK</p>
            <h2 className="display-section" id="professional-work">
              Casos de trabajo.
            </h2>
          </div>
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
