"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Game, PRODUCT_DATA, Difficulty } from "../constants";
import { Footer } from "../utils/Footer";
import GameCard from "../utils/GameCard";
import FeaturedCard from "../utils/FeaturedCard";
// FeaturedCarousel hidden per user request
// import FeaturedCarousel from "../utils/FeaturedCarousel";
import { GameCardSkeleton } from "../utils/GameCardSkeleton";
import HeroSection from "../utils/HeroSection";
import ComingSoonSection from "../utils/ComingSoonSection";
import FAQSection from "../utils/FAQSection";
import { AnimatedSection } from "../utils/AnimatedSection";
import AppPreloader from "../utils/AppPreloader";
import MobileFilterDrawer from "../utils/MobileFilterDrawer";

const Navbar = dynamic(() => import("../utils/Navbar"), { ssr: false });

/* ── Unique categories derived from data ── */
const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(PRODUCT_DATA.map((g) => g.category))),
];

type SortOption = "default" | "rating" | "plays" | "difficulty-asc" | "difficulty-desc";

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  Easy: 0, Medium: 1, Hard: 2,
};

const CATEGORY_ICONS: Record<string, string> = {
  All: "🎮", Coding: "💻", Math: "🧮", "Mouse Skills": "🐭",
  Logic: "🧠", Typing: "⌨️", Puzzle: "🧩",
};

const SEARCH_SUGGESTIONS = ["Typing", "Math", "Logic", "Coding", "Mouse", "Puzzle", "Dragon", "Robot", "Koompi"];

function parsePlayCount(plays: string): number {
  const n = parseFloat(plays);
  if (plays.endsWith("K")) return n * 1000;
  if (plays.endsWith("M")) return n * 1_000_000;
  return n;
}

export default function Home() {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsClientLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  /* Close search suggestions on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Listen for search queries broadcast from the Navbar */
  useEffect(() => {
    const handler = (e: Event) => {
      const query = (e as CustomEvent<{ query: string }>).detail.query;
      setSearchQuery(query);
    };
    window.addEventListener("navbar-search", handler);
    return () => window.removeEventListener("navbar-search", handler);
  }, []);

  /* ── Featured games ── */
  const featuredGames = useMemo(() => {
    const topRated = PRODUCT_DATA.filter((g) => g.rate >= 4.8).slice(0, 5);
    if (topRated.length >= 2) return topRated;
    return [...PRODUCT_DATA].sort((a, b) => b.rate - a.rate).slice(0, 5);
  }, []);

  const filteredGames = useMemo(() => {
    let games = PRODUCT_DATA.filter((game) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!game.title.toLowerCase().includes(query) && !game.category.toLowerCase().includes(query)) return false;
      }
      if (categoryFilter !== "All" && game.category !== categoryFilter) return false;
      if (difficultyFilter !== "All" && game.difficulty !== difficultyFilter) return false;
      if (ratingFilter && game.rate < 4.5) return false;
      return true;
    });
    switch (sortOption) {
      case "rating": games = [...games].sort((a, b) => b.rate - a.rate); break;
      case "plays": games = [...games].sort((a, b) => parsePlayCount(b.plays) - parsePlayCount(a.plays)); break;
      case "difficulty-asc": games = [...games].sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]); break;
      case "difficulty-desc": games = [...games].sort((a, b) => DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty]); break;
    }
    return games;
  }, [searchQuery, categoryFilter, difficultyFilter, ratingFilter, sortOption]);

  const clearFilters = () => {
    setSearchQuery(""); setCategoryFilter("All"); setDifficultyFilter("All");
    setRatingFilter(false); setSortOption("default");
  };

  const activeFilterCount = [
    categoryFilter !== "All",
    difficultyFilter !== "All",
    ratingFilter,
    sortOption !== "default",
  ].filter(Boolean).length;

  const isFiltered = searchQuery !== "" || activeFilterCount > 0;

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(
    (s) => searchQuery.length > 0 && s.toLowerCase().includes(searchQuery.toLowerCase()) && s.toLowerCase() !== searchQuery.toLowerCase()
  );

  return (
    <AppPreloader>
      <main className="relative min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 overflow-x-clip">
        {/* ── Background grid ── */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] dark:opacity-[0.035] bg-[linear-gradient(rgba(0,0,0,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.8)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]"
          style={{ backgroundSize: "32px 32px" }}
          aria-hidden="true"
        />

        {/* ── Mesh gradient overlay ── */}
        <div className="fixed inset-0 pointer-events-none z-0 mesh-gradient opacity-60" aria-hidden="true" />

        <div className="relative z-10 flex flex-col">
          <Navbar />

          {/* ══ 1. HERO — hidden, replaced by game-first layout ══ */}
          {/* <AnimatedSection mode="page-load" delay={0}>
            <HeroSection />
          </AnimatedSection> */}

          {/* ══ 2. GAME LIBRARY ══════════════════════════════════ */}
          <section
            id="games-section"
            aria-labelledby="games-heading"
            className="mx-auto w-full max-w-7xl px-3.5 sm:px-6 scroll-mt-16 pt-20 sm:pt-24 pb-10 sm:pb-16 lg:pb-20"
          >
            {/* Section header */}
            <AnimatedSection className="mb-5 sm:mb-8">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Title row */}
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-400">
                    🎮 Game Library
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <h2
                      id="games-heading"
                      className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white"
                    >
                      Featured Games
                    </h2>
                    {isClientLoaded && (
                      <span className="sm:hidden text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200/50 dark:border-teal-500/20">
                        {filteredGames.length} games
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Interactive games designed to build real-world skills — all free to play.
                  </p>
                </div>

                {/* Filter row: difficulty + rating + count + reset */}
                {/* Category chips hidden per user request */}
                <div className="flex flex-col gap-2.5">
                  {/* Row 2: difficulty tabs + rating + count + reset */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Difficulty pill tabs */}
                    <div className="hidden sm:flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200/70 dark:border-gray-700 shrink-0">
                      {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDifficultyFilter(d as Difficulty | "All")}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                            difficultyFilter === d
                              ? d === "Easy" ? "bg-teal-500 text-white shadow-sm"
                                : d === "Medium" ? "bg-amber-500 text-white shadow-sm"
                                : d === "Hard" ? "bg-rose-500 text-white shadow-sm"
                                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          }`}
                        >
                          {d === "All" ? "All" : d}
                        </button>
                      ))}
                    </div>

                    {/* Rating toggle */}
                    <button
                      onClick={() => setRatingFilter(!ratingFilter)}
                      className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer shrink-0 ${
                        ratingFilter
                          ? "bg-amber-50 dark:bg-amber-500/15 border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-300"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-amber-300 dark:hover:border-amber-500/40 hover:text-amber-600"
                      }`}
                    >
                      <span>⭐</span>
                      <span className="whitespace-nowrap">4.5+</span>
                      {ratingFilter && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </button>

                    {/* Game count */}
                    {isClientLoaded && (
                      <div className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border shrink-0 transition-all duration-200 ${
                        isFiltered
                          ? "bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                      }`}>
                        {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""}
                      </div>
                    )}

                    {/* Reset */}
                    {isFiltered && (
                      <button
                        onClick={clearFilters}
                        className="hidden sm:flex items-center gap-1 text-xs font-semibold text-rose-500 dark:text-rose-400 hover:text-rose-600 px-2 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer transition-colors shrink-0"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        Reset
                      </button>
                    )}

                    {/* Mobile filters button */}
                    <button
                      onClick={() => setIsFilterDrawerOpen(true)}
                      className="sm:hidden flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 transition-all cursor-pointer hover:opacity-90 active:scale-95 relative shadow-sm shrink-0"
                      aria-label="Open filters"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                      </svg>
                      Filters
                      {activeFilterCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white text-[10px] font-black border-2 border-white dark:border-gray-900">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ── Featured This Week — commented out ── */}
            {/*
            <AnimatedSection className="mb-12">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3.5 w-3.5 shrink-0" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                      Featured This Week
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                      Hand-picked top games · Updated weekly
                    </p>
                  </div>
                </div>
                <div className="glass-teal rounded-full px-4 py-2 items-center gap-2 w-fit hidden sm:flex">
                  <span className="text-sm font-black text-teal-700 dark:text-teal-300">{PRODUCT_DATA.length}</span>
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">games available</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {featuredGames.slice(0, 4).map((game, i) => (
                  <FeaturedCard key={`featured-${game.id}`} game={game} index={i} />
                ))}
              </div>
            </AnimatedSection>
            */}



            {/* ── Cards Grid (2-cols on mobile, responsive multi-col on larger screens) ── */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[400px]">
              {!isClientLoaded ? (
                Array.from({ length: 6 }).map((_, i) => <GameCardSkeleton key={i} />)
              ) : filteredGames.length > 0 ? (
                filteredGames.map((game, i) => <GameCard key={game.id} game={game} index={i} />)
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-5">
                    <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">No games found</h3>
                  <p className="text-gray-500 mt-2 max-w-xs text-sm">
                    No games match your current filters. Try adjusting your search or filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-6 btn-micro inline-flex items-center gap-2 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/10 px-5 py-2.5 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-500/20 transition-all duration-200 cursor-pointer"
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
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.08] to-transparent" />
          </div>

          {/* ══ 3. COMING SOON ══════════════════════════════════ */}
          <AnimatedSection>
            <ComingSoonSection />
          </AnimatedSection>

          {/* ══ 4. FAQ ═══════════════════════════════════════════ */}
          <AnimatedSection>
            <FAQSection />
          </AnimatedSection>

          {/* ══ 5. FOOTER ════════════════════════════════════════ */}
          <AnimatedSection>
            <Footer />
          </AnimatedSection>
        </div>
      </main>

      {/* ── Mobile Filter Drawer ── */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        allCategories={ALL_CATEGORIES}
        activeCount={activeFilterCount}
        onClear={clearFilters}
      />
    </AppPreloader>
  );
}
