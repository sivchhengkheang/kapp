"use client";

export function GameCardSkeleton() {
  return (
    <div className="w-full mx-auto max-w-[400px] sm:max-w-none rounded-2xl bg-white dark:bg-gray-900 border border-border dark:border-white/[0.07] overflow-hidden flex flex-col h-[400px]">
      {/* Cover Skeleton */}
      <div className="relative h-[200px] w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        {/* Title */}
        <div className="h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        {/* Description lines */}
        <div className="space-y-2 mt-1">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
        {/* Stats row */}
        <div className="mt-3 flex gap-2">
          <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
        {/* Button */}
        <div className="mt-auto h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    </div>
  );
}
