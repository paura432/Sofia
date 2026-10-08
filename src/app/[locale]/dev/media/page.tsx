import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { projects, type PortfolioProject } from "@/content/projects";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

/** Ficha técnica de todos los vídeos Mux. Sólo existe en desarrollo. */
export default async function DevMediaLab({ params }: PageProps) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { locale } = await params;
  const projectsText = await getTranslations({ locale, namespace: "Projects" });
  const videos = projects.filter(
    (project): project is PortfolioProject => Boolean(project.cover?.muxPlaybackId),
  );

  return (
    <main className="dev-media" id="main">
      <section className="section-first">
        <div className="container">
          <h1 className="display-page">Mux media</h1>
          <div className="dev-media-projects">
            {videos.map((project) => {
              const cover = project.cover;
              const title = (projectsText.raw(`items.${project.translationKey}`) as { title: string }).title;
              return (
                <article className="dev-media-project" key={project.id}>
                  <h2>{title}</h2>
                  <dl>
                    <div><dt>Project ID</dt><dd><code>{project.id}</code></dd></div>
                    <div><dt>Playback ID</dt><dd><code>{cover?.muxPlaybackId}</code></dd></div>
                    <div><dt>Duration / aspect</dt><dd>{cover?.duration} · {cover?.aspectRatio}</dd></div>
                    <div><dt>Poster time</dt><dd>{cover?.posterTime}s</dd></div>
                    <div><dt>Featured / order</dt><dd>{String(project.featured ?? false)} · {project.order ?? "—"}</dd></div>
                    <div><dt>Role</dt><dd>{project.roleKeys?.join(", ") || "Pending confirmation"}</dd></div>
                    <div><dt>Rights / published</dt><dd>{project.rights?.verified ? "verified" : "pending"} · {String(project.published)}</dd></div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
