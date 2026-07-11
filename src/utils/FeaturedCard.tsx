"use client";

import Link from "next/link";
import Image from "next/image";
import { Game } from "../constants";

export default function FeaturedCard({ game, index = 0 }: { game: Game; index?: number }) {
  const src = (game.thumbnail || game.cover || "/cover1.png").replace(/^(?!\/)/, "/");

  return (
    <Link
      href={`/${game.id}`}
      id={`featured-card-${game.id}`}
      aria-label={`Play ${game.title}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl"
    >
      <article className="
        relative flex flex-col overflow-hidden rounded-2xl
        bg-white dark:bg-gray-900
        border border-gray-200/70 dark:border-white/[0.07]
        shadow-[0_2px_10px_rgba(0,0,0,0.07)]
        w-[200px] sm:w-[220px]
      ">
        {/* ── Thumbnail ── */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ height: 120 }}>
          <Image
            src={src}
            alt={game.title}
            fill
            sizes="220px"
            priority={index < 3}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

          {/* Category pill — bottom left */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-lg bg-black/50 backdrop-blur-sm px-2 py-0.5">
            <span className="text-[11px]" aria-hidden="true">{game.categoryIcon}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">{game.category}</span>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="px-3 py-2.5 flex flex-col gap-1.5">
          {/* Title */}
          <p className="text-sm font-bold leading-snug text-gray-900 dark:text-white line-clamp-1">
            {game.title}
          </p>

          {/* Rating + plays row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 tabular-nums">
                {game.rate.toFixed(1)}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 tabular-nums">
              {game.plays}
            </span>
          </div>

          {/* Play button */}
          <div
            className={`mt-0.5 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-bold text-white transition-all duration-200 group-hover:brightness-110 ${game.brandColor.split(" ").slice(0, 1).join(" ")}`}
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Now
          </div>
        </div>
      </article>
    </Link>
  );
}
