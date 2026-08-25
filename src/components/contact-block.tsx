import { siteConfig } from "@/content/profile";

type ContactBlockProps = {
  compact?: boolean;
  page?: boolean;
};

export function ContactBlock({ compact = false, page = false }: ContactBlockProps) {
  const Heading = page ? "h1" : "h2";

  return (
    <section
      className={[
        "contact-block",
        compact ? "compact" : "",
        page ? "contact-page-block section-first" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={page ? "contact-title" : "contact-heading"}
    >
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">CONTACT</p>
          <Heading id={page ? "contact-title" : "contact-heading"}>Hablemos.</Heading>
        </div>
        <div className="contact-copy">
          <p>
            Disponible para oportunidades profesionales en periodismo,
            producción audiovisual, fotografía y comunicación.
          </p>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email} <span aria-hidden="true">→</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                  sofia-chernikova <span aria-hidden="true">→</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>Base</dt>
              <dd>{siteConfig.location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
