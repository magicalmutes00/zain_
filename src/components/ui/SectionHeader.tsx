import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  dark?: boolean;
  /** Editorial ghost number rendered behind the header, e.g. "01". */
  index?: string;
}

export function SectionHeader({ title, subtitle, description, centered = true, light = false, dark = false, index }: SectionHeaderProps) {
  const isDark = dark && !light;

  return (
    <div className={`relative max-w-3xl ${centered && "mx-auto text-center"}`}>
      {index && (
        <span
          aria-hidden="true"
          className={`pointer-events-none select-none absolute -top-14 font-display text-7xl lg:text-8xl font-extrabold leading-none ${
            centered ? "left-1/2 -translate-x-1/2" : "left-0"
          } ${light || isDark ? "text-white/[0.08]" : "text-navy/[0.06] dark:text-white/[0.07]"}`}
        >
          {index}
        </span>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] mb-5 ${
            light || isDark ? "text-brand-soft" : "text-brand-ember"
          } ${centered ? "" : ""}`}
        >
          <span aria-hidden="true" className={`h-0.5 w-8 rounded-full ${light || isDark ? "bg-brand-soft" : "bg-brand"}`} />
          {subtitle}
          {centered && (
            <span aria-hidden="true" className={`h-0.5 w-8 rounded-full ${light || isDark ? "bg-brand-soft" : "bg-brand"}`} />
          )}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2] mb-5 ${light ? "text-white" : isDark ? "text-white" : "text-navy"}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className={`text-base md:text-lg leading-relaxed ${light ? "text-white/70" : isDark ? "text-gray-400" : "text-slate-600"}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
