"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Footer } from "../../utils/Footer";

const Navbar = dynamic(() => import("../../utils/Navbar"), { ssr: false });

const SECTIONS = [
  {
    heading: "Information We Collect",
    content: `We collect minimal information necessary to provide the KAPP platform. When you use KAPP:

• **Usage data**: We may collect anonymous data about which games you play and how long you play them to improve the platform.
• **Leaderboard scores**: If you submit scores to our leaderboard, your chosen username and score are stored.
• **Device information**: Basic browser and device information to ensure compatibility.
• **No personal accounts required**: KAPP is designed to work without requiring you to create an account or provide personal information.`,
  },
  {
    heading: "How We Use Information",
    content: `Information collected is used solely to:

• Operate and improve the KAPP platform and its games
• Display leaderboard rankings
• Analyze aggregate usage patterns to prioritize new features
• Ensure the platform runs correctly on your device

We do not sell, rent, or share your information with third parties for marketing purposes.`,
  },
  {
    heading: "Cookies and Local Storage",
    content: `KAPP uses browser local storage and cookies to:

• Remember your preferences (e.g., dark/light mode)
• Maintain your game progress during a session
• Store your leaderboard username locally

You can clear your browser's local storage at any time to remove this data. We do not use tracking cookies from third-party advertising networks.`,
  },
  {
    heading: "Third-Party Services",
    content: `KAPP games are embedded from secure third-party origins. These game servers may collect performance data independently. We recommend reviewing the privacy practices of any third-party services you interact with.

Our website may link to external sites (such as koompi.com). We are not responsible for the privacy practices of those sites.`,
  },
  {
    heading: "Data Security",
    content: `We take reasonable measures to protect any data we collect. However, no internet transmission is completely secure. We encourage you to use KAPP through secure (HTTPS) connections, which is the default for our platform.`,
  },
  {
    heading: "Children's Privacy",
    content: `KAPP is designed for learners of all ages, including children. We do not knowingly collect personal information from children under 13 without parental consent. Since KAPP requires no account creation to play, children can enjoy the platform safely without providing any personal data.`,
  },
  {
    heading: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of KAPP after changes constitutes acceptance of the revised policy.`,
  },
  {
    heading: "Contact Us",
    content: `If you have questions about this Privacy Policy or how we handle data, please contact us through our official website at koompi.com or reach out via our social media channels listed in the footer below.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 flex flex-col">
      <Navbar />

      <div className="mt-16 flex-1">
        {/* Hero */}
        <div className="border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 py-14 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 mb-5">
              <svg className="w-3.5 h-3.5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">Legal</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-3">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Effective date: <strong className="text-gray-700 dark:text-gray-300">January 1, 2025</strong>
            </p>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
              KOOMPI is committed to protecting your privacy. This policy explains what information KAPP collects, how it&apos;s used, and your rights as a user.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-5 sm:px-6 py-12">
          <div className="flex flex-col gap-8">
            {SECTIONS.map((section, i) => (
              <section key={i} className="rounded-2xl border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 w-1 rounded-full bg-gradient-to-b from-teal-500 to-indigo-600" />
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">{section.heading}</h2>
                </div>
                <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {section.content.split("\n").map((line, j) => {
                    if (line.startsWith("• ")) {
                      const rest = line.slice(2);
                      const parts = rest.split(/\*\*(.*?)\*\*/g);
                      return (
                        <div key={j} className="flex items-start gap-2 mb-1.5">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
                          <span>
                            {parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="font-semibold text-gray-800 dark:text-gray-200">{p}</strong> : p)}
                          </span>
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
            <p className="text-sm text-gray-500 dark:text-gray-400">Have questions about your privacy?</p>
            <div className="flex items-center gap-3">
              <Link href="/terms" className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
                Terms of Use →
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
