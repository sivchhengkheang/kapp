"use client";

import { MagicCard } from "@/components/ui/magic-card";

export default function CommingCard() {
    return (
        <div className="block cursor-default select-none h-full">
            <MagicCard className="group h-full overflow-hidden rounded-lg border border-dashed border-slate-300 bg-white/60 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-indigo-100/60 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/40 dark:hover:border-indigo-500/50">
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 px-6 py-10 text-center">

                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 ring-1 ring-indigo-100 dark:ring-indigo-500/20">
                        <svg
                            className="h-6 w-6 text-indigo-400 dark:text-indigo-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
                        </svg>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
                            Coming Soon
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                            A new game is on its way
                        </p>
                    </div>

                    {/* Pulsing indicator */}
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-indigo-400 dark:text-indigo-500 uppercase">
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