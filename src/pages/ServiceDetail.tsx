import { Link, Navigate, useParams } from "react-router-dom";
import { COMPANY, SERVICES, serviceBySlug } from "../data/content";
import { Reveal, SectionHeading } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { DomainIcon, Iconly } from "../components/Icon";

export function ServiceDetail() {
  const { slug } = useParams();
  const service = slug ? serviceBySlug(slug) : undefined;
  if (!service) return <Navigate to="/services" replace />;

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link> <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <span className="eyebrow">{service.imageLabel}</span>
          <h1>{service.title}</h1>
          <p className="lead" style={{ maxWidth: "54rem" }}>{service.description}</p>
          <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", marginTop: "1.2rem" }}>
            <Link className="btn btn-primary" to={`/contact?intent=quote&service=${service.slug}`}>
              Request a Quote <Iconly name="Send" size={18} />
            </Link>
            <a className="btn btn-ghost" href={`tel:${COMPANY.phones[0]}`}>
              <Iconly name="Call" size={18} /> {COMPANY.phoneDisplay[0]}
            </a>
          </div>
        </div>
      </div>

      <section className="section" aria-label={`${service.title} scope`}>
        <div className="container detail-layout">
          <div>
            <Reveal>
              <SectionHeading eyebrow="Scope of work" title="What is included." />
              <ul className="checklist">
                {service.bullets.map((b) => (
                  <li key={b}><Iconly name="TickSquare" size={20} /><span>{b}</span></li>
                ))}
              </ul>
              {service.standardsNote ? (
                <p className="form-note" style={{ marginTop: "1rem" }}>
                  <strong>Standards / approvals referenced:</strong> {service.standardsNote}
                </p>
              ) : null}
            </Reveal>

            <Reveal>
              <div className="card" style={{ padding: "1.4rem", marginTop: "1.6rem" }}>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Engagement path</h2>
                <ol style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.45rem" }}>
                  <li>Share drawings, BOQ or an equipment list via the quote form.</li>
                  <li>ZAIN surveys the site where needed and confirms compliance scope.</li>
                  <li>You receive a clear quotation with materials, programme and maintenance terms.</li>
                  <li>Installation, testing &amp; commissioning — then inspection-ready handover.</li>
                </ol>
                <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", marginTop: "1.1rem" }}>
                  <Link className="btn btn-navy" to={`/contact?intent=quote&service=${service.slug}`}>Start with this service</Link>
                  <Link className="btn btn-ghost" to="/products">Related products</Link>
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="toc" aria-label="More services">
            <h3>All services</h3>
            {SERVICES.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} aria-current={s.slug === service.slug ? "page" : undefined}>
                <span style={{ display: "inline-flex", gap: "0.55rem", alignItems: "center" }}>
                  <DomainIcon kind={s.lucide} size={18} /> {s.title}
                </span>
              </Link>
            ))}
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
              <b style={{ color: "var(--navy-900)", fontSize: "0.9rem" }}>Prefer to talk?</b>
              <p style={{ fontSize: "0.87rem" }}>{COMPANY.phoneDisplay.join(" · ")}</p>
              <p style={{ fontSize: "0.87rem" }}>{COMPANY.emailPrimary}</p>
            </div>
          </aside>
        </div>

        <div className="container" style={{ marginTop: "2.2rem" }}>
          <Reveal>
            <SectionHeading eyebrow="Continue" title="Related divisions." />
          </Reveal>
          <div className="svc-grid">
            {others.map((s) => (
              <Link key={s.slug} className="svc-card" to={`/services/${s.slug}`}>
                <span className="svc-icon"><DomainIcon kind={s.lucide} /></span>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="svc-link">Open <Iconly name="ArrowRight" size={17} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
