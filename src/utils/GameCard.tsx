"use client";

import { useState } from "react";
import { Game, Difficulty } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "../hooks/useInView";

const DIFFICULTY_STYLES: Record<
  Difficulty,
  { bg: string; text: string; dot: string }
> = {
  Easy:   { bg: "bg-teal-50 dark:bg-teal-500/10", text: "text-teal-700 dark:text-teal-400", dot: "bg-teal-500" },
  Medium: { bg: "bg-amber-50 dark:bg-amber-500/10",     text: "text-amber-700 dark:text-amber-400",   dot: "bg-amber-500"   },
  Hard:   { bg: "bg-rose-50 dark:bg-rose-500/10",       text: "text-rose-700 dark:text-rose-400",     dot: "bg-rose-500"    },
};

/* ── Small star rating renderer ── */
function StarRow({ rate }: { rate: number }) {
  const n = rate;
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
  const [wishlisted, setWishlisted] = useState(false);
  /* Stagger: cap at 8, then cycle back so large grids still animate */
  const staggerClass = `stagger-${((index % 8) + 1)}`;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/${game.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: game.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        // Brief visual feedback via title attribute change is handled by tooltip
      }
    } catch {
      // User cancelled or API unavailable — silently ignore
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
  };

  return (
    <Link
      href={`/${game.id}`}
      id={`game-card-${game.id}`}
      ref={ref}
      aria-label={`Play ${game.title}`}
      className={`group block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-2xl scroll-reveal ${staggerClass} ${inView ? "in-view" : ""} w-full mx-auto max-w-[400px] sm:max-w-none`}
    >
      <article
        className="
          card-hover
          relative flex flex-col overflow-hidden rounded-2xl
          bg-white dark:bg-gray-900
          border border-border dark:border-white/[0.07]
          shadow-[0_2px_8px_rgba(0,0,0,0.06)]
          h-full
        "
        style={{ minHeight: 400 }}
      >
        {/* ── COVER IMAGE (200 × 150 px visible area) ─────── */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ height: 200 }}>
          <Image
            src={src}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
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

          {/* Action buttons — top-right */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-black/60 hover:scale-110 active:scale-95"
              aria-label={`Share ${game.title}`}
              title="Share this game"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </button>
            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-black/60 hover:scale-110 active:scale-95"
              aria-label={wishlisted ? `Remove ${game.title} from wishlist` : `Save ${game.title} to wishlist`}
              title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            >
              <svg
                className={`w-4 h-4 transition-colors duration-200 ${wishlisted ? "text-rose-500" : "text-white"}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
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
                {game.rate.toFixed(1)}
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
              bg-primary
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
