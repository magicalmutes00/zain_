import { Link } from "react-router-dom";
import { CERTIFICATES, COMPANY, PROCESS, SECTORS, SERVICES, STANDARDS } from "../data/content";
import { Reveal, SectionHeading } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { DomainIcon, Iconly } from "../components/Icon";

export function Home() {
  return (
    <>
      <section className="hero" aria-label="Introduction">
        <div className="container hero-grid">
          <div>
            <div className="hero-enter">
              <span className="eyebrow">Est. 2021 · Barka, Oman · ROP Civil Defence Approved</span>
              <h1>
                Fire detection &amp; protection, <span className="accent">engineered</span> for compliance — installed &amp; maintained for life.
              </h1>
              <p className="hero-sub">
                ZAIN Technical &amp; Integrated Services LLC designs, supplies, installs, maintains,
                tests and commissions fire detection &amp; fire protection systems — plus electrical,
                plumbing, CCTV and LPG works — for developers, retailers and businesses throughout Oman.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-primary" to="/contact?intent=quote">
                  Request a Quote <Iconly name="Send" size={18} />
                </Link>
                <Link className="btn btn-ghost" to="/services">
                  Explore Services
                </Link>
              </div>
              <div className="hero-proof" aria-label="Company facts">
                <div><strong>6 divisions</strong><span>Fire · Electrical · Plumbing · CCTV · LPG</span></div>
                <div><strong>End-to-end</strong><span>Design → commissioning + AMC</span></div>
                <div><strong>“{COMPANY.ethos}”</strong><span>Operating ethos since day one</span></div>
              </div>
            </div>
          </div>

          <div className="hero-visual hero-enter-delayed" aria-label="Illustrative system status panel">
            <div className="hero-panel">
              <div className="hero-panel-head">
                <strong style={{ color: "var(--navy-900)", fontSize: "0.95rem" }}>Building Safety Systems — Live Overview</strong>
                <span className="live-dot">SUPERVISED</span>
              </div>
              <div className="sys-row">
                <div><b>Addressable Fire Alarm</b><small>Loop 1 · 148 devices · Normal</small></div>
                <span className="pill ok">NORMAL</span>
              </div>
              <div className="sys-row">
                <div><b>Sprinkler + Hydrant Network</b><small>Pressure 7.2 bar · Weekly churn due</small></div>
                <span className="pill warn">SERVICE DUE</span>
              </div>
              <div className="sys-row">
                <div><b>Emergency Lighting</b><small>Central battery · Monthly test logged</small></div>
                <span className="pill ok">TESTED</span>
              </div>
              <div className="sys-row">
                <div><b>CCTV &amp; Access</b><small>32 channels · Recording · Retention OK</small></div>
                <span className="pill info">ONLINE</span>
              </div>
              <div className="rise-bar" aria-hidden="true">
                {[38, 52, 44, 66, 58, 78, 70, 92].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="hero-standards" aria-label="Standards referenced">
              {STANDARDS.map((s) => (
                <span key={s} className="std-chip">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Who we are">
        <div className="container split">
          <Reveal>
            <SectionHeading
              eyebrow="Who we are"
              title="An engineering & contracting partner built on quality — not slogans."
              lead="Established in 2021, ZAIN follows strict, globally accepted standards to deliver fire-safety solutions tailored to each client's statutory compliance, duty of care and business protection."
            />
            <ul className="kicker-list">
              <li><Iconly name="ShieldDone" size={22} /><span><b>Compliance-first:</b> regular inspection &amp; review of all fire-safety systems and equipment.</span></li>
              <li><Iconly name="Users" size={22} /><span><b>Integrated team:</b> engineering, service &amp; maintenance, projects, sales and accounts under one roof.</span></li>
              <li><Iconly name="TickSquare" size={22} /><span><b>Training-backed:</b> comprehensive training, efficient maintenance &amp; thorough system know-how.</span></li>
            </ul>
            <div style={{ marginTop: "1.4rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              <Link className="btn btn-navy" to="/about">About ZAIN</Link>
              <Link className="btn btn-ghost" to="/products">Products &amp; brands</Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card" style={{ padding: "1.6rem" }}>
              <span className="eyebrow">Operating philosophy</span>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>“{COMPANY.ethos}”</h3>
              <p>Every action affects others. Every job well done earns a recommendation — so we work tidy, stay accountable, keep learning, and leave every site as found, or better.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginTop: "1.2rem" }}>
                <div style={{ background: "var(--off-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.9rem" }}>
                  <strong style={{ color: "var(--navy-900)" }}>Commercial &amp; industrial</strong>
                  <p style={{ fontSize: "0.87rem" }}>Offices, warehouses, retail, plants</p>
                </div>
                <div style={{ background: "var(--off-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.9rem" }}>
                  <strong style={{ color: "var(--navy-900)" }}>Government &amp; residential</strong>
                  <p style={{ fontSize: "0.87rem" }}>Offices, public facilities, villas</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--off-white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} aria-label="Services">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Six divisions. One accountable contractor."
              lead="Every division covers design, supply, installation, maintenance, testing & commissioning where applicable — supported by the Service & Maintenance Department and Engineering."
            />
          </Reveal>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link className="svc-card" to={`/services/${s.slug}`}>
                  <span className="svc-icon"><DomainIcon kind={s.lucide} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <span className="svc-link">Service details <Iconly name="ArrowRight" size={17} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="How we deliver">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Delivery method"
              title="From supply to commissioning — with maintenance that stays."
              lead="A systematic process of checking for balanced protection with reliability — so systems operate correctly when needed."
            />
          </Reveal>
          <div className="steps">
            {PROCESS.map((p) => (
              <div className="step" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" aria-label="Capabilities">
        <div className="container">
          <div className="cap-band on-dark">
            <Reveal>
              <span className="eyebrow on-dark">Why ZAIN</span>
              <h2>Evidence-led capability — grounded in the company profile.</h2>
              <p style={{ maxWidth: "52rem" }}>
                No invented clients or statistics. What follows is drawn directly from ZAIN’s stated
                departments, policies, approvals and scope.
              </p>
            </Reveal>
            <div className="cap-grid">
              {[
                { icon: "ShieldDone" as const, t: "ROP Civil Defence approved", d: "Three current certificates covering extinguishers, alarms, pumps, sprinklers, hose systems and fixed gas systems." },
                { icon: "Document" as const, t: "Globally accepted standards", d: "Works referenced to UL, FM Approved, LPCB (Cert No. 931), BSI, NFPA, TÜV and UKAS where applicable." },
                { icon: "Setting" as const, t: "Engineering + maintenance depth", d: "Consultants, project engineers, supervisors and technicians across projects and maintenance." },
                { icon: "TickSquare" as const, t: "Quality-inspected delivery", d: "Materials, machines & equipment subjected to quality inspection; audits and management review." },
                { icon: "TimeCircle" as const, t: "Real 24-hour plumbing response", d: "A dedicated plumbing division with a stated 24-hour service focus." },
                { icon: "Work" as const, t: "Tailored compliance scopes", d: "Solutions matched to statutory compliance, duty of care and business protection objectives." },
              ].map((c) => (
                <div className="cap-item" key={c.t}>
                  <span className="cap-ic"><Iconly name={c.icon} size={22} /></span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Sectors and approvals">
        <div className="container">
          <div className="split">
            <Reveal>
              <SectionHeading
                eyebrow="Where we work"
                title="Sectors we serve across Oman."
              />
              <div className="sector-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {SECTORS.slice(0, 4).map((s) => (
                  <div className="sector" key={s.title}>
                    <b><Iconly name="Work" size={18} />{s.title}</b>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <span className="eyebrow">Approvals snapshot</span>
                <h3 style={{ marginBottom: "0.8rem" }}>Civil Defence certificates on record</h3>
                {CERTIFICATES.map((c) => (
                  <div key={c.no} style={{ borderTop: "1px solid var(--border)", padding: "0.75rem 0" }}>
                    <strong style={{ color: "var(--navy-900)", fontSize: "0.92rem" }}>{c.title}</strong>
                    <p style={{ fontSize: "0.85rem" }}>No. {c.no} · {c.issuer}</p>
                  </div>
                ))}
                <Link className="btn btn-ghost" to="/about#approvals" style={{ marginTop: "1rem" }}>
                  View full approvals
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
