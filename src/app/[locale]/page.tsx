import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { Hero } from "@/components/hero";
import { LanguagesStrip } from "@/components/languages-strip";
import { PracticeIndex } from "@/components/practice-index";
import { SectionHeading } from "@/components/section-heading";
import { currentPositionIds } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/",
    title: t("pages.home.title"),
    description: t("pages.home.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function Home() {
  const home = await getTranslations("Home");
  const profile = await getTranslations("Profile");
  const positions = await getTranslations("CurrentPositions");

  return (
    <main id="main">
      <Hero />

      <section className="section" aria-labelledby="current">
        <div className="container editorial-grid">
          <SectionHeading
            eyebrow={home("currentEyebrow")}
            id="current"
            title={home("currentTitle")}
          />
          <div className="current-list">
            {currentPositionIds.map((id) => (
              <div className="current-item" key={id}>
                <p className="experience-period">
                  {positions(`items.${id}.period`)}
                </p>
                <div>
                  <h3>{id === "grupo-cadena-media" ? "Grupo Cadena Media" : "URJCmun"}</h3>
                  <p>{positions(`items.${id}.role`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="practice">
        <div className="container editorial-grid">
          <SectionHeading
            eyebrow={home("practiceEyebrow")}
            id="practice"
            text={home("practiceText")}
            title={home("practiceTitle")}
          />
          <PracticeIndex />
        </div>
      </section>

      <section className="section" aria-labelledby="about-preview">
        <div className="container about-preview">
          <p className="eyebrow">{home("aboutEyebrow")}</p>
          <h2 className="display-section" id="about-preview">
            {profile("aboutPreview")}
          </h2>
          <p>{profile("aboutContinuation")}</p>
          <div className="split-heading-links">
            <Link className="text-link arrow-link" href="/experience">
              {home("viewExperience")} <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link arrow-link" href="/about">
              {home("moreAbout")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
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
