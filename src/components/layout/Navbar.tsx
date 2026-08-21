import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { NAV_LINKS, SERVICES } from "@/data/company";
import { cn } from "@/lib/utils";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { IconFlame, IconShield, IconBolt, IconCamera, IconDroplet } from "@tabler/icons-react";

const SERVICE_ICONS: Record<string, typeof IconFlame> = {
  Flame: IconFlame,
  Shield: IconShield,
  Zap: IconBolt,
  Video: IconCamera,
  Droplets: IconDroplet,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg bg-white dark:bg-[#0A2647]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex items-center gap-3" aria-label="ZAIN Technical Home">
              <OptimizedImage name="logo-z" alt="ZAIN Technical" className="w-16 h-16 object-contain rounded-xl" />
              <div className="block">
                <span className="font-bold text-[#FF6B35] text-sm sm:text-lg leading-tight block">
                  ZAIN TECHNICAL
                </span>
                <span className="text-[8px] sm:text-[10px] text-[#FF6B35] uppercase tracking-wider whitespace-nowrap">
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
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        location.pathname.startsWith(link.path)
                          ? "text-[#FF6B35]"
                          : "text-[#0A2647] dark:text-white hover:text-[#FF6B35]"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={cn("transition-transform", isServicesOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      role="menuitem"
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        location.pathname === link.path
                          ? "text-[#FF6B35]"
                          : "text-[#0A2647] dark:text-white hover:text-[#FF6B35]"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+96892144367"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-medium hover:bg-[#FF8F5E] transition-colors"
                aria-label="Get a quote"
              >
                <Phone size={16} aria-hidden="true" />
                <span className="text-sm">Get Quote</span>
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isServicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              className="absolute top-full left-0 right-0 bg-white dark:bg-[#0A2647] shadow-xl border-t border-gray-100 dark:border-white/10"
              role="menu"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-5 gap-4">
                  {SERVICES.map((service) => {
                    const ServiceIcon = SERVICE_ICONS[service.icon];
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                        role="menuitem"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center mb-3 group-hover:bg-[#FF6B35]/20 transition-colors">
                          {ServiceIcon && <ServiceIcon size={24} stroke={1.5} className="text-[#FF6B35]" />}
                        </div>
                        <span className="text-sm font-medium text-[#0A2647] dark:text-white text-center">
                          {service.title}
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A2647] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-12">
                <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                  <OptimizedImage name="logo-clean" alt="ZAIN Technical" className="w-16 h-16 object-contain rounded-xl" />
                  <span className="text-[#FF6B35] font-bold text-lg">ZAIN TECHNICAL</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              <nav className="flex flex-col gap-4" role="menu">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="text-xl font-semibold text-white py-3 block border-b border-white/10"
                      role="menuitem"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <a
                  href="tel:+96892144367"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#FF6B35] text-white rounded-xl font-medium"
                >
                  <Phone size={20} aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}