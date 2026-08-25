import Link from "next/link";

import { profile, siteConfig } from "@/content/profile";

export function Hero() {
  return (
    <section className="hero section section-first" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-meta">
          <p>{siteConfig.role}</p>
          <p>{siteConfig.location}</p>
          <p>{siteConfig.availability}</p>
        </div>
        <div className="hero-copy">
          <p className="dateline">{siteConfig.dateline}</p>
          <h1 className="display-hero" id="hero-title">
            <span>Sofía</span>
            <span>Chernikova</span>
          </h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions" aria-label="Acciones principales">
            <Link className="text-link arrow-link" href="/work">
              Ver trabajo <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link arrow-link" href="/contact">
              Contacto <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
