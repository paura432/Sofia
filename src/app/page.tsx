import Link from "next/link";

import { ContactBlock } from "@/components/contact-block";
import { ExperienceList } from "@/components/experience-list";
import { Hero } from "@/components/hero";
import { PracticeIndex } from "@/components/practice-index";
import { SectionHeading } from "@/components/section-heading";
import { languages, profile } from "@/content/profile";

export default function Home() {
  return (
    <main id="main">
      <Hero />

      <section className="section editorial-grid" aria-labelledby="practice">
        <SectionHeading
          eyebrow="SELECTED PRACTICE"
          title="Tres territorios de trabajo."
          text="Una práctica construida entre reporterismo, imagen y distribución digital del contenido."
        />
        <PracticeIndex />
      </section>

      <section className="section work-curation" aria-labelledby="selected-work">
        <div>
          <p className="eyebrow">SELECTED WORK</p>
          <h2 id="selected-work">Archivo en curaduría.</h2>
        </div>
        <div className="curation-panel">
          <p>SELECTED WORK — ARCHIVE IN CURATION</p>
          <p>
            Esta primera fase prepara el sistema para incorporar reportajes,
            piezas audiovisuales, fotografías y trabajos de comunicación cuando
            la selección final esté cerrada.
          </p>
          <Link className="text-link" href="/work">
            Ver estructura de trabajo
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="experience-snapshot">
        <div className="split-heading">
          <SectionHeading
            eyebrow="EXPERIENCE SNAPSHOT"
            title="Trayectoria reciente."
          />
          <Link className="text-link" href="/experience">
            Ver experiencia
          </Link>
        </div>
        <ExperienceList compact />
      </section>

      <section className="section about-preview" aria-labelledby="about-preview">
        <p className="eyebrow">ABOUT</p>
        <h2 id="about-preview">{profile.aboutPreview}</h2>
        <p>{profile.aboutContinuation}</p>
        <Link className="text-link" href="/about">
          Más sobre Sofía
        </Link>
      </section>

      <section className="section languages-strip" aria-labelledby="languages">
        <p className="eyebrow" id="languages">
          LANGUAGES
        </p>
        <div className="language-grid">
          {languages.map((language) => (
            <article key={language.code}>
              <p>{language.code}</p>
              <h3>{language.level}</h3>
              <span>{language.name}</span>
            </article>
          ))}
        </div>
      </section>

      <ContactBlock />
    </main>
  );
}
