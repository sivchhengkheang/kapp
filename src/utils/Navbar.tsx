"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import AuthModel from "./AuthModel";

/* ── Nav link definition ── */
const NAV_LINKS = [
  { label: "Home",        href: "/",            id: "nav-home"        },
  { label: "Browse Games",href: "/#games-section", id: "nav-browse"   },
  { label: "How It Works",href: "/about",        id: "nav-how"        },
  { label: "Leaderboard", href: "/leaderboard",   id: "nav-leaderboard"},
] as const;

/* ── Logo mark SVG ── */
function LogoMark() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
      {/* Stylised K shape */}
      <path
        d="M9 7v14M9 14l8-7M9 14l8 7"
        stroke="white" strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Hamburger / close icon ── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 flex-col justify-center gap-[5px]">
      <span
        className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 origin-center ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
          open ? "opacity-0 scale-x-0" : ""
        }`}
      />
      <span
        className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 origin-center ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function Navbar() {
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [isMobileOpen,    setIsMobileOpen]    = useState(false);
  const [isAuthOpen,      setIsAuthOpen]      = useState(false);
  const [authMode,        setAuthMode]        = useState<"signin" | "signup">("signin");
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* Scroll-aware header shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu or auth modal is open */
  useEffect(() => {
    const locked = isMobileOpen || isAuthOpen;
    document.documentElement.classList.toggle("overflow-hidden", locked);
    document.body.classList.toggle("overflow-hidden", locked);
  }, [isMobileOpen, isAuthOpen]);

  /* Close everything on route change */
  useEffect(() => {
    setIsMobileOpen(false);
    setIsAuthOpen(false);
    document.documentElement.classList.remove("overflow-hidden");
    document.body.classList.remove("overflow-hidden");
  }, [pathname]);

  /* Close mobile menu on outside click */
  useEffect(() => {
    if (!isMobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobileOpen]);

  /* Close mobile menu on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsMobileOpen(false); setIsAuthOpen(false); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const openAuth = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setIsMobileOpen(false);
    setIsAuthOpen(true);
  };

  /* Active link detection */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace("/#", "/"));

  return (
    <>
      {/* ══════════════════════════════════════════════════ */}
      {/*  HEADER                                           */}
      {/* ══════════════════════════════════════════════════ */}
      <header
        role="banner"
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-300 ease-in-out
          ${isScrolled
            ? "bg-[#f8f9fb]/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/70 dark:border-white/[0.07] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
          }
        `}
      >
        {/* Max-width container: 1200px */}
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-6 h-16">

          {/* ── LOGO ── */}
          <Link
            href="/"
            id="nav-logo"
            aria-label="KAPP home"
            className="group flex items-center gap-2.5 shrink-0"
          >
            <span className="transition-transform duration-200 group-hover:scale-105 group-hover:rotate-[-2deg]">
              <LogoMark />
            </span>
            {/* Geometric wordmark */}
            <span
              className={`font-black tracking-[-0.04em] text-[1.3rem] leading-none transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-900 dark:text-white"
                  : "text-white"
              }`}
              style={{ fontVariantLigatures: "none", letterSpacing: "-0.04em" }}
            >
              KAPP
            </span>
          </Link>

          {/* ── CENTER NAV (desktop) ── */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map(({ label, href, id }) => (
              <Link
                key={id}
                href={href}
                id={id}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-semibold
                  transition-all duration-200
                  ${isActive(href)
                    ? isScrolled
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-white"
                    : isScrolled
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/[0.07]"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {label}
                {/* Active indicator dot */}
                {isActive(href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-indigo-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* ── RIGHT ACTIONS (desktop) ── */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Sign In — soft outline */}
            <button
              id="nav-signin-btn"
              onClick={() => openAuth("signin")}
              className={`
                flex items-center gap-1.5 rounded-xl border px-4 py-2.5 min-h-[44px]
                text-sm font-semibold transition-all duration-200
                hover:scale-[1.02] active:scale-[0.97]
                ${isScrolled
                  ? "border-gray-200 bg-transparent text-gray-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 dark:border-white/10 dark:text-gray-300 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400 dark:hover:bg-indigo-500/10"
                  : "border-white/25 bg-white/8 text-white/90 backdrop-blur-sm hover:bg-white/15 hover:border-white/40"
                }
              `}
            >
              Sign In
            </button>

            {/* Create Account — filled */}
            <button
              id="nav-signup-btn"
              onClick={() => openAuth("signup")}
              className="
                group relative overflow-hidden flex items-center gap-1.5
                rounded-xl bg-indigo-600 px-4 py-2.5 min-h-[44px]
                text-sm font-bold text-white
                transition-all duration-200
                hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.97]
                shadow-[0_2px_8px_rgba(99,102,241,0.25)]
                hover:shadow-[0_4px_16px_rgba(99,102,241,0.4)]
              "
            >
              {/* Shimmer */}
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                aria-hidden="true"
              />
              <span className="relative z-10">Create Account</span>
            </button>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            id="nav-mobile-toggle"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileOpen((v) => !v)}
            className={`
              md:hidden flex h-11 w-11 items-center justify-center
              rounded-xl border transition-all duration-200
              ${isScrolled
                ? "border-gray-200 bg-white/80 text-gray-700 hover:border-indigo-200 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              }
            `}
          >
            <HamburgerIcon open={isMobileOpen} />
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════ */}
      {/*  MOBILE MENU PANEL                               */}
      {/* ══════════════════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[45] bg-gray-950/40 backdrop-blur-[2px] md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Slide-in panel */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`
          fixed top-0 right-0 z-[46] h-full w-[min(320px,85vw)]
          flex flex-col
          bg-[#f8f9fb] dark:bg-gray-950
          border-l border-gray-200/70 dark:border-white/[0.07]
          shadow-[-8px_0_32px_rgba(0,0,0,0.1)]
          transition-transform duration-350 ease-[cubic-bezier(0.32,0.72,0,1)]
          md:hidden
          ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200/70 dark:border-white/[0.07]">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
            <LogoMark />
            <span className="font-black tracking-[-0.04em] text-[1.2rem] text-gray-900 dark:text-white">
              KAPP
            </span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-indigo-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto"
        >
          {NAV_LINKS.map(({ label, href, id }, i) => (
            <Link
              key={id}
              href={href}
              id={`mobile-${id}`}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                transition-all duration-200
                ${isActive(href)
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06] hover:text-gray-900 dark:hover:text-white"
                }
              `}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Nav item icon */}
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-base
                ${isActive(href) ? "bg-indigo-100 dark:bg-indigo-500/20" : "bg-gray-100 dark:bg-white/[0.07]"}
              `}>
                {["🏠", "🎮", "💡", "🏆"][NAV_LINKS.findIndex(l => l.id === id)]}
              </span>
              {label}
              {isActive(href) && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
              )}
            </Link>
          ))}

          {/* Divider */}
          <div className="my-3 h-px bg-gray-200/80 dark:bg-white/[0.07]" />

          {/* Mobile CTA buttons */}
          <button
            id="mobile-signin-btn"
            onClick={() => openAuth("signin")}
            className="
              flex w-full items-center justify-center gap-2 rounded-xl
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-white/5
              px-4 py-3 text-sm font-semibold
              text-gray-700 dark:text-gray-300
              hover:border-indigo-200 hover:text-indigo-600
              dark:hover:border-indigo-500/40 dark:hover:text-indigo-400
              transition-all duration-200
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Sign In
          </button>

          <button
            id="mobile-signup-btn"
            onClick={() => openAuth("signup")}
            className="
              mt-2 flex w-full items-center justify-center gap-2 rounded-xl
              bg-indigo-600 px-4 py-3 text-sm font-bold text-white
              hover:bg-indigo-500 active:scale-[0.98]
              shadow-[0_2px_8px_rgba(99,102,241,0.25)]
              transition-all duration-200
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Account
          </button>
        </nav>

        {/* Panel footer */}
        <div className="px-5 py-4 border-t border-gray-200/70 dark:border-white/[0.07]">
          <p className="text-[11px] text-gray-400 dark:text-gray-600 text-center">
            © {new Date().getFullYear()} KOOMPI · Free learning games
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/*  AUTH MODAL                                       */}
      {/* ══════════════════════════════════════════════════ */}
      {isAuthOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-950/60 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAuthOpen(false);
          }}
        >
          <AuthModel onClose={() => setIsAuthOpen(false)} />
        </div>
      )}
    </>
  );
}
