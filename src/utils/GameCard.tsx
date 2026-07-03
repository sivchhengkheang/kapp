"use client";

import { Game, Difficulty } from "../constants";
import Link from "next/link";
import { useInView } from "../hooks/useInView";

/* ── Difficulty badge colour map ── */
const DIFFICULTY_STYLES: Record<
  Difficulty,
  { bg: string; text: string; dot: string }
> = {
  Easy:   { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  Medium: { bg: "bg-amber-50 dark:bg-amber-500/10",     text: "text-amber-700 dark:text-amber-400",   dot: "bg-amber-500"   },
  Hard:   { bg: "bg-rose-50 dark:bg-rose-500/10",       text: "text-rose-700 dark:text-rose-400",     dot: "bg-rose-500"    },
};

/* ── Small star rating renderer ── */
function StarRow({ rate }: { rate: string }) {
  const n = parseFloat(rate);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = i <= Math.floor(n) ? 1 : i - n < 1 && i - n > 0 ? n - Math.floor(n) : 0;
        return (
          <span key={i} className="relative w-3 h-3 shrink-0">
            {/* Grey base */}
            <svg className="absolute inset-0 w-3 h-3 text-gray-200 dark:text-gray-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {/* Amber fill clipped to percentage */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const src = (game.thumbnail || game.cover || "/cover1.png").replace(/^(?!\/)/, "/");
  const diff = DIFFICULTY_STYLES[game.difficulty] ?? DIFFICULTY_STYLES.Easy;
  const [ref, inView] = useInView<HTMLAnchorElement>({ threshold: 0.08 });
  /* Stagger: cap at 8, then cycle back so large grids still animate */
  const staggerClass = `stagger-${((index % 8) + 1)}`;

  return (
    <Link
      href={`/${game.id}`}
      id={`game-card-${game.id}`}
      ref={ref}
      className={`group block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-2xl scroll-reveal ${staggerClass} ${inView ? "in-view" : ""}`}
      style={{ width: "100%", maxWidth: 320 }}
    >
      <article
        className="
          card-hover
          relative flex flex-col overflow-hidden rounded-2xl
          bg-white dark:bg-gray-900
          border border-gray-200/60 dark:border-white/[0.07]
          shadow-[0_2px_8px_rgba(0,0,0,0.06)]
          h-full
        "
        style={{ minHeight: 400 }}
      >
        {/* ── COVER IMAGE (200 × 150 px visible area) ─────── */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ height: 200 }}>
          <img
            src={src}
            alt={game.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
          />

          {/* Bottom gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          {/* Category icon badge — top-left */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-xl bg-black/45 backdrop-blur-sm px-2.5 py-1.5 ring-1 ring-white/10">
            <span className="text-sm leading-none" aria-hidden="true">{game.categoryIcon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
              {game.category}
            </span>
          </div>

          {/* Difficulty badge — top-right */}
          <div
            className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 ring-1 ring-white/10 backdrop-blur-sm bg-black/40`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
            <span className="text-[10px] font-bold text-white/90 tracking-wide">
              {game.difficulty}
            </span>
          </div>
        </div>

        {/* ── CONTENT AREA ─────────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">

          {/* Title — 22px bold */}
          <h3
            className="font-bold leading-snug text-gray-900 dark:text-white"
            style={{ fontSize: 22 }}
          >
            {game.title}
          </h3>

          {/* Description — 16px body, 1.6 leading, max-width 600px */}
          <p
            className="text-sm sm:text-base leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3 flex-1"
            style={{ lineHeight: "var(--leading-relaxed)" }}
          >
            {game.description}
          </p>

          {/* ── Stats row — 14px small text ── */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
            {/* Stars + rating number */}
            <div className="flex items-center gap-1.5">
              <StarRow rate={game.rate} />
              <span
                className="font-bold text-gray-700 dark:text-gray-300 tabular-nums"
                style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)" }}
              >
                {game.rate}
              </span>
            </div>

            <span className="text-gray-300 dark:text-gray-600" style={{ fontSize: "var(--text-sm)" }}>·</span>

            {/* Play count */}
            <span
              className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
              style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)" }}
            >
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
              <span className="font-semibold">{game.plays}</span> plays
            </span>

            <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>

            {/* Avg time */}
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
              </svg>
              {game.avgTime} avg
            </span>
          </div>

          {/* ── Difficulty badge (content area) ── */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${diff.bg} ${diff.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
              {game.difficulty}
            </span>
          </div>

          {/* ── Play Now CTA ── */}
          <button
            className="
              btn-micro
              mt-auto w-full flex items-center justify-center gap-2
              rounded-xl py-3 px-5 min-h-[44px]
              text-sm font-bold text-white
              bg-indigo-600
            "
            tabIndex={-1}
            aria-hidden="true"
          >
            {/* Play triangle */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Now
          </button>
        </div>
      </article>
    </Link>
  );
}
