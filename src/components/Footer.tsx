import { Link } from "react-router-dom";
import { COMPANY, SERVICES } from "../data/content";

const YEAR = new Date().getFullYear();

export function Footer() {
  const year = YEAR;
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          {/* Official logo is navy-on-transparent — placed on a white plaque so it stays legible
              on the dark footer without recoloring or distorting the artwork. */}
          <span className="footer-logo-plaque">
            <picture>
              <source srcSet="/assets/zain-logo.webp" type="image/webp" />
              <img
                src="/assets/zain-logo.png"
                alt="ZAIN Technical & Integrated Services LLC logo"
                width={720}
                height={392}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </span>
          <p style={{ fontSize: "0.92rem", maxWidth: "26rem" }}>
            Engineering, contracting &amp; service provider for fire detection &amp; fire protection,
            electrical, plumbing, CCTV and LPG systems — serving developers, retailers and
            businesses throughout Oman since {COMPANY.established}.
          </p>
          <p style={{ marginTop: "0.9rem", fontSize: "0.85rem" }}>Ethos: “{COMPANY.ethos}”</p>
        </div>

        <nav aria-label="Company">
          <h2 className="footer-heading">Company</h2>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products &amp; Brands</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/contact?intent=quote">Request a Quote</Link></li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="footer-heading">Services</h2>
          <ul className="footer-links">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-links">
            <li><a href={`tel:${COMPANY.phones[0]}`}>{COMPANY.phoneDisplay[0]}</a></li>
            <li><a href={`tel:${COMPANY.phones[1]}`}>{COMPANY.phoneDisplay[1]}</a></li>
            <li><a href={`mailto:${COMPANY.emailPrimary}`}>{COMPANY.emailPrimary}</a></li>
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {COMPANY.address}
              </a>
            </li>
            <li>{COMPANY.poBox}</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} {COMPANY.legalName}. All rights reserved.</span>
        <span>Standards referenced: UL · FM Approved · LPCB · BSI · NFPA · TÜV</span>
      </div>
    </footer>
  );
}
