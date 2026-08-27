"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Game } from "../constants";
import FeaturedCard from "./FeaturedCard";

/* ── Physics constants ── */
const CARD_WIDTH = 240;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTO_SPEED = 0.20;
const FRICTION = 0.92;
const WHEEL_SENS = 0.08;
const COPIES = 4;

export default function FeaturedCarousel({ games }: { games: Game[] }) {
  const totalWidth = games.length * CARD_STEP;
  const looped = Array.from({ length: COPIES }, () => games).flat();

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const velRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [showArrows, setShowArrows] = useState(false);

  // Hide the hint after 4 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

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
      const idx = Math.floor(((offsetRef.current / CARD_STEP) % games.length + games.length)) % games.length;
      setActiveIndex(idx);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth, games.length]);

  /* ── Mouse wheel ── */
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

  /* ── Touch drag ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0, startOffset = 0, lastX = 0, lastT = 0, dragV = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX; startOffset = offsetRef.current;
      lastX = startX; lastT = e.timeStamp; dragV = 0; velRef.current = 0;
      draggingRef.current = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      const x = e.touches[0].clientX;
      const dt = Math.max(1, e.timeStamp - lastT);
      dragV = (lastX - x) / dt; lastX = x; lastT = e.timeStamp;
      const dx = startX - x;
      offsetRef.current = ((startOffset + dx) % totalWidth + totalWidth) % totalWidth;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    };
    const onTouchEnd = () => { draggingRef.current = false; velRef.current = dragV * 14; };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [totalWidth]);

  /* ── Mouse drag ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0, startOffset = 0, lastX = 0, lastT = 0, dragV = 0;
    const onMouseDown = (e: MouseEvent) => {
      startX = e.clientX; startOffset = offsetRef.current;
      lastX = startX; lastT = performance.now(); dragV = 0; velRef.current = 0;
      draggingRef.current = true; el.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const t = performance.now(); const dt = Math.max(1, t - lastT);
      dragV = (lastX - e.clientX) / dt; lastX = e.clientX; lastT = t;
      const dx = startX - e.clientX;
      offsetRef.current = ((startOffset + dx) % totalWidth + totalWidth) % totalWidth;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    };
    const onMouseUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false; el.style.cursor = "grab"; velRef.current = dragV * 14;
    };
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [totalWidth]);

  /* ── Hover pause ── */
  const handlePause = useCallback((paused: boolean) => {
    if (!draggingRef.current) { pausedRef.current = paused; setIsPaused(paused); }
  }, []);

  /* ── Jump to slide ── */
  const jumpTo = (i: number) => {
    velRef.current = 0;
    offsetRef.current = ((i * CARD_STEP) % totalWidth + totalWidth) % totalWidth;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
  };

  /* ── Arrow navigation ── */
  const scrollLeft = () => {
    velRef.current = -CARD_STEP * 0.5;
  };
  const scrollRight = () => {
    velRef.current = CARD_STEP * 0.5;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* ── Paused badge ── */}
      <div
        className={`absolute top-4 right-16 z-20 flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-md px-3 py-1.5 pointer-events-none transition-all duration-300 ease-out ${isPaused ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
        aria-hidden="true"
      >
        <span className="flex gap-0.5">
          <span className="w-[3px] h-3 rounded-sm bg-white/70" />
          <span className="w-[3px] h-3 rounded-sm bg-white/70" />
        </span>
        <span className="text-[10px] font-bold tracking-wider text-white/70 uppercase">Paused</span>
      </div>

      {/* ── "Scroll to explore" hint ── */}
      <div
        className={`absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 backdrop-blur-md px-4 py-2 pointer-events-none transition-all duration-500 ${showHint ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        aria-hidden="true"
      >
        <svg className="w-3.5 h-3.5 text-teal-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span className="text-[11px] font-bold text-teal-300 whitespace-nowrap">Drag or scroll to explore</span>
        <svg className="w-3.5 h-3.5 text-teal-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      {/* ── Left Arrow ── */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll carousel left"
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg ring-1 ring-black/8 dark:ring-white/10 text-gray-700 dark:text-white backdrop-blur-sm transition-all duration-200 cursor-pointer hover:bg-white hover:shadow-xl hover:scale-110 active:scale-95 ${showArrows ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* ── Right Arrow ── */}
      <button
        onClick={scrollRight}
        aria-label="Scroll carousel right"
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg ring-1 ring-black/8 dark:ring-white/10 text-gray-700 dark:text-white backdrop-blur-sm transition-all duration-200 cursor-pointer hover:bg-white hover:shadow-xl hover:scale-110 active:scale-95 ${showArrows ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* ── Scrolling track ── */}
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

        {/* Fade edges */}
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
            className={`rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer ${
              i === activeIndex
                ? "w-6 h-2 bg-gradient-to-r from-teal-500 to-indigo-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                : "w-2 h-2 bg-gray-300 dark:bg-gray-700 hover:bg-teal-400 dark:hover:bg-teal-500 hover:scale-125"
            }`}
          />
        ))}
      </div>

      {/* ── Drag hint ── */}
      <p className="mt-3 text-center text-[11px] text-gray-400 dark:text-gray-600 select-none" aria-hidden="true">
        Drag, swipe, or use arrows to explore
      </p>
    </div>
  );
}
