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
          <h1>Reportaje, contenido visual y comunicación.</h1>
          <p>
            Trabajo desarrollado entre televisión, eventos, fotografía y
            plataformas digitales.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="work-categories">
        <div className="container">
          <div className="field-row" id="work-categories" aria-label="Campos de trabajo">
            <span>REPORTING</span>
            <span>VISUAL</span>
            <span>COMMUNICATION</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="professional-cases">
        <div className="container case-list">
          <div className="section-heading">
            <p className="eyebrow">PROFESSIONAL CASES</p>
            <h2 id="professional-cases">Experiencia aplicable a piezas futuras.</h2>
          </div>
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
      </section>
    </main>
  );
}
