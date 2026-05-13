"use client";

import { useEffect, useRef, useState } from "react";
import { perlin2 } from "@/lib/perlin";

const SEGMENTS = 40;
const HEIGHT = 40;
const CENTER_Y = HEIGHT / 2;
const AMPLITUDE = 8;
const T_STEP = 0.003;
const TARGET_FPS_MS = 1000 / 30;

export default function P5Divider() {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    let lastTs = 0;

    function initCanvas() {
      const w = wrapper!.offsetWidth;
      canvas!.width = w * dpr;
      canvas!.height = HEIGHT * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${HEIGHT}px`;
      canvas!.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(ctx: CanvasRenderingContext2D, animated: boolean) {
      const w = wrapper!.offsetWidth;
      ctx.clearRect(0, 0, w, HEIGHT);
      ctx.strokeStyle = "rgba(107, 99, 88, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= SEGMENTS; i++) {
        const x = (i / SEGMENTS) * w;
        const y = animated ? CENTER_Y + perlin2(x * 0.01, t) * AMPLITUDE : CENTER_Y;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    initCanvas();
    const ctx = canvas.getContext("2d")!;

    if (reducedMotion) {
      draw(ctx, false);
      return;
    }

    function animate(ts: number) {
      if (document.visibilityState !== "visible") {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      if (ts - lastTs < TARGET_FPS_MS) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTs = ts;
      t += T_STEP;
      draw(ctx, true);
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    function handleResize() {
      initCanvas();
      if (reducedMotion) draw(canvas!.getContext("2d")!, false);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={wrapperRef}
      className="mx-auto my-12 w-full max-w-[960px] px-6 md:px-8"
      style={{ height: `${HEIGHT}px` }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
