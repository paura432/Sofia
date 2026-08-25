import type { Metadata } from "next";

import { experience } from "@/content/experience";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Experiencia",
  description:
    "Trayectoria profesional de Sofía Chernikova en televisión, comunicación digital, contenido corporativo y fotografía.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">EXPERIENCIA</p>
          <h1 className="display-page">Trayectoria profesional.</h1>
          <p>
            Reporterismo de televisión, dirección de comunicación digital,
            contenido corporativo y fotografía de retrato.
          </p>
        </div>
      </section>

      <section className="section trajectory" aria-label="Trayectoria profesional">
        <div className="container">
          {experience.map((item) => (
            <article
              className={item.featured ? "trajectory-row featured" : "trajectory-row"}
              key={`${item.company}-${item.period}`}
            >
              <p className="trajectory-year">{item.period}</p>
              <div>
                <p className="case-discipline">{item.discipline}</p>
                <h2>{item.company}</h2>
                <p className="trajectory-role">{item.role}</p>
                {item.companyUrl ? (
                  <p>
                    <a
                      className="company-link"
                      href={item.companyUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Organización <span aria-hidden="true">↗</span>
                    </a>
                  </p>
                ) : null}
                {item.context ? (
                  <p className="company-context">{item.context}</p>
                ) : null}
              </div>
              <div>
                <p>{item.summary}</p>
                {item.progression ? (
                  <p className="progression-strip">
                    {item.progression.map((step) => (
                      <span key={step}>{step}</span>
                    ))}
                  </p>
                ) : null}
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
