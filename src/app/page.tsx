"use client";

import Image from "next/image";
import cover from "../../public/cover.png";
import GameCard from "../components/utils/GameCard";
import { Game, PRODUCT_DATA } from "../constants";
import { Footer } from "../components/utils/Footer";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TransitionLink } from "../components/utils/TransitionLink";
import dynamic from "next/dynamic";
import SlideShow from "../components/utils/SlideShow";

export default function Home({ gameDetail }: any) {
  const games: Game[] = PRODUCT_DATA;
  const Navbar = dynamic(() => import("../components/utils/Navbar"), {
    ssr: false,
  });

  return (
    <main className="min-h-screen w-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 ">
      <Navbar />
      <div className="mt-14 pt-14 shrink-0 rounded-xl">
        <div className="container mx-auto max-w-7xl pb-24">
          <section id="#" className="relative h-[525px] rounded-lg overflow-hidden bg-slate-900/95 shadow-2xl shadow-slate-950/20 ring-1 ring-white/10">
            {/* <div className="absolute top-0 left-0 w-full h-full bg-black/50">
            </div> */}
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center h-full">
              <div className="absolute h-full w-[70%] bg-gradient-to-r from-slate-900/95 to-transparent z-2" />
              <div className="absolute h-full w-[70%] bg-gradient-to-r from-slate-900/95 to-transparent z-2" />
              <div className="absolute h-full w-[70%] bg-gradient-to-r from-slate-900/95 to-transparent z-2" />
              <div className="absolute h-full w-[70%] bg-gradient-to-r from-slate-900/95 to-transparent z-2" />
              <div className="absolute h-full w-full bg-gradient-to-r from-slate-900/95 to-transparent z-2" />

              <div className="px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-20 z-10 text-left">
                <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">
                  Discover new learning games
                </p>
                <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                  KOOMPI App makes learning feel like play.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Browse curated games, sharpen your skills, and jump into a
                  playful experience designed for learners and creators.
                </p>
                {/* <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button className="min-w-[150px]" variant="default" size="lg">
                    Explore games
                  </Button>
                  <Button
                    className="min-w-[150px]"
                    variant="secondary"
                    size="lg"
                  >
                    Learn more
                  </Button>
                </div> */}
              </div>

            </div>
            <div className="absolute top-0 right-0  w-full h-full z-1">
              <SlideShow />
            </div>
          </section>

          <section className="mt-16">
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
                <Link key={game.id} href={`/${game.id}`}>
                  <GameCard key={game.id} game={game} />
                </Link>
              ))}
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
