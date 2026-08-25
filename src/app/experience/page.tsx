import type { Metadata } from "next";

import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <main id="main" className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">EXPERIENCE</p>
        <h1>Trayectoria editorial y audiovisual.</h1>
        <p>
          Experiencia organizada para lectura rápida: periodo, contexto, cargo y
          responsabilidades verificadas.
        </p>
      </section>

      <section className="section trajectory" aria-label="Experiencia profesional">
        {experience.map((item) => (
          <article className="trajectory-row" key={`${item.company}-${item.period}`}>
            <p className="trajectory-year">{item.period}</p>
            <div>
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
      </section>
    </main>
  );
}
