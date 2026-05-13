import { PROJECTS } from "@/lib/constants";
import type { Lang } from "@/app/page";

type ProjectGridProps = {
  lang: Lang;
};

export default function ProjectGrid({ lang }: ProjectGridProps) {
  const heading = lang === "हि" ? "प्रोजेक्ट्स" : "Projects";

  return (
    <section className="mx-auto mt-32 w-full max-w-[960px] px-6 md:px-8">
      <h2
        className="text-[17px] font-medium text-[var(--ink)]"
        style={{ fontFamily: 'var(--font-serif), "Noto Serif Devanagari", serif' }}
      >
        {heading}
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <a
            key={p.id}
            href={p.href}
            className="block aspect-[16/10] overflow-hidden border border-[var(--hairline)] bg-[var(--tile-fill)]"
          >
            <video
              src={p.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
