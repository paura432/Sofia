import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { FilmIndex } from "@/components/film-index";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SeriesGrid } from "@/components/series-grid";
import { experience } from "@/content/experience";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { getFilmEntries, getReelStories, getSeriesEntries } from "@/lib/showcase";

type PageProps = { params: Promise<{ locale: string }> };
type ExperienceCopy = { role: string; period: string };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
  const [home, projectsText, work, experienceText] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Projects"),
    getTranslations("Work"),
    getTranslations("Experience"),
  ]);
  const reels = getReelStories(projectsText);
  const films = getFilmEntries(projectsText);
  const series = getSeriesEntries(projectsText, (count) =>
    work("seriesCount", { count }),
  );

  return (
    <main id="main" className="home">
      <Hero reels={reels} />

      {films.length ? (
        <section aria-labelledby="home-film" className="section">
          <div className="container">
            <div className="section-head">
              <SectionHeading
                eyebrow={work("audiovisualKicker")}
                id="home-film"
                text={work("audiovisualText")}
                title={work("audiovisualTitle")}
              />
              <Link className="section-link" href={{ pathname: "/work", hash: "audiovisual" }}>
                {work("viewAudiovisual")} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <FilmIndex films={films} variant="feature" viewLabel={projectsText("viewProject")} />
          </div>
        </section>
      ) : null}

      {series.length ? (
        <section aria-labelledby="home-photo" className="section">
          <div className="container">
            <div className="section-head">
              <SectionHeading
                eyebrow={work("photographyKicker")}
                id="home-photo"
                text={work("photographyText")}
                title={work("photographyTitle")}
              />
              <Link className="section-link" href={{ pathname: "/work", hash: "photography" }}>
                {work("viewPhotography")} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <SeriesGrid series={series} variant="strip" />
          </div>
        </section>
      ) : null}

      <section aria-labelledby="home-path" className="section">
        <div className="container trajectory-brief">
          <SectionHeading
            eyebrow={home("pathEyebrow")}
            id="home-path"
            title={home("pathTitle")}
          />
          <Reveal className="trajectory-brief-list">
            <ol>
              {experience.map((item) => {
                const copy = experienceText.raw(`items.${item.id}`) as ExperienceCopy;
                return (
                  <li key={item.id}>
                    <span className="timecode">{copy.period}</span>
                    <span className="trajectory-brief-company">{item.company}</span>
                    <span className="trajectory-brief-role">{copy.role}</span>
                  </li>
                );
              })}
            </ol>
            <p className="trajectory-brief-links">
              <Link className="section-link" href="/experience">
                {home("viewExperience")} <span aria-hidden="true">→</span>
              </Link>
              <Link className="section-link" href="/about">
                {home("moreAbout")} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <ContactBlock />
    </main>
  );
}
