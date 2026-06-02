"use client";

import { MagicCard } from "./ui/magic-card";
import { Game } from "../constants";

export default function GameCard({ game }: { game: Game }) {
  const imageSrc = game.thumbnail || game.cover || "/cover1.png";
  const normalizedSrc = imageSrc.startsWith("/") ? imageSrc : `/${imageSrc}`;

  return (
    <MagicCard className="group overflow-hidden rounded-[1.75rem] border border-slate-200/60 bg-white/80  shadow-xl shadow-slate-900/10 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-cyan-300/20 dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-slate-950/30">
      <div className="overflow-hidden rounded-[1.75rem] bg-slate-950/5">
        <div className="aspect-5/4 w-full overflow-hidden">
          <img
            src={game.cover}
            alt={game.title}
            className=" h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 text-left">
          <div className="flex items-center justify-between gap-3">
            <div className="">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100 ">
                {game.title}
              </h3>
              <span className="rounded-full px-1 py-0.5 text-xs font-semibold text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                {game.rate} {game.starRate}
              </span>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {game.subTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MagicCard>
  );
}
