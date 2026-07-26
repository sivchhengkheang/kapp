"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Game } from "../constants";
import FeaturedCard from "./FeaturedCard";

/* ── Physics constants ──────────────────────────────────── */
const CARD_WIDTH  = 240;          // card render width (px) — matches w-[240px] on mobile
const CARD_GAP    = 20;           // gap between cards
const CARD_STEP   = CARD_WIDTH + CARD_GAP;
const AUTO_SPEED  = 0.22;         // px / frame at 60 fps → ~13 px/s — intentionally slow
const FRICTION    = 0.92;         // momentum decay per frame (higher = smoother coast)
const WHEEL_SENS  = 0.08;         // wheel / trackpad sensitivity multiplier
const COPIES      = 4;            // deck copies for seamless infinite loop

export default function FeaturedCarousel({ games }: { games: Game[] }) {
  const totalWidth = games.length * CARD_STEP;
  const looped     = Array.from({ length: COPIES }, () => games).flat();

  /* ── Refs (avoid re-render inside RAF) ── */
  const wrapRef     = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);
  const offsetRef   = useRef(0);
  const velRef      = useRef(0);
  const pausedRef   = useRef(false);    // hover / focus pause
  const draggingRef = useRef(false);

  /* ── State for UI (dots + pause indicator) ── */
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);

  /* ── RAF animation loop ── */
  useEffect(() => {
    const tick = () => {
      velRef.current *= FRICTION;

      if (!draggingRef.current) {
        const autoStep = pausedRef.current ? 0 : AUTO_SPEED;
        offsetRef.current = (
          (offsetRef.current + autoStep + velRef.current) % totalWidth + totalWidth
        ) % totalWidth;

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }

      // Keep dots in sync
      const idx =
        Math.floor(((offsetRef.current / CARD_STEP) % games.length + games.length)) %
        games.length;
      setActiveIndex(idx);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth, games.length]);

  /* ── Mouse wheel / trackpad ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velRef.current += raw * WHEEL_SENS;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* ── Touch drag (mobile swipe) ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let dragV = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX       = e.touches[0].clientX;
      startOffset  = offsetRef.current;
      lastX        = startX;
      lastT        = e.timeStamp;
      dragV        = 0;
      velRef.current   = 0;
      draggingRef.current = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      const x  = e.touches[0].clientX;
      const dt = Math.max(1, e.timeStamp - lastT);
      dragV    = (lastX - x) / dt;
      lastX    = x;
      lastT    = e.timeStamp;
      const dx = startX - x;
      offsetRef.current = ((startOffset + dx) % totalWidth + totalWidth) % totalWidth;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
    };

    const onTouchEnd = () => {
      draggingRef.current = false;
      velRef.current = dragV * 14; // hand off momentum to RAF
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove",  onTouchMove,  { passive: true });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, [totalWidth]);

  /* ── Mouse drag (desktop click-and-drag) ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let dragV = 0;

    const onMouseDown = (e: MouseEvent) => {
      startX               = e.clientX;
      startOffset          = offsetRef.current;
      lastX                = startX;
      lastT                = performance.now();
      dragV                = 0;
      velRef.current       = 0;
      draggingRef.current  = true;
      el.style.cursor      = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const t  = performance.now();
      const dt = Math.max(1, t - lastT);
      dragV    = (lastX - e.clientX) / dt;
      lastX    = e.clientX;
      lastT    = t;
      const dx = startX - e.clientX;
      offsetRef.current = ((startOffset + dx) % totalWidth + totalWidth) % totalWidth;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
    };

    const onMouseUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      el.style.cursor     = "grab";
      velRef.current      = dragV * 14;
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
    };
  }, [totalWidth]);

  /* ── Hover pause toggle ── */
  const handlePause = useCallback((paused: boolean) => {
    if (!draggingRef.current) {
      pausedRef.current = paused;
      setIsPaused(paused);
    }
  }, []);

  /* ── Jump to slide ── */
  const jumpTo = (i: number) => {
    velRef.current    = 0;
    offsetRef.current = ((i * CARD_STEP) % totalWidth + totalWidth) % totalWidth;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
  };

  return (
    <div className="relative">
      {/* ── Pause badge ── */}
      <div
        className={`
          absolute top-4 right-16 z-20
          flex items-center gap-1.5 rounded-full
          bg-black/45 backdrop-blur-md
          px-3 py-1.5
          pointer-events-none
          transition-all duration-300 ease-out
          ${isPaused ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
        `}
        aria-hidden="true"
      >
        {/* Pause icon bars */}
        <span className="flex gap-0.5">
          <span className="w-[3px] h-3 rounded-sm bg-white/70" />
          <span className="w-[3px] h-3 rounded-sm bg-white/70" />
        </span>
        <span className="text-[10px] font-bold tracking-wider text-white/70 uppercase">
          Paused
        </span>
      </div>

      {/* ── Scrolling track wrapper ── */}
      <div
        ref={wrapRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => handlePause(true)}
        onMouseLeave={() => handlePause(false)}
        role="region"
        aria-label="Featured games carousel — drag or swipe to browse"
      >
        <div
          ref={trackRef}
          className="flex py-4 will-change-transform"
          style={{ gap: `${CARD_GAP}px`, userSelect: "none" }}
        >
          {looped.map((game, i) => (
            <div key={`${game.id}-${i}`} className="shrink-0">
              <FeaturedCard game={game} index={i % games.length} />
            </div>
          ))}
        </div>

        {/* ── Fade edges ── */}
        <div className="featured-fade-l pointer-events-none absolute inset-y-0 left-0 w-20 z-10" />
        <div className="featured-fade-r pointer-events-none absolute inset-y-0 right-0 w-20 z-10" />
      </div>

      {/* ── Dot navigation ── */}
      <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Carousel navigation">
        {games.map((game, i) => (
          <button
            key={game.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Jump to ${game.title}`}
            onClick={() => jumpTo(i)}
            className={`
              rounded-full transition-all duration-300 ease-out
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              ${
                i === activeIndex
                  ? "w-6 h-2 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.55)]"
                  : "w-2 h-2 bg-gray-300 dark:bg-gray-700 hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:scale-125"
              }
            `}
          />
        ))}
      </div>

      {/* ── Drag hint (shown briefly on mount, fades out) ── */}
      <p className="mt-3 text-center text-[11px] text-gray-400 dark:text-gray-600 select-none" aria-hidden="true">
        Hover to pause · Drag or swipe to explore
      </p>
    </div>
  );
}
