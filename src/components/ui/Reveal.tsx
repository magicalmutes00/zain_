import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealVariant = "fade-up" | "fade-left" | "scale";

const variants: Record<RevealVariant, Variants> = {
  "fade-up": { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  "fade-left": { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } },
};

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  once?: boolean;
}

// Single scroll-reveal primitive. Respects prefers-reduced-motion and
// replaces the ~25 hand-rolled initial/whileInView blocks across the site.
export function Reveal({ children, variant = "fade-up", delay = 0, className, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-40px" }}
      variants={variants[variant]}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  gap?: number;
}

// Stagger wrapper: each direct <StaggerItem> child animates in sequence.
export function Stagger({ children, className, gap = 0.08 }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
