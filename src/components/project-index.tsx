import { StaggerGroup } from "@/components/motion/stagger";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import {
  publishableYear,
  type MediaCopy,
  type PortfolioProject,
} from "@/content/projects";
import { Link } from "@/i18n/navigation";

type ProjectCopy = {
  title: string;
  description?: string;
  media?: Record<string, MediaCopy>;
};

type ProjectIndexProps = {
  projects: PortfolioProject[];
  playLabel: string;
  viewLabel: string;
  disciplineLabel: (project: PortfolioProject) => string;
  copyFor: (project: PortfolioProject) => ProjectCopy;
};

function mediaOrientation(project: PortfolioProject) {
  const media = project.cover ?? project.media?.[0];
  if (!media) return "landscape";
  if (media.aspectRatio === "2:3" || media.aspectRatio === "4:5") {
    return "portrait";
  }
  return media.width && media.height && media.width < media.height
    ? "portrait"
    : "landscape";
}

export function ProjectIndex({
  projects,
  playLabel,
  viewLabel,
  disciplineLabel,
  copyFor,
}: ProjectIndexProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="project-list" data-count={projects.length}>
      {projects.map((project, index) => {
        const copy = copyFor(project);
        const cover = project.cover ?? project.media?.[0];
        const year = publishableYear(project.year);
        return (
          <StaggerGroup
            as="article"
            className="project-row"
            data-orientation={mediaOrientation(project)}
            key={project.id}
            step={40}
          >
            <Link
              className="project-row-link"
              href={{
                pathname: "/work/[slug]",
                params: { slug: project.slug },
              }}
            >
              <p className="case-number">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="project-row-copy">
                <div className="project-row-information">
                  <p className="case-discipline">{disciplineLabel(project)}</p>
                  <h2 className="project-title">{copy.title}</h2>
                  {project.organisation || year ? (
                    <p className="case-role">
                      {[project.organisation, year].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                </div>
                <span className="project-row-cta">
                  {viewLabel}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
              {cover ? (
                <div className="project-row-cover">
                  <ProjectMediaLayout
                    copy={copy.media}
                    media={[cover]}
                    playLabel={playLabel}
                  />
                </div>
              ) : null}
            </Link>
          </StaggerGroup>
        );
      })}
    </div>
  );
}
