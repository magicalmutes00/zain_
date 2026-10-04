import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

// Animated number counter: "200+" counts 0 → 200 then appends "+".
// Handles "24/7" style values by animating the leading number only.
export function CountUp({ value, className, duration = 1.4 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000 });

  const num = parseInt(value, 10) || 0;
  const suffix = value.replace(/^[0-9]+/, "");

  useEffect(() => {
    if (inView && !reduce) mv.set(num);
    else if (reduce && ref.current) ref.current.textContent = value;
  }, [inView, reduce, num, mv, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return unsub;
  }, [spring, suffix]);

  return (
    <span ref={ref} className={className}>
      {reduce ? value : `0${suffix}`}
    </span>
  );
}
