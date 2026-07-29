import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES } from "@/data/company";
import OptimizedImage from "@/components/ui/OptimizedImage";

export function Footer() {
  return (
    <footer className="bg-[#0A2647] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6" aria-label="ZAIN Technical Home">
              <OptimizedImage name="logo-z" alt="ZAIN Technical" className="w-12 h-12 object-contain rounded-xl" />
              <div>
                <span className="font-bold text-white text-sm block">{COMPANY.shortName}</span>
                <span className="text-white/60 text-xs"> & Inegrated Services LLC</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Professional engineering, contracting, and integrated technical services specializing in fire detection, fire protection, electrical, CCTV, and plumbing solutions across Oman.
            </p>
            <div className="flex gap-3" aria-label="Social media links">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#FF6B35] transition-colors"
                  aria-label={`Follow us on ${Icon.name}`}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-[#FF6B35] transition-colors flex items-center gap-2 text-sm"
                  >
                    {link.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Our services">
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-white/70 hover:text-[#FF6B35] transition-colors flex items-center gap-2 text-sm"
                  >
                    {service.title}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4" aria-label="Contact information">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#FF6B35] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <address className="text-white/70 text-sm not-italic">
                  {COMPANY.address.area}, {COMPANY.address.region}<br />
                  {COMPANY.address.country}
                </address>
              </li>
              {COMPANY.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone size={20} className="text-[#FF6B35] flex-shrink-0" aria-hidden="true" />
                  <a href={`tel:${phone}`} className="text-white/70 hover:text-[#FF6B35] transition-colors text-sm">
                    {phone}
                  </a>
                </li>
              ))}
              {COMPANY.emails.map((email) => (
                <li key={email} className="flex items-center gap-3">
                  <Mail size={20} className="text-[#FF6B35] flex-shrink-0" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="text-white/70 hover:text-[#FF6B35] transition-colors text-sm">
                    {email}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-[#FF6B35] flex-shrink-0" aria-hidden="true" />
                <span className="text-white/70 text-sm">{COMPANY.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <nav aria-label="Legal links" className="flex items-center gap-6">
              <Link to="/policy" className="text-white/60 hover:text-[#FF6B35] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/60 hover:text-[#FF6B35] text-sm transition-colors">
                Terms & Conditions
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}