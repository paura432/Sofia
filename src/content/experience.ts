export type ExperienceItem = {
  company: string;
  companyUrl?: string;
  role: string;
  discipline: string;
  period: string;
  summary: string;
  responsibilities: string[];
  /** Qué es la organización, no qué hizo Sofía. */
  context?: string;
  /** Roles sucesivos dentro de la misma organización, sin fechas intermedias. */
  progression?: string[];
  featured?: boolean;
  /** Metadata interna de procedencia. Nunca se renderiza. */
  source?: "cv" | "linkedin" | "official-site";
  verification?: "verified" | "pending";
};

export const experience: ExperienceItem[] = [
  {
    company: "Grupo Cadena Media",
    role: "Reportera TV",
    discipline: "Reporting / Television",
    period: "2024 — Actualidad",
    context:
      "Agrupación nacional de televisiones de proximidad: 41 empresas audiovisuales y 54 canales locales, provinciales y autonómicos.",
    summary:
      "Reporterismo de televisión: cobertura en directo, entrevistas a artistas y figuras públicas, y redacción de las piezas informativas que salen a antena.",
    responsibilities: [
      "Cobertura de eventos y ruedas de prensa en directo.",
      "Entrevistas a artistas, actores y figuras públicas.",
      "Redacción de guiones y piezas informativas.",
    ],
    featured: true,
    source: "cv",
    verification: "verified",
  },
  {
    company: "URJCmun",
    role: "Deputy Director for Social Media",
    discipline: "Digital Communication",
    period: "2022 — 2026",
    context:
      "Modelo de Naciones Unidas de la Universidad Rey Juan Carlos.",
    progression: [
      "Communication Team",
      "Camera Operator",
      "Delegate",
      "Deputy Director for Social Media",
    ],
    summary:
      "Trayectoria dentro del equipo de comunicación desde 2022, con distintas funciones antes de asumir la dirección adjunta de Social Media en 2026.",
    responsibilities: [
      "Dirección de la estrategia de redes y del calendario editorial.",
      "Copy, métricas y posicionamiento de la identidad digital.",
      "Diseño de contenido gráfico y audiovisual.",
      "Coordinación de reporteros y creadores de contenido.",
      "Cobertura de eventos y producción de contenido en tiempo real.",
    ],
    source: "cv",
    verification: "verified",
  },
  {
    company: "Annie Bonnie",
    role: "Comunicación Corporativa",
    discipline: "Corporate Communication",
    period: "2025 — 2026",
    context:
      "Consultora de comunicación, estrategia, marketing de contenidos y relaciones públicas.",
    summary:
      "Comunicación corporativa de extremo a extremo: producción audiovisual, contenido web, social y cobertura de eventos bajo un mismo calendario editorial.",
    responsibilities: [
      "Grabación y edición de piezas audiovisuales para redes y comunicación interna.",
      "Redacción de artículos para blog corporativo y contenidos web.",
      "Organización y cobertura de eventos corporativos.",
      "Gestión del calendario editorial y apoyo en estrategia de contenidos.",
      "Comunicación con público y colaboradores.",
    ],
    source: "cv",
    verification: "verified",
  },
  {
    company: "Isocero",
    role: "Fotógrafa",
    discipline: "Photography",
    period: "2023",
    context:
      "Estudio especializado en fotografía de retrato en entornos hoteleros y turísticos.",
    summary:
      "Fotografía de retrato en entornos turísticos: dirección de sesión, edición profesional y relación comercial directa con el cliente.",
    responsibilities: [
      "Dirección de personas durante la sesión: familias y retrato infantil.",
      "Búsqueda de localización e iluminación dentro del entorno hotelero.",
      "Edición profesional de las imágenes.",
      "Presentación del trabajo, asesoramiento y venta al cliente.",
    ],
    source: "cv",
    verification: "verified",
  },
];

export const featuredWork = experience.map((item, index) => ({
  number: String(index + 1).padStart(2, "0"),
  company: item.company,
  companyUrl: item.companyUrl,
  role: item.role,
  discipline: item.discipline,
  period: item.period,
  context: item.context,
  summary: item.summary,
  responsibilities: item.responsibilities.slice(0, 3),
  featured: item.featured,
}));
