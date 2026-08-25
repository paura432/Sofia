import type { Metadata } from "next";
import Link from "next/link";

import { ContactBlock } from "@/components/contact-block";
import { education, languages, profile, siteConfig, tools } from "@/content/profile";
import { featuredWork } from "@/content/experience";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Sobre Sofía",
  description:
    "Sobre Sofía Chernikova, periodista y comunicadora audiovisual en Madrid.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">ABOUT</p>
          <h1 className="display-page">Entre televisión, fotografía y comunicación digital.</h1>
          <p>{profile.aboutPreview}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="brief-bio">
        <div className="container about-columns">
          <div>
            <p className="eyebrow">BREVE BIO</p>
            <h2 className="display-section" id="brief-bio">
              Periodismo y comunicación audiovisual desde Madrid.
            </h2>
          </div>
          <div className="body-copy">
            <p>{profile.bio}</p>
            <p>{profile.aboutContinuation}</p>
            <p>{profile.interests}</p>
          </div>
        </div>
      </section>

      <section className="section detail-grid" aria-labelledby="education">
        <div className="container detail-grid-inner">
          <article>
            <p className="eyebrow">FORMACIÓN</p>
            <h2 className="display-section" id="education">
              Universidad Rey Juan Carlos
            </h2>
            {education.map((item) => (
              <p key={item.institution}>
                {item.program}
                <br />
                {item.period}
              </p>
            ))}
          </article>
          <article>
            <p className="eyebrow" id="about-languages">
              IDIOMAS
            </p>
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
        </div>
      </section>

      <section className="section" aria-labelledby="about-experience">
        <div className="container">
          <div className="section-heading section-heading-spaced">
            <p className="eyebrow">EXPERIENCIA</p>
            <h2 className="display-section" id="about-experience">
              Televisión, contenido y comunicación.
            </h2>
          </div>
          <div className="about-summary">
            {featuredWork.slice(0, 3).map((item) => (
              <article className="about-summary-item" key={item.company}>
                <p className="eyebrow">{item.period}</p>
                <div>
                  <p className="case-discipline">{item.discipline}</p>
                  <h3>{item.company}</h3>
                  <p className="case-role">{item.role}</p>
                </div>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
          <div className="about-summary-footer">
            <Link className="text-link arrow-link" href="/experience">
              Ver experiencia completa <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {siteConfig.hasCv ? (
        <section className="section cv-row">
          <div className="container">
            <a className="button-link primary" href={siteConfig.cvPath}>
              Descargar CV
            </a>
          </div>
        </section>
      ) : null}

      <ContactBlock compact />
    </main>
  );
}
