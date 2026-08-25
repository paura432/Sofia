import { getTranslations } from "next-intl/server";

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
      {practices.map((practice) => (
        <article className="practice-item" key={practice.number}>
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
        </article>
      ))}
    </div>
  );
}
