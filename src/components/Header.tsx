import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { COMPANY, SERVICES } from "../data/content";
import { Iconly, MenuGlyph } from "./Icon";

export function Header() {
  const [scrolled, setScrolled] = useState<boolean>(
    () => typeof window !== "undefined" && window.scrollY > 8
  );
  const loc = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(loc.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close open menus on navigation. Adjusting state during render is the documented
  // React pattern for resetting state on a prop change — it avoids the extra render
  // pass (and visible flicker) an effect-based setState would cause.
  if (prevPath !== loc.pathname) {
    setPrevPath(loc.pathname);
    setMobileOpen(false);
    setDropOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDropOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contacts">
            <a className="topbar-item" href={`tel:${COMPANY.phones[0]}`}>
              <Iconly name="Call" size={15} />
              {COMPANY.phoneDisplay[0]}
            </a>
            <a className="topbar-item hide-m" href={`mailto:${COMPANY.emailPrimary}`}>
              <Iconly name="Message" size={15} />
              {COMPANY.emailPrimary}
            </a>
            <span className="topbar-item hide-m">
              <Iconly name="Location" size={15} />
              Barka, South Al Batinah, Oman
            </span>
          </div>
          <span className="topbar-badge">ROP Civil Defence Approved</span>
        </div>
      </div>

      <div className="container navbar">
        <Link className="brand" to="/" aria-label="ZAIN Technical and Integrated Services LLC — home">
          {/* Official ZAIN logo — client-supplied artwork, transparent WebP wordmark
              (2481×532 ≈ 4.66:1). The CSS caps its box width so the wide lockup can
              never widen the nav bar; object-fit keeps the artwork undistorted. */}
          <img
            src="/assets/zain-logo-nav.webp"
            alt="ZAIN Technical & Integrated Services LLC logo"
            width={2481}
            height={532}
            decoding="async"
          />
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About Us
              </NavLink>
            </li>
            <li
              className="nav-drop"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button
                className="nav-drop-btn"
                aria-expanded={dropOpen}
                aria-haspopup="true"
                onClick={() => setDropOpen((v) => !v)}
              >
                Services <Iconly name="ChevronDown" size={16} />
              </button>
              {dropOpen ? (
                <ul className="nav-drop-menu" aria-label="Services">
                  <li>
                    <Link to="/services">
                      <strong>All services</strong>
                      <small>Design → commissioning across 6 divisions</small>
                    </Link>
                  </li>
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`}>
                        <strong>{s.title}</strong>
                        <small>{s.short}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="nav-cta">
          <Link className="btn btn-ghost" to="/about">
            Our Approvals
          </Link>
          <Link className="btn btn-primary" to="/contact?intent=quote">
            Request a Quote
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <MenuGlyph open={mobileOpen} />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <div className="container">
          <nav aria-label="Mobile">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About Us</NavLink>
            <span className="m-label">Services</span>
            {SERVICES.map((s) => (
              <NavLink key={s.slug} to={`/services/${s.slug}`} className={({ isActive }) => (isActive ? "active" : "")}>
                {s.title}
              </NavLink>
            ))}
            <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Products &amp; Brands</NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>Projects</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact — Request a Quote</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
