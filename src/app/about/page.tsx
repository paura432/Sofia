import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { ContactBlock } from "@/components/contact-block";
import { education, languages, profile, siteConfig, tools } from "@/content/profile";
import { experience } from "@/content/experience";
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
          <p className="eyebrow">SOBRE SOFÍA</p>
          <h1 className="display-page">Entre televisión, fotografía y comunicación digital.</h1>
          <p>{profile.aboutPreview}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="brief-bio">
        <div className="container about-columns">
          <div>
            <p className="eyebrow">BIO</p>
            <h2 className="display-section" id="brief-bio">
              Periodismo y comunicación audiovisual desde Madrid.
            </h2>
          </div>
          <div className="body-copy">
            <p>{profile.bio}</p>
            <p>{profile.aboutTrajectory}</p>
            <p>{profile.interests}</p>
          </div>
        </div>
      </section>

      <section className="section detail-grid" aria-labelledby="education">
        <div className="container detail-grid-inner">
          <article>
            <p className="eyebrow">FORMACIÓN</p>
            {education.map((item) => (
              <Fragment key={item.institution}>
                <h2 className="display-section" id="education">
                  {item.institution}
                </h2>
                <p>
                  {item.program}
                  <br />
                  {item.period}
                </p>
              </Fragment>
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
        </div>
      </section>

      <section className="section" aria-labelledby="about-experience">
        <div className="container">
          <div className="section-heading section-heading-spaced">
            <p className="eyebrow">PROGRESIÓN</p>
            <h2 className="display-section" id="about-experience">
              Cómo se ha construido el perfil.
            </h2>
          </div>
          <div className="about-summary">
            {experience.map((item) => (
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
