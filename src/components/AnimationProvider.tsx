import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationContextType {
  revealOnScroll: (element: Element | null, options?: gsap.TimelineVars) => void;
  fadeIn: (element: Element | null, options?: gsap.TimelineVars) => void;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  const revealOnScroll = (element: Element | null, options?: gsap.TimelineVars) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        ...options,
      }
    );
  };

  const fadeIn = (element: Element | null, options?: gsap.TimelineVars) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out", ...options }
    );
  };

  return (
    <AnimationContext.Provider value={{ revealOnScroll, fadeIn }}>
      <div ref={containerRef} className="min-h-screen">
        {children}
      </div>
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimations must be used within AnimationProvider");
  }
  return context;
}

export function PageTransition({ children, isVisible }: { children: ReactNode; isVisible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (isVisible) {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(ref.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
        });
      }
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="opacity-0 translate-y-5">
      {children}
    </div>
  );
}