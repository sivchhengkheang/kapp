"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Difficulty } from "../constants";

type SortOption = "default" | "rating" | "plays" | "difficulty-asc" | "difficulty-desc";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  difficultyFilter: Difficulty | "All";
  setDifficultyFilter: (v: Difficulty | "All") => void;
  ratingFilter: boolean;
  setRatingFilter: (v: boolean) => void;
  sortOption: SortOption;
  setSortOption: (v: SortOption) => void;
  allCategories: string[];
  activeCount: number;
  onClear: () => void;
}

const DIFFICULTY_OPTIONS: Array<{ label: string; value: Difficulty | "All"; color: string }> = [
  { label: "All", value: "All", color: "from-gray-500 to-gray-400" },
  { label: "Easy", value: "Easy", color: "from-teal-500 to-emerald-500" },
  { label: "Medium", value: "Medium", color: "from-amber-500 to-orange-500" },
  { label: "Hard", value: "Hard", color: "from-rose-500 to-pink-600" },
];

const SORT_OPTIONS: Array<{ label: string; value: SortOption; icon: string }> = [
  { label: "Default Order", value: "default", icon: "⚡" },
  { label: "Highest Rated", value: "rating", icon: "⭐" },
  { label: "Most Popular", value: "plays", icon: "🔥" },
  { label: "Easiest First", value: "difficulty-asc", icon: "📈" },
  { label: "Hardest First", value: "difficulty-desc", icon: "📉" },
];

const CATEGORY_ICONS: Record<string, string> = {
  All: "🎮", Coding: "💻", Math: "🧮", "Mouse Skills": "🐭",
  Logic: "🧠", Typing: "⌨️", Puzzle: "🧩",
};

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  categoryFilter,
  setCategoryFilter,
  difficultyFilter,
  setDifficultyFilter,
  ratingFilter,
  setRatingFilter,
  sortOption,
  setSortOption,
  allCategories,
  activeCount,
  onClear,
}: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 260);
  }, [onClose]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="filter-drawer-overlay"
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter games"
        className={`filter-drawer-panel bg-white dark:bg-gray-900 shadow-2xl ${isClosing ? "closing" : ""}`}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="px-5 pt-2 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-gray-900 dark:text-white">Filters</h2>
              {activeCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                  {activeCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeCount > 0 && (
                <button
                  onClick={onClear}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={close}
                aria-label="Close filters"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-3">
              Sort By
            </p>
            <div className="grid grid-cols-1 gap-2">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = sortOption === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSortOption(opt.value)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    <span className="text-base">{opt.icon}</span>
                    {opt.label}
                    {isSelected && (
                      <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-3">
              Difficulty
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {DIFFICULTY_OPTIONS.map((opt) => {
                const isSelected = difficultyFilter === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setDifficultyFilter(opt.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? `bg-gradient-to-r ${opt.color} text-white border-transparent shadow-md`
                        : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-3">
              Category
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {allCategories.map((cat) => {
                const isSelected = categoryFilter === cat;
                const icon = CATEGORY_ICONS[cat] ?? "🎮";
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-md"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500/40"
                    }`}
                  >
                    <span>{icon}</span>
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-3">
              Rating
            </p>
            <button
              onClick={() => setRatingFilter(!ratingFilter)}
              className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                ratingFilter
                  ? "bg-amber-500 text-white border-transparent shadow-md shadow-amber-500/25"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-500/40"
              }`}
            >
              <span className="text-xl">⭐</span>
              <div>
                <p className="text-sm font-bold">4.5+ Stars Only</p>
                <p className={`text-xs mt-0.5 ${ratingFilter ? "text-white/80" : "text-gray-400 dark:text-gray-500"}`}>
                  Show only highly-rated games
                </p>
              </div>
              {ratingFilter && (
                <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Apply button */}
          <button
            onClick={close}
            className="btn-micro w-full flex items-center justify-center gap-2 rounded-xl py-4 bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Apply Filters {activeCount > 0 && `(${activeCount} active)`}
          </button>
        </div>
      </div>
    </>
  );
}
