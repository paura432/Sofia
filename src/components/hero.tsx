import { getTranslations } from "next-intl/server";

import { HeroEntrance } from "@/components/hero-entrance";
import { MotionLink } from "@/components/motion/motion-link";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="hero section section-first" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <HeroEntrance className="hero-meta" delay={0}>
          <p>{t("role")}</p>
        </HeroEntrance>
        <div className="hero-copy">
          <HeroEntrance
            as="h1"
            className="display-hero hero-name"
            delay={70}
            id="hero-title"
          >
            <span className="hero-name-line">Sofía</span>
            <span className="hero-name-line">Chernikova</span>
          </HeroEntrance>
          <HeroEntrance as="p" className="hero-headline" delay={130}>
            {t("headline")}
          </HeroEntrance>
          <HeroEntrance as="p" className="hero-summary" delay={190}>
            {t("summary")}
          </HeroEntrance>
          <HeroEntrance
            aria-label={t("actionsAria")}
            className="hero-actions"
            delay={250}
          >
            <MotionLink href="/work">{t("viewWork")}</MotionLink>
            <MotionLink href="/contact">{t("contact")}</MotionLink>
          </HeroEntrance>
          <HeroEntrance as="p" className="hero-status" delay={310}>
            {t("availability")}
          </HeroEntrance>
        </div>
      </div>
    </section>
  );
}
