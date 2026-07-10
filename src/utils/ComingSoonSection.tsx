"use client";

import { useEffect, useState } from "react";
import { RippleButton } from "./RippleButton";

/* Target release: 90 days from a fixed anchor date */
const RELEASE_DATE = new Date("2026-09-30T00:00:00+07:00");
const LAUNCH_DATE_LABEL = "September 30, 2026";

/* Progress: days elapsed / total days of development window */
const DEV_START = new Date("2026-04-01T00:00:00+07:00");
const TOTAL_DAYS = Math.round(
  (RELEASE_DATE.getTime() - DEV_START.getTime()) / 86_400_000
);

function useCountdown(target: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      return {
        days:    Math.floor(diff / 86_400_000),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      };
    };
    
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1_000);
    return () => clearInterval(id);
  }, [target]);
  
  return time;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white/80 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 backdrop-blur-sm overflow-hidden">
        {/* Shimmer line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/10 dark:bg-black/50 z-10" />
        <span className="relative z-20 text-2xl sm:text-3xl font-black tabular-nums text-gray-900 dark:text-white tracking-tight">
          {str}
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-white/40">
        {label}
      </span>
    </div>
  );
}

const UPCOMING_FEATURES = [
  { icon: "🧠", label: "Brain Training",   desc: "Memory & pattern recognition challenges" },
  { icon: "✏️", label: "Creative Writing", desc: "AI-powered storytelling prompts" },
  { icon: "🌏", label: "Language Skills",  desc: "Vocabulary games in 5 languages" },
];

export default function ComingSoonSection() {
  const { days, hours, minutes, seconds } = useCountdown(RELEASE_DATE);
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const elapsed = Math.round((Date.now() - DEV_START.getTime()) / 86_400_000);
    setProgress(Math.min(100, Math.max(0, Math.round((elapsed / TOTAL_DAYS) * 100))));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="coming-soon"
      className="relative w-full overflow-hidden"
      aria-labelledby="coming-soon-heading"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-50/50 to-transparent dark:via-indigo-950/40" />
      {/* Ambient orbs */}
      <div className="absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 h-64 w-64 translate-x-1/2 rounded-full bg-violet-600/15 blur-[80px] pointer-events-none" />


      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-6 py-[90px] flex flex-col items-center text-center gap-12">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300">
            Coming {LAUNCH_DATE_LABEL}
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2
            id="coming-soon-heading"
            className="text-4xl sm:text-5xl font-black leading-tight tracking-tight text-gray-900 dark:text-white"
          >
            🚀 Multiplayer Battles{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Coming July 2026
            </span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            We're crafting new interactive learning experiences. Be the first to
            know when they drop.
          </p>
        </div>

        {/* ── Countdown ── */}
        <div className="flex items-start gap-3 sm:gap-5">
          <TimeBlock value={days}    label="Days"    />
          <span className="mt-4 sm:mt-5 text-2xl font-black text-gray-300 dark:text-white/30">:</span>
          <TimeBlock value={hours}   label="Hours"   />
          <span className="mt-4 sm:mt-5 text-2xl font-black text-gray-300 dark:text-white/30">:</span>
          <TimeBlock value={minutes} label="Minutes" />
          <span className="mt-4 sm:mt-5 text-2xl font-black text-gray-300 dark:text-white/30">:</span>
          <TimeBlock value={seconds} label="Seconds" />
        </div>

        {/* ── Progress bar ── */}
        <div className="w-full max-w-lg flex flex-col gap-2">
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
            <span className="text-gray-600 dark:text-gray-500">Development progress</span>
            <span className="text-violet-500 dark:text-violet-400">{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shimmer on bar */}
              <span
                className="absolute inset-0 -translate-x-full animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-600 text-right">
            Release target: {LAUNCH_DATE_LABEL}
          </p>
        </div>

        {/* ── Upcoming feature previews ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {UPCOMING_FEATURES.map(({ icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white/50 dark:border-white/[0.07] dark:bg-white/[0.03] px-5 py-6 backdrop-blur-sm hover:border-violet-300 dark:hover:border-violet-500/25 hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-200"
            >
              <span className="text-3xl" aria-hidden="true">{icon}</span>
              <div className="flex flex-col gap-1 text-center">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-600 dark:text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Notify CTA ── */}
        {submitted ? (
          /* ── Success state with checkmark animation ── */
          <div
            className="flex flex-col items-center gap-3 animate-fade-up"
            role="status"
            aria-live="polite"
          >
            <div className="checkmark-scale flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15 ring-2 ring-teal-500/30">
              <svg
                className="w-9 h-9"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  className="checkmark-circle"
                  cx="26" cy="26" r="25"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  className="checkmark-path"
                  d="M14 27l8 8 16-16"
                  stroke="#14b8a6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-teal-400">You&apos;re on the list!</p>
            <p className="text-xs text-gray-500">We&apos;ll notify you when new games launch.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
            aria-label="Get notified when new games launch"
          >
            <label htmlFor="notify-email" className="sr-only">Email address</label>
            <input
              id="notify-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="
                flex-1 w-full rounded-xl border border-gray-300 bg-white dark:border-white/15 dark:bg-white/[0.06]
                px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                backdrop-blur-sm outline-none
                focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20
                transition-all duration-200
              "
            />
            <RippleButton
              type="submit"
              id="notify-submit-btn"
              className="
                btn-micro
                flex w-full sm:w-auto items-center justify-center gap-2
                rounded-xl bg-violet-600 px-6 py-3
                text-sm font-bold text-white
                hover:bg-violet-500
                shadow-[0_2px_12px_rgba(139,92,246,0.3)]
                hover:shadow-[0_4px_20px_rgba(139,92,246,0.45)]
              "
            >
              Notify Me
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </RippleButton>
          </form>
        )}

      </div>
    </section>
  );
}
