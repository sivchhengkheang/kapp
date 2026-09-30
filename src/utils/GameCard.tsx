"use client";

import { Game, Difficulty } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInView } from "../hooks/useInView";

/* ── Difficulty colour map ── */
const DIFF: Record<Difficulty, { pill: string; dot: string }> = {
  Easy:   { pill: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300",   dot: "bg-teal-500" },
  Medium: { pill: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  Hard:   { pill: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",   dot: "bg-rose-500" },
};

export default function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const src = (game.thumbnail || game.cover || "/cover1.png").replace(/^(?!\/)/, "/");
  const diff = DIFF[game.difficulty] ?? DIFF.Easy;
  const [ref, inView] = useInView<HTMLAnchorElement>({ threshold: 0.08 });
  const router = useRouter();
  const staggerClass = `stagger-${((index % 8) + 1)}`;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/play/${game.id}`);
  };

  return (
    <Link
      href={`/${game.id}`}
      id={`game-card-${game.id}`}
      ref={ref}
      aria-label={`View ${game.title}`}
      className={`group block focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-2xl scroll-reveal ${staggerClass} ${inView ? "in-view" : ""} w-full`}
    >
      <article
        className="
          group/card
          relative flex flex-col overflow-hidden rounded-2xl h-full
          bg-white dark:bg-gray-900/80
          border border-gray-100 dark:border-white/[0.07]
          shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]
          hover:shadow-[0_4px_24px_rgba(20,184,166,0.15),0_1px_4px_rgba(0,0,0,0.06)]
          hover:border-teal-300/50 dark:hover:border-teal-500/25
          transition-all duration-300 ease-out
        "
      >
        {/* ── Thumbnail ─────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square sm:aspect-[16/10] w-full">
          <Image
            src={src}
            alt={game.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={index < 4}
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
          {/* Subtle bottom vignette for badge legibility without washing out the art */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Category pill — top-left */}
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 border border-white/15 shadow-sm">
            <span className="text-[10px] sm:text-xs leading-none" aria-hidden="true">{game.categoryIcon}</span>
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white/95 leading-none">
              {game.category}
            </span>
          </div>

          {/* Difficulty pill — top-right */}
          <div className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/15 shadow-sm ${diff.pill}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
            <span className="leading-none">{game.difficulty}</span>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-2.5 sm:p-4 gap-1.5 sm:gap-2">

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-black leading-snug text-gray-900 dark:text-white line-clamp-1 sm:line-clamp-2 group-hover/card:text-teal-600 dark:group-hover/card:text-teal-400 transition-colors duration-200">
            {game.title}
          </h3>

          {/* Description — strictly 2 lines with ellipsis */}
          <p
            className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {game.description}
          </p>

          {/* ── Stats row ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 pt-0.5">
            {/* Rating */}
            <span className="flex items-center gap-0.5 font-bold text-amber-500 dark:text-amber-400 shrink-0">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {game.rate.toFixed(1)}
            </span>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            {/* Plays */}
            <span className="tabular-nums truncate">{game.plays} plays</span>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">·</span>
            {/* Time (desktop) */}
            <span className="hidden sm:inline truncate">{game.avgTime}</span>
          </div>

          {/* ── Play button ── */}
          <div className="pt-1 mt-auto">
            <button
              onClick={handlePlay}
              aria-label={`Play ${game.title}`}
              className="
                group/btn w-full flex items-center justify-center gap-1.5
                rounded-xl py-1.5 sm:py-2 min-h-[34px] sm:min-h-[38px]
                text-[11px] sm:text-xs font-bold text-white
                bg-gradient-to-r from-teal-500 to-indigo-600
                hover:from-teal-400 hover:to-indigo-500
                active:scale-[0.98]
                shadow-[0_2px_8px_rgba(20,184,166,0.2)]
                hover:shadow-[0_4px_16px_rgba(20,184,166,0.35)]
                transition-all duration-200 cursor-pointer
              "
            >
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current transition-transform duration-200 group-hover/btn:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
