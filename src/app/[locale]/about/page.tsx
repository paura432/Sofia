import type { Metadata } from "next";
import { Fragment } from "react";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { PeriodDisplay } from "@/components/period-display";
import { experience } from "@/content/experience";
import { siteConfig, tools } from "@/content/profile";
import { Link } from "@/i18n/navigation";
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
  const profile = await getTranslations("Profile");
  const education = await getTranslations("Education");
  const languages = await getTranslations("Languages");
  const experienceText = await getTranslations("Experience");

  const educationItems = education.raw("items") as Education[];
  const languageItems = languages.raw("items") as Language[];

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">{profile("aboutPageEyebrow")}</p>
          <h1 className="display-page">{profile("aboutHeroTitle")}</h1>
          <p>{profile("aboutPreview")}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="brief-bio">
        <div className="container about-columns">
          <div>
            <p className="eyebrow">{profile("bioEyebrow")}</p>
            <h2 className="display-section" id="brief-bio">
              {profile("bioTitle")}
            </h2>
          </div>
          <div className="body-copy">
            <p>{profile("bio")}</p>
            <p>{profile("aboutTrajectory")}</p>
            <p>{profile("interests")}</p>
          </div>
        </div>
      </section>

      <section className="section detail-grid" aria-labelledby="education">
        <div className="container detail-grid-inner">
          <article>
            <p className="eyebrow">{profile("educationEyebrow")}</p>
            {educationItems.map((item) => (
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
            <p className="eyebrow">{profile("languagesEyebrow")}</p>
            <div className="compact-list">
              {languageItems.map((language) => (
                <p key={language.code}>
                  <span>{language.code}</span> {language.name} — {language.level}
                </p>
              ))}
            </div>
          </article>
          <article>
            <p className="eyebrow">{profile("toolsEyebrow")}</p>
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
            <p className="eyebrow">{profile("experienceEyebrow")}</p>
            <h2 className="display-section" id="about-experience">
              {profile("experienceTitle")}
            </h2>
          </div>
          <div className="about-summary">
            {experience.map((item) => {
              const copy = experienceText.raw(
                `items.${item.id}`,
              ) as ExperienceCopy;

              return (
                <article className="about-summary-item" key={item.id}>
                  <PeriodDisplay period={copy.period} />
                  <div>
                    <p className="case-discipline">{copy.discipline}</p>
                    <h3>{item.company}</h3>
                    <p className="case-role">{copy.role}</p>
                  </div>
                  <p>{copy.summary}</p>
                </article>
              );
            })}
          </div>
          <div className="about-summary-footer">
            <Link className="text-link arrow-link" href="/experience">
              {profile("viewFullExperience")} <span aria-hidden="true">↗</span>
            </Link>
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
