import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { HeroEntrance } from "@/components/hero-entrance";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger";
import { StoryBlocks, type StoryBlock } from "@/components/story-blocks";
import { portrait, siteConfig, tools } from "@/content/profile";
import { focalPointStyle, type ProjectSection } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Education = { institution: string; program: string; period: string };
type Language = { code: string; name: string; level: string };
type Practice = { title: string; text: string; link: string; section: ProjectSection };

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

export default async function AboutPage() {
  const [profile, education, languages] = await Promise.all([
    getTranslations("Profile"),
    getTranslations("Education"),
    getTranslations("Languages"),
  ]);
  const educationItems = education.raw("items") as Education[];
  const languageItems = languages.raw("items") as Language[];
  const practices = profile.raw("practices") as Practice[];
  const voice = profile.raw("voice") as StoryBlock[];

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
            <HeroEntrance as="p" className="about-lede" delay={140}>
              {profile("bio")}
            </HeroEntrance>
            <HeroEntrance as="p" className="about-body" delay={200}>
              {profile("bioMore")}
            </HeroEntrance>
          </div>
        </div>
      </section>

      {voice.length ? (
        <section className="section story-section" aria-labelledby="about-voice">
          <Reveal className="container editorial-grid">
            <p className="eyebrow" id="about-voice">
              {profile("voiceEyebrow")}
            </p>
            <StoryBlocks blocks={voice} />
          </Reveal>
        </section>
      ) : null}

      <section className="section" aria-labelledby="about-practice">
        <div className="container">
          <Reveal as="p" className="eyebrow" id="about-practice">
            {profile("practiceEyebrow")}
          </Reveal>
          <StaggerGroup as="ol" className="practice-columns">
            {practices.map((practice, index) => (
              <li key={practice.section}>
                <span className="timecode">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="practice-title">{practice.title}</h2>
                <p>{practice.text}</p>
                <Link className="section-link" href={{ pathname: "/work", hash: practice.section }}>
                  {practice.link} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </StaggerGroup>
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
        <div className="container">
          <Link className="section-link" href="/experience">
            {profile("viewFullExperience")} <span aria-hidden="true">→</span>
          </Link>
          {siteConfig.hasCv ? (
            <a className="section-link" href={siteConfig.cvPath}>
              CV <span aria-hidden="true">↓</span>
            </a>
          ) : null}
        </div>
      </section>

      <ContactBlock compact />
    </main>
  );
}
