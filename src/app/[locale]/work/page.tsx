import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { featuredWork } from "@/content/experience";
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
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/work",
    title: t("pages.work.title"),
    description: t("pages.work.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function WorkPage() {
  const t = await getTranslations("Work");
  const experience = await getTranslations("Experience");

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">{t("pageEyebrow")}</p>
          <h1 className="display-page">{t("pageTitle")}</h1>
          <p>{t("pageText")}</p>
        </div>
      </section>

      <section className="section" aria-label={t("aria")}>
        <div className="container">
          <div className="case-list">
            {featuredWork.map((item) => {
              const copy = experience.raw(`items.${item.id}`) as ExperienceCopy;

              return (
                <article className="case-row" key={item.id}>
                  <p className="case-number">{item.number}</p>
                  <div>
                    <p className="case-discipline">{copy.discipline}</p>
                    <h2>{item.company}</h2>
                    <p className="case-role">
                      {copy.role} · {copy.period}
                    </p>
                    {copy.context ? (
                      <p className="company-context">{copy.context}</p>
                    ) : null}
                  </div>
                  <div>
                    <p>{copy.summary}</p>
                    <ul>
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
        </div>
      </section>
    </main>
  );
}
