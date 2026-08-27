"use client";

import Navbar from "@/src/utils/Navbar";
import { PRODUCT_DATA } from "@/src/constants";
import Image from "next/image";
import { useParams, useRouter, notFound } from "next/navigation";
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
  Share2,
  Trophy,
  Zap,
} from "lucide-react";
import windows from "@/public/windows-icon.svg";
import linux from "@/public/linux-icon.svg";
import { Footer } from "@/src/utils/Footer";
import Link from "next/link";

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

/* ── Skills per category ─────────────────────────────────────────── */
const SKILLS_MAP: Record<string, { icon: string; label: string; color: string }[]> = {
  Coding: [
    { icon: "⌨️", label: "Typing Speed",     color: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30" },
    { icon: "🧠", label: "Code Memory",      color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30" },
    { icon: "⚡", label: "Reaction Speed",   color: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30" },
    { icon: "🎯", label: "Pattern Focus",    color: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30" },
  ],
  Math: [
    { icon: "🧮", label: "Mental Math",      color: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30" },
    { icon: "⚡", label: "Calculation Speed", color: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30" },
    { icon: "🎯", label: "Accuracy",         color: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30" },
    { icon: "🧠", label: "Working Memory",   color: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30" },
  ],
  "Mouse Skills": [
    { icon: "🖱️", label: "Precision",        color: "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30" },
    { icon: "👁️", label: "Hand-Eye Coord",   color: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30" },
    { icon: "⚡", label: "Reaction Time",    color: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30" },
    { icon: "🎯", label: "Target Tracking",  color: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30" },
  ],
  Logic: [
    { icon: "🧠", label: "Critical Thinking", color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30" },
    { icon: "🗺️", label: "Spatial Reasoning", color: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30" },
    { icon: "🔗", label: "Pattern Logic",     color: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30" },
    { icon: "🎯", label: "Problem Solving",   color: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30" },
  ],
  Puzzle: [
    { icon: "🧩", label: "Pattern Recognition", color: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30" },
    { icon: "🧠", label: "Logical Deduction",   color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30" },
    { icon: "🎯", label: "Focus",               color: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30" },
    { icon: "⏱️", label: "Patience",            color: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30" },
  ],
  Typing: [
    { icon: "⌨️", label: "WPM Speed",       color: "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30" },
    { icon: "🎯", label: "Accuracy",        color: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30" },
    { icon: "🧠", label: "Muscle Memory",   color: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30" },
    { icon: "⚡", label: "Rhythm & Flow",   color: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30" },
  ],
};

const DEFAULT_SKILLS = [
  { icon: "🎮", label: "Digital Skills",   color: "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600" },
  { icon: "🎯", label: "Focus",            color: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30" },
  { icon: "⚡", label: "Speed",            color: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30" },
];

/* ── Testimonials per category ──────────────────────────────────── */
const TESTIMONIALS_MAP: Record<string, { quote: string; name: string; role: string; flag: string; avatar: string; rating: number }[]> = {
  Coding: [
    { quote: "I went from 25 WPM to 68 WPM in just 3 weeks of playing Typing Code. My productivity as a developer skyrocketed!", name: "Sopheak R.", role: "Software Developer", flag: "🇰🇭", avatar: "S", rating: 5 },
    { quote: "Best free coding game I've ever used. The Python challenges actually teach real syntax — not just random words.", name: "Dara M.", role: "CS Student", flag: "🇰🇭", avatar: "D", rating: 5 },
    { quote: "My students use this in class. Their typing speed improved 40% on average after just 2 weeks.", name: "Ly Kosal", role: "Programming Teacher", flag: "🇰🇭", avatar: "L", rating: 5 },
  ],
  Math: [
    { quote: "Mental math used to terrify me. After playing daily for a month, I can do calculations in my head effortlessly.", name: "Maly V.", role: "High School Student", flag: "🇰🇭", avatar: "M", rating: 5 },
    { quote: "The time pressure is key — it forces you to think fast. My exam scores improved noticeably.", name: "Chanra S.", role: "College Student", flag: "🇰🇭", avatar: "C", rating: 5 },
    { quote: "Simple, clean, and effective. Perfect for quick 5-minute practice sessions between classes.", name: "Pisey N.", role: "Math Tutor", flag: "🇰🇭", avatar: "P", rating: 4 },
  ],
  "Mouse Skills": [
    { quote: "As a graphic designer, mouse precision is everything. Dragon Drop trained my hand control in a really fun way.", name: "Veasna K.", role: "Graphic Designer", flag: "🇰🇭", avatar: "V", rating: 5 },
    { quote: "My 9-year-old struggled with the mouse. After a week of Master Mouse, she's navigating like a pro!", name: "Rina C.", role: "Parent", flag: "🇰🇭", avatar: "R", rating: 5 },
    { quote: "The drag-and-drop mechanics feel incredibly satisfying once you get good at it. Very addictive!", name: "Borey T.", role: "Game Designer", flag: "🇰🇭", avatar: "B", rating: 5 },
  ],
  Logic: [
    { quote: "Robot Obstacle completely changed how I approach problem-solving. I think in steps and sequences now.", name: "Kimheng P.", role: "Engineer", flag: "🇰🇭", avatar: "K", rating: 5 },
    { quote: "I use this to warm up my brain before coding sessions. It genuinely sharpens your logical thinking.", name: "Samnang L.", role: "Backend Developer", flag: "🇰🇭", avatar: "S", rating: 5 },
    { quote: "Surprisingly deep for a free game. The multi-step planning required teaches real algorithmic thinking.", name: "Virak T.", role: "Tech Teacher", flag: "🇰🇭", avatar: "V", rating: 5 },
  ],
  Puzzle: [
    { quote: "Number Link is deceptively simple and endlessly satisfying. I play it every morning to wake my brain up.", name: "Chantrea O.", role: "Data Analyst", flag: "🇰🇭", avatar: "C", rating: 5 },
    { quote: "My kids compete on the leaderboard now. Best screen time I've ever seen them have!", name: "Sambath R.", role: "Parent of 3", flag: "🇰🇭", avatar: "S", rating: 5 },
    { quote: "The spatial reasoning this game builds is directly applicable to coding architecture. Recommend to all devs.", name: "Ratana M.", role: "Software Architect", flag: "🇰🇭", avatar: "R", rating: 5 },
  ],
  Typing: [
    { quote: "Koompi Typing got me from 45 to 82 WPM in a month. I type full sentences so much faster now.", name: "Sreyleak H.", role: "Content Writer", flag: "🇰🇭", avatar: "S", rating: 5 },
    { quote: "The Khmer keyboard layout support is amazing. Finally a typing game that works for us!", name: "Bunthoeun K.", role: "Journalist", flag: "🇰🇭", avatar: "B", rating: 5 },
    { quote: "Used this to prep for job interviews. Typing speed went from 'slow' to 'proficient' in 3 weeks.", name: "Piseth V.", role: "Job Seeker", flag: "🇰🇭", avatar: "P", rating: 5 },
  ],
};

const DEFAULT_TESTIMONIALS = [
  { quote: "This game improved my computer skills in a way I didn't expect. Genuinely fun and educational.", name: "Ratanak C.", role: "Student", flag: "🇰🇭", avatar: "R", rating: 5 },
  { quote: "KAPP is the best free learning platform I've found. No ads, no paywalls, just great games.", name: "Sreymom T.", role: "Teacher", flag: "🇰🇭", avatar: "S", rating: 5 },
  { quote: "My students love the leaderboard. Healthy competition makes them work harder than any homework.", name: "Phearith L.", role: "School Principal", flag: "🇰🇭", avatar: "P", rating: 5 },
];

/* ── Difficulty badge colors ─────────────────────────────────────── */
const DIFFICULTY_STYLES = {
  Easy: { bg: "bg-teal-500/15 dark:bg-teal-500/20", text: "text-teal-700 dark:text-teal-300", dot: "bg-teal-500" },
  Medium: { bg: "bg-amber-500/15 dark:bg-amber-500/20", text: "text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  Hard: { bg: "bg-rose-500/15 dark:bg-rose-500/20", text: "text-rose-700 dark:text-rose-300", dot: "bg-rose-500" },
};

/* ── Star row helper ──────────────────────────────────────────────── */
function StarRow({ rate, size = "sm" }: { rate: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = i <= Math.floor(rate) ? 1 : i - rate < 1 && i - rate > 0 ? rate - Math.floor(rate) : 0;
        return (
          <span key={i} className={`relative ${sz} shrink-0`}>
            <svg className={`absolute inset-0 ${sz} text-gray-200 dark:text-gray-700`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <svg className={`${sz} text-amber-400`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ── Section heading helper ───────────────────────────────────────── */
function SectionHead({ accentBg, children }: { accentBg: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-1 h-6 rounded-full ${accentBg}`} />
      <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{children}</h2>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function GameDetail() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const params = useParams<{ game: string }>();
  const gameName = params?.game;
  const product = gameName ? PRODUCT_DATA.find((p) => p.id === gameName) : null;
  const router = useRouter();

  const objectives = LEARNING_OBJECTIVES[product?.category ?? ""] ?? DEFAULT_OBJECTIVES;
  const skills = SKILLS_MAP[product?.category ?? ""] ?? DEFAULT_SKILLS;
  const testimonials = TESTIMONIALS_MAP[product?.category ?? ""] ?? DEFAULT_TESTIMONIALS;
  const diff = DIFFICULTY_STYLES[product?.difficulty ?? "Easy"] ?? DIFFICULTY_STYLES.Easy;

  /* Related games: same category first, then other games, excluding current */
  const relatedGames = product
    ? [
        ...PRODUCT_DATA.filter((g) => g.id !== product.id && g.category === product.category),
        ...PRODUCT_DATA.filter((g) => g.id !== product.id && g.category !== product.category),
      ].slice(0, 3)
    : [];

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !!lightboxSrc);
  }, [lightboxSrc]);

  /* Sticky CTA scroll listener */
  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    const title = product ? `Play ${product.title} on KAPP` : "KAPP — Learn through play";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
      }
    } catch { /* ignore */ }
  };

  if (!product) {
    notFound();
  }

  const coverSrc = `/${product.cover}`;
  const insiderSrc = product.insider ? `/${product.insider}` : coverSrc;
  const thumbnailSrc = (product.thumbnail || product.cover).replace(/^(?!\/)/, "/");
  const specRows = (platform: "windows" | "linux") => {
    const p = product[platform];
    return [
      { label: "Version",      value: p?.releaseDetails?.version,      icon: Tag },
      { label: "File Size",    value: p?.releaseDetails?.fileSize,      icon: HardDrive },
      { label: "Architecture", value: p?.releaseDetails?.architecture,  icon: Cpu },
      { label: "Last Updated", value: p?.releaseDetails?.releaseDate,   icon: Calendar },
    ];
  };

  const brandBtnCls = product.brandColor ?? "bg-indigo-600 hover:bg-indigo-700 text-white";
  const accentBg = product.brandColor?.split(" ")[0] ?? "bg-indigo-600";

  return (
    <div className="min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 flex flex-col">
      <Navbar />

      {/* Share toast */}
      <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold shadow-lg transition-all duration-300 pointer-events-none ${shareToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        Link copied!
      </div>

      <div className="mt-16 flex-1">

        {/* ── METADATA TAG BAR ── */}
        <section className="border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)]">
          <div className="mx-auto max-w-7xl px-5 py-3.5">
            <div className="flex flex-wrap items-center gap-2">
              {product.type?.map((t: { text: string; color: string }, i: number) => (
                <span key={i} className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider ${t.color}`}>
                  {t.text}
                </span>
              ))}
              <span className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider ${diff.bg} ${diff.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
                {product.difficulty}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <Wifi className="w-3 h-3" /> Offline Capable
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <Monitor className="w-3 h-3" /> Windows 10/11
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                KOOMPI / Linux
              </span>
              {/* Share button */}
              <button
                onClick={handleShare}
                id="game-detail-share-btn"
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:border-teal-300 dark:hover:border-teal-500/40 hover:text-teal-700 dark:hover:text-teal-400 transition-all cursor-pointer"
                aria-label="Share this game"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>
        </section>

        {/* ── HERO BANNER ── */}
        <section className="mx-auto max-w-7xl px-5 pt-8 pb-0">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
              </li>
              <li>
                <Link href="/#games-section" className="hover:text-gray-900 dark:hover:text-white transition-colors">Games</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
              </li>
              <li className="text-gray-900 dark:text-white font-semibold" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="relative overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]" style={{ minHeight: 420 }}>
            <div className="absolute inset-0">
              <Image src={coverSrc} alt={`${product.title} promotional banner`} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f9fafb] via-[#f9fafb]/60 to-transparent dark:from-[#030712] dark:via-[#030712]/60 dark:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent dark:from-black/70 dark:via-black/20 dark:to-transparent" />
            </div>

            <div className="relative z-10 px-8 pt-8 pb-10 flex flex-col h-full min-h-[420px]">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                <div className="flex-1 max-w-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg" aria-hidden="true">{product.categoryIcon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">{product.category}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">{product.title}</h1>
                  <p className="mt-3 text-base md:text-lg text-white/70 leading-relaxed max-w-xl">{product.subTitle}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <StarRow rate={product.rate} size="md" />
                      <span className="text-sm font-bold text-white ml-1">{product.rate.toFixed(1)}</span>
                    </div>
                    <span className="text-white/30 text-sm">·</span>
                    <span className="flex items-center gap-1 text-sm text-white/60"><Users className="w-3.5 h-3.5" />{product.plays} plays</span>
                    <span className="text-white/30 text-sm">·</span>
                    <span className="flex items-center gap-1 text-sm text-white/60"><Clock className="w-3.5 h-3.5" />{product.avgTime} avg</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:min-w-[220px]">
                  <button id="hero-play-btn" onClick={() => router.push(`/play/${product.id}`)} className={`group relative flex items-center justify-center gap-2.5 px-7 py-4 rounded-[var(--radius)] font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg overflow-hidden ${brandBtnCls}`}>
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/10 skew-x-[-20deg] transition-transform duration-500 ease-out pointer-events-none" />
                    <Play className="w-4 h-4 fill-current" /> Play in Browser
                  </button>
                  <a href="#download-section" id="hero-download-cta" className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[var(--radius)] font-bold text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
                    <Download className="w-5 h-5 shrink-0" /> Download Free
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF STATS BAR ── */}
        <section className="mx-auto max-w-7xl px-5 mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <Users className="w-4 h-4 text-teal-500" />, value: product.plays, label: "Total Plays", color: "text-teal-600 dark:text-teal-400" },
              { icon: <Star className="w-4 h-4 text-amber-500 fill-amber-400" />, value: `${product.rate.toFixed(1)} / 5`, label: "Player Rating", color: "text-amber-600 dark:text-amber-400" },
              { icon: <Clock className="w-4 h-4 text-indigo-500" />, value: product.avgTime, label: "Avg. Session", color: "text-indigo-600 dark:text-indigo-400" },
              { icon: <Trophy className="w-4 h-4 text-violet-500" />, value: "45+ countries", label: "Players worldwide", color: "text-violet-600 dark:text-violet-400" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-white/[0.07] px-4 py-3.5 shadow-[var(--shadow-sm)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-white/[0.06]">
                  {s.icon}
                </div>
                <div>
                  <p className={`text-base font-black ${s.color} leading-tight`}>{s.value}</p>
                  <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAIN BODY ── */}
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ─── LEFT COLUMN ─────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* About This Game */}
              <section aria-labelledby="about-heading" className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden">
                <div className={`h-0.5 w-full ${accentBg}`} />
                <div className="p-6 md:p-8">
                  <SectionHead accentBg={accentBg}>About This Game</SectionHead>
                  <p className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 leading-snug mb-4">{product.subTitle}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{product.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed mb-8">
                    Designed for learners of all ages, <strong className="text-gray-700 dark:text-gray-300">{product.title}</strong> is a{" "}
                    <span className="font-medium">{product.difficulty.toLowerCase()}-difficulty</span> {product.category.toLowerCase()} game
                    with an average session time of <span className="font-medium">{product.avgTime}</span>. With over{" "}
                    <span className="font-medium">{product.plays} plays</span>, it has quickly become one of KOOMPI&apos;s
                    most-loved educational tools — available for free both in-browser and as a native desktop app for Windows and Linux.
                  </p>

                  {/* Learning objectives */}
                  <div className="rounded-[var(--radius)] bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3">Learning Objectives</p>
                    <ul className="flex flex-col gap-2">
                      {objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-teal-500 dark:text-teal-400 shrink-0" />
                          <span className="text-sm text-teal-900 dark:text-teal-200 leading-relaxed">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Skills You'll Build — NEW */}
              <section aria-labelledby="skills-heading" className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden">
                <div className={`h-0.5 w-full ${accentBg}`} />
                <div className="p-6 md:p-8">
                  <SectionHead accentBg={accentBg}>Skills You&apos;ll Build</SectionHead>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    Every minute you play strengthens real, transferable skills used by professionals worldwide.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {skills.map((skill, i) => (
                      <div key={i} className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${skill.color}`}>
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-xs font-bold leading-tight">{skill.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress encouragement bar */}
                  <div className="mt-6 rounded-2xl bg-gradient-to-r from-teal-500 to-indigo-600 p-5 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-5 h-5 text-yellow-300" />
                      <p className="font-bold text-sm">Your skill growth trajectory</p>
                    </div>
                    <div className="space-y-2">
                      {skills.slice(0, 2).map((skill, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs font-medium w-28 shrink-0 text-white/80">{skill.label}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-white/20">
                            <div
                              className="h-1.5 rounded-full bg-white"
                              style={{ width: `${[72, 65][i]}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-white/90 w-8 shrink-0">{[72, 65][i]}%</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-white/60 mt-3">Play more to unlock your full potential</p>
                  </div>
                </div>
              </section>

              {/* Media Gallery */}
              <section aria-labelledby="gallery-heading" className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden">
                <div className={`h-0.5 w-full ${accentBg}`} />
                <div className="p-6 md:p-8">
                  <SectionHead accentBg={accentBg}>Screenshots</SectionHead>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { src: insiderSrc, caption: "Challenge Selection", desc: "Pick your difficulty level" },
                      { src: thumbnailSrc, caption: "Live Coding Challenge", desc: "Master syntax in real-time" },
                      { src: coverSrc, caption: "Results Screen", desc: "Track your speed and accuracy" },
                      { src: insiderSrc, caption: "Leaderboard View", desc: "See how you rank globally" }
                    ].map((shot, idx) => (
                      <div key={idx} className="flex flex-col gap-2.5">
                        <button onClick={() => setLightboxSrc(shot.src)} className="group relative aspect-video rounded-[var(--radius)] overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/60 dark:ring-white/[0.08] hover:ring-2 hover:ring-teal-500/50 transition-all duration-200" aria-label={`View ${shot.caption}`}>
                          <Image src={shot.src} alt={shot.caption} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 rounded-full p-2"><ZoomIn className="w-5 h-5 text-white" /></div>
                          </div>
                        </button>
                        <div className="px-1">
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{shot.caption}</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{shot.desc}</p>
                        </div>
                      </div>
                    ))}
                    
                    <button onClick={() => router.push(`/play/${product.id}`)} id="gallery-play-browser-btn" className={`group relative aspect-video sm:col-span-2 mt-2 rounded-[var(--radius)] overflow-hidden bg-gray-900 dark:bg-gray-800 ring-1 ring-gray-200/60 dark:ring-white/[0.08] hover:ring-2 hover:ring-teal-500/50 transition-all duration-200 flex items-center justify-center`} aria-label="Play game in browser">
                      <Image src={coverSrc} alt="" fill sizes="100vw" className="object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300" aria-hidden="true" />
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 ${brandBtnCls}`}>
                          <Play className="w-7 h-7 fill-current" />
                        </div>
                        <span className="text-sm font-bold text-white">Play in Browser — Free</span>
                      </div>
                    </button>
                  </div>
                </div>
              </section>

              {/* Player Testimonials — NEW */}
              <section aria-labelledby="testimonials-heading" className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden">
                <div className={`h-0.5 w-full ${accentBg}`} />
                <div className="p-6 md:p-8">
                  <SectionHead accentBg={accentBg}>What Players Say</SectionHead>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {testimonials.map((t, i) => (
                      <div key={i} className="flex flex-col gap-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-white/[0.06] p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                        {/* Stars */}
                        <StarRow rate={t.rating} size="sm" />
                        {/* Quote */}
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 flex-1">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        {/* Author */}
                        <div className="flex items-center gap-2.5 pt-1 border-t border-gray-200/60 dark:border-white/[0.06]">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {t.avatar}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1">
                              {t.name} <span className="text-base">{t.flag}</span>
                            </p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Aggregate trust signal */}
                  <div className="mt-5 flex items-center gap-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 p-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300">{product.rate.toFixed(1)} average rating</p>
                    <p className="text-xs text-amber-600 dark:text-amber-500 ml-auto font-medium">From {product.plays} players</p>
                  </div>
                </div>
              </section>

              {/* Similar Games — NEW */}
              {relatedGames.length > 0 && (
                <section aria-labelledby="related-heading" className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden">
                  <div className={`h-0.5 w-full ${accentBg}`} />
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <SectionHead accentBg={accentBg}>You Might Also Like</SectionHead>
                      <Link href="/#games-section" className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors flex items-center gap-1">
                        All games <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {relatedGames.map((game) => {
                        const thumbSrc = (game.thumbnail || game.cover || "/cover1.png").replace(/^(?!\/)/, "/");
                        return (
                          <Link
                            key={game.id}
                            href={`/${game.id}`}
                            id={`related-game-${game.id}`}
                            className="group block rounded-2xl overflow-hidden border border-gray-200/70 dark:border-white/[0.07] hover:border-teal-400/40 dark:hover:border-teal-500/30 bg-gray-50 dark:bg-gray-800/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <div className="relative aspect-video overflow-hidden">
                              <Image src={thumbSrc} alt={game.title} fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                              <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-lg bg-black/55 backdrop-blur-sm px-2 py-1">
                                <span className="text-xs">{game.categoryIcon}</span>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">{game.category}</span>
                              </div>
                            </div>
                            <div className="p-3.5">
                              <p className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug mb-1 line-clamp-1">{game.title}</p>
                              <div className="flex items-center gap-1.5">
                                <StarRow rate={game.rate} size="sm" />
                                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{game.rate.toFixed(1)}</span>
                                <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500">{game.plays}</span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* ─── RIGHT COLUMN: Specs Sidebar ──────────────────── */}
            <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24">

              {/* Primary Download CTA card */}
              <div id="download-section" className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-md)] overflow-hidden">
                <div className={`h-1 w-full ${accentBg}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">Free</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 rounded-full">No Cost</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">Available for Windows & Linux · KOOMPI Optimized</p>

                  <div className="flex flex-col gap-3">
                    {([
                      { key: "linux" as const, icon: linux, iconAlt: "Linux", label: "Download for Linux", note: "KOOMPI Optimized", noteClass: "text-emerald-600 dark:text-emerald-400" },
                      { key: "windows" as const, icon: windows, iconAlt: "Windows", label: "Download for Windows", note: "Windows 10/11", noteClass: "text-blue-600 dark:text-blue-400" },
                    ]).map(({ key, icon, iconAlt, label, note, noteClass }) => {
                      const p = product[key];
                      return (
                        <div key={key}>
                          <a href={p?.releaseDetails?.download} target="_blank" rel="noopener noreferrer" id={`download-${key}-btn`}>
                            <button className="w-full py-3 px-4 rounded-[var(--radius)] font-semibold text-sm flex items-center gap-3 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:shadow-[var(--shadow-sm)]">
                              <div className="p-1.5 rounded-md bg-gray-200 dark:bg-white/10 shrink-0">
                                <Image src={icon} alt={iconAlt} width={18} height={18} />
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

                  <button onClick={() => router.push(`/play/${product.id}`)} className="mt-4 w-full py-2.5 px-4 rounded-[var(--radius)] text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-transparent transition-all duration-200 flex items-center justify-center gap-2">
                    <Play className="w-3.5 h-3.5" /> Or play free in browser
                  </button>
                </div>
              </div>

              {/* Technical Specs card */}
              <div className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-1 h-5 rounded-full ${accentBg}`} />
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight uppercase">Technical Details</h2>
                  </div>
                  {(["linux", "windows"] as const).map((plat, pi) => {
                    const p = product[plat];
                    const isLinux = plat === "linux";
                    return (
                      <div key={plat} className={pi > 0 ? "mt-5 pt-5 border-t border-gray-100 dark:border-white/[0.06]" : ""}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1.5 rounded-md ring-1 ${isLinux ? "bg-emerald-50 dark:bg-emerald-950/40 ring-emerald-100 dark:ring-emerald-900/40" : "bg-blue-50 dark:bg-blue-950/40 ring-blue-100 dark:ring-blue-900/40"}`}>
                            <Image src={isLinux ? linux : windows} alt={p?.platform ?? plat} width={16} height={16} />
                          </div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{p?.platform}</span>
                          {isLinux && <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-1.5 py-0.5 rounded-full">KOOMPI</span>}
                        </div>
                        <div className="rounded-[var(--radius-sm)] overflow-hidden border border-gray-100 dark:border-white/[0.06] text-xs">
                          {specRows(plat).map(({ label, value, icon: Icon }, i) => (
                            <div key={label} className={`flex items-center justify-between px-3 py-2 gap-2 ${i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/60" : "bg-white dark:bg-gray-900"}`}>
                              <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                                <Icon className="w-3 h-3 shrink-0" />
                                <span className="font-medium">{label}</span>
                              </div>
                              <span className="text-gray-800 dark:text-gray-200 font-semibold tabular-nums">{value ?? "—"}</span>
                            </div>
                          ))}
                          <div className={`flex items-start justify-between px-3 py-2 gap-2 ${specRows(plat).length % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/60" : "bg-white dark:bg-gray-900"}`}>
                            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 shrink-0">
                              <Monitor className="w-3 h-3 shrink-0" />
                              <span className="font-medium">OS</span>
                            </div>
                            <span className="text-gray-800 dark:text-gray-200 font-semibold text-right">{p?.osRequirement ?? "—"}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1.5 ml-0.5">{p?.fileName}</p>
                      </div>
                    );
                  })}

                  <div className="mt-5 pt-5 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Developer</span>
                    <div className="flex items-center gap-2">
                      <Image src="/koompi-footer.png" alt="KOOMPI" width={20} height={20} className="rounded-sm object-contain" />
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">KOOMPI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating card */}
              <div className="rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] p-5 flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{product.rate.toFixed(1)}</span>
                  <StarRow rate={product.rate} size="sm" />
                  <p className="mt-1 text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Rating</p>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === Math.round(product.rate) ? 70 : star < Math.round(product.rate) ? 20 : 10;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 w-2 shrink-0">{star}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leaderboard prompt card */}
              <Link href="/leaderboard" id="game-detail-leaderboard-link" className="group block rounded-[var(--radius-lg)] bg-gradient-to-br from-teal-500 to-indigo-600 p-5 text-white shadow-[0_4px_20px_rgba(20,184,166,0.25)] hover:shadow-[0_6px_28px_rgba(20,184,166,0.38)] hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="font-black text-sm">Global Leaderboard</span>
                </div>
                <p className="text-xs text-white/75 mb-3 leading-relaxed">Play and submit your score to see where you rank among 2.5M+ learners worldwide.</p>
                <div className="flex items-center gap-1 text-xs font-bold text-white/90">
                  View rankings <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-white/[0.06]">
        <Footer />
      </div>

      {/* ── STICKY CTA BAR ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-[60] transform transition-transform duration-300 ease-in-out ${showStickyCTA ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200/80 dark:border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
          <div className="mx-auto max-w-7xl px-5 py-3 md:py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="hidden sm:block relative w-11 h-11 rounded-lg overflow-hidden shrink-0 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                <Image src={thumbnailSrc} alt={product.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-tight">{product.title}</p>
                <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                  <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{product.rate.toFixed(1)} · {product.plays} plays</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <a href="#download-section" className="hidden sm:flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius)] font-bold text-sm text-gray-700 dark:text-gray-200 bg-gray-100/80 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-200/50 dark:border-white/5">
                <Download className="w-4 h-4" /> Download Free
              </a>
              <button onClick={() => router.push(`/play/${product.id}`)} className={`group flex items-center justify-center gap-2 px-6 py-2.5 rounded-[var(--radius)] font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.97] shadow-md ${brandBtnCls}`}>
                <Play className="w-4 h-4 fill-current" /> Play Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxSrc && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setLightboxSrc(null)} role="dialog" aria-label="Image lightbox" aria-modal="true">
          <button onClick={() => setLightboxSrc(null)} className="absolute top-5 right-5 z-[90] flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all duration-200 hover:scale-105" aria-label="Close lightbox">
            <X className="w-4 h-4" />
          </button>
          <div className="relative max-w-4xl w-full rounded-[var(--radius-lg)] overflow-hidden shadow-2xl" style={{ maxHeight: "85vh" }} onClick={(e) => e.stopPropagation()}>
            <Image src={lightboxSrc} alt="Screenshot enlarged" width={1280} height={720} className="w-full h-auto object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
