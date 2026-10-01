export type MoreReportingStory = {
  id: string;
  title: string;
  role?: string;
  organisation?: string;
  year?: string;
  sourceUrl: string;
};

type MoreReportingProps = {
  projects: MoreReportingStory[];
  startAt: number;
  title: string;
  viewOriginalLabel: string;
  opensInNewTabLabel: string;
};

export function MoreReporting({
  projects,
  startAt,
  title,
  viewOriginalLabel,
  opensInNewTabLabel,
}: MoreReportingProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-label={title} className="more-reporting">
      <h3>{title}</h3>
      <ol>
        {projects.map((project, index) => (
          <li key={project.id}>
            <span aria-hidden="true" className="more-reporting-number">
              {String(startAt + index).padStart(2, "0")}
            </span>
            <div className="more-reporting-copy">
              <h4>{project.title}</h4>
              {project.organisation || project.year ? (
                <p>
                  {project.organisation}
                  {project.organisation && project.year ? " · " : null}
                  {project.year}
                </p>
              ) : null}
              {project.role ? <p>{project.role}</p> : null}
            </div>
            <a
              aria-label={`${viewOriginalLabel}: ${project.title} ${opensInNewTabLabel}`}
              className="project-row-cta"
              href={project.sourceUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {viewOriginalLabel}
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
