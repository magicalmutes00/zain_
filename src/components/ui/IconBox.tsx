import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IconBoxProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  iconColor?: string;
}

export function IconBox({ icon: Icon, title, description, className, iconColor = "#FF6B35" }: IconBoxProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn("flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-300", className)}
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${iconColor}15` }}>
        <Icon size={32} style={{ color: iconColor }} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">{title}</h3>
      {description && <p className="text-[#64748B] text-sm leading-relaxed">{description}</p>}
    </motion.div>
  );
}