"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Game, PRODUCT_DATA, Difficulty } from "../constants";
import { Footer } from "../utils/Footer";
import GameCard from "../utils/GameCard";
import { GameCardSkeleton } from "../utils/GameCardSkeleton";
import HeroSection from "../utils/HeroSection";
import ComingSoonSection from "../utils/ComingSoonSection";
import FAQSection from "../utils/FAQSection";
import { AnimatedSection } from "../utils/AnimatedSection";

const Navbar = dynamic(() => import("../utils/Navbar"), { ssr: false });

export default function Home() {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">("All");
  const [ratingFilter, setRatingFilter] = useState(false); // true = 4.5+ only

  // Simulate loading skeletons on initial mount
  useEffect(() => {
    const timer = setTimeout(() => setIsClientLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredGames = useMemo(() => {
    return PRODUCT_DATA.filter((game) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!game.title.toLowerCase().includes(query) && !game.category.toLowerCase().includes(query)) {
          return false;
        }
      }
      // Difficulty
      if (difficultyFilter !== "All" && game.difficulty !== difficultyFilter) {
        return false;
      }
      // Rating
      if (ratingFilter && parseFloat(game.rate) < 4.5) {
        return false;
      }
      return true;
    });
  }, [searchQuery, difficultyFilter, ratingFilter]);

  return (
    <main className="min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50">
      <Navbar />

      {/* ══ 1. HERO — page-load, immediate ══════════════════ */}
      <AnimatedSection mode="page-load" delay={0}>
        <HeroSection />
      </AnimatedSection>

      {/* ══ 2. FEATURED GAMES — scroll-triggered ════════════ */}
      <section
        id="games-section"
        aria-labelledby="games-heading"
        className="mx-auto max-w-[1200px] px-5 sm:px-6 scroll-mt-20 py-[90px]"
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

        {/* ── Toolbar (Search & Filters) ── */}
        <AnimatedSection className="mb-10 flex flex-col sm:flex-row items-center gap-4 bg-white/50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-sm">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white"
            />
          </div>

          <div className="flex w-full sm:w-auto items-center gap-3 overflow-x-auto no-scrollbar sm:ml-auto">
            {/* Difficulty Toggle */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | "All")}
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Rating Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-3 py-2.5 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="checkbox"
                checked={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-sm font-medium whitespace-nowrap dark:text-white">4.5+ ⭐</span>
            </label>
          </div>
        </AnimatedSection>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[400px]">
          {!isClientLoaded ? (
            /* Loading skeletons (simulate network/render time) */
            Array.from({ length: 3 }).map((_, i) => (
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
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDifficultyFilter("All");
                  setRatingFilter(false);
                }}
                className="mt-6 text-indigo-600 font-semibold hover:underline"
              >
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
    </main>
  );
}
