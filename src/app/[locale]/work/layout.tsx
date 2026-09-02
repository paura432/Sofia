import { getTranslations } from "next-intl/server";

import { WorkRail } from "@/components/work-rail";
import { getPublishedProjects } from "@/content/projects";

export default async function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rail] = await Promise.all([
    getTranslations("WorkRail"),
  ]);
  const stories = getPublishedProjects().map((project) => ({
    slug: project.slug,
    label: rail(project.slug),
  }));

  return (
    <>
      <WorkRail
        archiveLabel={rail("archive")}
        backLabel={rail("back")}
        nextLabel={rail("next")}
        prevLabel={rail("prev")}
        stories={stories}
        workLabel={rail("label")}
      />
      {children}
    </>
  );
}
