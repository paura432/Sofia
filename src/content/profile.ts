export const siteConfig = {
  name: "Sofía Chernikova",
  email: "chernisv@gmail.com",
  linkedin: "https://www.linkedin.com/in/sofia-chernikova",
  hasCv: false,
  cvPath: "/cv/sofia-chernikova.pdf",
};

export const currentPositionIds = [
  "grupo-cadena-media",
  "urjcmun",
] as const;

export const tools = [
  "Adobe Premiere",
  "DaVinci Resolve",
  "Photoshop",
  "Lightroom",
  "Canva",
  "CapCut",
  "Khoros",
  "CMS",
  "Jira",
  "SEO",
];

/**
 * Datos con evidencia pública insuficiente. No se renderizan en ninguna página.
 * Pendientes de confirmación directa por parte de Sofía.
 */
export const pendingVerification = [
  {
    subject: "Canal YOU! TV",
    note: "Afiliación visible públicamente. Cargo, fechas y responsabilidades requieren confirmación.",
  },
  {
    subject: "Universidad Pontificia de Salamanca",
    note: "Aparece en el CV sin titulación ni periodo verificables.",
  },
  {
    subject: "Redes sociales distintas de LinkedIn",
    note: "Instagram, TikTok, YouTube, Vimeo, Behance, X y Threads sin identidad confirmada. Existe otra persona pública con el mismo nombre.",
  },
  {
    subject: "Harper's Bazaar, Noticias Cuatro, LOS40 Music Awards",
    note: "Solo actividad de LinkedIn (contenido recomendado o compartido). No prueba participación directa.",
  },
  {
    subject: "Azafata de eventos, modelo y camarera (2021—2025)",
    note: "Verificado en CV. Fuera de la narrativa pública por prioridad editorial, no por falta de evidencia.",
  },
];
