import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeroEntrance } from "@/components/hero-entrance";
import { MotionLink } from "@/components/motion/motion-link";
import { portrait } from "@/content/profile";
import { focalPointStyle } from "@/content/projects";

export async function Hero() {
  const [t, profile] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("Profile"),
  ]);

  return (
    <section className="hero section section-first" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <HeroEntrance className="hero-meta" delay={0}>
          <p className="hero-dateline">{t("dateline")}</p>
          <p>{t("role")}</p>
          <p className="hero-location">{t("location")}</p>
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
        {portrait ? (
          <HeroEntrance as="figure" className="hero-portrait" delay={130}>
            <Image
              alt={profile(portrait.altKey)}
              height={portrait.height}
              preload
              sizes="(max-width: 699px) 100vw, (max-width: 979px) 460px, 30vw"
              src={portrait.src}
              style={{ objectPosition: focalPointStyle(portrait) }}
              width={portrait.width}
            />
          </HeroEntrance>
        ) : null}
      </div>
    </section>
  );
}
