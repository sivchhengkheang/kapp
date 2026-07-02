"use client";

import GameCard from "../utils/GameCard";
import { Game, PRODUCT_DATA } from "../constants";
import { Footer } from "../utils/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";
import SlideShow from "../utils/SlideShow";
import CommingCard from "../utils/CommingCard";

export default function Home({ gameDetail }: any) {
  const games: Game[] = PRODUCT_DATA;
  const Navbar = dynamic(() => import("../utils/Navbar"), {
    ssr: false,
  });

  return (
    <main className="min-h-screen w-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 ">
      <Navbar />
      <div className="mt-14 pt-5 shrink-0 rounded-xl">
        <div className="container mx-auto max-w-7xl pb-24">
          <section className="relative flex h-[500px] lg:h-[550px] w-full items-center overflow-hidden rounded-3xl bg-slate-950 shadow-2xl shadow-cyan-900/10 ring-1 ring-white/10">
            {/* Background Slideshow & Overlays */}
            <div className="absolute inset-0 z-0">
              <SlideShow />
              {/* Stronger gradient overlay to blend slideshow and ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex w-full max-w-3xl flex-col items-start px-6 sm:px-12 lg:px-16">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Discover new learning games
                </span>
              </div>

              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 sm:text-5xl lg:text-6xl">
                KOOMPI App makes learning feel like play.
              </h1>

              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-300">
                Browse curated games, sharpen your skills, and jump into a playful experience designed for learners and creators.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => {
                    document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-cyan-500 px-8 py-3.5 font-bold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Games
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <section id="games-section" className="mt-16 scroll-mt-24">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className=" text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                  KOOMPI App
                </h2>
                <p className="mt-2 text-sm uppercase tracking-[0.10em] text-slate-500 dark:text-slate-400">
                  Curated learning games
                </p>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Each game is hand-picked to help you learn faster while having
                fun. Tap a card to see more details.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
              <CommingCard />
            </div>
          </section>
        </div>

        <div className="w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}
