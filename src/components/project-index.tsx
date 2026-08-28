import { MotionLink } from "@/components/motion/motion-link";
import { StaggerGroup } from "@/components/motion/stagger";
import { ProjectMediaLayout } from "@/components/project-media-layout";
import {
  publishableYear,
  type MediaCopy,
  type PortfolioProject,
} from "@/content/projects";

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
            key={project.id}
            step={40}
          >
            <p className="case-number">
              {String(index + 1).padStart(2, "0")}
            </p>
            {cover ? (
              <ProjectMediaLayout
                copy={copy.media}
                media={[cover]}
                playLabel={playLabel}
              />
            ) : null}
            <div>
              <p className="case-discipline">{disciplineLabel(project)}</p>
              <h2>{copy.title}</h2>
              {project.organisation ? (
                <p className="case-role">
                  {project.organisation}
                  {year ? ` · ${year}` : null}
                </p>
              ) : null}
              <MotionLink
                href={{
                  pathname: "/work/[slug]",
                  params: { slug: project.slug },
                }}
              >
                {viewLabel}
              </MotionLink>
            </div>
          </StaggerGroup>
        );
      })}
    </div>
  );
}
