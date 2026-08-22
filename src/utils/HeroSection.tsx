"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCT_DATA } from "../constants";

/* ── Brand-colour → Tailwind gradient map ── */
const BRAND_GRADIENTS: Record<string, string> = {
  "bg-violet-600 hover:bg-violet-700 text-white": "from-violet-500 to-purple-600",
  "bg-sky-500 hover:bg-sky-600 text-white": "from-sky-400 to-blue-500",
  "bg-orange-500 hover:bg-orange-600 text-white": "from-orange-500 to-rose-500",
  "bg-cyan-600 hover:bg-cyan-700 text-white": "from-cyan-500 to-blue-600",
  "bg-rose-500 hover:bg-rose-600 text-white": "from-rose-500 to-pink-600",
  "bg-emerald-600 hover:bg-emerald-700 text-white": "from-emerald-500 to-teal-600",
  "bg-blue-600 hover:bg-blue-700 text-white": "from-blue-500 to-indigo-600",
};

/* ── Derive preview cards from PRODUCT_DATA (top 4) ── */
const PREVIEW_GAMES = PRODUCT_DATA.slice(0, 4).map((g) => ({
  id: g.id,
  title: g.title,
  category: g.category,
  thumbnail: `/${g.thumbnail}`,
  color: BRAND_GRADIENTS[g.brandColor] ?? "from-indigo-500 to-violet-600",
  progress: Math.min(99, Math.round((g.rate / 5) * 100)),
}));

/* ── Trust stat pill ── */
function StatPill({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900/5 dark:bg-white/10 backdrop-blur-sm text-gray-700 dark:text-white">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-[11px] text-gray-500 dark:text-white/60">{label}</p>
      </div>
    </div>
  );
}

/* ── Floating game preview card ── */
function PreviewCard({
  game,
  style,
}: {
  game: (typeof PREVIEW_GAMES)[0];
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="hero-preview-card absolute w-36 sm:w-40 overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-gray-900/5 dark:ring-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-sm"
      style={style}
    >
      {/* Gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${game.color}`} />
      {/* Thumbnail */}
      <div className="aspect-video w-full overflow-hidden relative">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          sizes="160px"
          priority
          className="object-cover"
        />
      </div>
      {/* Info */}
      <div className="px-3 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-0.5">
          {game.category}
        </p>
        <p className="text-xs font-semibold text-gray-900 dark:text-white leading-snug">
          {game.title}
        </p>
        {/* Fake progress bar */}
        <div className="mt-2 h-1 w-full rounded-full bg-gray-200 dark:bg-white/10">
          <div
            className={`h-1 rounded-full bg-gradient-to-r ${game.color}`}
            style={{ width: `${game.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  /* ── Animated gradient orbs via canvas ── */
  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0,
      h = 0;
    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Orb definitions */
    const orbs = [
      { x: 0.25, y: 0.3, r: 0.45, color: [99, 102, 241], speed: 0.00018, phase: 0 },    // indigo
      { x: 0.65, y: 0.55, r: 0.38, color: [139, 92, 246], speed: 0.00014, phase: 2.1 },   // violet
      { x: 0.5, y: 0.85, r: 0.3, color: [59, 130, 246], speed: 0.0002, phase: 4.3 },  // blue
      { x: 0.8, y: 0.2, r: 0.28, color: [168, 85, 247], speed: 0.00016, phase: 1.5 },  // purple
    ];

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Let CSS background show through instead of hardcoded dark base

      // Draw each orb
      orbs.forEach((orb) => {
        const dx = Math.sin(t * orb.speed * 1000 + orb.phase) * 0.08;
        const dy = Math.cos(t * orb.speed * 800 + orb.phase + 1) * 0.06;
        const cx = (orb.x + dx) * w;
        const cy = (orb.y + dy) * h;
        const radius = orb.r * Math.min(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = orb.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},0.35)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},0.12)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Subtle noise overlay effect via a very thin grid of semi-transparent dots
      ctx.fillStyle = "rgba(255,255,255,0.012)";
      for (let y = 0; y < h; y += 4) {
        for (let x = 0; x < w; x += 4) {
          if (Math.random() > 0.85) ctx.fillRect(x, y, 1, 1);
        }
      }

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const scrollToGames = () => {
    document.getElementById("games-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent min-h-screen sm:min-h-[100svh] flex flex-col justify-between">
      {/* ── Animated gradient canvas background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Main content — centered, full-screen viewport ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 pt-20 pb-16">

        {/* ─── LEFT: Copy ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-xl lg:max-w-none">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-300">
              Free to play · No account needed
            </span>
          </div>

          {/* ── Headline ── */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-black leading-[1.06] tracking-tight text-gray-900 dark:text-white">
            Learn through play.{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Master skills faster.
              </span>
              {/* Underline glow */}
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full opacity-60"
                style={{
                  background: "linear-gradient(90deg, #818cf8, #a78bfa, #c084fc)",
                }}
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* ── Sub-headline with trust metric ── */}
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-md lg:max-w-lg">
            Trusted by{" "}
            <span className="font-bold text-gray-900 dark:text-white">2.5M+ learners</span>{" "}
            in 45+ countries to improve their coding, logic, and mouse skills through
            hand-crafted interactive games.
          </p>

          {/* ── CTA Row ── */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Primary CTA */}
            <button
              id="hero-start-game-btn"
              onClick={scrollToGames}
              className="
                hero-cta-btn
                group relative w-full sm:w-auto overflow-hidden
                flex items-center justify-center gap-2.5
                rounded-xl bg-primary px-8 py-4
                text-sm font-bold text-white
                shadow-[0_0_0_0_rgba(99,102,241,0)]
                transition-all duration-300
                hover:bg-primary-400
                hover:shadow-[0_0_32px_8px_rgba(99,102,241,0.35)]
                hover:scale-[1.03]
                active:scale-[0.97]
              "
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                aria-hidden="true"
              />
              {/* Gamepad icon */}
              <svg className="w-4 h-4 shrink-0 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <rect x="2" y="7" width="20" height="14" rx="3" />
                <path strokeLinecap="round" d="M9 11v4M7 13h4M15 12h.01M17 14h.01" />
              </svg>
              <span className="relative z-10">Start Learning</span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>

            {/* Secondary */}
            <a
              href="https://koompi.com"
              target="_blank"
              rel="noreferrer"
              id="hero-about-btn"
              className="
                flex w-full sm:w-auto items-center justify-center gap-1.5
                rounded-xl border border-gray-900/10 bg-gray-900/5 dark:border-white/15 dark:bg-white/6
                px-7 py-4 text-sm font-semibold text-gray-700 dark:text-white/85
                backdrop-blur-sm transition-all duration-200
                hover:bg-gray-900/10 hover:border-gray-900/20 hover:text-gray-900 dark:hover:bg-white/12 dark:hover:border-white/25 dark:hover:text-white
              "
            >
              About KOOMPI
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          {/* ── Trust stats row ── */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2">
            <StatPill
              value="2.5M+"
              label="Active learners"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              }
            />
            <div className="w-px h-6 bg-gray-200 dark:bg-white/15 hidden sm:block" />
            <StatPill
              value="7 Games"
              label="Free to play"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                </svg>
              }
            />
            <div className="w-px h-6 bg-gray-200 dark:bg-white/15 hidden sm:block" />
            <StatPill
              value="4.6 ★"
              label="Avg. rating"
              icon={
                <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* ─── RIGHT: Split-screen game previews ──────────── */}
        <div
          className="relative flex-1 hidden lg:flex items-center justify-center"
          style={{ minHeight: "480px" }}
          aria-hidden="true"
        >
          {/* Ambient glow behind cards */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-72 w-72 rounded-full bg-indigo-600/25 blur-[80px]" />
            <div className="absolute h-48 w-48 rounded-full bg-violet-600/20 blur-[60px] translate-x-16" />
          </div>

          {/* Central "phone / device" mockup */}
          <div className="relative z-10 w-56 h-[340px] rounded-[2rem] bg-gray-100/80 dark:bg-gray-900/80 ring-1 ring-gray-900/5 dark:ring-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm flex flex-col overflow-hidden">
            {/* Notch */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-16 h-1 rounded-full bg-gray-300 dark:bg-white/20" />
            </div>
            {/* Screen content — rotating game image */}
            <div className="flex-1 relative overflow-hidden mx-2 mb-2 rounded-[1.5rem] bg-gray-200 dark:bg-gray-800">
              <HeroSlide />
            </div>
          </div>

          {/* Floating preview cards */}
          <PreviewCard
            game={PREVIEW_GAMES[0]}
            style={{
              top: "10%",
              left: "2%",
              animation: "heroFloat 6s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          <PreviewCard
            game={PREVIEW_GAMES[1]}
            style={{
              bottom: "12%",
              left: "0%",
              animation: "heroFloat 7s ease-in-out infinite",
              animationDelay: "-2s",
            }}
          />
          <PreviewCard
            game={PREVIEW_GAMES[2]}
            style={{
              top: "8%",
              right: "0%",
              animation: "heroFloat 5.5s ease-in-out infinite",
              animationDelay: "-1s",
            }}
          />
          <PreviewCard
            game={PREVIEW_GAMES[3]}
            style={{
              bottom: "10%",
              right: "2%",
              animation: "heroFloat 6.5s ease-in-out infinite",
              animationDelay: "-3s",
            }}
          />
        </div>

        {/* Mobile: horizontal scroll strip of game thumbnails */}
        <div className="flex lg:hidden gap-3 overflow-x-auto no-scrollbar w-full pb-1 touch-pan-x touch-pan-y" aria-hidden="true">
          {PREVIEW_GAMES.map((game) => (
            <div
              key={game.id}
              className="shrink-0 w-32 overflow-hidden rounded-2xl ring-1 ring-gray-900/5 dark:ring-white/10 bg-white/90 dark:bg-gray-900/80"
            >
              <div className={`h-0.5 bg-gradient-to-r ${game.color}`} />
              <div className="aspect-video overflow-hidden relative">
                <Image src={game.thumbnail} alt={game.title} fill sizes="128px" priority className="object-cover" />
              </div>
              <p className="px-2 py-1.5 text-[10px] font-semibold text-gray-700 dark:text-white/70 truncate">{game.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30">
          Scroll
        </p>
        <button
          onClick={scrollToGames}
          aria-label="Scroll to games"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center group cursor-pointer"
        >
          <span className="flex h-8 w-5 flex-col items-center justify-start rounded-full border border-gray-300 dark:border-white/20 pt-1.5 group-hover:border-gray-500 dark:group-hover:border-white/40 transition-colors duration-200">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-white/70" />
          </span>
        </button>
      </div>

    </section>
  );
}

/* ── Inner device slideshow ── */
function HeroSlide() {
  const slides = [
    { src: "/game-cover/typing-code.png", label: "Typing Code" },
    { src: "/game-cover/dragon-drop.png", label: "Dragon Drop" },
    { src: "/game-cover/master-mouse.png", label: "Master Mouse" },
    { src: "/game-cover/koompi-typing.png", label: "Koompi Typing" },
  ];
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % slides.length);
        setFading(false);
      }, 400);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Image
        src={slides[idx].src}
        alt={slides[idx].label}
        fill
        sizes="224px"
        priority
        className="object-cover transition-opacity duration-400"
        style={{ opacity: fading ? 0 : 1 }}
      />
      {/* Label pill */}
      <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm px-2.5 py-1.5">
        <p className="text-[10px] font-bold text-gray-900 dark:text-white/90 truncate">{slides[idx].label}</p>
        {/* Fake XP bar */}
        <div className="mt-1 h-0.5 w-full rounded-full bg-gray-400 dark:bg-white/15">
          <div
            className="h-0.5 rounded-full bg-indigo-400 transition-all duration-[2800ms] ease-linear"
            style={{ width: fading ? "0%" : "100%" }}
          />
        </div>
      </div>
    </>
  );
}
