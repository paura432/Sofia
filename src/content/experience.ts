export type ExperienceId =
  | "grupo-cadena-media"
  | "urjcmun"
  | "annie-bonnie"
  | "isocero";

export type ResponsibilityKey =
  | "eventCoverage"
  | "interviews"
  | "eventReporting"
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
  | "fastPaced"
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

export const experience: ExperienceItem[] = [
  {
    id: "grupo-cadena-media",
    company: "Grupo Cadena Media",
    responsibilityKeys: [
      "eventCoverage",
      "interviews",
      "eventReporting",
      "scripts",
    ],
    featured: true,
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
    id: "isocero",
    company: "Isocero",
    responsibilityKeys: [
      "photoSessions",
      "editing",
      "sales",
      "clientService",
      "fastPaced",
    ],
    source: "cv",
    verification: "verified",
  },
];

export const featuredWork = experience.map((item, index) => ({
  ...item,
  number: String(index + 1).padStart(2, "0"),
  responsibilityKeys: item.responsibilityKeys.slice(0, 3),
}));
