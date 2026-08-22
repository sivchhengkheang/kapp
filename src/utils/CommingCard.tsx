"use client";

import { MagicCard } from "@/components/ui/magic-card";

export default function CommingCard() {
  return (
    <div className="block cursor-default select-none h-full">
      <MagicCard
        className="
          group h-full overflow-hidden rounded-[var(--radius-lg)]
          border border-dashed border-gray-300/80 dark:border-white/10
          bg-white/60 dark:bg-gray-900/40
          shadow-[var(--shadow-sm)]
          transition-all duration-250 ease-out
          hover:border-indigo-300/70 dark:hover:border-indigo-500/40
          hover:shadow-[var(--shadow-md)]
        "
      >
        <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-5 px-6 py-10 text-center">

          {/* Icon container */}
          <div className="relative flex h-14 w-14 items-center justify-center">
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-2xl bg-indigo-400/20 animate-[pulseRing_2s_ease-out_infinite]" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/15 dark:to-violet-500/10 ring-1 ring-indigo-100 dark:ring-indigo-500/20">
              <svg
                className="h-6 w-6 text-indigo-500 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">
              🚀 Multiplayer Battles
            </h3>
            <p className="text-xs leading-relaxed text-gray-400 dark:text-gray-500 max-w-[160px]">
              Coming July 2026
            </p>
          </div>

          {/* Status badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/60 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
            </span>
            In development
          </span>

        </div>
      </MagicCard>
    </div>
  );
}