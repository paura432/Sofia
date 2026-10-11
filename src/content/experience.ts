export type ExperienceId =
  | "grupo-cadena-media"
  | "urjcmun"
  | "annie-bonnie"
  | "isocero";

export type ProgressionKey =
  | "communicationTeam"
  | "cameraOperator"
  | "delegate"
  | "deputyDirector";

export type ExperienceItem = {
  id: ExperienceId;
  company: string;
  companyUrl?: string;
  /** Historial de cargos, solo cuando hubo progresión dentro de la misma organización. */
  progressionKeys?: ProgressionKey[];
  featured?: boolean;
  source: "cv" | "linkedin" | "official-site";
  verification: "verified" | "pending";
};

// Orden: puesto en curso primero; después por fecha de fin y de inicio, descendente.
// El texto de cada puesto (cargo, periodo, descripción) vive en messages/*.json.
export const experience: ExperienceItem[] = [
  {
    id: "grupo-cadena-media",
    company: "Grupo Cadena Media",
    featured: true,
    source: "cv",
    verification: "verified",
  },
  {
    id: "annie-bonnie",
    company: "Annie Bonnie",
    source: "cv",
    verification: "verified",
  },
  {
    id: "urjcmun",
    company: "URJCmun",
    progressionKeys: [
      "communicationTeam",
      "cameraOperator",
      "delegate",
      "deputyDirector",
    ],
    source: "cv",
    verification: "verified",
  },
  {
    id: "isocero",
    company: "Isocero",
    source: "cv",
    verification: "verified",
  },
];
