import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger";
import {
  portrait,
  siteConfig,
  tools,
} from "@/content/profile";
import { focalPointStyle } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Education = {
  institution: string;
  program: string;
  period: string;
};

type Language = {
  code: string;
  name: string;
  level: string;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/about",
    title: t("pages.about.title"),
    description: t("pages.about.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function AboutPage() {
  const [profile, education, languages] = await Promise.all([
    getTranslations("Profile"),
    getTranslations("Education"),
    getTranslations("Languages"),
  ]);
  const educationItems = education.raw("items") as Education[];
  const languageItems = languages.raw("items") as Language[];

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">{profile("aboutPageEyebrow")}</p>
          <h1 className="display-page">{profile("aboutHeroTitle")}</h1>
        </Reveal>
      </section>

      <section className="section" aria-labelledby="brief-bio">
        <Reveal className="container about-columns">
          <div>
            <p className="eyebrow">{profile("bioEyebrow")}</p>
            <h2 className="display-section" id="brief-bio">
              {profile("bioTitle")}
            </h2>
          </div>
          <div className="body-copy">
            {portrait ? (
              <figure className="about-portrait">
                <Image
                  alt={profile(portrait.altKey)}
                  height={portrait.height}
                  preload
                  sizes="(max-width: 699px) 100vw, 460px"
                  src={portrait.src}
                  style={{
                    objectPosition: focalPointStyle(portrait),
                  }}
                  width={portrait.width}
                />
              </figure>
            ) : null}
            <p>{profile("bio")}</p>
            <p>{profile("interests")}</p>
          </div>
        </Reveal>
      </section>

      <section className="section detail-grid" aria-labelledby="education">
        <StaggerGroup className="container detail-grid-inner">
          <article>
            <p className="eyebrow">{profile("educationEyebrow")}</p>
            <h2 className="display-section" id="education">
              {profile("educationTitle")}
            </h2>
            {educationItems.map((item) => (
              <div className="education-entry" key={item.institution}>
                <h3>{item.institution}</h3>
                <p>
                  {item.program}
                  <br />
                  {item.period}
                </p>
              </div>
            ))}
          </article>
          <article aria-labelledby="languages">
            <p className="eyebrow">{profile("languagesEyebrow")}</p>
            <h2 className="display-section" id="languages">
              {profile("languagesTitle")}
            </h2>
            <div className="compact-list">
              {languageItems.map((language) => (
                <p key={language.code}>
                  <span>{language.code}</span> {language.name} — {language.level}
                </p>
              ))}
            </div>
          </article>
          <article aria-labelledby="tools">
            <p className="eyebrow">{profile("toolsEyebrow")}</p>
            <h2 className="display-section" id="tools">
              {profile("toolsTitle")}
            </h2>
            <div className="tool-cloud">
              {tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </article>
        </StaggerGroup>
      </section>

      {siteConfig.hasCv ? (
        <section className="section cv-row">
          <div className="container">
            <a className="button-link primary" href={siteConfig.cvPath}>
              CV
            </a>
          </div>
        </section>
      ) : null}

      <ContactBlock compact />
    </main>
  );
}
