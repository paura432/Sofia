import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">404</p>
          <h1>Página no encontrada.</h1>
          <p>La ruta solicitada no forma parte del archivo publicado.</p>
          <Link className="text-link arrow-link" href="/">
            Volver al inicio <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
