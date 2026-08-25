type PeriodDisplayProps = {
  period: string;
};

/** Parte "2024 — Actualidad" en año display + etiqueta compacta. Evita solapes en columnas estrechas. */
export function PeriodDisplay({ period }: PeriodDisplayProps) {
  const separator = " — ";
  const splitIndex = period.indexOf(separator);

  if (splitIndex === -1) {
    return (
      <p className="period-display">
        <span className="period-display-primary">{period}</span>
      </p>
    );
  }

  const start = period.slice(0, splitIndex);
  const end = period.slice(splitIndex + separator.length);

  return (
    <p className="period-display">
      <span className="period-display-primary">{start}</span>
      <span className="period-display-secondary">{end}</span>
    </p>
  );
}
