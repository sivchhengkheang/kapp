"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Footer } from "../../utils/Footer";
import { AnimatedSection } from "../../utils/AnimatedSection";
import Link from "next/link";
import {
  Gamepad2,
  Brain,
  Trophy,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Star,
  ChevronDown,
  Keyboard,
  MousePointer2,
  Calculator,
  Code2,
  Puzzle,
  CheckCircle2,
  BarChart3,
  Repeat2,
  MessageSquareQuote,
} from "lucide-react";

const Navbar = dynamic(() => import("../../utils/Navbar"), { ssr: false });

// ── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── FAQ data (expanded) ─────────────────────────────────────────────────────
const ABOUT_FAQS = [
  {
    id: "af-1",
    icon: "🎯",
    question: "How does scoring work?",
    answer:
      "Each game has its own scoring formula based on accuracy, speed, and difficulty. In Typing Code, every correct character adds points while errors deduct them. Finishing faster multiplies your base score by a speed bonus. Your best session score is saved to the leaderboard.",
  },
  {
    id: "af-2",
    icon: "📈",
    question: "How does difficulty scaling work?",
    answer:
      "KAPP uses adaptive difficulty: games start at your chosen tier (Easy / Medium / Hard) and subtle parameters — like prompt complexity or time pressure — adjust as you improve. You'll be challenged just enough to stay in the learning zone without feeling overwhelmed.",
  },
  {
    id: "af-3",
    icon: "🏅",
    question: "How do achievements unlock?",
    answer:
      "Achievements trigger automatically based on milestones: play count, score thresholds, streak days, and cross-game variety. Some are hidden and reward exploration. Each badge appears on your profile and boosts your leaderboard standing.",
  },
  {
    id: "af-4",
    icon: "🧠",
    question: "What's the science behind the games?",
    answer:
      "KAPP games apply three evidence-backed learning principles: spaced repetition (revisiting concepts at optimal intervals), immediate feedback (instant error correction), and active recall (producing answers rather than passively reading them). Together these produce 2–3× better retention than passive study.",
  },
  {
    id: "af-5",
    icon: "🏆",
    question: "How does the leaderboard work?",
    answer:
      "Leaderboards update in real time. The Global ranking compares your total score across all games. Game-specific boards compare scores within a single title. Weekly boards reset every Monday at midnight UTC, giving everyone a fresh shot at the top.",
  },
  {
    id: "af-6",
    icon: "🎮",
    question: "Are all games free?",
    answer:
      "Yes — every game is free to play in your browser with no account required. Desktop apps (Windows & Linux) are also free to download. An optional account lets you track progress and compete on leaderboards.",
  },
  {
    id: "af-7",
    icon: "🏫",
    question: "Can teachers use KAPP in classrooms?",
    answer:
      "Absolutely. KAPP is actively used in schools across Cambodia. Teachers can assign specific games as practice sessions, share leaderboard links, and track students' improvement over time. Contact the KOOMPI team at koompi.com for classroom integrations.",
  },
  {
    id: "af-8",
    icon: "⏱️",
    question: "How long does it take to see real improvement?",
    answer:
      "Most learners see measurable gains within 5–7 days of consistent daily play (10–15 min/day). Typing games typically show a 20–30% WPM increase in the first two weeks. Math games improve calculation speed by an average of 40% over the first month.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof ABOUT_FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-indigo-200/70 dark:border-indigo-500/30 bg-indigo-50/40 dark:bg-indigo-500/[0.05]"
          : "border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-white/[0.12]"
      }`}
    >
      <button
        id={faq.id}
        aria-expanded={isOpen}
        aria-controls={`${faq.id}-answer`}
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-colors duration-200 ${
            isOpen
              ? "bg-indigo-100 dark:bg-indigo-500/20"
              : "bg-gray-100 dark:bg-white/[0.07] group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10"
          }`}
          aria-hidden="true"
        >
          {faq.icon}
        </span>
        <span className="flex-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-all duration-300 ${
            isOpen
              ? "rotate-180 text-indigo-600 dark:text-indigo-400"
              : "text-gray-400"
          }`}
        />
      </button>
      <div
        id={`${faq.id}-answer`}
        role="region"
        aria-labelledby={faq.id}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <p className="px-6 pb-6 pt-0 text-sm leading-relaxed text-gray-600 dark:text-gray-400 pl-[4.5rem]">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

// ── Skill tree nodes ────────────────────────────────────────────────────────
const SKILL_TREE = [
  {
    game: "Koompi Typing",
    icon: "⌨️",
    color: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/30",
    skills: ["WPM Speed", "Key Accuracy", "Muscle Memory"],
    outcome: "Coding & Writing Speed",
    outcomeIcon: <Code2 className="w-4 h-4" />,
  },
  {
    game: "Typing Code",
    icon: "💻",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/30",
    skills: ["Syntax Recall", "Code Fluency", "Bracket Balance"],
    outcome: "Developer Productivity",
    outcomeIcon: <Zap className="w-4 h-4" />,
  },
  {
    game: "Typing Math",
    icon: "🔢",
    color: "from-sky-500 to-cyan-600",
    glow: "shadow-sky-500/30",
    skills: ["Mental Arithmetic", "Calculation Speed", "Number Patterns"],
    outcome: "Math & Logic Fluency",
    outcomeIcon: <Calculator className="w-4 h-4" />,
  },
  {
    game: "Dragon Drop",
    icon: "🐉",
    color: "from-orange-500 to-red-500",
    glow: "shadow-orange-500/30",
    skills: ["Reflexes", "Tracking Precision", "Hand-Eye Coord."],
    outcome: "Mouse Mastery",
    outcomeIcon: <MousePointer2 className="w-4 h-4" />,
  },
  {
    game: "Robot Obstacle",
    icon: "🤖",
    color: "from-teal-500 to-emerald-600",
    glow: "shadow-teal-500/30",
    skills: ["Sequential Logic", "Pattern Recognition", "Debugging"],
    outcome: "Problem Solving",
    outcomeIcon: <Brain className="w-4 h-4" />,
  },
  {
    game: "Number Link",
    icon: "🧩",
    color: "from-emerald-500 to-green-600",
    glow: "shadow-emerald-500/30",
    skills: ["Spatial Reasoning", "Focus & Attention", "Strategy"],
    outcome: "Critical Thinking",
    outcomeIcon: <Puzzle className="w-4 h-4" />,
  },
];

// ── Learning science cards ──────────────────────────────────────────────────
const SCIENCE_CARDS = [
  {
    icon: <Repeat2 className="w-6 h-6" />,
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-200/60 dark:border-indigo-500/20",
    stat: "2.5×",
    label: "Better Retention",
    desc: "Spaced repetition built into every session revisits weak spots at the optimal moment, cementing knowledge far better than cramming.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200/60 dark:border-amber-500/20",
    stat: "3×",
    label: "Faster Learning",
    desc: "Immediate feedback on every mistake corrects neural pathways instantly — learners using gamified feedback loops progress 3× faster than textbook study.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-teal-500 to-cyan-500",
    bg: "bg-teal-50 dark:bg-teal-500/10",
    border: "border-teal-200/60 dark:border-teal-500/20",
    stat: "45%",
    label: "Avg. Skill Gain",
    desc: "KAPP learners see an average 45% improvement in their target skill within 2 weeks of daily 15-minute sessions — across all game categories.",
  },
];

// ── Steps with game-specific examples ──────────────────────────────────────
const STEPS = [
  {
    id: "01",
    title: "Discover & Choose",
    description:
      "Browse 7+ educational mini-games sorted by skill, difficulty, and session time. Each game card shows you exactly what you'll gain before you start.",
    icon: <Gamepad2 className="w-8 h-8 text-indigo-500" />,
    color: "from-indigo-500/20 to-blue-500/20",
    border: "border-indigo-500/20",
    accent: "indigo",
    example: {
      label: "Example",
      text: '"I want to code faster" → Pick Typing Code (Medium, ~8 min/session)',
    },
    metrics: [
      { label: "Games Available", value: "7+" },
      { label: "Avg Session", value: "6–10 min" },
      { label: "Difficulty Levels", value: "3" },
    ],
  },
  {
    id: "02",
    title: "Play & Learn",
    description:
      "Dive into adaptive challenges. Immediate feedback corrects errors in real time. Difficulty scales with your performance so you're always in the optimal learning zone.",
    icon: <Brain className="w-8 h-8 text-violet-500" />,
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
    accent: "violet",
    example: {
      label: "Before vs. After",
      text: "Typing Code: Week 1 avg 22 WPM → Week 2 avg 41 WPM (+86%)",
    },
    metrics: [
      { label: "Avg WPM Gain", value: "+86%" },
      { label: "Feedback Delay", value: "<50ms" },
      { label: "Skill Retention", value: "2.5×" },
    ],
  },
  {
    id: "03",
    title: "Track & Conquer",
    description:
      "Your scores, streaks, and improvements are tracked automatically. Climb the leaderboard, unlock achievements, and watch your skill curve rise week over week.",
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/20",
    accent: "amber",
    example: {
      label: "Real Progress",
      text: "Learners who track daily for 14 days improve 45% on average — vs 12% without tracking.",
    },
    metrics: [
      { label: "Skill Gain (2 wks)", value: "45%" },
      { label: "Achievement Badges", value: "20+" },
      { label: "Leaderboard Slots", value: "Global" },
    ],
  },
];

// ── Success story stat cards ────────────────────────────────────────────────
const SUCCESS_STATS = [
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
    bg: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
    value: 45,
    suffix: "%",
    label: "Average skill improvement in 2 weeks",
  },
  {
    icon: <Star className="w-6 h-6 text-amber-500" />,
    bg: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/20",
    value: 91200,
    suffix: "+",
    label: "Total games played on the platform",
  },
  {
    icon: <Clock className="w-6 h-6 text-indigo-500" />,
    bg: "from-indigo-500/10 to-violet-500/10",
    border: "border-indigo-500/20",
    value: 7,
    suffix: " days",
    label: "Median days to see measurable progress",
  },
  {
    icon: <Target className="w-6 h-6 text-pink-500" />,
    bg: "from-pink-500/10 to-rose-500/10",
    border: "border-pink-500/20",
    value: 98,
    suffix: "%",
    label: "Learners who recommend KAPP to a friend",
  },
];

// ── Testimonial cards ───────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "After 10 days of Typing Code, my coding speed jumped from 25 WPM to 58 WPM. My productivity doubled in real work.",
    name: "Sopheak R.",
    role: "Software Intern",
    game: "Typing Code",
    gameIcon: "💻",
    improvement: "+132% WPM",
    color: "from-violet-500/10 to-purple-500/10",
    border: "border-violet-500/20",
  },
  {
    quote:
      "Typing Math made mental arithmetic feel like a game. I can now calculate totals for my shop 3× faster than before.",
    name: "Channary M.",
    role: "Small Business Owner",
    game: "Typing Math",
    gameIcon: "🔢",
    improvement: "+3× Calc Speed",
    color: "from-sky-500/10 to-cyan-500/10",
    border: "border-sky-500/20",
  },
  {
    quote:
      "Robot Obstacle taught me how to think step-by-step. My teacher says my problem-solving in class improved a lot.",
    name: "Dara K.",
    role: "High School Student",
    game: "Robot Obstacle",
    gameIcon: "🤖",
    improvement: "Top 5% Logic Score",
    color: "from-teal-500/10 to-emerald-500/10",
    border: "border-teal-500/20",
  },
];

// ────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [openFaqId, setOpenFaqId] = useState<string | null>("af-1");
  const toggleFaq = (id: string) =>
    setOpenFaqId((prev) => (prev === id ? null : id));

  return (
    <main className="min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 pt-16 flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative px-5 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24 overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-500/15 dark:bg-indigo-500/8 blur-[130px] rounded-[100%] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-violet-500/15 dark:bg-violet-500/8 blur-[110px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-500/10 dark:bg-pink-500/5 blur-[90px] rounded-full pointer-events-none" />

          <AnimatedSection mode="page-load" className="relative z-10 mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                How It Works
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-6">
              Learn by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">
                Playing.
              </span>
              <br className="hidden sm:block" />
              Master for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500">
                Life.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-10">
              KAPP turns screen time into skill time. Our games are built on
              learning science — so every session makes you measurably better.
            </p>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/#games-section"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-indigo-500/30 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Gamepad2 className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Start Playing Free</span>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gray-300 dark:border-white/15 text-gray-700 dark:text-gray-300 font-semibold text-base hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Platform Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {SUCCESS_STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl bg-gradient-to-br ${stat.bg} border ${stat.border} p-4 backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={1600}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── LEARNING SCIENCE STRIP ──────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
          <AnimatedSection className="relative z-10 mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                Built on Science
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                Why games actually work
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SCIENCE_CARDS.map((card, i) => (
                <div
                  key={i}
                  className={`relative group rounded-3xl border ${card.border} ${card.bg} p-7 overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white mb-5 shadow-lg`}
                  >
                    {card.icon}
                  </div>
                  <div className="text-5xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">
                    {card.stat}
                  </div>
                  <div className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {card.label}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── HOW IT WORKS — 3 STEPS ──────────────────────────────── */}
        <section
          id="how-it-works"
          className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 py-20 md:py-28"
        >
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
              The Journey
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
              Three steps to mastery
            </h2>
          </AnimatedSection>

          {/* Connecting line */}
          <div className="absolute left-1/2 top-[15%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-white/10 to-transparent hidden lg:block" />

          <div className="flex flex-col gap-16 lg:gap-24">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <AnimatedSection
                  key={step.id}
                  delay={(index + 1) as 1 | 2 | 3}
                  className={`relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-[4px] border-indigo-500 items-center justify-center z-10 shadow-[0_0_24px_rgba(99,102,241,0.4)]">
                    <span className="text-sm font-black text-indigo-500">
                      {step.id}
                    </span>
                  </div>

                  {/* Visual card */}
                  <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <div
                      className={`relative w-full max-w-sm rounded-3xl bg-gradient-to-br ${step.color} border ${step.border} p-8 backdrop-blur-sm flex flex-col items-center text-center gap-4`}
                    >
                      <div className="w-20 h-20 rounded-full bg-white/60 dark:bg-gray-900/60 border border-white/40 dark:border-white/10 flex items-center justify-center shadow-xl">
                        {step.icon}
                      </div>
                      {/* Metrics chips */}
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {step.metrics.map((m, mi) => (
                          <div
                            key={mi}
                            className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-white/50 dark:border-white/10 shadow-sm"
                          >
                            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                              {m.value}
                            </span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide mt-0.5">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div
                    className={`w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left ${
                      isEven ? "lg:items-end lg:text-right" : "lg:items-start"
                    }`}
                  >
                    {/* Mobile step badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-black text-xl mb-5 lg:hidden mx-auto">
                      {step.id}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
                      {step.description}
                    </p>
                    {/* Game example pill */}
                    <div
                      className={`inline-flex items-start gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-sm max-w-md mx-auto lg:mx-0 ${
                        isEven ? "lg:ml-auto" : ""
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="text-left">
                        <span className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                          {step.example.label}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-snug">
                          {step.example.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>

        {/* ── SKILL PROGRESSION TREE ──────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />
          <AnimatedSection className="relative z-10 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                Skill Tree
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
                Games → Real Skills
              </h2>
              <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-lg">
                Every game targets a specific skill cluster that maps directly
                to real-world outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SKILL_TREE.map((node, i) => (
                <AnimatedSection key={i} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div
                    className={`group relative rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-white/[0.07] p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:${node.glow}`}
                  >
                    {/* Top gradient accent */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${node.color} rounded-t-3xl`}
                    />

                    {/* Game label */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl">{node.icon}</span>
                      <span className="font-bold text-gray-900 dark:text-white text-base">
                        {node.game}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-col gap-2 mb-5">
                      {node.skills.map((skill, si) => (
                        <div
                          key={si}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center flex-shrink-0`}
                          >
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                          {skill}
                        </div>
                      ))}
                    </div>

                    {/* Outcome */}
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${node.color} bg-opacity-10`}
                    >
                      <div className="text-white">{node.outcomeIcon}</div>
                      <span className="text-sm font-bold text-white">
                        → {node.outcome}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-20 overflow-hidden">
          <AnimatedSection className="relative z-10 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                Success Stories
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                Real learners, real results
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <AnimatedSection key={i} delay={(i as 0 | 1 | 2)}>
                  <div
                    className={`relative rounded-3xl bg-gradient-to-br ${t.color} border ${t.border} p-7 flex flex-col h-full group transition-transform duration-300 hover:-translate-y-1`}
                  >
                    <MessageSquareQuote className="w-8 h-8 text-indigo-400 dark:text-indigo-500 mb-4 opacity-60" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm flex-1 mb-5 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t.role}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">
                          {t.gameIcon} {t.game}
                        </div>
                        <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          {t.improvement}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── EXPANDED FAQ ────────────────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-20 overflow-hidden">
          <AnimatedSection className="relative z-10 mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                FAQ
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
                Got questions?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                Everything you need to know about scoring, science, and how to
                get the most out of KAPP.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {ABOUT_FAQS.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaqId === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
              Still have questions?{" "}
              <a
                href="https://koompi.com"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Contact the KOOMPI team →
              </a>
            </p>
          </AnimatedSection>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <AnimatedSection
          delay={3}
          className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 py-10 mb-10"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl border border-gray-800 p-10 sm:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900 opacity-90" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/30 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/30 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-sm">
                Ready to level up?
              </h2>
              <p className="text-indigo-100/90 text-lg sm:text-xl font-medium mb-10 max-w-2xl leading-relaxed">
                Join thousands of learners worldwide who are mastering new
                skills through the power of interactive play.
              </p>
              <Link
                href="/#games-section"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-indigo-700 font-bold text-lg hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Start Playing Free</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </main>
  );
}