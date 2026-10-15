import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { COMPANY, SERVICES } from "../data/content";
import { Reveal, SectionHeading } from "../components/Reveal";
import { ContactGlyph, Iconly } from "../components/Icon";
import { submitInquiry } from "../utils/submitInquiry";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export function Contact() {
  const [params] = useSearchParams();
  const intent = params.get("intent");
  const preService = params.get("service") ?? "";

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(
    SERVICES.some((s) => s.slug === preService) ? preService : "Fire Detection & Fire Protection"
  );
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok-mailto" | "ok-endpoint" | "fail">("idle");

  const serviceOptions = useMemo(
    () => [
      "Fire Detection & Fire Protection",
      ...SERVICES.map((s) => s.title),
      "Annual Maintenance Contract (AMC)",
      "Other / General Inquiry",
    ],
    []
  );

  function validate(): Errors {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address.";
    if (phone.trim() && !/^[+()\-\s\d]{7,20}$/.test(phone.trim())) e.phone = "Enter a valid phone number or leave blank.";
    if (!service) e.service = "Select a service of interest.";
    if (message.trim().length < 20) e.message = "Describe the requirement in at least 20 characters (site, system, quantity).";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setStatus("idle");
      document.getElementById("contact-form")?.querySelector("[aria-invalid='true']")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("sending");
    try {
      const res = await submitInquiry({ name: name.trim(), company: company.trim(), email: email.trim(), phone: phone.trim(), service, message: message.trim() });
      setStatus(res.via === "endpoint" ? "ok-endpoint" : "ok-mailto");
    } catch {
      setStatus("fail");
    }
  }

  const endpointConfigured = Boolean(import.meta.env.VITE_INQUIRY_ENDPOINT || import.meta.env.VITE_FORMSPREE_ENDPOINT);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Contact</span>
          </nav>
          <span className="eyebrow">{intent === "quote" ? "Request a quote" : "Contact us"}</span>
          <h1>{intent === "quote" ? "Request a quotation." : "Talk to ZAIN."}</h1>
          <p className="lead" style={{ maxWidth: "54rem" }}>
            For fire detection &amp; protection, electrical, plumbing, CCTV or LPG works — share drawings
            or an equipment list and the team will scope compliance, materials and maintenance.
          </p>
        </div>
      </div>

      <section className="section" aria-label="Contact channels and form">
        <div className="container detail-layout">
          <Reveal>
            <SectionHeading eyebrow="Inquiry form" title="Send the scope — get a scoped response." />
            <p className="form-note" style={{ marginTop: "0.6rem" }}>
              {endpointConfigured
                ? "Submissions are delivered directly to ZAIN’s configured inquiry endpoint."
                : "No server endpoint is configured yet, so submitting opens your email app addressed to info@zaintechoman.com with everything prefilled — nothing is silently lost. See .env.example to enable direct delivery."}
            </p>

            <form id="contact-form" onSubmit={onSubmit} noValidate style={{ marginTop: "1.4rem" }} aria-label="Request a quote form">
              {status === "ok-endpoint" ? <p className="alert ok" role="status">Thank you — your inquiry was delivered. ZAIN will respond on working channels.</p> : null}
              {status === "ok-mailto" ? <p className="alert ok" role="status">Your email app should now open with the inquiry prefilled to info@zaintechoman.com — press send to complete. For direct in-browser delivery, ask ZAIN to configure the form endpoint (.env.example).</p> : null}
              {status === "fail" ? <p className="alert err" role="alert">Delivery failed. Please call {COMPANY.phoneDisplay[0]} or email {COMPANY.emailPrimary} directly.</p> : null}

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="f-name">Full name *</label>
                  <input id="f-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "e-name" : undefined} />
                  {errors.name ? <span className="field-error" id="e-name" role="alert">{errors.name}</span> : null}
                </div>
                <div className="field">
                  <label htmlFor="f-company">Company / organisation</label>
                  <input id="f-company" name="company" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="f-email">Email *</label>
                  <input id="f-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "e-email" : undefined} />
                  {errors.email ? <span className="field-error" id="e-email" role="alert">{errors.email}</span> : null}
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Telephone</label>
                  <input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="+968-…" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "e-phone" : undefined} />
                  {errors.phone ? <span className="field-error" id="e-phone" role="alert">{errors.phone}</span> : null}
                </div>
                <div className="field full">
                  <label htmlFor="f-service">Service of interest *</label>
                  <select id="f-service" name="service" value={service} onChange={(e) => setService(e.target.value)} aria-invalid={Boolean(errors.service)}>
                    {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.service ? <span className="field-error" role="alert">{errors.service}</span> : null}
                </div>
                <div className="field full">
                  <label htmlFor="f-message">Project details *</label>
                  <textarea id="f-message" name="message" placeholder="Building type, location in Oman, systems & quantities, drawings/BOQ availability, target dates…" value={message} onChange={(e) => setMessage(e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "e-message" : undefined} />
                  {errors.message ? <span className="field-error" id="e-message" role="alert">{errors.message}</span> : null}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap", marginTop: "1.2rem" }}>
                <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Preparing…" : (<><Iconly name="Send" size={18} /> Send inquiry</>)}
                </button>
                <span className="form-note">Anti-spam: submissions require a valid email and a 20+ character scope. No trackers on this form.</span>
              </div>
            </form>
          </Reveal>

          <aside className="toc" aria-label="Direct contact details">
            <h3>Direct channels</h3>
            <div style={{ display: "grid", gap: "0.9rem", fontSize: "0.92rem" }}>
              <a href={`tel:${COMPANY.phones[0]}`} style={{ display: "flex", gap: "0.6rem", alignItems: "center", color: "var(--navy-900)", fontWeight: 700, textDecoration: "none" }}>
                <ContactGlyph kind="phone" /> {COMPANY.phoneDisplay[0]}
              </a>
              <a href={`tel:${COMPANY.phones[1]}`} style={{ display: "flex", gap: "0.6rem", alignItems: "center", color: "var(--navy-900)", fontWeight: 700, textDecoration: "none" }}>
                <ContactGlyph kind="phone" /> {COMPANY.phoneDisplay[1]}
              </a>
              <a href={`mailto:${COMPANY.emailPrimary}`} style={{ display: "flex", gap: "0.6rem", alignItems: "center", color: "var(--navy-900)", fontWeight: 700, textDecoration: "none" }}>
                <ContactGlyph kind="mail" /> {COMPANY.emailPrimary}
              </a>
              <p style={{ margin: 0, fontSize: "0.83rem", color: "var(--muted)" }}>
                Also on profile record: {COMPANY.emailsExtra.join(" · ")}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "var(--ink)", textDecoration: "none" }}
              >
                <ContactGlyph kind="pin" />
                <span>{COMPANY.address}<br />{COMPANY.poBox}</span>
              </a>
            </div>
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
              <b style={{ color: "var(--navy-900)", fontSize: "0.9rem" }}>What to include</b>
              <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.1rem", fontSize: "0.87rem", display: "grid", gap: "0.3rem" }}>
                <li>Site location &amp; building use</li>
                <li>Drawings / BOQ / equipment list</li>
                <li>New vs. maintenance scope</li>
                <li>Target inspection dates</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
