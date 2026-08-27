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
        <section className="relative px-5 pt-20 pb-12 sm:px-6 md:pt-24 md:pb-20 overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] rounded-[100%] pointer-events-none" />

          <AnimatedSection mode="page-load" className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                How It Works
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
              Learn by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                Playing.
              </span>{" "}
              Master for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500">
                Life.
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8">
              KAPP turns screen time into skill time. Our games use adaptive learning science to ensure every session makes you measurably better.
            </p>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link
                href="/#games-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all"
              >
                <Gamepad2 className="w-4 h-4" />
                Start Playing Free
              </Link>
            </div>

            {/* Platform Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {SUCCESS_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-3"
                >
                  <div className="text-xl font-black text-gray-900 dark:text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── LEARNING SCIENCE STRIP ──────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-12">
          <AnimatedSection className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-black text-center mb-8">Why games work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SCIENCE_CARDS.map((card, i) => (
                <div key={i} className={`rounded-2xl border ${card.border} ${card.bg} p-6`}>
                  <div className="text-3xl font-black mb-2">{card.stat}</div>
                  <div className="font-bold mb-1">{card.label}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{card.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── HOW IT WORKS — 3 STEPS ──────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-12">
          <AnimatedSection className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-black text-center mb-12">Mastery in 3 steps</h2>
            <div className="grid gap-8">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="text-4xl font-black text-indigo-500/30">0{index + 1}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── SKILL TREE ──────────────────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-12 bg-gray-100/50 dark:bg-gray-900/30">
          <AnimatedSection className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-black text-center mb-10">Skill Tree</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILL_TREE.map((node, i) => (
                <div key={i} className="p-5 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-gray-900">
                  <span className="text-2xl mb-2 block">{node.icon}</span>
                  <h4 className="font-bold mb-3">{node.game}</h4>
                  <div className="text-xs space-y-1 text-gray-500">
                    {node.skills.map((s, si) => <p key={si}>• {s}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-12 overflow-hidden">
          <AnimatedSection className="relative z-10 mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1.5">
                Success Stories
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                Real learners, real results
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TESTIMONIALS.map((t, i) => (
                <AnimatedSection key={i} delay={(i as 0 | 1 | 2)}>
                  <div className={`relative rounded-2xl bg-gradient-to-br ${t.color} border ${t.border} p-5 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1`}>
                    <MessageSquareQuote className="w-6 h-6 text-indigo-400 dark:text-indigo-500 mb-3 opacity-60" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs flex-1 mb-4 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-xs">{t.name}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{t.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">{t.gameIcon} {t.game}</div>
                        <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">{t.improvement}</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── EXPANDED FAQ ────────────────────────────────────────── */}
        <section className="relative px-5 sm:px-6 py-16">
          <AnimatedSection className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black text-center mb-10">Questions?</h2>
            <div className="grid gap-3">
              {ABOUT_FAQS.map((faq) => (
                <FAQItem key={faq.id} faq={faq} isOpen={openFaqId === faq.id} onToggle={() => toggleFaq(faq.id)} />
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <AnimatedSection delay={3} className="mx-auto max-w-5xl px-5 sm:px-6 py-8 mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-xl border border-gray-800 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900 opacity-90" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Ready to level up?
              </h2>
              <p className="text-indigo-100/90 text-sm sm:text-base font-medium mb-7 max-w-lg leading-relaxed">
                Join thousands of learners worldwide mastering new skills through the power of interactive play.
              </p>
              <Link
                href="/#games-section"
                className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-indigo-700 font-bold text-sm hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Start Playing Free</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </main>
  );
}