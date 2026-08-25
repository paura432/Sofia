import { Reveal } from "@/components/motion/reveal";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import type { ProjectMedia } from "@/content/projects";
import { Link } from "@/i18n/navigation";

type FeaturedProjectProps = {
  eyebrow: string;
  title: string;
  organisation?: string;
  discipline: string;
  year: string;
  cover?: ProjectMedia;
  video?: ProjectMedia;
  href: {
    pathname: "/work/[slug]";
    params: { slug: string };
  };
  playLabel: string;
  mediaCopy?: Record<string, { alt?: string; title?: string }>;
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
}: FeaturedProjectProps) {
  const featuredMedia = video ?? cover;

  if (!featuredMedia) {
    return null;
  }

  return (
    <section className="section featured-project" aria-labelledby="featured-project">
      <Reveal className="container">
        <p className="eyebrow">{eyebrow}</p>
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
        <Link className="featured-project-link" href={href}>
          <span className="featured-project-meta">
            <span>
              <span className="display-section" id="featured-project">
                {title}
              </span>
              {organisation ? <span>{organisation}</span> : null}
              <span>{discipline}</span>
            </span>
            <span>
              {year} <span aria-hidden="true">↗</span>
            </span>
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
