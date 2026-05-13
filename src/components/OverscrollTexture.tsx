"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useSpring,
} from "framer-motion";

/**
 * Pranathi-style top overscroll. The wrapper renders <m.main>; the parent
 * paints var(--overscroll) so the page itself slides DOWN to expose the color
 * behind it (rather than a band overlaying static page content).
 *
 * Gesture tracks 1:1 up to THRESHOLD px, then applies exponential rubber-band
 * damping past it, capped at MAX_REVEAL. On release (pointerup, touchend,
 * pointercancel, wheel-idle), the underlying useSpring pulls the page back to
 * y=0 with a slight under-damped overshoot.
 *
 * When prefers-reduced-motion is set, the gesture still tracks (user-initiated
 * input is allowed) but the spring config swaps to a snappy near-linear tween
 * with no overshoot.
 */

const THRESHOLD = 120;
const MAX_REVEAL = 360;
const RUBBER_STRENGTH = 160;
// Browsers don't emit a wheel-end event; wait briefly after the last wheel
// delta to trigger the spring return. The spring itself drives the animation,
// this is only gesture-end detection (not the prior idle-animation timer).
const WHEEL_END_MS = 120;

const SPRING_DEFAULT = { stiffness: 600, damping: 38, mass: 1 };
const SPRING_REDUCED = { stiffness: 1000, damping: 100, mass: 0.1 };

function rubberBand(pulled: number): number {
  if (pulled <= 0) return 0;
  if (pulled <= THRESHOLD) return pulled;
  const excess = pulled - THRESHOLD;
  const damped = excess * Math.exp(-excess / RUBBER_STRENGTH);
  return Math.min(MAX_REVEAL, THRESHOLD + damped);
}

type Props = {
  children: ReactNode;
  className?: string;
};

export default function OverscrollTexture({ children, className }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const target = useMotionValue(0);
  const springConfig = useMemo(
    () => (reducedMotion ? SPRING_REDUCED : SPRING_DEFAULT),
    [reducedMotion],
  );
  const springed = useSpring(target, springConfig);

  const pulledRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);
  const pointerStartRef = useRef<number | null>(null);
  const pointerActiveRef = useRef(false);
  const wheelTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const atTop = () => window.scrollY <= 0;

    const apply = () => {
      target.set(rubberBand(pulledRef.current));
    };

    const release = () => {
      pulledRef.current = 0;
      target.set(0);
      if (wheelTimerRef.current !== null) {
        window.clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = null;
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (!atTop() || event.deltaY >= 0) {
        if (pulledRef.current > 0) release();
        return;
      }
      pulledRef.current += -event.deltaY;
      apply();
      if (wheelTimerRef.current !== null) {
        window.clearTimeout(wheelTimerRef.current);
      }
      wheelTimerRef.current = window.setTimeout(release, WHEEL_END_MS);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!atTop()) return;
      touchStartRef.current = event.touches[0]?.clientY ?? null;
      pulledRef.current = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartRef.current === null || !atTop()) return;
      const currentY = event.touches[0]?.clientY ?? touchStartRef.current;
      const delta = currentY - touchStartRef.current;
      if (delta <= 0) {
        if (pulledRef.current > 0) release();
        return;
      }
      pulledRef.current = delta;
      apply();
    };

    const onTouchEnd = () => {
      touchStartRef.current = null;
      release();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!atTop()) return;
      if (event.button !== 0) return;
      if (event.pointerType === "touch") return;
      pointerActiveRef.current = true;
      pointerStartRef.current = event.clientY;
      pulledRef.current = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerActiveRef.current || !atTop()) return;
      if (pointerStartRef.current === null) return;
      const delta = event.clientY - pointerStartRef.current;
      if (delta <= 0) {
        if (pulledRef.current > 0) release();
        return;
      }
      pulledRef.current = delta;
      apply();
    };

    const onPointerEnd = () => {
      pointerActiveRef.current = false;
      pointerStartRef.current = null;
      release();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      if (wheelTimerRef.current !== null) {
        window.clearTimeout(wheelTimerRef.current);
      }
    };
  }, [target]);

  return (
    <LazyMotion features={domAnimation}>
      <m.main
        style={{
          y: springed,
          background: "var(--bg)",
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
        className={className}
      >
        {children}
      </m.main>
    </LazyMotion>
  );
}
