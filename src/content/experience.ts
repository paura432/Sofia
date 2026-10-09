export type ExperienceId =
  | "grupo-cadena-media"
  | "urjcmun"
  | "annie-bonnie"
  | "isocero";

export type ResponsibilityKey =
  | "eventCoverage"
  | "interviews"
  | "scripts"
  | "socialStrategy"
  | "copyMetrics"
  | "graphicDesign"
  | "teamCoordination"
  | "liveContent"
  | "digitalIdentity"
  | "videoProduction"
  | "socialContent"
  | "writing"
  | "events"
  | "calendar"
  | "stakeholders"
  | "photoSessions"
  | "clientService"
  | "editing"
  | "sales";

export type ProgressionKey =
  | "communicationTeam"
  | "cameraOperator"
  | "delegate"
  | "deputyDirector";

export type ExperienceItem = {
  id: ExperienceId;
  company: string;
  companyUrl?: string;
  responsibilityKeys: ResponsibilityKey[];
  progressionKeys?: ProgressionKey[];
  featured?: boolean;
  source: "cv" | "linkedin" | "official-site";
  verification: "verified" | "pending";
};

// Orden: puesto en curso primero; después por fecha de fin y de inicio, descendente.
export const experience: ExperienceItem[] = [
  {
    id: "grupo-cadena-media",
    company: "Grupo Cadena Media",
    responsibilityKeys: [
      "eventCoverage",
      "interviews",
      "scripts",
    ],
    featured: true,
    source: "cv",
    verification: "verified",
  },
  {
    id: "annie-bonnie",
    company: "Annie Bonnie",
    responsibilityKeys: [
      "writing",
      "videoProduction",
      "socialContent",
      "events",
      "stakeholders",
      "calendar",
    ],
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
    responsibilityKeys: [
      "socialStrategy",
      "copyMetrics",
      "graphicDesign",
      "teamCoordination",
      "liveContent",
      "digitalIdentity",
    ],
    source: "cv",
    verification: "verified",
  },
  {
    id: "isocero",
    company: "Isocero",
    responsibilityKeys: [
      "photoSessions",
      "editing",
      "sales",
      "clientService",
    ],
    source: "cv",
    verification: "verified",
  },
];
