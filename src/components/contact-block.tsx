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
  const [t, navigation] = await Promise.all([
    getTranslations("Contact"),
    getTranslations("Navigation"),
  ]);
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
          {page ? <p className="contact-page-lead">{t("contactPageText")}</p> : null}
        </div>
        <div className="contact-copy">
          <a className="contact-email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email} <span aria-hidden="true">↗</span>
          </a>
          <p className="contact-meta">
            {t("baseValue")}
            <span aria-hidden="true"> · </span>
            <a
              href={siteConfig.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("linkedin")}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only">{navigation("opensInNewTab")}</span>
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
