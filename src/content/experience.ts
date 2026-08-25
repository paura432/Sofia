export type ExperienceId =
  | "grupo-cadena-media"
  | "urjcmun"
  | "annie-bonnie"
  | "isocero";

export type ResponsibilityKey =
  | "liveCoverage"
  | "interviews"
  | "scripts"
  | "socialStrategy"
  | "copyMetrics"
  | "graphicDesign"
  | "teamCoordination"
  | "liveContent"
  | "videoProduction"
  | "writing"
  | "events"
  | "calendar"
  | "stakeholders"
  | "sessionDirection"
  | "locationLight"
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
    responsibilityKeys: ["liveCoverage", "interviews", "scripts"],
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
    ],
    source: "cv",
    verification: "verified",
  },
  {
    id: "annie-bonnie",
    company: "Annie Bonnie",
    responsibilityKeys: [
      "videoProduction",
      "writing",
      "events",
      "calendar",
      "stakeholders",
    ],
    source: "cv",
    verification: "verified",
  },
  {
    id: "isocero",
    company: "Isocero",
    responsibilityKeys: ["sessionDirection", "locationLight", "editing", "sales"],
    source: "cv",
    verification: "verified",
  },
];

export const featuredWork = experience.map((item, index) => ({
  ...item,
  number: String(index + 1).padStart(2, "0"),
  responsibilityKeys: item.responsibilityKeys.slice(0, 3),
}));
