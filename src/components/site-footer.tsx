import { getTranslations } from "next-intl/server";

import { AnimatedLine } from "@/components/motion/animated-line";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/profile";

export async function SiteFooter() {
  const [t, hero, contact, navigation] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Hero"),
    getTranslations("Contact"),
    getTranslations("Navigation"),
  ]);

  return (
    <footer className="site-footer">
      <div className="container">
        <AnimatedLine tone="strong" />
      </div>
      <Reveal className="container site-footer-inner" direction="none">
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
            <a
              href={siteConfig.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              {contact("linkedin")}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only">{navigation("opensInNewTab")}</span>
            </a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
