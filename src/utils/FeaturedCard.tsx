"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Game } from "../constants";

export default function FeaturedCard({ game, index = 0 }: { game: Game; index?: number }) {
  const router = useRouter();
  const src = (game.thumbnail || game.cover || "/cover1.png").replace(/^(?!\/)/, "/");

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/play/${game.id}`);
  };

  return (
    <Link
      href={`/${game.id}`}
      id={`featured-card-${game.id}`}
      aria-label={`Play ${game.title}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl"
      draggable={false}
    >
      <article
        className="
          relative flex flex-col overflow-hidden rounded-2xl
          bg-white dark:bg-gray-900
          border border-gray-200/80 dark:border-white/[0.08]
          shadow-[0_4px_20px_rgba(0,0,0,0.09)]
          w-[240px] sm:w-[280px]
          transition-all duration-300 ease-out
          group-hover:-translate-y-2
          group-hover:shadow-[0_12px_36px_rgba(99,102,241,0.22),0_4px_12px_rgba(0,0,0,0.10)]
        "
      >
        {/* ── Thumbnail ─────────────────────────────── */}
        <div
          className="relative overflow-hidden bg-gray-100 dark:bg-gray-800"
          style={{ height: 160 }}
        >
          <Image
            src={src}
            alt={game.title}
            fill
            sizes="280px"
            priority={index < 3}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
            draggable={false}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* "Featured" live badge — top right */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-rose-500/85 backdrop-blur-sm px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white leading-none">
              Featured
            </span>
          </div>

          {/* Category pill — bottom left */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-lg bg-black/55 backdrop-blur-sm px-2 py-1">
            <span className="text-[12px] leading-none" aria-hidden="true">{game.categoryIcon}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/90 leading-none">
              {game.category}
            </span>
          </div>
        </div>

        {/* ── Info ──────────────────────────────────── */}
        <div className="px-4 pt-3 pb-3.5 flex flex-col gap-2.5">
          {/* Title */}
          <p className="text-sm font-bold leading-snug text-gray-900 dark:text-white line-clamp-1">
            {game.title}
          </p>

          {/* Description teaser */}
          <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
            {game.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-between gap-2">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 tabular-nums">
                {game.rate.toFixed(1)}
              </span>
            </div>

            {/* Dot separator */}
            <span className="text-gray-300 dark:text-gray-700 text-xs" aria-hidden="true">·</span>

            {/* Play count */}
            <span className="text-[10px] text-gray-400 dark:text-gray-500 tabular-nums">
              {game.plays} plays
            </span>

            {/* Dot separator */}
            <span className="text-gray-300 dark:text-gray-700 text-xs" aria-hidden="true">·</span>

            {/* Avg time */}
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {game.avgTime}
            </span>
          </div>

          {/* CTA button */}
          <button
            onClick={handlePlay}
            className={`
              mt-0.5 flex items-center justify-center gap-1.5
              rounded-lg py-2 px-3
              text-[11px] font-bold text-white
              transition-all duration-200
              group-hover:brightness-110 group-hover:shadow-md
              ${game.brandColor.split(" ").slice(0, 1).join(" ")}
            `}
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Now
          </button>
        </div>
      </article>
    </Link>
  );
}
