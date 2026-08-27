"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const [path, setPath] = useState("");

  useEffect(() => {
    setMounted(true);
    setPath(window.location.pathname);
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const messages = [
    "Looks like this page took a wrong turn.",
    "The URL you entered doesn\u2019t exist.",
    "Nothing here \u2014 but great things await.",
  ];

  return (
    <main className="relative min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] flex flex-col items-center justify-center overflow-hidden px-5">

      {/* Grid mesh */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.8)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]"
        style={{ backgroundSize: "32px 32px" }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-teal-500/15 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 h-72 w-72 rounded-full bg-indigo-500/20 blur-[90px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-2/3 left-1/3 h-56 w-56 rounded-full bg-violet-500/15 blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div
        className={`relative z-10 flex flex-col items-center text-center max-w-md transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        {/* 404 number */}
        <div className="relative mb-5">
          {/* Glow */}
          <div className="absolute inset-0 blur-3xl opacity-25 flex items-center justify-center pointer-events-none">
            <span className="text-[13rem] font-black text-teal-500 select-none leading-none">404</span>
          </div>
          {/* Main */}
          <span
            className="relative block text-[8rem] sm:text-[10rem] font-black leading-none select-none"
            style={{
              background: "linear-gradient(135deg, #14b8a6 0%, #6366f1 55%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>

          {/* Floating broken-link icon */}
          <div className="absolute -right-4 -top-2 animate-bounce" aria-hidden="true">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
              </svg>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
            Page not found
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
          Oops! Lost in the void.
        </h1>

        {/* Rotating sub-message */}
        <div className="h-14 flex items-center justify-center overflow-hidden mb-6">
          <p
            key={tick}
            className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs"
            style={{ animation: "fadeSlideIn 0.5s ease forwards" }}
          >
            {messages[tick % messages.length]}
          </p>
        </div>

        {/* URL pill */}
        {path && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200/60 dark:border-red-500/20 bg-red-50/60 dark:bg-red-500/5 px-4 py-2.5 mb-8 max-w-xs w-full overflow-hidden">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span className="text-xs text-red-500 dark:text-red-400 font-mono truncate">{path}</span>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            id="not-found-home-btn"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(20,184,166,0.35)] hover:shadow-[0_6px_28px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/#games-section"
            id="not-found-games-btn"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/15 bg-white/70 dark:bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-gray-700 dark:text-white/85 hover:bg-white dark:hover:bg-white/10 hover:border-teal-300 dark:hover:border-teal-500/40 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="2" y="7" width="20" height="13" rx="3" />
              <path strokeLinecap="round" d="M9 11v4M7 13h4M15 12h.01M17 14h.01" />
            </svg>
            Browse Games
          </Link>
        </div>

        {/* Support link */}
        {/* <p className="mt-8 text-xs text-gray-400 dark:text-gray-600">
          If you believe this is a mistake,{" "}
          <Link
            href="mailto:kheangsivechheng@gmail.com"
            className="text-teal-500 hover:text-teal-400 underline underline-offset-2 transition-colors"
          >
            contact support
          </Link>
          .
        </p> */}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
