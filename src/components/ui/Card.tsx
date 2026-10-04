import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "elevated" | "outline" | "tint";
  accent?: boolean;
}

export function Card({ children, className = "", hover = true, padding = "md", variant = "elevated", accent = false }: CardProps) {
  const paddingSizes = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };

  const variants = {
    elevated: "bg-white dark:bg-navy-deep border-gray-100 dark:border-white/10 shadow-soft",
    outline: "bg-white dark:bg-navy-deep border-gray-200 dark:border-white/15",
    tint: "bg-orange-50/60 dark:bg-white/[0.04] border-brand/15 dark:border-white/10",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 20px 40px rgba(10, 38, 71, 0.15)" } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative rounded-card border overflow-hidden",
        variants[variant],
        paddingSizes[padding],
        className
      )}
    >
      {accent && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-soft opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      )}
      {children}
    </motion.div>
  );
}
