import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  dark?: boolean;
  id?: string;
}

// Standard page section: consistent rhythm (py-20 lg:py-28) plus an
// optional centered header block. Replaces the 3 ad-hoc spacing patterns.
export function Section({ children, className, eyebrow, title, description, dark = false, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", dark ? "bg-navy dark:bg-navy-abyss text-white" : "bg-white dark:bg-navy-abyss", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <div className="max-w-3xl mx-auto text-center mb-14">
            {eyebrow && (
              <Reveal>
                <p className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand/10 text-brand-ember dark:text-brand-soft text-sm font-semibold tracking-wide">
                  {eyebrow}
                </p>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-navy dark:text-white">{title}</h2>
              </Reveal>
            )}
            {description && (
              <Reveal delay={0.1}>
                <p className="text-base md:text-lg text-slate-600 dark:text-gray-300">{description}</p>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
