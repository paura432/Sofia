import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PeriodDisplay } from "@/components/period-display";
import { experience } from "@/content/experience";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ExperienceCopy = {
  discipline: string;
  role: string;
  period: string;
  summary: string;
  context?: string;
  responsibilities: Record<string, string>;
  progression?: Record<string, string>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/experience",
    title: t("pages.experience.title"),
    description: t("pages.experience.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function ExperiencePage() {
  const t = await getTranslations("Experience");

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">{t("pageEyebrow")}</p>
          <h1 className="display-page">{t("pageTitle")}</h1>
          <p>{t("pageText")}</p>
        </div>
      </section>

      <section className="section trajectory" aria-label={t("pageTitle")}>
        <div className="container">
          {experience.map((item) => {
            const copy = t.raw(`items.${item.id}`) as ExperienceCopy;

            return (
              <article
                className={item.featured ? "trajectory-row featured" : "trajectory-row"}
                key={item.id}
              >
                <PeriodDisplay period={copy.period} />
                <div>
                  <p className="case-discipline">{copy.discipline}</p>
                  <h2>{item.company}</h2>
                  <p className="trajectory-role">{copy.role}</p>
                  {item.companyUrl ? (
                    <p>
                      <a
                        className="company-link"
                        href={item.companyUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.company} <span aria-hidden="true">↗</span>
                      </a>
                    </p>
                  ) : null}
                  {copy.context ? (
                    <p className="company-context">{copy.context}</p>
                  ) : null}
                </div>
                <div>
                  <p>{copy.summary}</p>
                  {item.progressionKeys && copy.progression ? (
                    <p
                      aria-label={t("progressionLabel")}
                      className="progression-strip"
                    >
                      {item.progressionKeys.map((key) => (
                        <span key={`${item.id}-${key}`}>
                          {copy.progression?.[key]}
                        </span>
                      ))}
                    </p>
                  ) : null}
                  <ul aria-label={t("responsibilitiesLabel")}>
                    {item.responsibilityKeys.map((key) => (
                      <li key={`${item.id}-${key}`}>
                        {copy.responsibilities[key]}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
