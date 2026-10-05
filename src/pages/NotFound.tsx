import { Link } from "react-router-dom";
import { Home, MessageCircle, ArrowLeft } from "lucide-react";
import { COMPANY } from "@/data/company";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Page Not Found | ZAIN Technical";
  }, []);

  const whatsappUrl = `https://wa.me/${COMPANY.phones[0].replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi, I reached a 404 page on your website. I need help with:"
  )}`;

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-deep px-4"
      role="alert"
      aria-live="polite"
    >
      {/* Big background "404" */}
      <h1
        className="select-none text-[18rem] sm:text-[24rem] font-black text-white/[0.06] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none"
        aria-hidden="true"
      >
        404
      </h1>

      <div className="relative max-w-3xl w-full text-center">
        <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand/15 text-brand-ember dark:text-brand-soft text-xs font-semibold tracking-widest uppercase border border-brand/30">
          Lost in our service area
        </span>

        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-white/75 text-lg leading-relaxed max-w-xl mx-auto mb-10">
          The page you’re looking for doesn’t exist or has been moved. It could
          be a broken link or a page we retired — let’s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-soft text-white rounded-lg font-semibold transition-colors shadow-lg shadow-orange-500/20"
          >
            <Home size={18} />
            Go to Homepage
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-lg font-semibold transition-colors border border-white/20"
          >
            <ArrowLeft size={18} />
            Contact Support
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1FB955] text-white rounded-lg font-semibold transition-colors shadow-lg shadow-green-500/20"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Quick links */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
            Or try one of these
          </p>
          <nav className="flex flex-wrap gap-2 justify-center text-sm">
            {[
              { to: "/services", label: "Our Services" },
              { to: "/projects", label: "Recent Projects" },
              { to: "/about", label: "About Us" },
              { to: "/faq", label: "FAQ" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
