/**
 * Párrafos editoriales simples. Sustituye al antiguo bloque pregunta/respuesta.
 */
export function Prose({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  const items = paragraphs.filter(Boolean);
  if (!items.length) return null;
  return (
    <div className={className ? `prose ${className}` : "prose"}>
      {items.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
}
