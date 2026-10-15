import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(
    () =>
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div style={{ maxWidth: align === "center" ? "46rem" : "56rem", margin: align === "center" ? "0 auto" : undefined, textAlign: align }}>
      <span className={`eyebrow${dark ? " on-dark" : ""}`}>{eyebrow}</span>
      <h2>{title}</h2>
      {lead ? <p className="lead" style={{ marginTop: "0.8rem" }}>{lead}</p> : null}
    </div>
  );
}
