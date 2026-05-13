import BlurFadeIn from "@/components/BlurFadeIn";
import { SOCIALS } from "@/lib/constants";

type ItProps = {
  children: React.ReactNode;
};

function It({ children }: ItProps) {
  return (
    <span
      style={{ fontFamily: 'var(--font-serif), serif' }}
      className="bio-italic italic tracking-[-0.01em] text-[var(--ink)]"
    >
      {children}
    </span>
  );
}

function Socials() {
  return (
    <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-[var(--ink-soft)]">
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
    </p>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[960px] px-6 pt-14 md:px-8 md:pt-20">
      <BlurFadeIn delay={0}>
        <h1 className="hero-name">Samir Patki</h1>
        <p style={{ marginTop: "2px" }}>Design Engineer</p>
      </BlurFadeIn>

      <BlurFadeIn delay={80}>
        <p className="bio-paragraph mt-6">
          I&apos;m a designer and developer based in New York. This summer
          I&apos;m joining{" "}
          <It>The New York Times</It>
          {" "}as a Product Design Intern. Right now I&apos;m finishing my
          Master&apos;s in Integrated Product Design at UPenn. Before this I
          designed for brands such as <It>HP</It>, <It>Kodak</It>, and{" "}
          <It>Saris</It> at C+A Global. I also founded{" "}
          <It>Creative X</It> at Rutgers, a design community for student
          creatives. On the side I consult for clothing brands, dance studios,
          authors, and non-profits.
        </p>
      </BlurFadeIn>

      <BlurFadeIn delay={160}>
        <p className="bio-paragraph mt-4">
          Outside of work I&apos;m interested in powerlifting, history and
          learning languages.
        </p>
      </BlurFadeIn>

      <BlurFadeIn delay={240}>
        <Socials />
      </BlurFadeIn>
    </section>
  );
}
