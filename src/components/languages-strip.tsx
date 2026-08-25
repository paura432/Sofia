import { getTranslations } from "next-intl/server";

type Language = {
  code: string;
  name: string;
  level: string;
};

type LanguagesStripProps = {
  id?: string;
};

export async function LanguagesStrip({ id = "languages" }: LanguagesStripProps) {
  const t = await getTranslations("Languages");
  const languages = t.raw("items") as Language[];

  return (
    <div className="languages-strip">
      <p className="eyebrow" id={id}>
        {t("eyebrow")}
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
