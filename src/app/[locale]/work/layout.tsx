import { getTranslations } from "next-intl/server";

import { WorkRail } from "@/components/work-rail";
import { getDetailedProjects, getProjectSection } from "@/content/projects";

export default async function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rail = await getTranslations("WorkRail");
  const stories = getDetailedProjects().map((project) => ({
    slug: project.slug,
    section: getProjectSection(project),
  }));

  return (
    <>
      <WorkRail
        archiveSectionLabel={rail("photography")}
        nextLabel={rail("next")}
        prevLabel={rail("prev")}
        sectionLabels={{
          reporting: rail("reporting"),
          audiovisual: rail("audiovisual"),
          photography: rail("photography"),
        }}
        stories={stories}
        workLabel={rail("label")}
      />
      {children}
    </>
  );
}
