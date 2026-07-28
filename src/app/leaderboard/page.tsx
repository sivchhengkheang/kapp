"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Footer } from "../../utils/Footer";
import { AnimatedSection } from "../../utils/AnimatedSection";
import {
  Trophy,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Gamepad2,
  Zap,
  Target,
  Flame,
  BarChart3,
  ChevronDown,
  Star,
  Clock,
  Users,
} from "lucide-react";

const Navbar = dynamic(() => import("../../utils/Navbar"), { ssr: false });

// ── Tier system ─────────────────────────────────────────────────────────────
type Tier = "Bronze" | "Silver" | "Gold" | "Platinum";

function getTier(score: number): Tier {
  if (score >= 15001) return "Platinum";
  if (score >= 10001) return "Gold";
  if (score >= 5001) return "Silver";
  return "Bronze";
}

const TIER_CONFIG: Record<
  Tier,
  { label: string; emoji: string; color: string; glow: string; bg: string; border: string; text: string }
> = {
  Bronze: {
    label: "Bronze",
    emoji: "🥉",
    color: "from-orange-700 to-amber-600",
    glow: "shadow-orange-500/30",
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-200/70 dark:border-orange-500/30",
    text: "text-orange-700 dark:text-orange-400",
  },
  Silver: {
    label: "Silver",
    emoji: "🥈",
    color: "from-slate-400 to-gray-500",
    glow: "shadow-slate-400/30",
    bg: "bg-slate-50 dark:bg-slate-500/10",
    border: "border-slate-200/70 dark:border-slate-500/30",
    text: "text-slate-600 dark:text-slate-300",
  },
  Gold: {
    label: "Gold",
    emoji: "🥇",
    color: "from-amber-400 to-yellow-500",
    glow: "shadow-amber-400/40",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200/70 dark:border-amber-500/30",
    text: "text-amber-700 dark:text-amber-400",
  },
  Platinum: {
    label: "Platinum",
    emoji: "💎",
    color: "from-indigo-400 via-violet-500 to-purple-600",
    glow: "shadow-violet-500/40",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-200/70 dark:border-indigo-500/30",
    text: "text-indigo-700 dark:text-indigo-400",
  },
};

function TierBadge({ score, size = "sm" }: { score: number; size?: "sm" | "lg" }) {
  const tier = getTier(score);
  const cfg = TIER_CONFIG[tier];
  const sizeClass = size === "lg" ? "text-base px-3 py-1.5 gap-1.5" : "text-xs px-2 py-0.5 gap-1";
  return (
    <span
      className={`inline-flex items-center font-bold rounded-full ${cfg.bg} ${cfg.border} border ${cfg.text} ${sizeClass}`}
    >
      {cfg.emoji} {cfg.label}
    </span>
  );
}

// ── Rich mock data ──────────────────────────────────────────────────────────
interface Player {
  id: string;
  rank: number;
  username: string;
  score: number;
  gamesPlayed: number;
  avatar: string;
  trend: "up" | "down" | "same";
  winRate: number;
  streak: number;
  favoriteGame: string;
  favoriteGameIcon: string;
  lastActive: string;
  completionRate: number;
  gameCategory: string;
  region: string;
}

const ALL_PLAYERS: Player[] = [
  { id: "u1",  rank: 1,  username: "AlexPro",      score: 15420, gamesPlayed: 142, avatar: "A", trend: "up",   winRate: 87, streak: 14, favoriteGame: "Typing Code",    favoriteGameIcon: "💻", lastActive: "Today",       completionRate: 96, gameCategory: "Coding",     region: "Asia" },
  { id: "u2",  rank: 2,  username: "BrainMaster",   score: 14850, gamesPlayed: 135, avatar: "B", trend: "same", winRate: 82, streak: 9,  favoriteGame: "Robot Obstacle", favoriteGameIcon: "🤖", lastActive: "Today",       completionRate: 92, gameCategory: "Logic",      region: "Asia" },
  { id: "u3",  rank: 3,  username: "CodeNinja",     score: 13900, gamesPlayed: 120, avatar: "C", trend: "up",   winRate: 79, streak: 21, favoriteGame: "Typing Code",    favoriteGameIcon: "💻", lastActive: "Yesterday",   completionRate: 94, gameCategory: "Coding",     region: "SEA" },
  { id: "u4",  rank: 4,  username: "DataWhiz",      score: 12100, gamesPlayed: 105, avatar: "D", trend: "down", winRate: 74, streak: 3,  favoriteGame: "Typing Math",    favoriteGameIcon: "🔢", lastActive: "2 days ago",  completionRate: 88, gameCategory: "Math",       region: "Asia" },
  { id: "u5",  rank: 5,  username: "EduGamer",      score: 11500, gamesPlayed: 98,  avatar: "E", trend: "up",   winRate: 71, streak: 7,  favoriteGame: "Koompi Typing",  favoriteGameIcon: "⌨️", lastActive: "Today",       completionRate: 90, gameCategory: "Typing",     region: "SEA" },
  { id: "u6",  rank: 6,  username: "FastLearner",   score: 10800, gamesPlayed: 85,  avatar: "F", trend: "same", winRate: 68, streak: 5,  favoriteGame: "Dragon Drop",    favoriteGameIcon: "🐉", lastActive: "3 days ago",  completionRate: 85, gameCategory: "Mouse",      region: "Global" },
  { id: "u7",  rank: 7,  username: "GeekPro",       score: 9950,  gamesPlayed: 76,  avatar: "G", trend: "down", winRate: 65, streak: 0,  favoriteGame: "Number Link",    favoriteGameIcon: "🧩", lastActive: "1 week ago",  completionRate: 80, gameCategory: "Puzzle",     region: "Asia" },
  { id: "u8",  rank: 8,  username: "HackerOne",     score: 9200,  gamesPlayed: 65,  avatar: "H", trend: "up",   winRate: 63, streak: 11, favoriteGame: "Typing Code",    favoriteGameIcon: "💻", lastActive: "Today",       completionRate: 91, gameCategory: "Coding",     region: "Global" },
  { id: "u9",  rank: 9,  username: "Insightful",    score: 8500,  gamesPlayed: 54,  avatar: "I", trend: "same", winRate: 60, streak: 2,  favoriteGame: "Typing Math",    favoriteGameIcon: "🔢", lastActive: "Yesterday",   completionRate: 78, gameCategory: "Math",       region: "SEA" },
  { id: "u10", rank: 10, username: "JumpingJack",   score: 7800,  gamesPlayed: 48,  avatar: "J", trend: "down", winRate: 57, streak: 0,  favoriteGame: "Master Mouse",   favoriteGameIcon: "🖱️", lastActive: "4 days ago",  completionRate: 75, gameCategory: "Mouse",      region: "Asia" },
  { id: "u11", rank: 11, username: "KiloSpeed",     score: 7200,  gamesPlayed: 43,  avatar: "K", trend: "up",   winRate: 55, streak: 6,  favoriteGame: "Koompi Typing",  favoriteGameIcon: "⌨️", lastActive: "Today",       completionRate: 83, gameCategory: "Typing",     region: "SEA" },
  { id: "u12", rank: 12, username: "LogicLord",     score: 6600,  gamesPlayed: 38,  avatar: "L", trend: "up",   winRate: 52, streak: 4,  favoriteGame: "Robot Obstacle", favoriteGameIcon: "🤖", lastActive: "2 days ago",  completionRate: 77, gameCategory: "Logic",      region: "Global" },
  { id: "u13", rank: 13, username: "MindMapper",    score: 5900,  gamesPlayed: 32,  avatar: "M", trend: "same", winRate: 49, streak: 1,  favoriteGame: "Number Link",    favoriteGameIcon: "🧩", lastActive: "3 days ago",  completionRate: 72, gameCategory: "Puzzle",     region: "Asia" },
  { id: "u14", rank: 14, username: "NightCoder",    score: 5200,  gamesPlayed: 27,  avatar: "N", trend: "down", winRate: 46, streak: 0,  favoriteGame: "Typing Code",    favoriteGameIcon: "💻", lastActive: "1 week ago",  completionRate: 68, gameCategory: "Coding",     region: "SEA" },
  // "You" — the current user (rank 15)
  { id: "you", rank: 15, username: "You",           score: 4800,  gamesPlayed: 24,  avatar: "Y", trend: "up",   winRate: 44, streak: 3,  favoriteGame: "Koompi Typing",  favoriteGameIcon: "⌨️", lastActive: "Today",       completionRate: 70, gameCategory: "Typing",     region: "SEA" },
  { id: "u16", rank: 16, username: "OpenMind",      score: 4300,  gamesPlayed: 20,  avatar: "O", trend: "up",   winRate: 42, streak: 2,  favoriteGame: "Dragon Drop",    favoriteGameIcon: "🐉", lastActive: "Today",       completionRate: 65, gameCategory: "Mouse",      region: "Asia" },
  { id: "u17", rank: 17, username: "PuzzlePro",     score: 3700,  gamesPlayed: 16,  avatar: "P", trend: "same", winRate: 38, streak: 0,  favoriteGame: "Number Link",    favoriteGameIcon: "🧩", lastActive: "5 days ago",  completionRate: 60, gameCategory: "Puzzle",     region: "Global" },
];

// User is rank 15 out of ~500 (simulated)
const USER_RANK = 15;
const TOTAL_PLAYERS = 500;
const USER_ID = "you";

type SortKey = "score" | "gamesPlayed" | "winRate" | "streak";
type TimeFrame = "weekly" | "all-time";
type TabKey = "global" | "typing" | "coding" | "math" | "logic" | "mouse" | "puzzle";

const TABS: { key: TabKey; label: string; icon: string; category?: string }[] = [
  { key: "global",  label: "Global",      icon: "🌍" },
  { key: "typing",  label: "Typing",      icon: "⌨️", category: "Typing" },
  { key: "coding",  label: "Coding",      icon: "💻", category: "Coding" },
  { key: "math",    label: "Math",        icon: "🔢", category: "Math" },
  { key: "logic",   label: "Logic",       icon: "🤖", category: "Logic" },
  { key: "mouse",   label: "Mouse",       icon: "🖱️", category: "Mouse" },
  { key: "puzzle",  label: "Puzzle",      icon: "🧩", category: "Puzzle" },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "score",       label: "Score" },
  { key: "gamesPlayed", label: "Games" },
  { key: "winRate",     label: "Win Rate" },
  { key: "streak",      label: "Streak" },
];

// ── Score distribution data (CSS only) ─────────────────────────────────────
const SCORE_DIST = [
  { label: "0–5K",    pct: 42, tier: "Bronze" as Tier },
  { label: "5–10K",   pct: 28, tier: "Silver" as Tier },
  { label: "10–15K",  pct: 18, tier: "Gold" as Tier },
  { label: "15K+",    pct: 12, tier: "Platinum" as Tier },
];

// ────────────────────────────────────────────────────────────────────────────
export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("weekly");
  const [activeTab, setActiveTab] = useState<TabKey>("global");
  const [sortBy, setSortBy] = useState<SortKey>("score");

  const filtered = useMemo(() => {
    let list = [...ALL_PLAYERS];
    const tab = TABS.find((t) => t.key === activeTab);
    if (tab?.category) {
      list = list.filter((p) => p.gameCategory === tab.category);
    }
    list.sort((a, b) => b[sortBy] - a[sortBy]);
    // Re-assign ranks after sort
    return list.map((p, i) => ({ ...p, rank: i + 1 }));
  }, [activeTab, sortBy]);

  const top3 = filtered.slice(0, 3);
  const restOfList = filtered.slice(3);
  const userPercentile = Math.round((1 - USER_RANK / TOTAL_PLAYERS) * 100);

  // "Nearby" players — find index of user in filtered list, show ±3
  const userIndex = filtered.findIndex((p) => p.id === USER_ID);
  const nearbyStart = Math.max(0, userIndex - 3);
  const nearbyEnd = Math.min(filtered.length - 1, userIndex + 3);
  const nearbyPlayers = filtered.slice(nearbyStart, nearbyEnd + 1);

  return (
    <main className="min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 pt-16 flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 pb-32">
        {/* Background gradient */}
        <div className="absolute top-0 inset-x-0 h-[700px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/5 via-purple-500/5 to-transparent pointer-events-none" />

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <AnimatedSection
          mode="page-load"
          className="relative z-10 mx-auto max-w-[1100px] px-5 sm:px-6 pt-20 pb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 mb-6">
            <Trophy className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Global Rankings
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
            Hall of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500">
              Fame
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            See how you rank against learners worldwide. Play games, earn
            points, and climb to the top!
          </p>
        </AnimatedSection>

        <AnimatedSection
          delay={1}
          className="relative z-10 mx-auto max-w-[1100px] px-5 sm:px-6"
        >
          {/* ── PERSONAL STAT CARDS ─────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: <Target className="w-5 h-5 text-indigo-500" />,
                label: "Your Rank",
                value: `#${USER_RANK}`,
                sub: `Top ${userPercentile}% globally`,
                accent: "from-indigo-500/10 to-violet-500/10",
                border: "border-indigo-200/60 dark:border-indigo-500/20",
              },
              {
                icon: <Star className="w-5 h-5 text-amber-500" />,
                label: "Your Score",
                value: "4,800",
                sub: "+320 this week",
                accent: "from-amber-500/10 to-orange-500/10",
                border: "border-amber-200/60 dark:border-amber-500/20",
              },
              {
                icon: <Zap className="w-5 h-5 text-emerald-500" />,
                label: "Win Rate",
                value: "44%",
                sub: "+2 spots this week",
                accent: "from-emerald-500/10 to-teal-500/10",
                border: "border-emerald-200/60 dark:border-emerald-500/20",
              },
              {
                icon: <Flame className="w-5 h-5 text-red-500" />,
                label: "Streak",
                value: "3 days",
                sub: "Personal best: 7 days",
                accent: "from-red-500/10 to-orange-500/10",
                border: "border-red-200/60 dark:border-red-500/20",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`relative group rounded-2xl bg-gradient-to-br ${card.accent} border ${card.border} p-4 sm:p-5 overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {card.icon}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {card.label}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-1">
                  {card.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {card.sub}
                </div>
              </div>
            ))}
          </div>

          {/* ── CONTROLS ROW ────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            {/* Timeframe toggle */}
            <div className="flex bg-gray-200/60 dark:bg-gray-900/80 p-1.5 rounded-2xl border border-gray-300/50 dark:border-white/10 backdrop-blur-sm">
              {(["weekly", "all-time"] as TimeFrame[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 capitalize ${
                    timeframe === tf
                      ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-white shadow-md scale-105"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  {tf === "all-time" ? "All Time" : "Weekly"}
                </button>
              ))}
            </div>

            {/* Sort pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Sort:
              </span>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                    sortBy === opt.key
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── GAME CATEGORY TABS ──────────────────────────────── */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── SCORE DISTRIBUTION BAR ──────────────────────────── */}
          <div className="bg-white dark:bg-gray-900/80 border border-gray-200/70 dark:border-white/[0.07] rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Score Distribution
                </span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                {TOTAL_PLAYERS.toLocaleString()} players
              </span>
            </div>
            <div className="flex items-end gap-3">
              {SCORE_DIST.map((d, i) => {
                const cfg = TIER_CONFIG[d.tier];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md"
                      style={{
                        height: `${d.pct * 1.6}px`,
                        background: `linear-gradient(to top, ${
                          d.tier === "Bronze" ? "#b45309,#d97706" :
                          d.tier === "Silver" ? "#94a3b8,#64748b" :
                          d.tier === "Gold" ? "#f59e0b,#fbbf24" :
                          "#6366f1,#8b5cf6"
                        })`,
                        opacity: 0.85,
                        transition: "height 0.6s ease",
                      }}
                    />
                    <span className={`text-[10px] font-bold ${cfg.text}`}>
                      {cfg.emoji} {d.label}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {d.pct}%
                    </span>
                  </div>
                );
              })}
              {/* User position marker */}
              <div className="flex flex-col items-center gap-1 opacity-80">
                <div
                  className="w-full rounded-t-md relative"
                  style={{ height: "50px", background: "linear-gradient(to top, #6366f1, #8b5cf6)", opacity: 0.4 }}
                />
                <span className="text-[10px] font-bold text-indigo-500">👆 You</span>
                <span className="text-[10px] text-indigo-400">Top {userPercentile}%</span>
              </div>
            </div>
          </div>

          {/* ── TOP 3 PODIUM ────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 md:gap-8 mb-16 px-4">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="w-full sm:w-1/3 flex flex-col items-center order-2 sm:order-1 transform transition-transform hover:-translate-y-2">
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute -inset-1 bg-slate-300 rounded-full blur-md opacity-40" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-[3px] border-slate-400 shadow-xl flex items-center justify-center text-3xl font-black text-slate-700">
                    {top3[1].avatar}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-600 text-white w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                </div>
                <div className="text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl w-full p-4 pt-7 shadow-sm relative -mt-6 -z-10">
                  <TierBadge score={top3[1].score} />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate mt-2">{top3[1].username}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-black mt-1">{top3[1].score.toLocaleString()} pts</p>
                  <div className="flex items-center justify-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" />{top3[1].streak}d</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-400" />{top3[1].winRate}%</span>
                    <span>{top3[1].favoriteGameIcon}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="w-full sm:w-1/3 flex flex-col items-center order-1 sm:order-2 transform transition-transform hover:-translate-y-3 z-10">
                <Crown className="w-10 h-10 text-amber-500 mb-2 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute -inset-2 bg-amber-400 rounded-full blur-xl opacity-40 animate-pulse" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-[4px] border-amber-400 shadow-2xl flex items-center justify-center text-5xl font-black text-amber-600">
                    {top3[0].avatar}
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white w-10 h-10 rounded-full border-[3px] border-white flex items-center justify-center font-black text-lg shadow-md">
                    1
                  </div>
                </div>
                <div className="text-center bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-500/30 rounded-t-3xl rounded-b-2xl w-full p-5 pt-9 shadow-lg relative -mt-8 -z-10">
                  <TierBadge score={top3[0].score} size="lg" />
                  <h3 className="font-black text-xl text-gray-900 dark:text-white truncate mt-2">{top3[0].username}</h3>
                  <p className="text-amber-600 dark:text-amber-500 font-black mt-1 text-lg">{top3[0].score.toLocaleString()} pts</p>
                  <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1 font-semibold"><Flame className="w-3.5 h-3.5 text-orange-400" />{top3[0].streak}d streak</span>
                    <span className="flex items-center gap-1 font-semibold"><Zap className="w-3.5 h-3.5 text-emerald-400" />{top3[0].winRate}% win</span>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {top3[0].favoriteGameIcon} {top3[0].favoriteGame}
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="w-full sm:w-1/3 flex flex-col items-center order-3 transform transition-transform hover:-translate-y-2">
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute -inset-1 bg-orange-700 rounded-full blur-md opacity-30" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-orange-100 to-orange-200 border-[3px] border-orange-400 shadow-xl flex items-center justify-center text-2xl font-black text-orange-700">
                    {top3[2].avatar}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                </div>
                <div className="text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl w-full p-4 pt-6 shadow-sm relative -mt-6 -z-10">
                  <TierBadge score={top3[2].score} />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate mt-2">{top3[2].username}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-black mt-1">{top3[2].score.toLocaleString()} pts</p>
                  <div className="flex items-center justify-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" />{top3[2].streak}d</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-400" />{top3[2].winRate}%</span>
                    <span>{top3[2].favoriteGameIcon}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── FULL LEADERBOARD TABLE ──────────────────────────── */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden mb-10">
            {/* Header */}
            <div className="grid grid-cols-[48px_1fr_80px_80px_80px] sm:grid-cols-[64px_1fr_100px_100px_100px_80px] gap-3 p-4 sm:px-7 bg-gray-50/80 dark:bg-white/[0.03] text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5">
              <div className="text-center">Rank</div>
              <div>Player</div>
              <div className="text-right">Score</div>
              <div className="hidden sm:block text-right">Win %</div>
              <div className="hidden sm:block text-right">Streak</div>
              <div className="text-right">Games</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col">
              {restOfList.map((user) => {
                const isUser = user.id === USER_ID;
                return (
                  <div
                    key={user.id}
                    className={`group grid grid-cols-[48px_1fr_80px_80px_80px] sm:grid-cols-[64px_1fr_100px_100px_100px_80px] gap-3 p-3 sm:px-7 items-center border-b border-gray-100 dark:border-white/5 last:border-0 transition-all duration-200 ${
                      isUser
                        ? "bg-indigo-50/60 dark:bg-indigo-500/10 shadow-[inset_4px_0_0_0_rgba(99,102,241,1)]"
                        : "hover:bg-indigo-50/40 dark:hover:bg-white/[0.03] hover:shadow-[inset_4px_0_0_0_rgba(99,102,241,0.6)]"
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex justify-center items-center">
                      <span className={`text-lg font-bold transition-colors ${
                        isUser ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-600 group-hover:text-indigo-500"
                      }`}>
                        {user.rank}
                      </span>
                    </div>

                    {/* Player */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`flex shrink-0 items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full font-bold text-white shadow-md text-sm transition-transform group-hover:scale-110 ${
                        isUser ? "bg-gradient-to-br from-indigo-500 to-violet-600 ring-2 ring-indigo-400" : "bg-gradient-to-br from-indigo-400 to-purple-500"
                      }`}>
                        {user.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-bold text-sm sm:text-base truncate ${
                            isUser ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                          } transition-colors`}>
                            {isUser ? "You ← " : ""}{user.username}
                          </span>
                          {user.trend === "up"   && <TrendingUp   className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                          {user.trend === "down" && <TrendingDown  className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                          {user.trend === "same" && <Minus         className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <TierBadge score={user.score} />
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 hidden sm:inline">
                            {user.favoriteGameIcon} {user.favoriteGame}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className={`flex justify-end items-center font-black text-base sm:text-lg transition-colors ${
                      isUser ? "text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                    }`}>
                      {user.score.toLocaleString()}
                    </div>

                    {/* Win Rate */}
                    <div className="hidden sm:flex justify-end items-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {user.winRate}%
                    </div>

                    {/* Streak */}
                    <div className="hidden sm:flex justify-end items-center gap-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {user.streak > 0 && <Flame className="w-3.5 h-3.5 text-orange-400" />}
                      {user.streak}d
                    </div>

                    {/* Games */}
                    <div className="flex justify-end items-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {user.gamesPlayed}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── NEARBY PLAYERS ──────────────────────────────────── */}
          <AnimatedSection>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-indigo-200/50 dark:border-indigo-500/20 rounded-3xl shadow-xl overflow-hidden">
              <div className="flex items-center gap-3 px-6 sm:px-8 py-4 border-b border-gray-100 dark:border-white/5 bg-indigo-50/50 dark:bg-indigo-500/5">
                <Users className="w-5 h-5 text-indigo-500" />
                <h2 className="font-black text-gray-900 dark:text-white text-base">
                  Your Neighbourhood — Rank {Math.max(1, USER_RANK - 3)} to {USER_RANK + 3}
                </h2>
                <span className="ml-auto text-xs font-bold text-indigo-500 bg-indigo-100 dark:bg-indigo-500/20 px-2 py-0.5 rounded-full">
                  You are here
                </span>
              </div>

              <div className="flex flex-col">
                {nearbyPlayers.map((user) => {
                  const isUser = user.id === USER_ID;
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 px-6 sm:px-8 py-3.5 border-b border-gray-100 dark:border-white/5 last:border-0 transition-colors ${
                        isUser
                          ? "bg-indigo-100/60 dark:bg-indigo-500/15"
                          : "hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className={`w-10 text-center text-lg font-bold shrink-0 ${
                        isUser ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-600"
                      }`}>
                        #{user.rank}
                      </span>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 ${
                        isUser ? "bg-gradient-to-br from-indigo-500 to-violet-600 ring-2 ring-indigo-400" : "bg-gradient-to-br from-indigo-400 to-purple-500"
                      }`}>
                        {user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`font-bold text-sm ${
                          isUser ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-white"
                        }`}>
                          {user.username} {isUser && "← You"}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <TierBadge score={user.score} />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-black text-base ${
                          isUser ? "text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300"
                        }`}>
                          {user.score.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3" /> {user.lastActive}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-6 py-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  You&apos;re in the top{" "}
                  <span className="font-black text-indigo-600 dark:text-indigo-400">
                    {userPercentile}%
                  </span>{" "}
                  globally.{" "}
                  <Link
                    href="/#games-section"
                    className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                  >
                    Play now to climb higher →
                  </Link>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>

      <Footer />
    </main>
  );
}
