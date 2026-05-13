import { TOOLS } from "@/lib/constants";
import type { Lang } from "@/app/page";

type ToolsProps = {
  lang: Lang;
};

export default function Tools({ lang }: ToolsProps) {
  const heading = lang === "हि" ? "टूल्स" : "Tools";

  return (
    <section className="mx-auto mt-24 mb-24 w-full max-w-[960px] px-6 md:px-8">
      <h2
        className="text-[17px] font-medium text-[var(--ink)]"
        style={{ fontFamily: 'var(--font-serif), "Noto Serif Devanagari", serif' }}
      >
        {heading}
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-6">
        {TOOLS.map((tool) => (
          <a
            key={tool.title}
            href={tool.href}
            className="flex aspect-square flex-col border border-[var(--hairline)] bg-[var(--tile-fill)] p-6"
          >
            <div className="flex flex-1 items-center justify-center">
              {tool.icon}
            </div>
            <div>
              <h3
                className="text-[17px] font-medium text-[var(--ink)]"
                style={{ fontFamily: 'var(--font-serif), "Noto Serif Devanagari", serif' }}
              >
                {tool.title}
              </h3>
              <p className="mt-1 text-[14px] text-[var(--ink-soft)]">
                {tool.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
