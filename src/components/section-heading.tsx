import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id?: string;
  text?: string;
};

export function SectionHeading({ eyebrow, title, id, text }: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-section" id={id}>
        {title}
      </h2>
      {text ? <p>{text}</p> : null}
    </Reveal>
  );
}
