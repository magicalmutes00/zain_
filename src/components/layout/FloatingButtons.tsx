import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { COMPANY } from "@/data/company";

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookieConsent");
    if (!hasAccepted) {
      setShowCookie(true);
    }

    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.focus();
  };

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookie(false);
  };

  const whatsappUrl = `https://wa.me/${COMPANY.phones[0].replace(/[^0-9]/g, "")}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3" aria-label="Quick actions">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform"
          onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} aria-hidden="true" />
        </motion.button>

        <motion.a
          href={`tel:${COMPANY.phones[0]}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.1 } }}
          className="w-14 h-14 rounded-full bg-brand text-white shadow-lg shadow-orange-500/30 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Call us"
        >
          <Phone size={28} aria-hidden="true" />
        </motion.a>

        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-14 h-14 rounded-full bg-white dark:bg-navy text-navy dark:text-white shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-navy-deep transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={28} aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showCookie && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-navy shadow-2xl border-t border-gray-100 dark:border-white/10 p-4"
            role="dialog"
            aria-label="Cookie consent"
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left">
                We use cookies to improve your experience. By using our site, you agree to our{" "}
                <Link to="/policy" className="text-brand-ember dark:text-brand-soft hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </p>
              <button
                onClick={acceptCookies}
                className="px-6 py-2 bg-navy dark:bg-brand text-white rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Accept
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}