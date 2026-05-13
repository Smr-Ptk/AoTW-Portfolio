"use client";

import { useEffect, useRef, useState } from "react";
import { RESPONSES } from "@/lib/constants";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type RowProps = {
  entry: (typeof RESPONSES)[number];
  isExpanded: boolean;
  isLast: boolean;
  reducedMotion: boolean;
  onToggle: () => void;
};

function Row({ entry, isExpanded, isLast, reducedMotion, onToggle }: RowProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const paragraphs = entry.body.split(/\n\n+/);

  return (
    <div className={!isLast ? "border-b border-[var(--hairline)]" : undefined}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full cursor-pointer bg-transparent text-left"
        style={{ padding: "12px 0" }}
      >
        <span
          className="text-[17px] font-normal text-[var(--ink)] underline-offset-4 hover:underline"
          style={{ fontFamily: 'var(--font-serif), serif' }}
        >
          {entry.title}
        </span>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          transition: reducedMotion ? "none" : "grid-template-rows 300ms ease-out",
        }}
      >
        <div ref={bodyRef} style={{ overflow: "hidden" }}>
          <div style={{ paddingTop: "16px", paddingBottom: "24px" }}>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "15px",
                  color: "var(--ink)",
                  lineHeight: "1.6",
                  marginTop: i > 0 ? "16px" : 0,
                }}
              >
                {para}
              </p>
            ))}

            <p
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--ink-soft)",
                marginTop: "24px",
                marginBottom: "12px",
              }}
            >
              Questions
            </p>

            <ol style={{ paddingLeft: "1.25em" }}>
              {entry.questions.map((q, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontStyle: "italic",
                    fontSize: "14px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                    marginTop: i > 0 ? "8px" : 0,
                  }}
                >
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReadingResponses() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const reducedMotion = useReducedMotion();

  function toggle(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section className="mx-auto mt-24 mb-24 w-full max-w-[960px] px-6 md:px-8">
      <h2
        className="mb-6 text-[17px] font-medium text-[var(--ink)]"
        style={{ fontFamily: 'var(--font-serif), serif' }}
      >
        Reading Responses
      </h2>

      <div>
        {RESPONSES.map((entry, i) => (
          <Row
            key={entry.id}
            entry={entry}
            isExpanded={expanded.has(entry.id)}
            isLast={i === RESPONSES.length - 1}
            reducedMotion={reducedMotion}
            onToggle={() => toggle(entry.id)}
          />
        ))}
      </div>
    </section>
  );
}
