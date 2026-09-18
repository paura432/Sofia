import { Reveal } from "@/components/motion/reveal";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import {
  publishableYear,
  type MediaCopy,
  type ProjectMedia,
} from "@/content/projects";
import { Link } from "@/i18n/navigation";

type FeaturedProjectProps = {
  eyebrow: string;
  title: string;
  organisation?: string;
  discipline: string;
  year?: string;
  cover?: ProjectMedia;
  video?: ProjectMedia;
  href: {
    pathname: "/work/[slug]";
    params: { slug: string };
  };
  playLabel: string;
  mediaCopy?: Record<string, MediaCopy>;
  headingId?: string;
  tone?: "film";
};

export function FeaturedProject({
  eyebrow,
  title,
  organisation,
  discipline,
  year,
  cover,
  video,
  href,
  playLabel,
  mediaCopy,
  headingId = "featured-project",
  tone,
}: FeaturedProjectProps) {
  const visibleYear = publishableYear(year);
  const featuredMedia = video ?? cover;

  if (!featuredMedia) {
    return null;
  }

  return (
    <section
      aria-labelledby={headingId}
      className={`section featured-project${tone ? ` featured-project-${tone}` : ""}`}
    >
      <Reveal className="container">
        <p className="eyebrow">{eyebrow}</p>
        <Link className="featured-project-link" href={href}>
          <ProjectMediaLayout
            copy={{
              [featuredMedia.id]: {
                alt: title,
                title,
                ...mediaCopy?.[featuredMedia.id],
              },
            }}
            media={[featuredMedia]}
            playLabel={playLabel}
            preloadFirst
          />
          <span className="featured-project-meta">
            <span>
              <h2 className="display-section" id={headingId}>
                {title}
              </h2>
              {organisation ? <span>{organisation}</span> : null}
              <span>{discipline}</span>
            </span>
            <span>
              {visibleYear ? `${visibleYear} ` : null}
              <span aria-hidden="true">→</span>
            </span>
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
