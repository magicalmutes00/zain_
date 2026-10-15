import { Link } from "react-router-dom";
import { PRODUCT_GROUPS } from "../data/content";
import { Reveal, SectionHeading } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { Iconly } from "../components/Icon";

export function Products() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Products &amp; Brands</span>
          </nav>
          <span className="eyebrow">Products — traded, supplied, installed &amp; maintained</span>
          <h1>Established manufacturers. Quality-inspected supply.</h1>
          <p className="lead" style={{ maxWidth: "54rem" }}>
            ZAIN trades, supplies, installs &amp; maintains products &amp; accessories from established
            manufacturers — with materials, machines &amp; equipment subjected to quality inspection
            before use. Brand names below belong to their respective owners and denote sourcing, not ownership.
          </p>
        </div>
      </div>

      <section className="section" aria-label="Product groups">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Range" title="Fire-range product groups from the company profile." />
          </Reveal>
          <Reveal>
            <table className="prod-table">
              <caption className="form-note" style={{ textAlign: "left", paddingBottom: "0.5rem" }}>
                Source: company profile “Our Products” section. Confirm exact model availability when requesting a quote.
              </caption>
              <thead>
                <tr><th scope="col">Group</th><th scope="col">Makes / coverage</th></tr>
              </thead>
              <tbody>
                {PRODUCT_GROUPS.map((p) => (
                  <tr key={p.group}>
                    <th scope="row" style={{ background: "transparent", textTransform: "none", letterSpacing: 0, fontSize: "0.95rem" }}>{p.group}</th>
                    <td>{p.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <div className="sector-grid" style={{ marginTop: "1.6rem" }}>
            {[
              { t: "Detection & alarm", d: "GENT · SHIELD / NAFFCO · DAHUA / HONEYWELL control panels with addressable & conventional devices." },
              { t: "Suppression & pumps", d: "FM-200 (TYCO · AL AMAN) · UL/FM-approved pumps (AL AMAN · VOLUTE · METAL PUMPS) with controllers." },
              { t: "Extinguishers & equipment", d: "NAFFCO · BONFIRE · ZAIN · ELITE · FIRE KING · AL AMAN — foam, powder, CO₂ and water types." },
            ].map((c) => (
              <div className="sector" key={c.t}>
                <b><Iconly name="ShieldDone" size={18} />{c.t}</b>
                <p>{c.d}</p>
              </div>
            ))}
          </div>

          <Reveal>
            <div className="card" style={{ padding: "1.4rem", marginTop: "1.6rem" }}>
              <h2 style={{ fontSize: "1.2rem" }}>Need a product quotation?</h2>
              <p>Send the schedule, datasheet or a photo of the existing nameplate — ZAIN will confirm equivalents, availability and installation scope.</p>
              <div style={{ marginTop: "1rem" }}>
                <Link className="btn btn-primary" to="/contact?intent=quote">Request product quote</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
