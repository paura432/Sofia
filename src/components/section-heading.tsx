type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id?: string;
  text?: string;
};

export function SectionHeading({ eyebrow, title, id, text }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
