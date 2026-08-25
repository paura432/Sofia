import { siteConfig } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div>
          <p className="footer-name">{siteConfig.name}</p>
          <p className="footer-tagline">Periodismo · Imagen · Comunicación</p>
        </div>
        <div className="footer-meta">
          <p>{siteConfig.dateline}</p>
          <div className="footer-links">
            <a href={`mailto:${siteConfig.email}`}>
              Email <span aria-hidden="true">↗</span>
            </a>
            <a href={siteConfig.linkedin} rel="noreferrer" target="_blank">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
