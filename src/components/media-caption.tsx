type MediaCaptionProps = {
  index?: string;
  caption?: string;
};

export function MediaCaption({ index, caption }: MediaCaptionProps) {
  if (!caption) {
    return null;
  }

  return (
    <figcaption className="media-caption">
      {index ? <span>{index}</span> : null}
      {caption}
    </figcaption>
  );
}
