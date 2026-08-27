"use client";

import { useState } from "react";
import { Game, Difficulty } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInView } from "../hooks/useInView";

const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; text: string; dot: string }> = {
  Easy: { bg: "bg-teal-50 dark:bg-teal-500/10", text: "text-teal-700 dark:text-teal-400", dot: "bg-teal-500" },
  Medium: { bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
  Hard: { bg: "bg-rose-50 dark:bg-rose-500/10", text: "text-rose-700 dark:text-rose-400", dot: "bg-rose-500" },
};

function StarRow({ rate }: { rate: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = i <= Math.floor(rate) ? 1 : i - rate < 1 && i - rate > 0 ? rate - Math.floor(rate) : 0;
        return (
          <span key={i} className="relative w-3 h-3 shrink-0">
            <svg className="absolute inset-0 w-3 h-3 text-gray-200 dark:text-gray-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
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
  const router = useRouter();
  const staggerClass = `stagger-${((index % 8) + 1)}`;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const url = `${window.location.origin}/${game.id}`;
    try {
      if (navigator.share) await navigator.share({ title: game.title, url });
      else await navigator.clipboard.writeText(url);
    } catch { /* silently ignore */ }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setWishlisted((w) => !w);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    router.push(`/play/${game.id}`);
  };

  return (
    <Link
      href={`/${game.id}`}
      id={`game-card-${game.id}`}
      ref={ref}
      aria-label={`Play ${game.title}`}
      className={`group block focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-2xl scroll-reveal ${staggerClass} ${inView ? "in-view" : ""} w-full`}
    >
      <article
        className="
          card-hover group/card
          relative flex flex-col overflow-hidden rounded-2xl
          bg-white dark:bg-gray-900
          border border-gray-200/90 dark:border-white/[0.08]
          hover:border-teal-400/35 dark:hover:border-teal-500/30
          shadow-[0_2px_12px_rgba(0,0,0,0.05)]
          transition-all duration-300
          h-full
        "
      >
        {/* Top accent bar — teal to indigo */}
        <div className="h-[3px] w-full bg-gradient-to-r from-teal-400 via-indigo-500 to-violet-500 opacity-70 group-hover/card:opacity-100 transition-opacity" />

        {/* ── COVER IMAGE ── */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 h-48 sm:h-52">
          <Image
            src={src}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-transparent" />
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
          {/* Title */}
          <h3 className="font-bold leading-snug text-gray-900 dark:text-white text-lg sm:text-xl group-hover/card:text-teal-600 dark:group-hover/card:text-teal-400 transition-colors duration-200">
            {game.title}
          </h3>


          {/* Description — clean single label, no emoji noise */}
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
            {game.description}
          </p>

          {/* ── Stats row — muted, compact ── */}
          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap pt-0.5">
            {/* Stars + rating */}
            <div className="flex items-center gap-1.5">
              <StarRow rate={game.rate} />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 tabular-nums">{game.rate.toFixed(1)}</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
            {/* Plays */}
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-3 h-3 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
              <span className="font-semibold text-gray-600 dark:text-gray-300">{game.plays}</span>
            </span>
            <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
            {/* Duration */}
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-3 h-3 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
              </svg>
              {game.avgTime}
            </span>
          </div>

          {/* Difficulty badge */}
          <div className="flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${diff.bg} ${diff.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
              {game.difficulty}
            </span>
            {/* Free badge */}
            <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Free
            </span>
          </div>

          {/* ── Play Now CTA ── */}
          <button
            onClick={handlePlay}
            className="
              btn-micro group/btn
              mt-auto w-full flex items-center justify-center gap-2
              rounded-xl py-3 px-5 min-h-[44px]
              text-sm font-bold text-white
              bg-gradient-to-r from-teal-500 to-indigo-600
              hover:from-teal-400 hover:to-violet-600
              shadow-[0_2px_12px_rgba(20,184,166,0.25)]
              hover:shadow-[0_4px_20px_rgba(20,184,166,0.4)]
              transition-all duration-300 cursor-pointer
            "
            aria-label={`Play ${game.title} now`}
          >
            <svg className="w-4 h-4 fill-current transition-transform duration-200 group-hover/btn:scale-110" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Now
          </button>
        </div>
      </article>
    </Link>
  );
}
