"use client";

import { useState } from "react";

const FAQS = [
  {
    id: "faq-1",
    icon: "🎮",
    question: "Are all the games completely free?",
    answer:
      "Yes — every game on KAPP is 100% free to play directly in your browser. No sign-up required, no hidden fees. We also offer downloadable desktop versions (Windows & Linux) at no cost.",
  },
  {
    id: "faq-2",
    icon: "🧠",
    question: "What skills do these games help me build?",
    answer:
      "KAPP games are designed around real digital skills: typing speed & accuracy, coding syntax familiarity, logical reasoning, mouse precision, and math fluency. Each game card shows you the skill area, difficulty, and average session time so you can pick the right fit.",
  },
  {
    id: "faq-3",
    icon: "👤",
    question: "Do I need an account to play?",
    answer:
      "No account is needed to jump into any browser game instantly. Creating a free account lets you track your progress, save your best scores, and earn achievements as you improve — but it's entirely optional.",
  },
  {
    id: "faq-4",
    icon: "📱",
    question: "Do the games work on mobile?",
    answer:
      "All browser games are responsive and work on modern mobile browsers. Some games that rely heavily on keyboard input (like Typing Code) are best experienced on a device with a physical keyboard.",
  },
  {
    id: "faq-5",
    icon: "💻",
    question: "Can I download the games to play offline?",
    answer:
      "Yes! Each game has a dedicated download page with installers for Windows (.exe) and Linux (.AppImage). Just head to the game's detail page and choose your platform.",
  },
  {
    id: "faq-6",
    icon: "🏫",
    question: "Can teachers or schools use KAPP?",
    answer:
      "Absolutely. KAPP was built with learners of all ages in mind and is actively used in schools across Cambodia. If you're an educator interested in a classroom integration, reach out to us at koompi.com.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${isOpen
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
        {/* Icon */}
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-colors duration-200 ${isOpen
            ? "bg-indigo-100 dark:bg-indigo-500/20"
            : "bg-gray-100 dark:bg-white/[0.07] group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10"
            }`}
          aria-hidden="true"
        >
          {faq.icon}
        </span>

        {/* Question */}
        <span className="flex-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug">
          {faq.question}
        </span>

        {/* Chevron */}
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
            ? "border-indigo-300 dark:border-indigo-500/40 bg-indigo-100 dark:bg-indigo-500/20 rotate-180"
            : "border-gray-200 dark:border-white/10 bg-transparent"
            }`}
          aria-hidden="true"
        >
          <svg
            className={`w-3.5 h-3.5 transition-colors duration-200 ${isOpen ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400"
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Answer — CSS-animated height */}
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

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full bg-transparent"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-[90px]">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 text-overline">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-4xl font-black tracking-tight text-gray-900 dark:text-white"
          >
            Got questions?
          </h2>
          <p className="prose-body text-center mx-auto">
            Everything you need to know about KAPP and its games.
          </p>
        </div>

        {/* Two-column accordion on large screens */}
        <div className="grid grid-col-1 gap-4">
          {FAQS.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>

        {/* Bottom contact nudge */}
        <p className="mt-10 text-center" style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
          Still have questions?{" "}
          <a
            href="https://koompi.com"
            target="_blank"
            rel="noreferrer"
            className="link-primary"
          >
            Contact the KOOMPI team →
          </a>
        </p>
      </div>
    </section>
  );
}
