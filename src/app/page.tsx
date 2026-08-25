import Link from "next/link";

import { ContactBlock } from "@/components/contact-block";
import { ExperienceList } from "@/components/experience-list";
import { Hero } from "@/components/hero";
import { PracticeIndex } from "@/components/practice-index";
import { SectionHeading } from "@/components/section-heading";
import { featuredWork } from "@/content/experience";
import { languages, profile } from "@/content/profile";

export default function Home() {
  return (
    <main id="main">
      <Hero />

      <section className="section" aria-labelledby="practice">
        <div className="container editorial-grid">
          <SectionHeading
            eyebrow="SELECTED PRACTICE"
            id="practice"
            title="Tres territorios de trabajo."
            text="Reporterismo, creación visual y distribución digital del contenido."
          />
          <PracticeIndex />
        </div>
      </section>

      <section className="section" aria-labelledby="selected-work">
        <div className="container selected-work-grid">
          <SectionHeading
            eyebrow="SELECTED EXPERIENCE"
            id="selected-work"
            title="Trabajo profesional, contado desde la evidencia."
            text="Hasta incorporar piezas visuales definitivas, el portfolio se apoya en experiencia real."
          />
          <div className="work-evidence">
            {featuredWork.slice(0, 3).map((item) => (
              <article
                className={item.featured ? "evidence-item featured" : "evidence-item"}
                key={item.company}
              >
                <p className="evidence-number">{item.number}</p>
                <div>
                  <p className="evidence-discipline">{item.discipline}</p>
                  <h3>{item.company}</h3>
                  <p className="evidence-role">
                    {item.role} · {item.period}
                  </p>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
            <Link className="text-link arrow-link" href="/work">
              Ver trabajo profesional <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="experience-snapshot">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              eyebrow="EXPERIENCE"
              id="experience-snapshot"
              title="Reportera TV, comunicación digital y producción visual."
            />
            <Link className="text-link arrow-link" href="/experience">
              Ver experiencia <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ExperienceList compact />
        </div>
      </section>

      <section className="section" aria-labelledby="about-preview">
        <div className="container about-preview">
          <p className="eyebrow">ABOUT</p>
          <h2 id="about-preview">{profile.aboutPreview}</h2>
          <p>{profile.aboutContinuation}</p>
          <Link className="text-link arrow-link" href="/about">
            Más sobre Sofía <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section compact-section" aria-labelledby="languages">
        <div className="container languages-strip">
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
        </div>
      </section>

      <ContactBlock />
    </main>
  );
}
