import { languages } from "@/content/profile";

type LanguagesStripProps = {
  id?: string;
};

export function LanguagesStrip({ id = "languages" }: LanguagesStripProps) {
  return (
    <div className="languages-strip">
      <p className="eyebrow" id={id}>
        IDIOMAS
      </p>
      <p className="language-inline">
        {languages.map((language) => (
          <span key={language.code}>
            <strong>{language.code}</strong>&nbsp;—&nbsp;{language.level}
          </span>
        ))}
      </p>
    </div>
  );
}
