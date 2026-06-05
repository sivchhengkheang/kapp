"use client";

import Navbar from "../components/utils/Navbar";
import Image from "next/image";
import cover from "../../public/cover.png";
import GameCard from "../components/utils/GameCard";
import { Game, PRODUCT_DATA } from "../constants";
import { Footer } from "../components/utils/footer";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TransitionLink } from "../components/utils/TransitionLink";

export default function Home({ gameDetail }: any) {
  const games: Game[] = PRODUCT_DATA;

  return (
    <main className="min-h-screen w-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <div className="pt-28">
        <div className="container mx-auto max-w-7xl px-4 pb-24">
          <section className="rounded-[2rem] overflow-hidden bg-slate-900/95 shadow-2xl shadow-slate-950/20 ring-1 ring-white/10">
            {/* <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center"> */}
            {/* <div className="px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-20 text-left">
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
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
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
                </div>
              </div> */}

            <div className="relative h-72 sm:h-96 lg:h-[440px]">
              <Image
                src={cover}
                alt="KOOMPI app cover"
                className="object-cover"
                fill
              />
            </div>
            {/* </div> */}
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
      </div>

      <Footer />
    </main>
  );
}
