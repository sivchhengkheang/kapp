"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Game, PRODUCT_DATA, Difficulty } from "../constants";
import { Footer } from "../utils/Footer";
import GameCard from "../utils/GameCard";
import FeaturedCarousel from "../utils/FeaturedCarousel";
import { GameCardSkeleton } from "../utils/GameCardSkeleton";
import HeroSection from "../utils/HeroSection";
import ComingSoonSection from "../utils/ComingSoonSection";
import FAQSection from "../utils/FAQSection";
import { AnimatedSection } from "../utils/AnimatedSection";

const Navbar = dynamic(() => import("../utils/Navbar"), { ssr: false });

/* ── Unique categories derived from data ── */
const ALL_CATEGORIES = ["All", ...Array.from(new Set(PRODUCT_DATA.map((g) => g.category)))];

type SortOption = "default" | "rating" | "plays" | "difficulty-asc" | "difficulty-desc";

const DIFFICULTY_ORDER: Record<Difficulty, number> = { Easy: 0, Medium: 1, Hard: 2 };

function parsePlayCount(plays: string): number {
  const n = parseFloat(plays);
  if (plays.endsWith("K")) return n * 1000;
  if (plays.endsWith("M")) return n * 1_000_000;
  return n;
}

export default function Home() {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">("All");
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
        if (!game.title.toLowerCase().includes(query) && !game.category.toLowerCase().includes(query)) {
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
        games = [...games].sort((a, b) => parsePlayCount(b.plays) - parsePlayCount(a.plays));
        break;
      case "difficulty-asc":
        games = [...games].sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
        break;
      case "difficulty-desc":
        games = [...games].sort((a, b) => DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty]);
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
    <main className="relative min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 overflow-x-hidden">
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
          className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 scroll-mt-16 py-12 sm:py-[90px]"
        >
          {/* Section header — its own scroll-reveal */}
          <AnimatedSection className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
                Choose your first game to begin.
              </p>
            </div>
          </AnimatedSection>

          {/* ── Featured This Week Carousel ── */}
          <AnimatedSection className="mb-12">
            {/* Header row */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Live pulse dot */}
                <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                </span>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                    Featured This Week
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                    Hand-picked top games · Updated every week
                  </p>
                </div>
              </div>
              {/* Interaction hint — desktop only */}
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-600 font-medium select-none">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                drag to explore
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </span>
            </div>
            <FeaturedCarousel games={featuredGames} />
          </AnimatedSection>

          {/* ── Category Chips ── */}
          <AnimatedSection className="mb-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                    categoryFilter === cat
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
                      : "border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
                  }`}
                  aria-pressed={categoryFilter === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* ── Toolbar (Search & Filters) ── */}
          <AnimatedSection className="mb-6 flex flex-col gap-3 bg-white/50 dark:bg-gray-900/50 p-3 sm:p-4 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-sm">
            {/* Search — full width always */}
            <div className="relative w-full">
              <label htmlFor="game-search" className="sr-only">Search games</label>
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                id="game-search"
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white"
              />
            </div>

            {/* Filters row — scrollable on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {/* Sort */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Sort games"
                className="shrink-0 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs sm:text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white cursor-pointer"
              >
                <option value="default">Default Order</option>
                <option value="rating">Highest Rated</option>
                <option value="plays">Most Popular</option>
                <option value="difficulty-asc">Easiest First</option>
                <option value="difficulty-desc">Hardest First</option>
              </select>

              {/* Difficulty */}
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | "All")}
                aria-label="Filter by difficulty"
                className="shrink-0 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs sm:text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              {/* Rating Toggle */}
              <label className="shrink-0 flex items-center gap-2 cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="checkbox"
                  checked={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap dark:text-white">4.5+ ⭐</span>
              </label>
            </div>
          </AnimatedSection>

          {/* ── Results summary ── */}
          <div className="mb-4 flex items-center justify-between gap-3 min-h-[24px]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isClientLoaded && (
                <>
                  Showing{" "}
                  <span className="font-bold text-gray-900 dark:text-white">{filteredGames.length}</span>
                  {" "}of{" "}
                  <span className="font-bold text-gray-900 dark:text-white">{PRODUCT_DATA.length}</span>
                  {" "}games
                </>
              )}
            </p>
            {isFiltered && isClientLoaded && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
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
                <svg className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">No games found</h3>
                <p className="text-gray-500 mt-2 max-w-xs">
                  No games match your current filters. Try adjusting your search or difficulty.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Visual separator */}
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
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
  );
}
