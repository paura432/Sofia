import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { AnimatedLine } from "@/components/motion/animated-line";
import { MotionLink } from "@/components/motion/motion-link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger";
import { PeriodDisplay } from "@/components/period-display";
import { experience } from "@/content/experience";
import {
  aboutExperienceIds,
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

type ExperienceCopy = {
  discipline: string;
  role: string;
  period: string;
  summary: string;
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
  const [profile, education, languages, experienceText] = await Promise.all([
    getTranslations("Profile"),
    getTranslations("Education"),
    getTranslations("Languages"),
    getTranslations("Experience"),
  ]);

  const aboutExperienceIdSet = new Set<string>(aboutExperienceIds);
  const aboutSummary = experience.filter((item) =>
    aboutExperienceIdSet.has(item.id),
  );
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
                  sizes="(max-width: 699px) 100vw, 420px"
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

      <section className="section" aria-labelledby="about-experience">
        <div className="container">
          <Reveal className="section-heading section-heading-spaced">
            <p className="eyebrow">{profile("experienceEyebrow")}</p>
            <h2 className="display-section" id="about-experience">
              {profile("experienceTitle")}
            </h2>
          </Reveal>
          <AnimatedLine tone="strong" />
          <div className="about-summary">
            {aboutSummary.map((item) => {
              const copy = experienceText.raw(
                `items.${item.id}`,
              ) as ExperienceCopy;

              return (
                <StaggerGroup
                  as="article"
                  className="about-summary-item"
                  key={item.id}
                  step={30}
                >
                  <PeriodDisplay period={copy.period} />
                  <div>
                    <p className="case-discipline">{copy.discipline}</p>
                    <h3>{item.company}</h3>
                    <p className="case-role">{copy.role}</p>
                  </div>
                  <p>{copy.summary}</p>
                </StaggerGroup>
              );
            })}
          </div>
          <div className="about-summary-footer">
            <MotionLink href="/experience">
              {profile("viewFullExperience")}
            </MotionLink>
          </div>
        </div>
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
