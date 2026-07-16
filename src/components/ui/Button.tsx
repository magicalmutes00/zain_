import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: ReactNode;
}

export function Button({
  children, variant = "primary", size = "md", className, onClick, type = "button", disabled, icon
}: ButtonProps) {
  const variants = {
    primary: "bg-[#FF6B35] text-white hover:bg-[#FF8F5E] shadow-lg shadow-orange-500/25",
    secondary: "bg-[#0A2647] text-white hover:bg-[#144272] shadow-lg shadow-blue-500/25",
    outline: "border-2 border-[#0A2647] text-[#0A2647] hover:bg-[#0A2647] hover:text-white",
    ghost: "text-[#0A2647] hover:bg-[#0A2647]/10",
  };

  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200",
        variants[variant], sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}