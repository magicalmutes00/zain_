import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Unified inner-page header: breadcrumb + H1 + sub copy over a subtle navy
// pattern. Replaces the 8 copy-pasted gradient headers.
export function PageHero({ title, sub, crumb = "Home" }: { title: string; sub?: string; crumb?: string }) {
  return (
    <section className="relative pt-32 pb-16 lg:pb-20 bg-gradient-to-br from-navy via-navy-deep to-navy overflow-hidden">
      <div aria-hidden="true" className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Breadcrumb"
          className="mb-4 text-sm text-white/60"
        >
          <Link to="/" className="hover:text-brand-soft transition-colors">{crumb}</Link>
          <ChevronRight size={14} className="inline mx-1 -mt-0.5" aria-hidden="true" />
          <span className="text-white/90">{title}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-5"
        >
          {title}
        </motion.h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}
