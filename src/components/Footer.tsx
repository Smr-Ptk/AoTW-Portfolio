"use client";

import { useEffect, useRef, useState } from "react";
import { SOCIALS, TICKER_STRINGS } from "@/lib/constants";
import type { Lang } from "@/app/page";

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

const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

function toDevanagariNumerals(input: string | number) {
  return String(input)
    .split("")
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 48 && code <= 57) return DEVANAGARI_DIGITS[code - 48];
      return ch;
    })
    .join("");
}

// cubic-bezier(0.16, 1, 0.3, 1) — same easing curve as --ease-out-expo,
// expressed as a closed-form approximation for the count animation.
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

type FooterProps = {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
};

export default function Footer({ lang, onLangChange }: FooterProps) {
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

  const copyright =
    lang === "हि"
      ? `© ${toDevanagariNumerals(2026)} समीर पतकी`
      : "© 2026 Samir Patki";

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
          "\u00A0"
        ) : isRenderedVariant ? (
          <RenderedCounter reducedMotion={reducedMotion} />
        ) : (
          resolveTicker(TICKER_STRINGS[tickerIdx])
        )}
      </p>

      <div className="mt-6 flex flex-col items-start gap-2 text-[13px] text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="flex items-center gap-3 font-mono">
          <button
            type="button"
            onClick={() => onLangChange("EN")}
            className={`cursor-pointer bg-transparent p-0 ${lang === "EN" ? "underline underline-offset-4" : ""}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => onLangChange("हि")}
            className={`cursor-pointer bg-transparent p-0 ${lang === "हि" ? "underline underline-offset-4" : ""}`}
          >
            हि
          </button>
        </div>
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
