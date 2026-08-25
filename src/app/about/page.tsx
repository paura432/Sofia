import type { Metadata } from "next";

import { ContactBlock } from "@/components/contact-block";
import { ExperienceList } from "@/components/experience-list";
import { education, languages, profile, siteConfig, tools } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main id="main" className="page-shell">
      <section className="page-hero about-hero">
        <p className="eyebrow">INTRO</p>
        <h1>Entre el terreno, la cámara y la distribución digital.</h1>
        <p>{profile.bio}</p>
      </section>

      <section className="section about-columns" aria-labelledby="brief-bio">
        <div>
          <p className="eyebrow">BREVE BIO</p>
          <h2 id="brief-bio">Periodismo y comunicación audiovisual desde Madrid.</h2>
        </div>
        <div className="body-copy">
          <p>{profile.aboutPreview}</p>
          <p>{profile.aboutContinuation}</p>
          <p>{profile.interests}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="about-experience">
        <div className="section-heading">
          <p className="eyebrow">EXPERIENCIA</p>
          <h2 id="about-experience">Trayectoria verificada.</h2>
        </div>
        <ExperienceList compact />
      </section>

      <section className="section detail-grid" aria-labelledby="education">
        <article>
          <p className="eyebrow">FORMACIÓN</p>
          <h2 id="education">Universidad Rey Juan Carlos</h2>
          {education.map((item) => (
            <p key={item.institution}>
              {item.program}
              <br />
              {item.period}
            </p>
          ))}
        </article>
        <article>
          <p className="eyebrow">IDIOMAS</p>
          <div className="compact-list">
            {languages.map((language) => (
              <p key={language.code}>
                <span>{language.code}</span> {language.name} — {language.level}
              </p>
            ))}
          </div>
        </article>
        <article>
          <p className="eyebrow">HERRAMIENTAS</p>
          <div className="tool-cloud">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </article>
      </section>

      {siteConfig.hasCv ? (
        <section className="section cv-row">
          <a className="button-link primary" href={siteConfig.cvPath}>
            Descargar CV
          </a>
        </section>
      ) : null}

      <ContactBlock compact />
    </main>
  );
}
