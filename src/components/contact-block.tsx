import { getTranslations } from "next-intl/server";

import { CopyEmail } from "@/components/copy-email";
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
        <div className="contact-heading">
          <p className="on-air">
            <span aria-hidden="true" className="rec-dot" />
            {page ? t("contactPageEyebrow") : t("eyebrow")}
          </p>
          <Heading className="contact-title" id={page ? "contact-title" : "contact-heading"}>
            {page ? t("contactPageTitle") : t("title")}
          </Heading>
          {page ? <p className="contact-page-lead">{t("contactPageText")}</p> : null}
        </div>
        <div className="contact-copy">
          <a className="contact-email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          <CopyEmail copiedLabel={t("copied")} email={siteConfig.email} label={t("copy")} />
          <dl className="contact-meta">
            <div>
              <dt>{t("linkedin")}</dt>
              <dd>
                <a href={siteConfig.linkedin} rel="noopener noreferrer" target="_blank">
                  /in/sofia-chernikova
                  <span aria-hidden="true"> ↗</span>
                  <span className="sr-only">{navigation("opensInNewTab")}</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>{t("base")}</dt>
              <dd>{t("baseValue")}</dd>
            </div>
            {page ? (
              <div>
                <dt>{t("languages")}</dt>
                <dd>{t("languagesValue")}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
