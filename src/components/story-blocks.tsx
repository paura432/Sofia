import type { ReactNode } from "react";

/** Bloque de texto en primera persona: pregunta del formulario + párrafos literales de Sofía. */
export type StoryBlock = {
  heading: string;
  paragraphs: string[];
};

type StoryBlocksProps = {
  blocks?: StoryBlock[];
  /** Nivel del encabezado de cada bloque según el contexto de la página. */
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * Pinta las respuestas de la ficha tal cual las escribió Sofía: un bloque por
 * pregunta, con sus párrafos separados. No resume ni reordena.
 */
export function StoryBlocks({ blocks, headingLevel = "h2", className }: StoryBlocksProps) {
  if (!blocks?.length) return null;
  const Heading = headingLevel;

  return (
    <div className={["story-blocks", className].filter(Boolean).join(" ")}>
      {blocks.map((block) => (
        <div className="story-block" key={block.heading}>
          <Heading className="story-heading">{block.heading}</Heading>
          {block.paragraphs.map((paragraph, index) => (
            <p key={`${block.heading}-${index}`}>{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

type StorySectionProps = {
  label: string;
  blocks?: StoryBlock[];
  headingLevel?: "h2" | "h3";
  className?: string;
  children?: ReactNode;
};

/** Sección completa (eyebrow + bloques) sobre la rejilla editorial existente. */
export function StorySection({ label, blocks, headingLevel, className, children }: StorySectionProps) {
  if (!blocks?.length) return null;

  return (
    <section className={["section", "story-section", className].filter(Boolean).join(" ")}>
      <div className="container editorial-grid">
        <p className="eyebrow">{label}</p>
        <div>
          <StoryBlocks blocks={blocks} headingLevel={headingLevel} />
          {children}
        </div>
      </div>
    </section>
  );
}
