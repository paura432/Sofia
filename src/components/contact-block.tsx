import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/profile";

type ContactBlockProps = {
  compact?: boolean;
  page?: boolean;
};

export async function ContactBlock({
  compact = false,
  page = false,
}: ContactBlockProps) {
  const t = await getTranslations("Contact");
  const hero = await getTranslations("Hero");
  const Heading = page ? "h1" : "h2";
  const headingClass = page ? "display-page" : "display-section";

  return (
    <section
      className={[
        "contact-block",
        compact ? "compact" : "",
        page ? "contact-page-block section-first" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={page ? "contact-title" : "contact-heading"}
    >
      <Reveal className="container contact-grid">
        <div>
          <p className="eyebrow">
            {page ? t("contactPageEyebrow") : t("eyebrow")}
          </p>
          <Heading
            className={headingClass}
            id={page ? "contact-title" : "contact-heading"}
          >
            {page ? t("contactPageTitle") : t("title")}
          </Heading>
        </div>
        <div className="contact-copy">
          <p>{page ? t("contactPageText") : t("body")}</p>
          <dl className="contact-list">
            <div>
              <dt>{t("email")}</dt>
              <dd>
                <a href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email} <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>{t("linkedin")}</dt>
              <dd>
                <a href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>{t("base")}</dt>
              <dd>{hero("location")}</dd>
            </div>
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
