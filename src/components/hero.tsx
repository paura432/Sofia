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
          <p>{t("location")}</p>
          <p>{t("availability")}</p>
        </HeroEntrance>
        <div className="hero-copy">
          <HeroEntrance as="p" className="dateline" delay={70}>
            {t("dateline")}
          </HeroEntrance>
          <HeroEntrance
            as="h1"
            className="display-hero"
            delay={130}
            id="hero-title"
          >
            <span>Sofía</span>
            <span>Chernikova</span>
          </HeroEntrance>
          <HeroEntrance as="p" className="hero-headline" delay={190}>
            {t("headline")}
          </HeroEntrance>
          <HeroEntrance as="p" className="hero-summary" delay={250}>
            {t("summary")}
          </HeroEntrance>
          <HeroEntrance
            aria-label={t("actionsAria")}
            className="hero-actions"
            delay={310}
          >
            <MotionLink href="/work">{t("viewWork")}</MotionLink>
            <MotionLink href="/contact">{t("contact")}</MotionLink>
          </HeroEntrance>
        </div>
      </div>
    </section>
  );
}
