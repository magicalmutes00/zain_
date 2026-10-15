import { Link } from "react-router-dom";
import { COMPANY } from "../data/content";
import { Iconly } from "./Icon";

export function CtaBand() {
  return (
    <section className="section-tight" aria-label="Request a quotation">
      <div className="container">
        <div className="cta-band on-dark">
          <div>
            <span className="eyebrow on-dark">Start with a site review</span>
            <h2 style={{ marginBottom: "0.8rem" }}>Tell us about your building, plant or project — we’ll scope it properly.</h2>
            <p>
              Share drawings or an equipment list for fire detection &amp; protection, electrical,
              plumbing, CCTV or LPG works. ZAIN responds with a compliant scope, quality-inspected
              materials and a clear maintenance plan.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-primary" to="/contact?intent=quote">
              Request a Quote <Iconly name="Send" size={18} />
            </Link>
            <a className="contact-line" href={`tel:${COMPANY.phones[0]}`}>
              <Iconly name="Call" size={20} /> <span>Call <strong>{COMPANY.phoneDisplay[0]}</strong></span>
            </a>
            <a className="contact-line" href={`mailto:${COMPANY.emailPrimary}`}>
              <Iconly name="Message" size={20} /> <span>Email <strong>{COMPANY.emailPrimary}</strong></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
