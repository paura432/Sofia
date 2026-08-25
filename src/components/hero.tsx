import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/content/profile";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="hero section section-first" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-meta">
          <p>{t("role")}</p>
          <p>{t("location")}</p>
          <p>{t("availability")}</p>
        </div>
        <div className="hero-copy">
          <p className="dateline">{t("dateline")}</p>
          <h1 className="display-hero" id="hero-title">
            <span>Sofía</span>
            <span>Chernikova</span>
          </h1>
          <p className="hero-headline">{t("headline")}</p>
          <p className="hero-summary">{t("summary")}</p>
          <div className="hero-actions" aria-label={t("actionsAria")}>
            <Link className="text-link arrow-link" href="/work">
              {t("viewWork")} <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link arrow-link" href="/contact">
              {t("contact")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
