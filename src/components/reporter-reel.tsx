import { Reveal } from "@/components/motion/reveal";
import { MotionLink } from "@/components/motion/motion-link";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import type { ProjectMedia } from "@/content/projects";

type ReporterReelProps = {
  eyebrow: string;
  meta: string;
  title: string;
  playLabel: string;
  media: ProjectMedia;
  mediaCopy?: Record<string, { alt?: string; title?: string }>;
  href: {
    pathname: "/work/[slug]";
    params: { slug: string };
  };
  viewLabel: string;
};

export function ReporterReel({
  eyebrow,
  meta,
  title,
  playLabel,
  media,
  mediaCopy,
  href,
  viewLabel,
}: ReporterReelProps) {
  return (
    <section className="section reporter-reel" aria-labelledby="reporter-reel">
      <Reveal className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-section" id="reporter-reel">{title}</h2>
        <ProjectMediaLayout
          copy={{
            [media.id]: {
              alt: title,
              title,
              ...mediaCopy?.[media.id],
            },
          }}
          media={[{ ...media, aspectRatio: media.aspectRatio ?? "16:9" }]}
          playLabel={playLabel}
          preloadFirst
        />
        <p className="reporter-reel-meta">{meta}</p>
        <MotionLink href={href}>{viewLabel}</MotionLink>
      </Reveal>
    </section>
  );
}
