import { Link } from "react-router-dom";
import { CERTIFICATES, COMPANY, ETHOS_POINTS, QUALITY_POLICY, SAFETY_POLICY, STANDARDS } from "../data/content";
import { Reveal, SectionHeading } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { Iconly } from "../components/Icon";

export function About() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">About Us</span>
          </nav>
          <span className="eyebrow">About ZAIN · Est. {COMPANY.established}</span>
          <h1>Engineering discipline, contractor accountability.</h1>
          <p className="lead" style={{ maxWidth: "52rem" }}>
            {COMPANY.legalName} is an engineering, contracting &amp; service provider specialising in
            fire detection and fire protection systems — supported by electrical, plumbing, CCTV and
            LPG divisions serving developers, retailers and businesses throughout Oman.
          </p>
        </div>
      </div>

      <section className="section" aria-label="Company overview">
        <div className="container split">
          <Reveal>
            <SectionHeading eyebrow="Company overview" title="Tailored fire-safety solutions — not off-the-shelf packages." />
            <p style={{ marginTop: "1rem" }}>
              Services &amp; solutions are individually tailored to client needs, accounting for
              statutory compliance, duty of care and business protection. Regular inspection &amp;
              review of all fire-safety systems and equipment is treated as paramount — backed by
              comprehensive training, efficient maintenance and thorough system know-how.
            </p>
            <p style={{ marginTop: "0.8rem" }}>
              Several departments — including Service &amp; Maintenance and Engineering — support
              design, supply, installation, maintenance, testing and commissioning across commercial
              and industrial buildings, government offices, residential spaces and public facilities.
            </p>
          </Reveal>
          <Reveal delay={110}>
            <div className="card" style={{ padding: "1.5rem" }}>
              <span className="eyebrow">At a glance</span>
              <dl style={{ display: "grid", gap: "0.7rem", margin: 0 }}>
                {[
                  ["Legal name", COMPANY.legalName],
                  ["Established", String(COMPANY.established)],
                  ["Base", COMPANY.address],
                  ["Mail", COMPANY.poBox],
                  ["Phone", COMPANY.phoneDisplay.join(" · ")],
                  ["Email", COMPANY.emailPrimary],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "0.8rem", fontSize: "0.92rem" }}>
                    <dt style={{ fontWeight: 800, color: "var(--navy-900)" }}>{k}</dt>
                    <dd style={{ margin: 0 }}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                {STANDARDS.map((s) => (
                  <span key={s} className="pill info">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--navy-900)" }} aria-label="Ethos">
        <div className="container on-dark">
          <Reveal>
            <span className="eyebrow on-dark">Our ethos</span>
            <h2>“{COMPANY.ethos}”</h2>
            <p style={{ maxWidth: "56rem", marginTop: "0.7rem" }}>
              Everyone should enjoy what they do. Every action has an effect on others. Every job well
              done earns a recommendation to friends &amp; colleagues — a name built on quality, at a
              reasonable price, throughout Oman.
            </p>
          </Reveal>
          <div className="cap-grid">
            {ETHOS_POINTS.map((p) => (
              <div className="cap-item" key={p}>
                <span className="cap-ic"><Iconly name="TickSquare" size={20} /></span>
                <p style={{ marginTop: "0.6rem", color: "#dbe6f4" }}>{p}</p>
              </div>
            ))}
            <div className="cap-item">
              <span className="cap-ic"><Iconly name="Users" size={20} /></span>
              <p style={{ marginTop: "0.6rem", color: "#dbe6f4" }}>Integrated specialists — technical knowledge &amp; field experience through the life of your operation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Quality and safety">
        <div className="container split">
          <Reveal>
            <SectionHeading eyebrow="Quality policy" title="Seven commitments, audited — not framed." />
            <ol style={{ margin: "1.1rem 0 0", paddingLeft: "1.2rem", display: "grid", gap: "0.55rem" }}>
              {QUALITY_POLICY.map((q) => <li key={q}>{q}</li>)}
            </ol>
            <p className="form-note" style={{ marginTop: "0.9rem" }}>Standards referenced: UL · FM Approved · LPCB (assessed to ISO 9001, LPCB Cert No. 931) · BSI · NFPA · TÜV</p>
          </Reveal>
          <Reveal delay={110}>
            <SectionHeading eyebrow="Safety policy" title="A safe organisation by system — not by slogan." />
            <ol style={{ margin: "1.1rem 0 0", paddingLeft: "1.2rem", display: "grid", gap: "0.55rem" }}>
              {SAFETY_POLICY.map((s) => <li key={s}>{s}</li>)}
            </ol>
            <p className="form-note" style={{ marginTop: "0.9rem" }}>Standards referenced: LPCB · NFPA</p>
            <div className="card" style={{ padding: "1.1rem 1.2rem", marginTop: "1.1rem" }}>
              <b style={{ color: "var(--navy-900)" }}>Workforce structure</b>
              <p style={{ fontSize: "0.9rem" }}>CEO → GM → Managers (Sales Engineer · Projects Engineer → Supervisor/Technician → Labours · Maintenance → Supervisor/Technician → Labours) + Accounts.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="approvals" style={{ background: "var(--off-white)", borderTop: "1px solid var(--border)" }} aria-label="Approvals and certificates">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Approvals & certificates"
              title="ROP Civil Defence approvals on record."
              lead="Only verifiable certificates from the company profile are listed — with numbers, scope and validity. Copies available on request."
            />
          </Reveal>
          <div className="cert-grid">
            {CERTIFICATES.map((c, i) => (
              <Reveal key={c.no} delay={i * 70}>
                <article className="cert-card">
                  <span className="no">Certificate No. {c.no}</span>
                  <h3>{c.title}</h3>
                  <p style={{ fontSize: "0.87rem" }}>{c.issuer}</p>
                  <dl>
                    {c.details.map(([k, v]) => (
                      <div key={k}><dt>{k}: </dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
