"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Footer } from "../../utils/Footer";
import { AnimatedSection } from "../../utils/AnimatedSection";

const Navbar = dynamic(() => import("../../utils/Navbar"), { ssr: false });

// Mock data for leaderboard
const LEADERBOARD_DATA = [
  { id: "u1", rank: 1, username: "AlexPro", score: 15420, gamesPlayed: 142, avatar: "A", trend: "up" },
  { id: "u2", rank: 2, username: "BrainMaster", score: 14850, gamesPlayed: 135, avatar: "B", trend: "same" },
  { id: "u3", rank: 3, username: "CodeNinja", score: 13900, gamesPlayed: 120, avatar: "C", trend: "up" },
  { id: "u4", rank: 4, username: "DataWhiz", score: 12100, gamesPlayed: 105, avatar: "D", trend: "down" },
  { id: "u5", rank: 5, username: "EduGamer", score: 11500, gamesPlayed: 98, avatar: "E", trend: "up" },
  { id: "u6", rank: 6, username: "FastLearner", score: 10800, gamesPlayed: 85, avatar: "F", trend: "same" },
  { id: "u7", rank: 7, username: "GeekPro", score: 9950, gamesPlayed: 76, avatar: "G", trend: "down" },
  { id: "u8", rank: 8, username: "HackerOne", score: 9200, gamesPlayed: 65, avatar: "H", trend: "up" },
  { id: "u9", rank: 9, username: "Insightful", score: 8500, gamesPlayed: 54, avatar: "I", trend: "same" },
  { id: "u10", rank: 10, username: "JumpingJack", score: 7800, gamesPlayed: 48, avatar: "J", trend: "down" },
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "all-time">("weekly");

  return (
    <main className="min-h-screen w-full bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-gray-50 pt-16 flex flex-col">
      <Navbar />

      <div className="flex-1 pb-24">
        {/* Header */}
        <AnimatedSection mode="page-load" className="mx-auto max-w-[1200px] px-5 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-full mb-6 text-4xl">
            🏆
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Global Leaderboard
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            See how you rank against learners worldwide. Play games, earn points, and climb to the top!
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100} className="mx-auto max-w-[900px] px-5 sm:px-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex bg-gray-200/50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200 dark:border-white/10">
              <button
                onClick={() => setTimeframe("weekly")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  timeframe === "weekly"
                    ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe("all-time")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  timeframe === "all-time"
                    ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                All Time
              </button>
            </div>
            
            {/* User Personal Stats Mini-Card */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-sm">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Rank:</span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">#42</span>
              <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-1" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Score:</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">3,240</span>
            </div>
          </div>

          {/* Leaderboard Table / List */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-[40px_1fr_100px] sm:grid-cols-[60px_1fr_120px_120px] gap-4 p-4 sm:p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              <div className="text-center">Rank</div>
              <div>Player</div>
              <div className="hidden sm:block text-right">Games</div>
              <div className="text-right">Score</div>
            </div>

            {/* List Rows */}
            <div className="flex flex-col">
              {LEADERBOARD_DATA.map((user) => (
                <div
                  key={user.id}
                  className={`
                    group grid grid-cols-[40px_1fr_100px] sm:grid-cols-[60px_1fr_120px_120px] gap-4 p-4 sm:p-6 items-center
                    border-b border-gray-100 dark:border-white/5 last:border-0
                    transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.02]
                  `}
                >
                  {/* Rank */}
                  <div className="flex justify-center items-center">
                    {user.rank === 1 ? (
                      <span className="text-2xl" aria-label="First place">🥇</span>
                    ) : user.rank === 2 ? (
                      <span className="text-2xl" aria-label="Second place">🥈</span>
                    ) : user.rank === 3 ? (
                      <span className="text-2xl" aria-label="Third place">🥉</span>
                    ) : (
                      <span className="text-lg font-bold text-gray-400 dark:text-gray-500">
                        {user.rank}
                      </span>
                    )}
                  </div>

                  {/* Player */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`
                      flex shrink-0 items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full font-bold text-white shadow-inner
                      ${user.rank === 1 ? "bg-amber-400" : user.rank === 2 ? "bg-slate-300" : user.rank === 3 ? "bg-amber-600" : "bg-indigo-500"}
                    `}>
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-base sm:text-lg text-gray-900 dark:text-white flex items-center gap-2">
                        {user.username}
                        {user.trend === "up" && <span className="text-green-500 text-xs">▲</span>}
                        {user.trend === "down" && <span className="text-red-500 text-xs">▼</span>}
                        {user.trend === "same" && <span className="text-gray-400 text-xs">-</span>}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 sm:hidden">
                        {user.gamesPlayed} games played
                      </div>
                    </div>
                  </div>

                  {/* Games Played (Desktop) */}
                  <div className="hidden sm:flex justify-end items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    {user.gamesPlayed}
                  </div>

                  {/* Score */}
                  <div className="flex justify-end items-center font-black text-lg sm:text-xl text-indigo-600 dark:text-indigo-400">
                    {user.score.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </main>
  );
}
