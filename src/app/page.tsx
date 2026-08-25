import Link from "next/link";

import { ContactBlock } from "@/components/contact-block";
import { Hero } from "@/components/hero";
import { LanguagesStrip } from "@/components/languages-strip";
import { PracticeIndex } from "@/components/practice-index";
import { SectionHeading } from "@/components/section-heading";
import { currentPositions, profile } from "@/content/profile";

export default function Home() {
  return (
    <main id="main">
      <Hero />

      <section className="section" aria-labelledby="current">
        <div className="container editorial-grid">
          <SectionHeading eyebrow="AHORA" id="current" title="Dónde trabaja hoy." />
          <div className="current-list">
            {currentPositions.map((position) => (
              <div className="current-item" key={position.company}>
                <p className="experience-period">{position.period}</p>
                <div>
                  <h3>{position.company}</h3>
                  <p>{position.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="practice">
        <div className="container editorial-grid">
          <SectionHeading
            eyebrow="PRÁCTICA"
            id="practice"
            title="Tres territorios de trabajo."
            text="Reporterismo, creación visual y distribución digital del contenido."
          />
          <PracticeIndex />
        </div>
      </section>

      <section className="section" aria-labelledby="about-preview">
        <div className="container about-preview">
          <p className="eyebrow">SOBRE SOFÍA</p>
          <h2 className="display-section" id="about-preview">
            {profile.aboutPreview}
          </h2>
          <p>{profile.aboutContinuation}</p>
          <div className="split-heading-links">
            <Link className="text-link arrow-link" href="/experience">
              Ver experiencia <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link arrow-link" href="/about">
              Más sobre Sofía <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section compact-section" aria-labelledby="languages">
        <div className="container">
          <LanguagesStrip />
        </div>
      </section>

      <ContactBlock />
    </main>
  );
}
