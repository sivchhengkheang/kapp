"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Game, Difficulty } from "../constants";

const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; text: string; dot: string }> = {
  Easy:   { bg: "bg-teal-50 dark:bg-teal-500/10",   text: "text-teal-700 dark:text-teal-400",   dot: "bg-teal-500" },
  Medium: { bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
  Hard:   { bg: "bg-rose-50 dark:bg-rose-500/10",   text: "text-rose-700 dark:text-rose-400",   dot: "bg-rose-500" },
};

const DESKTOP_CATEGORIES = new Set(["Coding", "Typing"]);

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
          w-full h-full
          transition-all duration-300 ease-out
          group-hover:-translate-y-1
          group-hover:shadow-[0_20px_48px_rgba(20,184,166,0.22),0_6px_16px_rgba(0,0,0,0.12)]
          group-hover:border-teal-300/50 dark:group-hover:border-teal-500/30
        "
      >
        {/* ── Thumbnail ─────────────────────────────── */}
        <div
          className="relative overflow-hidden bg-gray-100 dark:bg-gray-800"
          style={{ height: 200 }}
        >
          <Image
            src={src}
            alt={game.title}
            fill
            sizes="320px"
            priority={index < 3}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
            draggable={false}
          />

          {/* Gradient overlay — stronger at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          {/* "Featured" live badge — top right */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-rose-500 backdrop-blur-sm px-2.5 py-1 shadow-md shadow-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-[9px] font-black uppercase tracking-[0.12em] text-white leading-none">
              Featured
            </span>
          </div>

          {/* Category pill — bottom left */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1">
            <span className="text-[13px] leading-none" aria-hidden="true">{game.categoryIcon}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/90 leading-none">
              {game.category}
            </span>
          </div>
        </div>

        {/* ── Info ──────────────────────────────────── */}
        <div className="px-4 pt-3.5 pb-4 flex flex-col gap-2.5">
          {/* Title */}
          <p className="text-sm font-bold leading-snug text-gray-900 dark:text-white line-clamp-1">
            {game.title}
          </p>

          {/* Description teaser */}
          <p
            className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {game.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-2">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 tabular-nums">
                {game.rate.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-300 dark:text-gray-700 text-xs" aria-hidden="true">·</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 tabular-nums">
              {game.plays} plays
            </span>
            <span className="text-gray-300 dark:text-gray-700 text-xs" aria-hidden="true">·</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {game.avgTime}
            </span>
          </div>

          {/* Difficulty + mobile compat */}
          {(() => {
            const diff = DIFFICULTY_STYLES[game.difficulty] ?? DIFFICULTY_STYLES.Easy;
            const isDesktopOnly = DESKTOP_CATEGORIES.has(game.category);
            return (
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${diff.bg} ${diff.text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
                  {game.difficulty}
                </span>
                <span
                  title={isDesktopOnly ? "Best experienced with a keyboard" : "Works on mobile"}
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
                    isDesktopOnly
                      ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400"
                      : "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400"
                  }`}
                >
                  {isDesktopOnly ? (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="2" y="3" width="20" height="14" rx="2" /><path strokeLinecap="round" d="M8 21h8M12 17v4" />
                    </svg>
                  ) : (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="7" y="2" width="10" height="20" rx="2" /><path strokeLinecap="round" d="M12 18h.01" />
                    </svg>
                  )}
                  {isDesktopOnly ? "Desktop" : "Mobile"}
                </span>
              </div>
            );
          })()}

          {/* CTA button — premium gradient */}
          <button
            onClick={handlePlay}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-[12px] font-black text-white transition-all duration-200 group-hover:brightness-110 group-hover:shadow-lg active:scale-[0.97] cursor-pointer"
            style={{ background: "linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)", boxShadow: "0 4px 14px rgba(20,184,166,0.25)" }}
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Now
          </button>
        </div>
      </article>
    </Link>
  );
}
