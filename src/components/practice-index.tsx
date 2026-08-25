import { practices } from "@/content/profile";

export function PracticeIndex() {
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
          <p className="practice-meta">
            {practice.metadata} <span aria-hidden="true">→</span>
          </p>
        </article>
      ))}
    </div>
  );
}
