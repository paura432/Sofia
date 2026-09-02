import { getTranslations } from "next-intl/server";

import { AnimatedLine } from "@/components/motion/animated-line";
import { siteConfig } from "@/content/profile";

export async function SiteFooter() {
  const [t, contact, navigation] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Contact"),
    getTranslations("Navigation"),
  ]);

  return (
    <footer className="site-footer">
      <div className="container">
        <AnimatedLine tone="strong" />
      </div>
      <div className="container site-footer-inner">
        <div className="site-footer-primary">
          <p className="footer-tagline">{t("line")}</p>
          <p className="site-footer-contact">
            {t("location")}
            <span aria-hidden="true"> · </span>
            <a
              href={siteConfig.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              {contact("linkedin")}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only">{navigation("opensInNewTab")}</span>
            </a>
          </p>
        </div>
        <p className="footer-copy">{t("copyright")}</p>
      </div>
    </footer>
  );
}
