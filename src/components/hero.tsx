import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeroEntrance } from "@/components/hero-entrance";
import { MotionLink } from "@/components/motion/motion-link";
import { portrait } from "@/content/profile";
import { focalPointStyle, type ProjectMedia } from "@/content/projects";

type HeroProps = {
  videoPreview?: { media: ProjectMedia; title: string; alt: string };
};

export async function Hero({ videoPreview }: HeroProps = {}) {
  const [t, profile] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("Profile"),
  ]);

  return (
    <section className="hero section section-first" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <HeroEntrance as="p" className="hero-dateline" delay={0}>
            {t("dateline")} · {t("location")}
          </HeroEntrance>
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
            {t("role")}
          </HeroEntrance>
        </div>
        {videoPreview ? (
          <HeroEntrance as="figure" className="hero-portrait hero-portrait-reel" delay={130}>
            <div
              className="portfolio-video"
              style={{ aspectRatio: videoPreview.media.aspectRatio?.replace(":", " / ") ?? "9 / 16" }}
            >
              <Image
                alt={videoPreview.alt || videoPreview.title}
                fill
                preload
                sizes="(max-width: 699px) 92vw, 430px"
                src={videoPreview.media.poster ?? ""}
              />
            </div>
          </HeroEntrance>
        ) : portrait ? (
          <HeroEntrance as="figure" className="hero-portrait" delay={130}>
            <Image
              alt={profile(portrait.altKey)}
              height={portrait.height}
              preload
              sizes="(max-width: 699px) 92vw, (max-width: 979px) 52vw, 40vw"
              src={portrait.src}
              style={{ objectPosition: focalPointStyle(portrait) }}
              width={portrait.width}
            />
          </HeroEntrance>
        ) : null}
        <div className="hero-support">
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
