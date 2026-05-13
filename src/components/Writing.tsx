import { WRITING } from "@/lib/constants";
import type { Lang } from "@/app/page";

type WritingProps = {
  lang: Lang;
};

export default function Writing({ lang }: WritingProps) {
  const heading = lang === "हि" ? "लेखन" : "Writing";

  return (
    <section className="mx-auto mt-24 mb-8 w-full max-w-[960px] px-6 md:px-8">
      <h2
        className="text-[17px] font-medium text-[var(--ink)]"
        style={{ fontFamily: 'var(--font-serif), "Noto Serif Devanagari", serif' }}
      >
        {heading}
      </h2>

      <ul className="mt-6">
        {WRITING.map((entry, i) => (
          <li
            key={entry.title}
            className={
              i < WRITING.length - 1
                ? "border-b border-[var(--hairline)]"
                : undefined
            }
          >
            <a
              href={entry.href}
              className="group flex items-baseline justify-between gap-6 py-3"
            >
              <span
                className="text-[17px] font-normal text-[var(--ink)] decoration-[var(--ink)] underline-offset-4 group-hover:underline"
                style={{ fontFamily: 'var(--font-serif), "Noto Serif Devanagari", serif' }}
              >
                {entry.title}
              </span>
              <span className="font-mono text-[13px] text-[var(--ink-soft)]">
                {entry.date}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
