import { AnimatedLine } from "@/components/motion/animated-line";
import { StaggerGroup } from "@/components/motion/stagger";
import type { ExperienceItem, ResponsibilityKey } from "@/content/experience";

type ExperienceCopy = {
  discipline: string;
  role: string;
  period: string;
  summary: string;
  context?: string;
  responsibilities: Record<ResponsibilityKey, string>;
};

type ExperienceHighlightsProps = {
  items: ExperienceItem[];
  copyFor: (id: ExperienceItem["id"]) => ExperienceCopy;
  responsibilityKeysFor: (item: ExperienceItem) => ResponsibilityKey[];
  numberFor: (index: number) => string;
};

export function ExperienceHighlights({
  items,
  copyFor,
  responsibilityKeysFor,
  numberFor,
}: ExperienceHighlightsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="case-list">
      <AnimatedLine tone="strong" />
      {items.map((item, index) => {
        const copy = copyFor(item.id);

        return (
          <StaggerGroup
            as="article"
            className="case-row"
            key={item.id}
            step={30}
          >
            <p className="case-number">{numberFor(index)}</p>
            <div>
              <p className="case-discipline">{copy.discipline}</p>
              <h2>{item.company}</h2>
              <p className="case-role">
                {copy.role} · {copy.period}
              </p>
              {copy.context ? (
                <p className="company-context">{copy.context}</p>
              ) : null}
            </div>
            <div>
              <p>{copy.summary}</p>
              <ul>
                {responsibilityKeysFor(item).map((key) => (
                  <li key={`${item.id}-${key}`}>{copy.responsibilities[key]}</li>
                ))}
              </ul>
            </div>
          </StaggerGroup>
        );
      })}
    </div>
  );
}
