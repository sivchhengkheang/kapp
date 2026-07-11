"use client";

import { useRef, useEffect } from "react";
import { Game } from "../constants";
import FeaturedCard from "./FeaturedCard";

const CARD_WIDTH = 220;
const CARD_GAP   = 16;
const CARD_STEP  = CARD_WIDTH + CARD_GAP;
const AUTO_SPEED = 0.5;   // px per frame — base auto-scroll speed
const FRICTION   = 0.88;  // velocity decay per frame
const WHEEL_SENS = 0.35;  // how much each wheel tick adds to velocity
const COPIES     = 4;     // deck copies for seamless infinite loop

export default function FeaturedCarousel({ games }: { games: Game[] }) {
  const totalWidth = games.length * CARD_STEP; // one full lap
  const looped     = Array.from({ length: COPIES }, () => games).flat();

  const wrapRef   = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const offsetRef = useRef(0);   // current scroll position (px)
  const velRef    = useRef(0);   // extra velocity from mouse wheel

  /* ── RAF animation loop ── */
  useEffect(() => {
    const tick = () => {
      // Decay wheel-added velocity each frame
      velRef.current *= FRICTION;

      // Move: base auto-speed + any wheel momentum
      offsetRef.current = (
        (offsetRef.current + AUTO_SPEED + velRef.current) % totalWidth + totalWidth
      ) % totalWidth;

      if (trackRef.current) {
        // translate3d forces GPU compositing layer → no layout jank
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth]);

  /* ── Wheel event: intercept vertical scroll → horizontal velocity ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Prevent the page from scrolling vertically while over the carousel
      e.preventDefault();
      // Use deltaX for trackpad horizontal swipe, deltaY for mouse wheel
      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velRef.current += raw * WHEEL_SENS;
    };

    // passive: false is required to be able to call preventDefault()
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={wrapRef} className="relative overflow-hidden">
      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-4 py-3 will-change-transform"
        style={{ userSelect: "none" }}
      >
        {looped.map((game, i) => (
          <div key={`${game.id}-${i}`} className="shrink-0">
            <FeaturedCard game={game} index={i % games.length} />
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div className="featured-fade-l pointer-events-none absolute inset-y-0 left-0 w-10 z-10" />
      <div className="featured-fade-r pointer-events-none absolute inset-y-0 right-0 w-10 z-10" />
    </div>
  );
}
