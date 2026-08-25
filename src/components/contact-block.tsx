import { siteConfig } from "@/content/profile";

type ContactBlockProps = {
  compact?: boolean;
};

export function ContactBlock({ compact = false }: ContactBlockProps) {
  return (
    <section className={compact ? "contact-block compact" : "contact-block"}>
      <div>
        <p className="eyebrow">CONTACT</p>
        <h2>Hablemos.</h2>
      </div>
      <div className="contact-copy">
        <p>
          Disponible para oportunidades profesionales y proyectos relacionados
          con periodismo, producción audiovisual, fotografía y comunicación.
        </p>
        <dl className="contact-list">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                sofia-chernikova
              </a>
            </dd>
          </div>
          <div>
            <dt>Base</dt>
            <dd>{siteConfig.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
