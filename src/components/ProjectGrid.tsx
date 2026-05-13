"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/constants";

type TileProps = {
  p: (typeof PROJECTS)[number];
};

function ProjectTile({ p }: TileProps) {
  const [hovered, setHovered] = useState(false);

  const overlayText = p.href ? "Open sketch ↗" : "Coming soon";

  const inner = (
    <>
      <img
        src={p.image}
        alt={p.title}
        className="h-full w-full object-cover"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(26, 22, 17, 0.65)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: hovered
            ? "opacity 200ms ease-out"
            : "opacity 120ms ease-in",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: "white",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "14px",
          }}
        >
          {overlayText}
        </span>
      </div>
    </>
  );

  const sharedStyle: React.CSSProperties = {
    position: "relative",
    aspectRatio: "16 / 10",
    overflow: "hidden",
    border: "1px solid var(--hairline)",
    background: "white",
  };

  if (p.href) {
    return (
      <div>
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...sharedStyle, display: "block", cursor: "pointer" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {inner}
        </a>
        <p
          style={{
            marginTop: "12px",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "14px",
            color: "var(--ink)",
          }}
        >
          {p.title}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{ ...sharedStyle, cursor: "default" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </div>
      <p
        style={{
          marginTop: "12px",
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "14px",
          color: "var(--ink)",
        }}
      >
        {p.title}
      </p>
    </div>
  );
}

export default function ProjectGrid() {
  return (
    <section className="mx-auto mt-32 w-full max-w-[960px] px-6 md:px-8">
      <h2
        className="mb-6 text-[17px] font-medium text-[var(--ink)]"
        style={{ fontFamily: 'var(--font-serif), serif' }}
      >
        Projects
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {PROJECTS.map((p) => (
          <ProjectTile key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
