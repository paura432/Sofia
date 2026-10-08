import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/content/profile";

export async function SiteFooter() {
  const [t, contact, navigation] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Contact"),
    getTranslations("Navigation"),
  ]);

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <p className="footer-copy">{t("copyright")}</p>
        <p className="site-footer-contact">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={siteConfig.linkedin} rel="noopener noreferrer" target="_blank">
            {contact("linkedin")}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only">{navigation("opensInNewTab")}</span>
          </a>
          <span>{t("location")}</span>
        </p>
      </div>
    </footer>
  );
}
