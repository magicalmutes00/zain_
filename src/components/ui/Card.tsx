import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ children, className = "", hover = true, padding = "md" }: CardProps) {
  const paddingSizes = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };

  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 20px 40px rgba(10, 38, 71, 0.15)" } : {}}
      transition={{ duration: 0.2 }}
      className={`bg-white dark:bg-[#144272] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm ${paddingSizes[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
}