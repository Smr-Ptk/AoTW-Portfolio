"use client";

import {
  CSSProperties,
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type BlurFadeInProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
};

export default function BlurFadeIn({
  children,
  className = "",
  as = "div",
  delay = 0,
}: BlurFadeInProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [effectiveDelay, setEffectiveDelay] = useState(delay);

  // Captured once at mount: was the page loaded near the top? Only components
  // whose page-paint started at the top apply their staggered delay. Anything
  // that scrolls into view after a mid-page reload (or after the user lands
  // somewhere already mid-scroll) fades in with delay 0 so it never reads as
  // laggy on entry.
  const isInitialPaintRef = useRef(
    typeof window !== "undefined" && window.scrollY < 50,
  );
  const hasFadedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasFadedRef.current) {
          hasFadedRef.current = true;
          setEffectiveDelay(isInitialPaintRef.current ? delay : 0);
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  const Component = as;
  const style = { transitionDelay: `${effectiveDelay}ms` } as CSSProperties;

  return (
    <Component
      ref={ref}
      className={`fade-in ${isVisible ? "visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
}
