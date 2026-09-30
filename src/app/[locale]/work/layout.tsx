import { getTranslations } from "next-intl/server";

import { WorkRail } from "@/components/work-rail";
import { getDetailedProjects, getPublishedProjects } from "@/content/projects";

export default async function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rail = await getTranslations("WorkRail");
  const projects = getPublishedProjects();
  const stories = getDetailedProjects().map((project) => ({
    slug: project.slug,
  }));
  const hasReporting = projects.some((project) =>
    project.discipline.includes("reporting"),
  );

  return (
    <>
      <WorkRail
        audiovisualLabel={rail("audiovisual")}
        archiveLabel={rail("archive")}
        backLabel={rail("back")}
        indexLabel={rail("index")}
        nextLabel={rail("next")}
        photographyLabel={rail("photography")}
        reportingLabel={rail("reporting")}
        hasReporting={hasReporting}
        prevLabel={rail("prev")}
        stories={stories}
        workLabel={rail("label")}
      />
      {children}
    </>
  );
}
