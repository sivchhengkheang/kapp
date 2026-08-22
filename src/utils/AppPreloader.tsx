"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PRODUCT_DATA } from "../constants";
import { preloadAndCacheImages } from "./assetCache";

export default function AppPreloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing KAPP engine...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Collect all critical image URLs to precache into LocalStorage & CacheStorage
    const criticalImages: string[] = [
      "/favicon.ico",
      "/game-cover/typing-code.png",
      "/game-cover/dragon-drop.png",
      "/game-cover/master-mouse.png",
      "/game-cover/koompi-typing.png",
      ...PRODUCT_DATA.map((g) => (g.thumbnail.startsWith("/") ? g.thumbnail : `/${g.thumbnail}`)),
      ...PRODUCT_DATA.map((g) => (g.cover.startsWith("/") ? g.cover : `/${g.cover}`)),
    ].filter((val, idx, self) => self.indexOf(val) === idx);

    async function startPreload() {
      if (!isMounted) return;
      setProgress(10);
      setStatusText("Initializing KAPP engine...");

      // Preload and cache images
      await preloadAndCacheImages(criticalImages, (pct, status) => {
        if (!isMounted) return;
        const mappedPct = Math.min(95, Math.max(15, Math.round(15 + (pct / 100) * 75)));
        setProgress(mappedPct);
        setStatusText(status);
      });

      if (!isMounted) return;

      setProgress(100);
      setStatusText("Ready!");

      // Fade out screen smoothly & quickly
      setTimeout(() => {
        if (!isMounted) return;
        setIsFadingOut(true);
        setTimeout(() => {
          if (!isMounted) return;
          setLoading(false);
        }, 300);
      }, 150);
    }

    startPreload();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* ── Main Application Content ── */}
      <div className={loading && !isFadingOut ? "invisible" : "visible"}>
        {children}
      </div>

      {/* ── Fullscreen Adaptive Splash Preloader (Dark & Light Mode) ── */}
      {loading && (
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50/95 dark:bg-gray-950/95 text-gray-900 dark:text-white select-none backdrop-blur-2xl transition-opacity duration-500 ease-out ${
            isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
        >
          {/* Ambient background glow (Adapts dynamically to Light & Dark themes) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-96 w-96 rounded-full bg-indigo-500/15 dark:bg-indigo-600/25 blur-[120px] animate-pulse" />
            <div className="absolute h-72 w-72 rounded-full bg-violet-500/10 dark:bg-violet-600/20 blur-[90px] translate-x-20" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center gap-6">
            {/* Logo Mark with Pulsing Ring */}
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-3xl bg-indigo-500/20 dark:bg-indigo-500/30 blur-md animate-[pulseRing_2s_ease-out_infinite]" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/80 dark:bg-gray-900/90 border border-gray-200/80 dark:border-white/15 shadow-[0_10px_30px_rgba(99,102,241,0.15)] dark:shadow-[0_0_40px_rgba(99,102,241,0.3)] backdrop-blur-xl transition-colors duration-300">
                <Image
                  src="/favicon.ico"
                  alt="KAPP Logo"
                  width={44}
                  height={44}
                  priority
                  className="object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
                KAPP
              </h1>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                Interactive Game Portal
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full flex flex-col gap-2.5 pt-2">
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-200/80 dark:bg-white/10 p-0.5 border border-gray-300/60 dark:border-white/10 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 dark:from-indigo-500 dark:via-purple-500 dark:to-rose-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status Row */}
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-medium px-0.5 min-h-[20px]">
                <span className="truncate max-w-[240px] text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                  {statusText}
                </span>
                <span className="font-bold tabular-nums text-indigo-600 dark:text-indigo-300">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Precache LocalStorage indicator badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3.5 py-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-400 shadow-sm dark:shadow-none backdrop-blur-sm mt-1 transition-colors duration-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              LocalStorage Asset Precaching
            </div>
          </div>
        </div>
      )}
    </>
  );
}
