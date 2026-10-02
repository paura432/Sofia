import { getTranslations } from "next-intl/server";

import { WorkRail } from "@/components/work-rail";
import { getDetailedProjects, getProjectSection, getProjectsInSection, hasPublishedReporting } from "@/content/projects";

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
  const hasAudiovisual = getProjectsInSection("audiovisual").length > 0;
  const hasPhotography = getProjectsInSection("photography").length > 0;
  const hasReporting = hasPublishedReporting();

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
        hasAudiovisual={hasAudiovisual}
        hasPhotography={hasPhotography}
        prevLabel={rail("prev")}
        stories={stories}
        workLabel={rail("label")}
      />
      {children}
    </>
  );
}
