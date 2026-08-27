"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaGithub, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { Heart } from "lucide-react";

/* ── Column data ── */
const FOOTER_COLS = [
  {
    heading: "Company",
    links: [
      { label: "About KOOMPI", href: "https://koompi.com", external: true },
      { label: "Blog", href: "https://koompi.com/blog", external: true },
      { label: "Careers", href: "https://koompi.com/careers", external: true },
      { label: "Contact", href: "https://koompi.com", external: true },
    ],
  },
  {
    heading: "Games",
    links: [
      { label: "Typing Code", href: "/typing-code", external: false },
      { label: "Typing Math", href: "/typing-math", external: false },
      { label: "Dragon Drop", href: "/dragon-drop", external: false },
      { label: "Robot Obstacle", href: "/robot-obstacle", external: false },
      { label: "Master Mouse", href: "/master-mouse", external: false },
      { label: "Number Link", href: "/number-link", external: false },
      { label: "Koompi Typing", href: "/koompi-typing", external: false },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Start Learning", href: "/#games-section", external: false },
      { label: "How It Works", href: "/about", external: false },
      // { label: "Leaderboard",    href: "/leaderboard",    external: false },
      { label: "Privacy Policy", href: "/privacy", external: false },
      { label: "Terms of Use", href: "/terms", external: false },
    ],
  },
] as const;

const SOCIALS = [
  { Icon: FaFacebook, href: "https://facebook.com/koompi", label: "Facebook", id: "footer-facebook" },
  { Icon: FaGithub, href: "https://github.com/koompi", label: "GitHub", id: "footer-github" },
  { Icon: FaTelegramPlane, href: "https://t.me/koompi", label: "Telegram", id: "footer-telegram" },
  { Icon: FaInstagram, href: "https://instagram.com/koompiofficial", label: "Instagram", id: "footer-instagram" },
];

export function Footer() {
  return (
    <footer
      className="w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)]"
      aria-label="Site footer"
    >
      {/* Top divider */}
      <div className="border-t border-gray-200 dark:border-white/[0.06]" />

      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-16">

        {/* ── Main grid: Brand col + 3 link cols ── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Brand / Social column ── */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" id="footer-logo" className="flex items-center gap-2.5 group w-fit">
              <Image
                src="/favicon.ico"
                alt="KAPP Logo"
                width={32}
                height={32}
                className="object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="font-black tracking-[-0.04em] text-xl text-gray-900 dark:text-white">
                KAPP
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-[220px]">
              Free interactive games for the next generation of builders and creators.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIALS.map(({ Icon, href, label, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`KOOMPI on ${label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-500/40 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200 hover:scale-105"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors duration-150"
                      >
                        {label}
                        <svg className="w-2.5 h-2.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="inline-block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 pt-6 border-t border-gray-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex flex-wrap items-center justify-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <span>© {new Date().getFullYear()} KAPP by</span>
            <a
              href="https://koompi.com"
              target="_blank"
              rel="noreferrer"
              className="link-primary font-semibold"
            >
              KOOMPI
            </a>
            <span className="flex items-center gap-1">
              · Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500 mx-0.5" /> for learners
            </span>
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
