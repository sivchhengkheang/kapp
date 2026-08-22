"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Game, PRODUCT_DATA, Difficulty } from "../constants";
import { Footer } from "../utils/Footer";
import GameCard from "../utils/GameCard";
import FeaturedCard from "../utils/FeaturedCard";
import FeaturedCarousel from "../utils/FeaturedCarousel";
import { GameCardSkeleton } from "../utils/GameCardSkeleton";
import HeroSection from "../utils/HeroSection";
import ComingSoonSection from "../utils/ComingSoonSection";
import FAQSection from "../utils/FAQSection";
import { AnimatedSection } from "../utils/AnimatedSection";
import AppPreloader from "../utils/AppPreloader";

const Navbar = dynamic(() => import("../utils/Navbar"), { ssr: false });

/* ── Unique categories derived from data ── */
const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(PRODUCT_DATA.map((g) => g.category))),
];

type SortOption =
  | "default"
  | "rating"
  | "plays"
  | "difficulty-asc"
  | "difficulty-desc";

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  Easy: 0,
  Medium: 1,
  Hard: 2,
};

function parsePlayCount(plays: string): number {
  const n = parseFloat(plays);
  if (plays.endsWith("K")) return n * 1000;
  if (plays.endsWith("M")) return n * 1_000_000;
  return n;
}

export default function Home() {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">(
    "All",
  );
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(false); // true = 4.5+ only
  const [sortOption, setSortOption] = useState<SortOption>("default");

  // Simulate loading skeletons on initial mount
  useEffect(() => {
    const timer = setTimeout(() => setIsClientLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  /* ── Featured games: top-rated fallback if < 2 have rate ≥ 4.8 ── */
  const featuredGames = useMemo(() => {
    const topRated = PRODUCT_DATA.filter((g) => g.rate >= 4.8).slice(0, 5);
    if (topRated.length >= 2) return topRated;
    return [...PRODUCT_DATA].sort((a, b) => b.rate - a.rate).slice(0, 5);
  }, []);

  const filteredGames = useMemo(() => {
    let games = PRODUCT_DATA.filter((game) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !game.title.toLowerCase().includes(query) &&
          !game.category.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      // Category chip
      if (categoryFilter !== "All" && game.category !== categoryFilter) {
        return false;
      }
      // Difficulty
      if (difficultyFilter !== "All" && game.difficulty !== difficultyFilter) {
        return false;
      }
      // Rating
      if (ratingFilter && game.rate < 4.5) {
        return false;
      }
      return true;
    });

    // Sort
    switch (sortOption) {
      case "rating":
        games = [...games].sort((a, b) => b.rate - a.rate);
        break;
      case "plays":
        games = [...games].sort(
          (a, b) => parsePlayCount(b.plays) - parsePlayCount(a.plays),
        );
        break;
      case "difficulty-asc":
        games = [...games].sort(
          (a, b) =>
            DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty],
        );
        break;
      case "difficulty-desc":
        games = [...games].sort(
          (a, b) =>
            DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty],
        );
        break;
      default:
        break;
    }

    return games;
  }, [searchQuery, categoryFilter, difficultyFilter, ratingFilter, sortOption]);

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setDifficultyFilter("All");
    setRatingFilter(false);
    setSortOption("default");
  };

  const isFiltered =
    searchQuery !== "" ||
    categoryFilter !== "All" ||
    difficultyFilter !== "All" ||
    ratingFilter ||
    sortOption !== "default";

  return (
    <AppPreloader>
      <main className="relative min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 overflow-x-clip">
        {/* ── GLOBAL BACKGROUND GRID ── */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] dark:opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.8)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]"
          style={{ backgroundSize: "32px 32px" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col">
          <Navbar />

          {/* ══ 1. HERO — page-load, immediate ══════════════════ */}
          <AnimatedSection mode="page-load" delay={0}>
            <HeroSection />
          </AnimatedSection>

        {/* ══ 2. FEATURED GAMES — scroll-triggered ════════════ */}
        <section
          id="games-section"
          aria-labelledby="games-heading"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 scroll-mt-20 py-10 sm:py-16 lg:py-20"
        >
          {/* Section header — its own scroll-reveal */}
          <AnimatedSection className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                Game Library
              </p>
              <h2
                id="games-heading"
                className="text-4xl font-black tracking-tight text-gray-900 dark:text-white"
              >
                Featured Games
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                Explore interactive games designed to build practical skills.
              </p>
            </div>
          </AnimatedSection>

          {/* ── Featured Spotlight Grid (Compact FeaturedCards, non-scrolling) ── */}
          <AnimatedSection className="mb-12">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                    Featured This Week
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                    Hand-picked top games · Updated weekly
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredGames.slice(0, 4).map((game, i) => (
                <FeaturedCard key={`featured-${game.id}`} game={game} index={i} />
              ))}
            </div>
          </AnimatedSection>

          {/* ── Unified Glassmorphic Control Bar (Category Chips + Search & Filters) ── */}
          <AnimatedSection className="mb-8 flex flex-col gap-5 bg-white/70 dark:bg-gray-900/70 p-4 sm:p-5 rounded-3xl border border-gray-200/80 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            {/* Category Chips with Icons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap">
              {ALL_CATEGORIES.map((cat) => {
                const categoryIcons: Record<string, string> = {
                  All: "🎮",
                  Coding: "💻",
                  Math: "🧮",
                  "Mouse Skills": "🐭",
                  Logic: "🧠",
                  Typing: "⌨️",
                };
                const icon = categoryIcons[cat] ?? "🎮";
                const isSelected = categoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)] scale-[1.02]"
                        : "bg-white/80 dark:bg-gray-800/80 border border-gray-200/80 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="text-sm">{icon}</span>
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            <div className="h-px bg-gray-200/70 dark:bg-white/[0.08] w-full" />

            {/* Bottom Row: Search + Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              {/* Search input with clear button */}
              <div className="relative flex-1 w-full">
                <label htmlFor="game-search" className="sr-only">
                  Search games
                </label>
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  id="game-search"
                  type="text"
                  placeholder="Search games by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 pl-10 pr-9 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Filters row */}
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar shrink-0">
                {/* Sort */}
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  aria-label="Sort games"
                  className="shrink-0 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 px-3 py-2.5 text-xs sm:text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white cursor-pointer"
                >
                  <option value="default">Default Order</option>
                  <option value="rating">Highest Rated ⭐</option>
                  <option value="plays">Most Popular 🔥</option>
                  <option value="difficulty-asc">Easiest First</option>
                  <option value="difficulty-desc">Hardest First</option>
                </select>

                {/* Difficulty */}
                <select
                  value={difficultyFilter}
                  onChange={(e) =>
                    setDifficultyFilter(e.target.value as Difficulty | "All")
                  }
                  aria-label="Filter by difficulty"
                  className="shrink-0 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 px-3 py-2.5 text-xs sm:text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white cursor-pointer"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                {/* Rating Toggle */}
                <label className="shrink-0 flex items-center gap-2 cursor-pointer bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 px-3.5 py-2.5 rounded-xl transition-all hover:border-indigo-300 dark:hover:border-indigo-500/50">
                  <input
                    type="checkbox"
                    checked={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-bold whitespace-nowrap dark:text-white">
                    4.5+ ⭐
                  </span>
                </label>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Results summary ── */}
          <div className="mb-4 flex items-center justify-between gap-3 min-h-[24px]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isClientLoaded && (
                <>
                  Showing{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {filteredGames.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {PRODUCT_DATA.length}
                  </span>{" "}
                  games
                </>
              )}
            </p>
            {isFiltered && isClientLoaded && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                Clear filters
              </button>
            )}
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[400px]">
            {!isClientLoaded ? (
              /* Loading skeletons — 6 to match 3-column grid */
              Array.from({ length: 6 }).map((_, i) => (
                <GameCardSkeleton key={i} />
              ))
            ) : filteredGames.length > 0 ? (
              filteredGames.map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))
            ) : (
              /* Empty state */
              <div className="col-span-full py-20 text-center flex flex-col items-center">
                <svg
                  className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  No games found
                </h3>
                <p className="text-gray-500 mt-2 max-w-xs">
                  No games match your current filters. Try adjusting your search
                  or difficulty.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Visual separator */}
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.08] to-transparent" />
        </div>

        {/* ══ 3. COMING SOON — scroll-triggered ═══════════════ */}
        <AnimatedSection>
          <ComingSoonSection />
        </AnimatedSection>

        {/* ══ 4. FAQ — scroll-triggered ════════════════════════ */}
        <AnimatedSection>
          <FAQSection />
        </AnimatedSection>

        {/* ══ 5. FOOTER ════════════════════════════════════════ */}
        <AnimatedSection>
          <Footer />
        </AnimatedSection>
      </div>
    </main>
    </AppPreloader>
  );
}
