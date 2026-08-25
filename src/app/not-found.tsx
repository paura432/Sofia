import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">404</p>
        <h1>Página no encontrada.</h1>
        <p>La ruta solicitada no forma parte del archivo publicado.</p>
        <Link className="text-link" href="/">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
