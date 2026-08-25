export type ExperienceItem = {
  company: string;
  role: string;
  area?: string;
  period: string;
  year?: string;
  summary: string;
  responsibilities: string[];
  featured?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    company: "Grupo Cadena Media",
    role: "Reportera TV",
    period: "2024 — Actualidad",
    summary:
      "Cobertura de eventos, entrevistas y redacción de guiones para piezas informativas.",
    responsibilities: [
      "Cobertura de eventos y ruedas de prensa en directo.",
      "Realización de entrevistas a artistas, actores y figuras públicas.",
      "Redacción de guiones y piezas informativas.",
    ],
    featured: true,
  },
  {
    company: "URJCmun",
    role: "Social Media / Deputy Director for Social Media",
    period: "2025 — 2026",
    summary:
      "Estrategia, calendario, contenido social y coordinación de equipo en eventos.",
    responsibilities: [
      "Gestión integral de redes sociales.",
      "Estrategia, calendario, copy y métricas.",
      "Diseño de contenido gráfico y audiovisual.",
      "Coordinación y liderazgo de reporteros y creadores de contenido.",
      "Cobertura de eventos y producción de contenido en tiempo real.",
      "Identidad digital y posicionamiento de marca.",
    ],
  },
  {
    company: "Annie Bonnie",
    role: "Comunicación Corporativa",
    period: "2025 — 2026",
    summary:
      "Contenidos web, piezas audiovisuales, eventos corporativos y calendario editorial.",
    responsibilities: [
      "Redacción de artículos para blog corporativo y contenidos web.",
      "Grabación y edición de piezas audiovisuales para redes sociales y comunicación interna.",
      "Apoyo en organización y cobertura de eventos corporativos.",
      "Atención al cliente y comunicación con público y colaboradores.",
      "Apoyo en estrategia de contenidos.",
      "Gestión y calendario editorial.",
    ],
  },
  {
    company: "Isocero",
    role: "Fotógrafa en Hoteles",
    period: "2023",
    summary:
      "Sesiones fotográficas, edición profesional y trato directo con clientes.",
    responsibilities: [
      "Sesiones fotográficas a familias y niños en entornos turísticos.",
      "Edición profesional de imágenes.",
      "Venta de fotografías personalizadas.",
      "Gestión directa con clientes.",
      "Asesoramiento de producto.",
      "Trabajo en contextos dinámicos.",
      "Orientación comercial.",
    ],
  },
];
