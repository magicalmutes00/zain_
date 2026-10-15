import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="section" aria-label="Page not found">
      <div className="container-narrow" style={{ textAlign: "center" }}>
        <span className="eyebrow">404 — not found</span>
        <h1>That page doesn’t exist.</h1>
        <p className="lead" style={{ margin: "0.8rem 0 1.4rem" }}>
          The link may be outdated. Try the homepage, services or contact instead.
        </p>
        <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-navy" to="/">Back to Home</Link>
          <Link className="btn btn-ghost" to="/contact">Contact ZAIN</Link>
        </div>
      </div>
    </section>
  );
}
