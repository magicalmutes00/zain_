import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  dark?: boolean;
}

export function SectionHeader({ title, subtitle, description, centered = true, light = false, dark = false }: SectionHeaderProps) {
  const isDark = dark && !light;

  return (
    <div className={`max-w-3xl ${centered && "mx-auto text-center"}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-lg md:text-xl mb-4 ${light ? "text-white/80" : isDark ? "text-gray-400" : "text-[#FF6B35]"}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? "text-white" : isDark ? "text-white" : "text-[#0A2647]"}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-base ${light ? "text-white/70" : isDark ? "text-gray-400" : "text-[#64748B]"}`}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`h-1 w-20 rounded-full mt-6 ${light ? "bg-white" : "bg-[#FF6B35]"} ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
}