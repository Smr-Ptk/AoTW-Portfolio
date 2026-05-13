"use client";

import { useEffect, useRef, useState } from "react";
import { SOCIALS, TICKER_STRINGS } from "@/lib/constants";

const RENDERED_MS = 187;
const COUNT_DURATION_MS = 1200;

const DEV_TICKER_VALUES = {
  ms: String(RENDERED_MS),
  hours: "4",
  commit: "a3f2b8c",
};

function resolveTicker(template: string) {
  return template
    .replace("{ms}", DEV_TICKER_VALUES.ms)
    .replace("{hours}", DEV_TICKER_VALUES.hours)
    .replace("{commit}", DEV_TICKER_VALUES.commit);
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

type RenderedCounterProps = {
  reducedMotion: boolean;
};

function RenderedCounter({ reducedMotion }: RenderedCounterProps) {
  const [value, setValue] = useState(reducedMotion ? RENDERED_MS : 0);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setValue(RENDERED_MS);
      startedRef.current = true;
      return;
    }

    const node = containerRef.current;
    if (!node) return;
    if (startedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            observer.disconnect();

            const start = performance.now();
            let raf = 0;
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(1, elapsed / COUNT_DURATION_MS);
              const eased = easeOutExpo(t);
              setValue(Math.round(eased * RENDERED_MS));
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <span ref={containerRef}>
      Rendered in {value}ms
    </span>
  );
}

export default function Footer() {
  const [tickerIdx, setTickerIdx] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setTickerIdx(Math.floor(Math.random() * TICKER_STRINGS.length));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isRenderedVariant =
    tickerIdx !== null && TICKER_STRINGS[tickerIdx].startsWith("Rendered in");

  return (
    <footer className="mx-auto mt-32 w-full max-w-[960px] px-6 pb-20 md:px-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-[var(--ink-soft)]">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className="social-link no-underline"
          >
            {social.label}
            <svg
              className="social-arrow"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden="true"
            >
              <path
                d="M2 8 L8 2 M4 2 L8 2 L8 6"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </a>
        ))}
      </div>

      <p className="mt-6 font-mono text-[13px] text-[var(--ink-soft)]">
        {tickerIdx === null ? (
          " "
        ) : isRenderedVariant ? (
          <RenderedCounter reducedMotion={reducedMotion} />
        ) : (
          resolveTicker(TICKER_STRINGS[tickerIdx])
        )}
      </p>

      <div className="mt-6 flex items-end justify-end text-[13px] text-[var(--ink-soft)]">
        <p className="font-mono">© 2026 Samir Patki</p>
      </div>
    </footer>
  );
}
