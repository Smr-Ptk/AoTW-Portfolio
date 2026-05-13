"use client";

import BlurFadeIn from "@/components/BlurFadeIn";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import OverscrollTexture from "@/components/OverscrollTexture";
import P5Divider from "@/components/P5Divider";
import ProjectGrid from "@/components/ProjectGrid";
import ReadingResponses from "@/components/ReadingResponses";

export default function Home() {
  return (
    <div
      className="relative isolate min-h-screen"
      style={{ background: "var(--overscroll)" }}
    >
      <OverscrollTexture className="mx-auto w-full">
        <Hero />
        <BlurFadeIn delay={320}>
          <ProjectGrid />
        </BlurFadeIn>
        <P5Divider />
        <BlurFadeIn>
          <ReadingResponses />
        </BlurFadeIn>
        <P5Divider />
        <BlurFadeIn>
          <Footer />
        </BlurFadeIn>
      </OverscrollTexture>
    </div>
  );
}
