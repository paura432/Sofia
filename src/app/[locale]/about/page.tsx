import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { HeroEntrance } from "@/components/hero-entrance";
import { portrait, siteConfig, tools } from "@/content/profile";
import { focalPointStyle } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Education = { institution: string; program: string; period: string };
type Language = { code: string; name: string; level: string };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

/**
 * Perfil = retrato, nombre, profesión, tres frases de presentación, ficha
 * (formación, idiomas, herramientas, base) y dos enlaces. Lo que hace está en Trabajo; dónde ha
 * trabajado, en Experiencia. Aquí no se repite ninguna de las dos cosas.
 */
export default async function AboutPage() {
  const [profile, education, languages] = await Promise.all([
    getTranslations("Profile"),
    getTranslations("Education"),
    getTranslations("Languages"),
  ]);
  const educationItems = education.raw("items") as Education[];
  const languageItems = languages.raw("items") as Language[];

  return (
    <main id="main" className="about-page">
      <section className="about-hero section-first" aria-labelledby="about-title">
        <div className="container about-hero-grid">
          {portrait ? (
            <HeroEntrance as="figure" className="about-portrait">
              <span aria-hidden="true" className="frame-corners" />
              <Image
                alt={profile(portrait.altKey)}
                height={portrait.height}
                preload
                sizes="(max-width: 699px) 92vw, (max-width: 1199px) 44vw, 520px"
                src={portrait.src}
                style={{ objectPosition: focalPointStyle(portrait) }}
                width={portrait.width}
              />
            </HeroEntrance>
          ) : null}
          <div className="about-intro">
            <HeroEntrance as="p" className="on-air" delay={40}>
              <span aria-hidden="true" className="rec-dot" />
              {profile("aboutPageEyebrow")}
            </HeroEntrance>
            <HeroEntrance as="h1" className="display-page" delay={80} id="about-title">
              {siteConfig.name}
            </HeroEntrance>
            <HeroEntrance as="p" className="about-role" delay={120}>
              {profile("role")}
            </HeroEntrance>
            <HeroEntrance as="p" className="about-lede" delay={160}>
              {profile("bio")}
            </HeroEntrance>
            <p className="about-links">
              <Link className="section-link" href="/work">
                {profile("viewWork")} <span aria-hidden="true">→</span>
              </Link>
              <Link className="section-link" href="/experience">
                {profile("viewFullExperience")} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-label={profile("educationEyebrow")}>
        <dl className="container fact-sheet">
          <div>
            <dt>{profile("educationEyebrow")}</dt>
            {educationItems.map((item) => (
              <dd key={item.institution}>
                <strong>{item.program}</strong>
                <span>{item.institution} · {item.period}</span>
              </dd>
            ))}
          </div>
          <div>
            <dt>{profile("languagesEyebrow")}</dt>
            <dd>
              <ul className="inline-list">
                {languageItems.map((language) => (
                  <li key={language.code}>
                    {language.name} <span className="muted">· {language.level}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>{profile("toolsEyebrow")}</dt>
            <dd>
              <ul className="inline-list">
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>{profile("baseLabel")}</dt>
            <dd>{profile("baseValue")}</dd>
          </div>
        </dl>
        {siteConfig.hasCv ? (
          <div className="container">
            <a className="section-link" href={siteConfig.cvPath}>
              CV <span aria-hidden="true">↓</span>
            </a>
          </div>
        ) : null}
      </section>

      <ContactBlock compact />
    </main>
  );
}
