import type { Metadata } from "next";

import { experience } from "@/content/experience";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Experiencia",
  description:
    "Experiencia profesional de Sofía Chernikova en televisión, comunicación digital, contenido corporativo y fotografía.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">EXPERIENCE</p>
          <h1>Trayectoria editorial y audiovisual.</h1>
          <p>
            Experiencia en reporterismo televisivo, contenido digital,
            comunicación corporativa y fotografía.
          </p>
        </div>
      </section>

      <section className="section trajectory" aria-label="Experiencia profesional">
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
                <p>{item.role}</p>
              </div>
              <ul>
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
