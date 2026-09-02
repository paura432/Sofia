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
              key={project.slug}
              step={40}
            >
              <Link
                className="selected-project-link"
                href={{
                  pathname: "/work/[slug]",
                  params: { slug: project.slug },
                }}
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
                <div>
                  <p className="case-discipline">{project.discipline}</p>
                  <h2>{project.title}</h2>
                  {project.organisation ? <p>{project.organisation}</p> : null}
                  <span className="project-row-cta">
                    {viewLabel}
                    <span aria-hidden="true"> →</span>
                  </span>
                </div>
              </Link>
            </StaggerGroup>
          ))}
        </div>
      </div>
    </section>
  );
}
