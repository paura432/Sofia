import { getTranslations } from "next-intl/server";

import { HeroEntrance } from "@/components/hero-entrance";
import { ReelStage } from "@/components/reel-stage";
import type { ShortFormStory } from "@/components/short-form-reporting";
import { siteConfig } from "@/content/profile";
import { Link } from "@/i18n/navigation";

type HeroProps = {
  reels: ShortFormStory[];
};

/**
 * Primer viewport: quién es (nombre + oficio) y una prueba inmediata de su
 * trabajo ante cámara. El retrato posado vive en Perfil; aquí manda la pieza.
 */
export async function Hero({ reels }: HeroProps) {
  const t = await getTranslations("Hero");

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-intro">
          <HeroEntrance as="p" className="on-air" delay={0}>
            <span aria-hidden="true" className="rec-dot" />
            {t("dateline")}
          </HeroEntrance>
          <HeroEntrance as="h1" className="hero-name" delay={60} id="hero-title">
            <span>Sofía</span> <span>Chernikova</span>
          </HeroEntrance>
          <HeroEntrance as="p" className="hero-role" delay={120}>
            {t("role")}
          </HeroEntrance>
          <HeroEntrance as="p" className="hero-lede" delay={180}>
            {t("summary")}
          </HeroEntrance>
          <HeroEntrance aria-label={t("actionsAria")} className="hero-actions" delay={240}>
            <Link className="button-link primary" href="/work">
              {t("viewWork")} <span aria-hidden="true">→</span>
            </Link>
            <a className="button-link" href={`mailto:${siteConfig.email}`}>
              {t("contact")}
            </a>
          </HeroEntrance>
        </div>

        {reels.length ? (
          // Sin fundido: el póster es el elemento LCP y debe pintarse en cuanto llega.
          <div className="hero-stage">
            <ReelStage
              listLabel={t("reelListLabel")}
              nowShowingLabel={t("nowShowing")}
              soundHint={t("soundHint")}
              stories={reels}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
