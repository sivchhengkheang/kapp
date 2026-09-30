"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kapp_onboarding_dismissed";

const STEPS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    step: "01",
    label: "Browse",
    desc: "Filter by category, difficulty, or rating",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
    step: "02",
    label: "Pick a Game",
    desc: "Free to play — no sign-up needed",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),
    step: "03",
    label: "Play & Level Up",
    desc: "Build real skills in minutes a day",
  },
];

export default function OnboardingBanner() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage may be blocked in some envs — just don't show it
    }
  }, []);

  const dismiss = () => {
    setHiding(true);
    setTimeout(() => {
      setVisible(false);
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
    }, 350);
  };

  if (!visible) return null;

  return (
    <div
      className={`
        mx-auto w-full max-w-7xl px-4 sm:px-6 mb-6
        transition-all duration-[350ms] ease-in-out
        ${hiding ? "opacity-0 -translate-y-2 scale-[0.99]" : "opacity-100 translate-y-0 scale-100"}
      `}
      aria-label="Getting started with KAPP"
      role="region"
    >
      <div className="relative overflow-hidden rounded-3xl border border-indigo-200/60 dark:border-indigo-500/20 bg-gradient-to-r from-indigo-50/90 via-violet-50/70 to-indigo-50/90 dark:from-indigo-950/50 dark:via-violet-950/40 dark:to-indigo-950/50 backdrop-blur-sm px-5 py-4 sm:px-6 sm:py-5">
        {/* Subtle ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.08),transparent_60%)] pointer-events-none" aria-hidden="true" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          {/* Label */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/15 text-sm" aria-hidden="true">👋</span>
            <p className="text-sm font-black text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
              New to KAPP?
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-indigo-200/60 dark:bg-indigo-500/20 shrink-0" />

          {/* Steps */}
          <div className="flex items-center gap-3 sm:gap-5 flex-1 overflow-x-auto no-scrollbar">
            {STEPS.map((s, i) => (
              <div key={s.step} className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                    {s.icon}
                  </span>
                  <div className="leading-tight">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-400 dark:text-indigo-500">
                      Step {s.step}
                    </p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{s.label}</p>
                    <p className="hidden sm:block text-[10px] text-gray-500 dark:text-gray-400 leading-tight max-w-[120px]">{s.desc}</p>
                  </div>
                </div>
                {/* Arrow between steps */}
                {i < STEPS.length - 1 && (
                  <svg className="w-4 h-4 text-indigo-300 dark:text-indigo-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Dismiss */}
          <button
            onClick={dismiss}
            aria-label="Dismiss onboarding banner"
            className="absolute top-3 right-3 sm:static sm:shrink-0 flex h-7 w-7 items-center justify-center rounded-xl text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
