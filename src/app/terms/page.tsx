"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Footer } from "../../utils/Footer";

const Navbar = dynamic(() => import("../../utils/Navbar"), { ssr: false });

const SECTIONS = [
  {
    heading: "Acceptance of Terms",
    content: `By accessing or using the KAPP platform ("Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service.

These terms apply to all visitors, users, and others who access or use KAPP, including its games, leaderboard, and related features.`,
  },
  {
    heading: "Description of Service",
    content: `KAPP is a free educational gaming platform developed and operated by KOOMPI. The Service provides:

• Access to interactive educational games playable in a web browser
• Downloadable native applications for Windows and Linux
• A global leaderboard system
• Game progress tracking within sessions

All games and features are provided free of charge with no account required.`,
  },
  {
    heading: "Permitted Use",
    content: `You may use KAPP for personal, non-commercial educational purposes. Permitted uses include:

• Playing games for personal skill development
• Using KAPP in classroom or educational settings
• Sharing KAPP links with others for educational purposes
• Competing on the leaderboard using legitimate gameplay`,
  },
  {
    heading: "Prohibited Conduct",
    content: `You agree not to:

• Attempt to hack, reverse-engineer, or tamper with KAPP or its games
• Use automated tools, bots, or scripts to manipulate game scores or leaderboard rankings
• Upload or transmit malware, viruses, or harmful content
• Use KAPP to collect user data or harvest information
• Reproduce or redistribute KAPP games or content without written permission from KOOMPI
• Attempt to disrupt the availability or performance of the Service`,
  },
  {
    heading: "Intellectual Property",
    content: `All content on KAPP, including games, graphics, logos, and text, is owned by KOOMPI or its licensors and is protected by intellectual property laws. You are granted a limited, non-exclusive license to use the Service for personal educational purposes only.

KOOMPI and KAPP are registered trademarks of KOOMPI Co., Ltd.`,
  },
  {
    heading: "Leaderboard & User Content",
    content: `If you submit a username to the leaderboard, you grant KOOMPI a non-exclusive right to display that username and associated score on the platform. You are responsible for choosing an appropriate, non-offensive username.

KOOMPI reserves the right to remove any leaderboard entry that violates these terms or community standards.`,
  },
  {
    heading: "Disclaimer of Warranties",
    content: `KAPP is provided "as is" without warranties of any kind. KOOMPI does not guarantee:

• Uninterrupted or error-free access to the Service
• That game content will be free from inaccuracies
• That the Service will meet your specific requirements

To the fullest extent permitted by law, KOOMPI disclaims all warranties, express or implied.`,
  },
  {
    heading: "Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, KOOMPI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service.

Our total liability to you for any claim arising from these terms shall not exceed the amount you paid to use the Service (which, as KAPP is free, is zero).`,
  },
  {
    heading: "Changes to Terms",
    content: `KOOMPI may update these Terms of Use from time to time. We will post the updated terms on this page with a revised effective date. Your continued use of KAPP after changes are posted constitutes acceptance of the new terms.`,
  },
  {
    heading: "Governing Law",
    content: `These Terms of Use are governed by the laws of the Kingdom of Cambodia, without regard to conflict of law principles. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts located in Phnom Penh, Cambodia.`,
  },
  {
    heading: "Contact",
    content: `For questions about these Terms of Use, please contact KOOMPI through our official website at koompi.com. We aim to respond to all inquiries within 5 business days.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 flex flex-col">
      <Navbar />

      <div className="mt-16 flex-1">
        {/* Hero */}
        <div className="border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 py-14 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 mb-5">
              <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Legal</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-3">Terms of Use</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Effective date: <strong className="text-gray-700 dark:text-gray-300">January 1, 2025</strong>
            </p>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
              Please read these Terms of Use carefully before using KAPP. By using the platform, you agree to these terms.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-5 sm:px-6 py-12">
          {/* Table of contents */}
          <div className="mb-8 rounded-2xl border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Contents</p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SECTIONS.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-indigo-500 font-bold shrink-0">{i + 1}.</span>
                  {s.heading}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-8">
            {SECTIONS.map((section, i) => (
              <section key={i} className="rounded-2xl border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-[11px] font-black text-indigo-600 dark:text-indigo-400 shrink-0">
                    {i + 1}
                  </div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">{section.heading}</h2>
                </div>
                <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {section.content.split("\n").map((line, j) => {
                    if (line.startsWith("• ")) {
                      const rest = line.slice(2);
                      const parts = rest.split(/\*\*(.*?)\*\*/g);
                      return (
                        <div key={j} className="flex items-start gap-2 mb-1.5">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                          <span>{parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="font-semibold text-gray-800 dark:text-gray-200">{p}</strong> : p)}</span>
                        </div>
                      );
                    }
                    return line.trim() ? <p key={j} className="mb-3">{line}</p> : <div key={j} className="h-1" />;
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Have questions about these terms?</p>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                Privacy Policy →
              </Link>
              <a href="https://koompi.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Contact KOOMPI →
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
