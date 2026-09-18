import { getTranslations } from "next-intl/server";

import { WorkRail } from "@/components/work-rail";
import { getPublishedProjects } from "@/content/projects";

export default async function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rail = await getTranslations("WorkRail");
  const stories = getPublishedProjects().map((project) => ({
    slug: project.slug,
  }));

  return (
    <>
      <WorkRail
        audiovisualLabel={rail("audiovisual")}
        archiveLabel={rail("archive")}
        backLabel={rail("back")}
        indexLabel={rail("index")}
        nextLabel={rail("next")}
        photographyLabel={rail("photography")}
        prevLabel={rail("prev")}
        stories={stories}
        workLabel={rail("label")}
      />
      {children}
    </>
  );
}
