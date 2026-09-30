"use client";

export function GameCardSkeleton() {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-gray-900 border border-gray-150/80 dark:border-white/[0.08] overflow-hidden flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      {/* Thumbnail skeleton — matches aspect-square sm:aspect-[16/10] */}
      <div className="aspect-square sm:aspect-[16/10] w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />

      {/* Body skeleton */}
      <div className="flex flex-col gap-1.5 sm:gap-2.5 p-2.5 sm:p-4">
        {/* Title */}
        <div className="h-3.5 sm:h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        {/* Description (desktop) */}
        <div className="hidden sm:block space-y-1.5">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
        {/* Stats */}
        <div className="flex gap-2 pt-0.5">
          <div className="h-2.5 sm:h-3 w-8 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-2.5 sm:h-3 w-12 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
        {/* Play button skeleton */}
        <div className="pt-1 mt-auto">
          <div className="h-8 sm:h-9 w-full rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
