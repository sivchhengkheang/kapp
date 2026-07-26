"use client";

import Navbar from "@/src/utils/Navbar";
import { PRODUCT_DATA } from "@/src/constants";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Download,
  Play,
  X,
  ArrowLeft,
  Wifi,
  Monitor,
  Calendar,
  HardDrive,
  Cpu,
  CheckCircle2,
  Star,
  Users,
  Clock,
  ChevronRight,
  Tag,
  ZoomIn,
} from "lucide-react";
import windows from "@/public/windows-icon.svg";
import linux from "@/public/linux-icon.svg";
import { Footer } from "@/src/utils/Footer";

/* ── Learning objectives by category ────────────────────────────────── */
const LEARNING_OBJECTIVES: Record<string, string[]> = {
  Coding: [
    "Master Python syntax through 60-second challenge sessions",
    "Boost code typing speed and muscle memory",
    "Build confidence reading and writing real programming patterns",
  ],
  Math: [
    "Sharpen mental arithmetic and calculation speed",
    "Improve number pattern recognition under pressure",
    "Develop disciplined focus for timed math challenges",
  ],
  "Mouse Skills": [
    "Improve hand-eye coordination and mouse precision",
    "Develop steady cursor tracking for desktop workflows",
    "Build reflexes for drag, click, and navigation tasks",
  ],
  Logic: [
    "Boost strategic and sequential thinking skills",
    "Practice breaking complex problems into smaller steps",
    "Strengthen spatial reasoning and logical deduction",
  ],
  Puzzle: [
    "Enhance pattern recognition and spatial awareness",
    "Develop patient, methodical problem-solving habits",
    "Improve focus and sustained attention spans",
  ],
  Typing: [
    "Increase words-per-minute (WPM) typing speed",
    "Improve typing accuracy and reduce error rates",
    "Build muscle memory for touch typing on a full keyboard",
  ],
};

const DEFAULT_OBJECTIVES = [
  "Build foundational digital skills through play",
  "Improve focus, accuracy and task completion speed",
  "Develop confidence with computer-based interactions",
];

/* ── Difficulty badge colors ─────────────────────────────────────── */
const DIFFICULTY_STYLES = {
  Easy: {
    bg: "bg-teal-500/15 dark:bg-teal-500/20",
    text: "text-teal-700 dark:text-teal-300",
    dot: "bg-teal-500",
  },
  Medium: {
    bg: "bg-amber-500/15 dark:bg-amber-500/20",
    text: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  Hard: {
    bg: "bg-rose-500/15 dark:bg-rose-500/20",
    text: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
  },
};

/* ── Star row helper ──────────────────────────────────────────────── */
function StarRow({ rate, size = "sm" }: { rate: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill =
          i <= Math.floor(rate)
            ? 1
            : i - rate < 1 && i - rate > 0
              ? rate - Math.floor(rate)
              : 0;
        return (
          <span key={i} className={`relative ${sz} shrink-0`}>
            <svg
              className={`absolute inset-0 ${sz} text-gray-200 dark:text-gray-700`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <svg
                className={`${sz} text-amber-400`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function GameDetail() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const params = useParams<{ game: string }>();
  const gameName = params?.game;
  const product = gameName ? PRODUCT_DATA.find((p) => p.id === gameName) : null;

  const router = useRouter();

  const objectives =
    LEARNING_OBJECTIVES[product?.category ?? ""] ?? DEFAULT_OBJECTIVES;
  const diff =
    DIFFICULTY_STYLES[product?.difficulty ?? "Easy"] ?? DIFFICULTY_STYLES.Easy;

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    document.body.classList.toggle(
      "overflow-hidden",
      !!lightboxSrc
    );
  }, [lightboxSrc]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--gray-50)] dark:bg-[var(--gray-950)]">
        <Navbar />
        <p className="text-gray-500">Game not found.</p>
      </div>
    );
  }

  const coverSrc = `/${product.cover}`;
  const insiderSrc = product.insider ? `/${product.insider}` : coverSrc;
  const thumbnailSrc = (product.thumbnail || product.cover).replace(
    /^(?!\/)/,
    "/"
  );

  const specRows = (platform: "windows" | "linux") => {
    const p = product[platform];
    return [
      { label: "Version", value: p?.releaseDetails?.version, icon: Tag },
      {
        label: "File Size",
        value: p?.releaseDetails?.fileSize,
        icon: HardDrive,
      },
      { label: "Architecture", value: p?.releaseDetails?.architecture, icon: Cpu },
      {
        label: "Last Updated",
        value: p?.releaseDetails?.releaseDate,
        icon: Calendar,
      },
    ];
  };

  const brandBtnCls =
    product.brandColor ??
    "bg-indigo-600 hover:bg-indigo-700 text-white";

  /* Accent colour for borders/bars — extract the bg class */
  const accentBg = product.brandColor?.split(" ")[0] ?? "bg-indigo-600";

  return (
    <div className="min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 flex flex-col">
      <Navbar />

      <div className="mt-16 flex-1">

        {/* ══════════════════════════════════════════════════════════
            METADATA TAG BAR — pinned at very top
        ══════════════════════════════════════════════════════════ */}
        <section className="border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] ">
          <div className="mx-auto max-w-7xl px-5 py-3.5">
            <div className="flex flex-wrap items-center gap-2">
              {/* Type tags from product data */}
              {product.type?.map(
                (t: { text: string; color: string }, i: number) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider ${t.color}`}
                  >
                    {t.text}
                  </span>
                )
              )}
              {/* Divider */}
              <span className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
              {/* Difficulty */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider ${diff.bg} ${diff.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
                {product.difficulty}
              </span>
              {/* Offline capable */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <Wifi className="w-3 h-3" />
                Offline Capable
              </span>
              {/* OS chips */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <Monitor className="w-3 h-3" />
                Windows 10/11
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                KOOMPI / Linux
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            HERO SECTION — contained banner (matches section width below)
        ══════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-5 pt-8 pb-0">
          {/* Back navigation — sits above the rounded card */}
          <button
            onClick={() => router.push('/#games-section')}
            className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All Games
          </button>

          {/* Rounded banner card — same width as sections below */}
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]"
            style={{ minHeight: 420 }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={coverSrc}
                alt={`${product.title} promotional banner`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-top"
              />
              {/* Bottom blend: fades image into page background (dark or light) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f9fafb] via-[#f9fafb]/60 to-transparent dark:from-[#030712] dark:via-[#030712]/60 dark:to-transparent" />
              {/* Text-readability scrim: always-dark overlay so white text stays legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5" />
              {/* Side scrim for left-anchored layout */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent dark:from-black/70 dark:via-black/20 dark:to-transparent" />
            </div>

            {/* Hero content overlaid on image */}
            <div className="relative z-10 px-8 pt-8 pb-10 flex flex-col h-full min-h-[420px]">
              {/* Bottom area: title + CTAs */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                {/* Left: title block */}
                <div className="flex-1 max-w-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg" aria-hidden="true">{product.categoryIcon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                      {product.category}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                    {product.title}
                  </h1>
                  <p className="mt-3 text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                    {product.subTitle}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <StarRow rate={product.rate} size="md" />
                      <span className="text-sm font-bold text-white ml-1">
                        {product.rate.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-white/30 text-sm">·</span>
                    <span className="flex items-center gap-1 text-sm text-white/60">
                      <Users className="w-3.5 h-3.5" />
                      {product.plays} plays
                    </span>
                    <span className="text-white/30 text-sm">·</span>
                    <span className="flex items-center gap-1 text-sm text-white/60">
                      <Clock className="w-3.5 h-3.5" />
                      {product.avgTime} avg
                    </span>
                  </div>
                </div>

                {/* Right: CTAs */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:min-w-[220px]">
                  <button
                    id="hero-play-btn"
                    onClick={() => router.push(`/play/${product.id}`)}
                    className={`group relative flex items-center justify-center gap-2.5 px-7 py-4 rounded-[var(--radius)] font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg overflow-hidden ${brandBtnCls}`}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/10 skew-x-[-20deg] transition-transform duration-500 ease-out pointer-events-none" />
                    <Play className="w-4 h-4 fill-current" />
                    Play in Browser
                  </button>
                  <a
                    href="#download-section"
                    id="hero-download-cta"
                    className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[var(--radius)] font-bold text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5 shrink-0" />
                    Download Free
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            MAIN BODY — two-column grid
        ══════════════════════════════════════════════════════════ */}
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── LEFT COLUMN: Overview ─────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* About This Game */}
              <section
                aria-labelledby="about-heading"
                className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden"
              >
                {/* Section header accent */}
                <div className={`h-0.5 w-full ${accentBg}`} />

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-1 h-6 rounded-full ${accentBg}`} />
                    <h2
                      id="about-heading"
                      className="text-lg font-bold text-gray-900 dark:text-white tracking-tight"
                    >
                      About This Game
                    </h2>
                  </div>

                  {/* Hook subtitle */}
                  <p className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 leading-snug mb-4">
                    {product.subTitle}
                  </p>

                  {/* Main description */}
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Extended context */}
                  <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed mb-8">
                    Designed for learners of all ages, <strong className="text-gray-700 dark:text-gray-300">{product.title}</strong> is
                    a <span className="font-medium">{product.difficulty.toLowerCase()}-difficulty</span> {product.category.toLowerCase()} game
                    with an average session time of{" "}
                    <span className="font-medium">{product.avgTime}</span>. With over{" "}
                    <span className="font-medium">{product.plays} plays</span>, it has quickly become one of KOOMPI&apos;s
                    most-loved educational tools — available for free both in-browser and
                    as a native desktop app for Windows and Linux.
                  </p>

                  {/* Learning objectives callout */}
                  <div className="rounded-[var(--radius)] bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
                      Learning Objectives
                    </p>
                    <ul className="flex flex-col gap-2">
                      {objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                          <span className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
                            {obj}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Media Gallery */}
              <section
                aria-labelledby="gallery-heading"
                className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden"
              >
                <div className={`h-0.5 w-full ${accentBg}`} />

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-1 h-6 rounded-full ${accentBg}`} />
                    <h2
                      id="gallery-heading"
                      className="text-lg font-bold text-gray-900 dark:text-white tracking-tight"
                    >
                      Screenshots
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Insider screenshot */}
                    <button
                      onClick={() => setLightboxSrc(insiderSrc)}
                      className="group relative aspect-video rounded-[var(--radius)] overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/60 dark:ring-white/[0.08] hover:ring-2 hover:ring-indigo-500/50 transition-all duration-200"
                      aria-label="View gameplay screenshot"
                    >
                      <Image
                        src={insiderSrc}
                        alt={`${product.title} gameplay screenshot`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 rounded-full p-2">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </button>

                    {/* Thumbnail / cover preview */}
                    <button
                      onClick={() => setLightboxSrc(thumbnailSrc)}
                      className="group relative aspect-video rounded-[var(--radius)] overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/60 dark:ring-white/[0.08] hover:ring-2 hover:ring-indigo-500/50 transition-all duration-200"
                      aria-label="View game thumbnail"
                    >
                      <Image
                        src={thumbnailSrc}
                        alt={`${product.title} thumbnail`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 rounded-full p-2">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </button>

                    {/* Play in Browser card */}
                    <button
                      onClick={() => router.push(`/play/${product.id}`)}
                      className="group relative aspect-video sm:col-span-2 rounded-[var(--radius)] overflow-hidden bg-gray-900 dark:bg-gray-800 ring-1 ring-gray-200/60 dark:ring-white/[0.08] hover:ring-2 hover:ring-indigo-500/50 transition-all duration-200 flex items-center justify-center"
                      id="gallery-play-browser-btn"
                      aria-label="Play game in browser"
                    >
                      <Image
                        src={coverSrc}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 100vw"
                        className="object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                        aria-hidden="true"
                      />
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 ${brandBtnCls}`}>
                          <Play className="w-7 h-7 fill-current" />
                        </div>
                        <span className="text-sm font-bold text-white">
                          Play in Browser — Free
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* ── RIGHT COLUMN: Specs Sidebar ──────────────────── */}
            <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24">

              {/* Primary Download CTA card */}
              <div
                id="download-section"
                className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-md)] overflow-hidden"
              >
                <div className={`h-1 w-full ${accentBg}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                      Free
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 rounded-full">
                      No Cost
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
                    Available for Windows &amp; Linux · KOOMPI Optimized
                  </p>

                  {/* Platform download buttons */}
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        key: "linux" as const,
                        icon: linux,
                        iconAlt: "Linux",
                        label: "Download for Linux",
                        accentRing: "ring-emerald-100 dark:ring-emerald-900/40",
                        accentIcon: "bg-emerald-50 dark:bg-emerald-950/40",
                        note: "KOOMPI Optimized",
                        noteClass: "text-emerald-600 dark:text-emerald-400",
                      },
                      {
                        key: "windows" as const,
                        icon: windows,
                        iconAlt: "Windows",
                        label: "Download for Windows",
                        accentRing: "ring-blue-100 dark:ring-blue-900/40",
                        accentIcon: "bg-blue-50 dark:bg-blue-950/40",
                        note: "Windows 10/11",
                        noteClass: "text-blue-600 dark:text-blue-400",
                      },
                    ].map(({ key, icon, iconAlt, label, accentRing, accentIcon, note, noteClass }) => {
                      const p = product[key];
                      return (
                        <div key={key}>
                          <a
                            href={p?.releaseDetails?.download}
                            target="_blank"
                            rel="noopener noreferrer"
                            id={`download-${key}-btn`}
                          >
                            <button
                              className={`w-full py-3 px-4 rounded-[var(--radius)] font-semibold text-sm flex items-center gap-3 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] hover:shadow-[var(--shadow-sm)] ${brandBtnCls}`}
                            >
                              <div className={`p-1.5 rounded-md bg-white/20 shrink-0`}>
                                <Image
                                  src={icon}
                                  alt={iconAlt}
                                  width={18}
                                  height={18}
                                />
                              </div>
                              <span className="flex-1 text-left">{label}</span>
                              <ChevronRight className="w-4 h-4 opacity-60 shrink-0" />
                            </button>
                          </a>
                          <p className={`text-[10px] font-medium mt-1 ml-1 ${noteClass}`}>
                            {note} · {p?.releaseDetails?.fileSize}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Browser play link */}
                  <button
                    onClick={() => router.push(`/play/${product.id}`)}
                    className="mt-4 w-full py-2.5 px-4 rounded-[var(--radius)] text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-transparent transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Or play free in browser
                  </button>
                </div>
              </div>

              {/* Technical Specs card */}
              <div className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-1 h-5 rounded-full ${accentBg}`} />
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight uppercase">
                      Technical Details
                    </h2>
                  </div>

                  {/* Per-platform specs */}
                  {(["linux", "windows"] as const).map((plat, pi) => {
                    const p = product[plat];
                    const isLinux = plat === "linux";
                    return (
                      <div key={plat} className={pi > 0 ? "mt-5 pt-5 border-t border-gray-100 dark:border-white/[0.06]" : ""}>
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`p-1.5 rounded-md ring-1 ${isLinux ? "bg-emerald-50 dark:bg-emerald-950/40 ring-emerald-100 dark:ring-emerald-900/40" : "bg-blue-50 dark:bg-blue-950/40 ring-blue-100 dark:ring-blue-900/40"}`}
                          >
                            <Image
                              src={isLinux ? linux : windows}
                              alt={p?.platform ?? plat}
                              width={16}
                              height={16}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {p?.platform}
                          </span>
                          {isLinux && (
                            <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-1.5 py-0.5 rounded-full">
                              KOOMPI
                            </span>
                          )}
                        </div>
                        <div className="rounded-[var(--radius-sm)] overflow-hidden border border-gray-100 dark:border-white/[0.06] text-xs">
                          {specRows(plat).map(({ label, value, icon: Icon }, i) => (
                            <div
                              key={label}
                              className={`flex items-center justify-between px-3 py-2 gap-2 ${i % 2 === 0
                                ? "bg-gray-50 dark:bg-gray-800/60"
                                : "bg-white dark:bg-gray-900"
                                }`}
                            >
                              <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                                <Icon className="w-3 h-3 shrink-0" />
                                <span className="font-medium">{label}</span>
                              </div>
                              <span className="text-gray-800 dark:text-gray-200 font-semibold tabular-nums">
                                {value ?? "—"}
                              </span>
                            </div>
                          ))}
                          {/* OS requirement row */}
                          <div className={`flex items-start justify-between px-3 py-2 gap-2 ${specRows(plat).length % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/60" : "bg-white dark:bg-gray-900"}`}>
                            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 shrink-0">
                              <Monitor className="w-3 h-3 shrink-0" />
                              <span className="font-medium">OS</span>
                            </div>
                            <span className="text-gray-800 dark:text-gray-200 font-semibold text-right">
                              {p?.osRequirement ?? "—"}
                            </span>
                          </div>
                        </div>

                        {/* File name */}
                        <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1.5 ml-0.5">
                          {p?.fileName}
                        </p>
                      </div>
                    );
                  })}

                  {/* Developer row */}
                  <div className="mt-5 pt-5 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      Developer
                    </span>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/koompi-footer.png"
                        alt="KOOMPI"
                        width={20}
                        height={20}
                        className="rounded-sm object-contain"
                      />
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        KOOMPI
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating card */}
              <div className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] p-5 flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                    {product.rate.toFixed(1)}
                  </span>
                  <StarRow rate={product.rate} size="sm" />
                  <p className="mt-1 text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                    Rating
                  </p>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct =
                      star === Math.round(product.rate) ? 70 : star < Math.round(product.rate) ? 20 : 10;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 w-2 shrink-0">{star}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div className="border-t border-gray-200 dark:border-white/[0.06]">
        <Footer />
      </div>

      {/* ── Image Lightbox Overlay ────────────────────────────── */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-5 right-5 z-[90] flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all duration-200 hover:scale-105"
            aria-label="Close lightbox"
          >
            <X className="w-4 h-4" />
          </button>
          <div
            className="relative max-w-4xl w-full rounded-[var(--radius-lg)] overflow-hidden shadow-2xl"
            style={{ maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="Screenshot enlarged"
              width={1280}
              height={720}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
}
