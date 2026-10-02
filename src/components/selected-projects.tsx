import { StaggerGroup } from "@/components/motion/stagger";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import type { MediaCopy, ProjectMedia } from "@/content/projects";
import { Link } from "@/i18n/navigation";

type SelectedProjectItem = {
  slug: string;
  number: string;
  title: string;
  organisation?: string;
  discipline: string;
  media?: ProjectMedia;
  mediaCopy?: Record<string, MediaCopy>;
};

function mediaOrientation(media: ProjectMedia) {
  if (media.aspectRatio === "2:3" || media.aspectRatio === "4:5") {
    return "portrait";
  }
  if (media.width && media.height && media.width < media.height) {
    return "portrait";
  }
  return "landscape";
}

type SelectedProjectsProps = {
  eyebrow: string;
  playLabel: string;
  projects: SelectedProjectItem[];
  viewLabel: string;
};

export function SelectedProjects({
  eyebrow,
  playLabel,
  projects,
  viewLabel,
}: SelectedProjectsProps) {
  const visibleProjects = projects.slice(0, 3).filter((project) => project.media);

  if (visibleProjects.length === 0) {
    return null;
  }

  return (
    <section className="section selected-projects" aria-labelledby="selected-projects">
      <div className="container">
        <h2 className="display-section" id="selected-projects">{eyebrow}</h2>
        <div
          className="selected-projects-grid"
          data-count={visibleProjects.length}
        >
          {visibleProjects.map((project) => (
            <StaggerGroup
              as="article"
              className="selected-project"
              data-orientation={mediaOrientation(project.media!)}
              key={project.slug}
              step={40}
            >
              <p className="case-number">{project.number}</p>
              {project.media ? (
                <ProjectMediaLayout
                  copy={{
                    [project.media.id]: {
                      alt: project.title,
                      title: project.title,
                      ...project.mediaCopy?.[project.media.id],
                    },
                  }}
                  media={[project.media]}
                  playLabel={playLabel}
                />
              ) : null}
              <div className="selected-project-copy">
                <p className="case-discipline">{project.discipline}</p>
                <Link
                  className="selected-project-title"
                  href={{ pathname: "/work/[slug]", params: { slug: project.slug } }}
                >
                  <h2>{project.title}</h2>
                </Link>
                {project.organisation ? <p>{project.organisation}</p> : null}
                <Link
                  className="project-row-cta"
                  href={{ pathname: "/work/[slug]", params: { slug: project.slug } }}
                >
                  {viewLabel}<span aria-hidden="true">→</span>
                </Link>
              </div>
            </StaggerGroup>
          ))}
        </div>
      </div>
    </section>
  );
}
