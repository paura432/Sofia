type MediaCaptionProps = {
  index?: string;
  caption?: string;
  location?: string;
  date?: string;
  credit?: string;
};

/**
 * Pie periodístico. Es contexto, no una descripción accesible: el `alt` de la
 * imagen se escribe aparte y nunca se deriva de aquí.
 */
export function MediaCaption({
  index,
  caption,
  location,
  date,
  credit,
}: MediaCaptionProps) {
  const meta = [location, date].filter(Boolean).join(" — ");

  if (!caption && !meta && !credit) {
    return null;
  }

  return (
    <figcaption className="media-caption">
      {index ? <span className="media-caption-index">{index}</span> : null}
      {meta ? <span className="media-caption-meta">{meta}</span> : null}
      {caption ? <span className="media-caption-text">{caption}</span> : null}
      {credit ? <span className="media-caption-credit">{credit}</span> : null}
    </figcaption>
  );
}
