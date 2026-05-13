"use client";

import { useEffect, useState } from "react";
import BlurFadeIn from "@/components/BlurFadeIn";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import OverscrollTexture from "@/components/OverscrollTexture";
import ProjectGrid from "@/components/ProjectGrid";
import Tools from "@/components/Tools";
import Writing from "@/components/Writing";

export type Lang = "EN" | "हि";

export default function Home() {
  const [lang, setLang] = useState<Lang>("EN");

  useEffect(() => {
    document.documentElement.lang = lang === "हि" ? "hi" : "en";
  }, [lang]);

  return (
    <div
      className="relative isolate min-h-screen"
      style={{ background: "var(--overscroll)" }}
    >
      <OverscrollTexture className="mx-auto w-full">
        <Hero lang={lang} />
        <BlurFadeIn delay={320}>
          <ProjectGrid lang={lang} />
        </BlurFadeIn>
        <BlurFadeIn>
          <Tools lang={lang} />
        </BlurFadeIn>
        <BlurFadeIn>
          <Writing lang={lang} />
        </BlurFadeIn>
        <BlurFadeIn>
          <Footer lang={lang} onLangChange={setLang} />
        </BlurFadeIn>
      </OverscrollTexture>
    </div>
  );
}
