import { Link } from "react-router-dom";
import { PROCESS, SERVICES } from "../data/content";
import { Reveal, SectionHeading } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { DomainIcon, Iconly } from "../components/Icon";

export function ServicesIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Services</span>
          </nav>
          <span className="eyebrow">Services</span>
          <h1>Design, supply, install, maintain, test &amp; commission.</h1>
          <p className="lead" style={{ maxWidth: "54rem" }}>
            Six divisions for commercial &amp; industrial buildings, government offices, residential
            spaces and public facilities — each with a dedicated detail page and an honest scope.
          </p>
        </div>
      </div>

      <section className="section" aria-label="All services">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Six divisions"
              title="Every discipline under one accountable contract."
            />
          </Reveal>
          <div className="svc-grid" style={{ marginTop: "1.8rem" }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link className="svc-card" to={`/services/${s.slug}`}>
                  <span className="svc-icon"><DomainIcon kind={s.lucide} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <span className="svc-link">Open service page <Iconly name="ArrowRight" size={17} /></span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="card" style={{ marginTop: "2rem", padding: "1.5rem" }}>
              <SectionHeading eyebrow="Delivery stages" title="How every fire-system engagement runs." />
              <div className="steps">
                {PROCESS.map((p) => (
                  <div className="step" key={p.title}><h3>{p.title}</h3><p>{p.text}</p></div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
