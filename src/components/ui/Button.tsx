import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

export function Button({
  children, variant = "primary", size = "md", className, onClick, type = "button", disabled, loading, icon
}: ButtonProps) {
  const busy = disabled || loading;

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-soft shadow-lg shadow-orange-500/25",
    secondary: "bg-navy dark:bg-navy-deep text-white hover:bg-navy-deep dark:hover:bg-navy shadow-lg shadow-blue-950/20",
    outline: "border-2 border-navy dark:border-white/40 text-navy dark:text-white hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy",
    ghost: "text-navy dark:text-white hover:bg-navy/10 dark:hover:bg-white/10",
  };

  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={busy}
      whileHover={{ scale: busy ? 1 : 1.02 }}
      whileTap={{ scale: busy ? 1 : 0.98 }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        variants[variant], sizes[size],
        busy && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
      ) : (
        icon && <span className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>
      )}
      {children}
    </motion.button>
  );
}
