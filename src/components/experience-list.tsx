import { experience } from "@/content/experience";

type ExperienceListProps = {
  compact?: boolean;
};

export function ExperienceList({ compact = false }: ExperienceListProps) {
  return (
    <div className={compact ? "experience-list compact" : "experience-list"}>
      {experience.map((item) => (
        <article
          className={item.featured ? "experience-row featured" : "experience-row"}
          key={`${item.company}-${item.role}`}
        >
          <p className="experience-period">{item.period}</p>
          <div>
            <h3>{item.company}</h3>
            <p className="experience-role">{item.role}</p>
            <p className="experience-discipline">{item.discipline}</p>
          </div>
          <div>
            <p>{item.summary}</p>
            {!compact ? (
              <ul>
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
