import { getTranslations } from "next-intl/server";

import { AnimatedLine } from "@/components/motion/animated-line";
import { Reveal } from "@/components/motion/reveal";

type Practice = {
  number: string;
  code: string;
  title: string;
  items: string[];
  metadata: string;
};

export async function PracticeIndex() {
  const t = await getTranslations("Practices");
  const practices = t.raw("items") as Practice[];

  return (
    <div className="practice-index">
      <AnimatedLine tone="strong" />
      {practices.map((practice, index) => (
        <Reveal
          as="article"
          className="practice-item"
          delay={index * 60}
          key={practice.number}
        >
          <div className="practice-number">{practice.number}</div>
          <div>
            <p className="practice-code">{practice.code}</p>
            <h3>{practice.title}</h3>
            <ul>
              {practice.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="practice-meta">{practice.metadata}</p>
        </Reveal>
      ))}
    </div>
  );
}
