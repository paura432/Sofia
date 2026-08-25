import type { Metadata } from "next";

import { projectFilters, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <main id="main" className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">WORK</p>
        <h1>Archivo profesional en curaduría.</h1>
        <p>
          La estructura está preparada para reportajes, fotografía, vídeo y
          comunicación. En esta fase no se publican piezas sin selección ni
          material verificado.
        </p>
      </section>

      <section className="section work-index" aria-labelledby="work-filters">
        <div className="filter-row" id="work-filters" aria-label="Filtros futuros">
          {projectFilters.map((filter) => (
            <span key={filter}>{filter}</span>
          ))}
        </div>

        {projects.length === 0 ? (
          <div className="archive-empty">
            <p>SELECTED WORK — ARCHIVE IN CURATION</p>
            <h2>Sin piezas ficticias. Sin miniaturas provisionales.</h2>
            <p>
              Los trabajos se incorporarán cuando existan títulos, roles,
              soportes y materiales definitivos.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
