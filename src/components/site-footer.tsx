import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/content/profile";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const hero = await getTranslations("Hero");
  const contact = await getTranslations("Contact");

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div>
          <p className="footer-name">{siteConfig.name}</p>
          <p className="footer-tagline">{t("line")}</p>
        </div>
        <div className="footer-meta">
          <p>{hero("dateline")}</p>
          <p>{t("location")}</p>
          <div className="footer-links">
            <a href={`mailto:${siteConfig.email}`}>
              {contact("email")} <span aria-hidden="true">↗</span>
            </a>
            <a href={siteConfig.linkedin} rel="noreferrer" target="_blank">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
