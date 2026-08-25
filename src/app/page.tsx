import Link from "next/link";

import { ContactBlock } from "@/components/contact-block";
import { ExperienceList } from "@/components/experience-list";
import { Hero } from "@/components/hero";
import { LanguagesStrip } from "@/components/languages-strip";
import { PracticeIndex } from "@/components/practice-index";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/content/profile";

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

      <section className="section" aria-labelledby="experience-snapshot">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              eyebrow="EXPERIENCE"
              id="experience-snapshot"
              title="Reportera TV, comunicación digital y producción visual."
            />
            <div className="split-heading-links">
              <Link className="text-link arrow-link" href="/work">
                Ver trabajo <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link arrow-link" href="/experience">
                Ver experiencia <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <ExperienceList compact />
        </div>
      </section>

      <section className="section" aria-labelledby="about-preview">
        <div className="container about-preview">
          <p className="eyebrow">ABOUT</p>
          <h2 className="display-section" id="about-preview">
            {profile.aboutPreview}
          </h2>
          <p>{profile.aboutContinuation}</p>
          <Link className="text-link arrow-link" href="/about">
            Más sobre Sofía <span aria-hidden="true">↗</span>
          </Link>
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
