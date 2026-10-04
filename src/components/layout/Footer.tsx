import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter, ArrowUp, ShieldCheck, Award, Headset } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES } from "@/data/company";
import OptimizedImage from "@/components/ui/OptimizedImage";

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-navy dark:bg-navy-abyss text-white overflow-hidden" role="contentinfo">
      <div aria-hidden="true" className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-8 border-b border-white/10 text-sm text-white/80" aria-label="Trust highlights">
          {[
            { Icon: ShieldCheck, text: "Civil Defense-aligned" },
            { Icon: Award, text: "NFPA Standards" },
            { Icon: Headset, text: "24/7 Emergency Support" },
          ].map(({ Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand/15" aria-hidden="true">
                <Icon size={16} className="text-brand-soft" />
              </span>
              {text}
            </span>
          ))}
        </div>

        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-5" aria-label="ZAIN Technical Home">
              <OptimizedImage name="logo-z" alt="ZAIN Technical" className="w-14 h-14 object-contain rounded-xl bg-white/5" />
              <div className="leading-tight">
                <span className="font-display font-extrabold tracking-tight text-white text-lg block">{COMPANY.shortName}</span>
                <span className="text-white/60 text-xs font-medium">& Integrated Services LLC</span>
              </div>
            </Link>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              Professional engineering, contracting, and integrated technical services specializing in fire detection, fire protection, electrical, CCTV, and plumbing solutions across Oman.
            </p>
            <div className="flex gap-2.5" aria-label="Social media links">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-brand hover:-translate-y-0.5 hover:shadow-glow transition-all"
                  aria-label={`Follow us on ${Icon.name}`}
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/90 mb-5">Quick Links</h3>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1.5 py-1.5 text-white/65 hover:text-brand-soft transition-colors text-sm"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-soft transition-all duration-200" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Our services">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/90 mb-5">Our Services</h3>
            <ul className="space-y-1">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group inline-flex items-center gap-1.5 py-1.5 text-white/65 hover:text-brand-soft transition-colors text-sm"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-soft transition-all duration-200" aria-hidden="true" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/90 mb-5">Contact Us</h3>
            <ul className="space-y-4" aria-label="Contact information">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-soft flex-shrink-0 mt-0.5" aria-hidden="true" />
                <address className="text-white/65 text-sm not-italic leading-relaxed">
                  {COMPANY.address.area}, {COMPANY.address.region}<br />
                  {COMPANY.address.country}
                </address>
              </li>
              {COMPANY.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-soft flex-shrink-0" aria-hidden="true" />
                  <a href={`tel:${phone}`} className="text-white/65 hover:text-brand-soft transition-colors text-sm">
                    {phone}
                  </a>
                </li>
              ))}
              {COMPANY.emails.map((email) => (
                <li key={email} className="flex items-center gap-3">
                  <Mail size={18} className="text-brand-soft flex-shrink-0" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="text-white/65 hover:text-brand-soft transition-colors text-sm break-all">
                    {email}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-brand-soft flex-shrink-0" aria-hidden="true" />
                <span className="text-white/65 text-sm">{COMPANY.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <nav aria-label="Legal links" className="flex items-center gap-6">
                <Link to="/policy" className="text-white/50 hover:text-brand-soft text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-white/50 hover:text-brand-soft text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </nav>
              <button
                onClick={scrollTop}
                aria-label="Back to top"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-brand flex items-center justify-center transition-colors"
              >
                <ArrowUp size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
