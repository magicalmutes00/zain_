import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SERVICES, COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { IconFlame, IconShield, IconBolt, IconCamera, IconDroplet, IconGasStation } from "@tabler/icons-react";

const SERVICE_ICONS: Record<string, typeof IconFlame> = {
  Flame: IconFlame,
  Shield: IconShield,
  Zap: IconBolt,
  Video: IconCamera,
  Droplets: IconDroplet,
  Gas: IconGasStation,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Utility bar */}
        <div
          className={cn(
            "hidden md:block bg-navy text-white/80 overflow-hidden transition-all duration-300",
            isScrolled ? "max-h-0" : "max-h-10"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 text-xs">
              <div className="flex items-center gap-5">
                <a href={`tel:${COMPANY.phones[0]}`} className="inline-flex items-center gap-1.5 hover:text-brand-soft transition-colors">
                  <Phone size={13} aria-hidden="true" />
                  {COMPANY.phones[0]}
                </a>
                <a href={`mailto:${COMPANY.emails[0]}`} className="inline-flex items-center gap-1.5 hover:text-brand-soft transition-colors">
                  <Mail size={13} aria-hidden="true" />
                  {COMPANY.emails[0]}
                </a>
              </div>
              <p className="inline-flex items-center gap-1.5">
                <Clock size={13} aria-hidden="true" />
                {COMPANY.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <nav
          aria-label="Main navigation"
          className={cn(
            "transition-all duration-300 border-b",
            isScrolled
              ? "bg-white/90 dark:bg-navy/90 backdrop-blur-xl shadow-lift border-gray-100 dark:border-white/10"
              : "bg-white dark:bg-navy shadow-soft border-transparent"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={cn("flex items-center justify-between gap-4 transition-all duration-300", isScrolled ? "h-16" : "h-20")}>
              <Link to="/" className="flex items-center gap-3.5 shrink-0" aria-label="ZAIN Technical Home">
                <OptimizedImage name="logo-z" alt="ZAIN Technical" className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl drop-shadow-sm" />
                <div className="leading-tight">
                  <span className="font-display font-bold tracking-tight text-brand-ember text-xl sm:text-2xl block">
                    ZAIN TECHNICAL
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-navy/75 uppercase tracking-[0.18em] whitespace-nowrap">
                    & Integrated Services LLC
                  </span>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-1" role="menubar">
                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="relative" role="none">
                    {link.hasChildren ? (
                      <button
                        role="menuitem"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        aria-expanded={isServicesOpen}
                        aria-haspopup="true"
                        className={cn(
                          "relative flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                          location.pathname.startsWith(link.path)
                            ? "text-brand-ember dark:text-brand-soft"
                            : "text-navy dark:text-white hover:text-brand-ember dark:hover:text-brand-soft hover:bg-navy/5 dark:hover:bg-white/5"
                        )}
                      >
                        {link.label}
                        <ChevronDown
                          size={15}
                          className={cn("transition-transform duration-200", isServicesOpen && "rotate-180")}
                          aria-hidden="true"
                        />
                        {location.pathname.startsWith(link.path) && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        role="menuitem"
                        className={cn(
                          "relative block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                          location.pathname === link.path
                            ? "text-brand-ember dark:text-brand-soft"
                            : "text-navy dark:text-white hover:text-brand-ember dark:hover:text-brand-soft hover:bg-navy/5 dark:hover:bg-white/5"
                        )}
                      >
                        {link.label}
                        {location.pathname === link.path && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">

                <a
                  href="tel:+96892144367"
                  className="hidden md:inline-flex items-center gap-2 pl-4 pr-5 py-2.5 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-brand-soft shadow-glow transition-all"
                  aria-label="Get a quote"
                >
                  <Phone size={15} aria-hidden="true" />
                  Get Quote
                  <ArrowUpRight size={15} aria-hidden="true" className="-ml-1" />
                </a>

                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-3 rounded-xl text-navy dark:text-white hover:bg-navy/5 dark:hover:bg-white/10"
                  aria-label="Open menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <Menu size={22} />
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className="absolute top-full left-0 right-0 bg-white dark:bg-navy shadow-lift border-t border-gray-100 dark:border-white/10"
                role="menu"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                    {SERVICES.map((service) => {
                      const ServiceIcon = SERVICE_ICONS[service.icon];
                      return (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className="group flex items-start gap-3 p-4 rounded-2xl hover:bg-orange-50 dark:hover:bg-white/5 border border-transparent hover:border-brand/20 transition-all"
                          role="menuitem"
                        >
                          <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                            {ServiceIcon && <ServiceIcon size={22} stroke={1.5} className="text-brand-ember dark:text-brand-soft group-hover:text-white transition-colors" />}
                          </div>
                          <span>
                            <span className="block text-sm font-bold text-navy dark:text-white">
                              {service.title}
                            </span>
                            <span className="block text-xs text-slate-500 dark:text-gray-400 mt-1 leading-relaxed">
                              {service.description.split(".")[0]}.
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-navy-abyss/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white dark:bg-navy shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/10">
                <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                  <OptimizedImage name="logo-z" alt="ZAIN Technical" className="w-12 h-12 object-contain rounded-xl" />
                  <span className="font-display text-lg font-bold tracking-tight text-white">ZAIN TECHNICAL</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-navy dark:text-white hover:bg-navy/5 dark:hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-5" role="menu">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => {
                    const active = link.hasChildren
                      ? location.pathname.startsWith(link.path)
                      : location.pathname === link.path;
                    return (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.04 }}
                      >
                        <Link
                          to={link.path}
                          role="menuitem"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold transition-colors",
                            active
                              ? "bg-brand/10 text-brand-ember dark:text-brand-soft"
                              : "text-navy dark:text-white hover:bg-navy/5 dark:hover:bg-white/5"
                          )}
                        >
                          {link.label}
                          <ChevronDown size={16} className="-rotate-90 opacity-40" aria-hidden="true" />
                        </Link>
                        {link.hasChildren && (
                          <ul className="ml-4 mt-1 mb-2 space-y-1 border-l-2 border-brand/20 pl-3">
                            {SERVICES.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  to={`/services/${service.slug}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-gray-300 hover:text-brand-ember dark:hover:text-brand-soft hover:bg-navy/5 dark:hover:bg-white/5"
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="p-5 border-t border-gray-100 dark:border-white/10 space-y-3">
                <a
                  href="tel:+96892144367"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand text-white rounded-xl font-semibold shadow-glow"
                >
                  <Phone size={18} aria-hidden="true" />
                  Call +968 92144367
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-navy/15 dark:border-white/20 text-navy dark:text-white rounded-xl font-semibold"
                >
                  Get a Free Quote
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
