"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import AuthModel from "./AuthModel";
import { AuthContext } from "../context/AuthContext";
import { Avatar, AvatarPicker, AVATARS } from "./Avatar";

/* ── Nav link definition ── */
const NAV_LINKS = [
  // { label: "Home",         href: "/",               id: "nav-home"        },
  { label: "Games",        href: "/#games-section", id: "nav-browse"      },
  { label: "About",        href: "/about",          id: "nav-how"         },
  { label: "Leaderboard",  href: "/leaderboard",    id: "nav-leaderboard" },
  { label: "Privacy",      href: "/privacy",        id: "nav-privacy"     },
  { label: "Terms",        href: "/terms",          id: "nav-terms"       },
] as const;

/* ── Logo mark SVG / Favicon ── */
function LogoMark() {
  return (
    <Image
      src="/favicon.ico"
      alt="KAPP Logo"
      width={28}
      height={28}
      className="object-contain"
    />
  );
}

/* ── Hamburger / close icon ── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 flex-col justify-center gap-[5px]">
      <span
        className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 origin-center ${open ? "translate-y-[7px] rotate-45" : ""
          }`}
      />
      <span
        className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""
          }`}
      />
      <span
        className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
      />
    </span>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isDark, setIsDark] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const [navSearchFocused, setNavSearchFocused] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* Broadcast search query to the game library via a custom event */
  const handleNavSearch = (q: string) => {
    window.dispatchEvent(new CustomEvent("navbar-search", { detail: { query: q } }));
    const el = document.getElementById("games-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { user, setAvatarId } = useContext(AuthContext);

  const isSolid = isScrolled || pathname !== "/";

  /* Dark mode initialization */
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

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

  /* Scroll Spy for active section highlighting on home page */
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScrollSpy = () => {
      const hashes = NAV_LINKS
        .map(l => l.href.startsWith("/#") ? l.href.substring(2) : null)
        .filter(Boolean) as string[];

      let current = "";
      for (const id of hashes) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section is scrolled past 1/3 of the screen height, it is active
          if (rect.top <= window.innerHeight / 3) {
            current = id;
          }
        }
      }
      setActiveHash(current);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  /* Active link detection */
  const isActive = (href: string) => {
    if (pathname !== "/") {
      if (href === "/") return false;
      if (href.startsWith("/#")) return false;
      return pathname.startsWith(href);
    }
    // On the home page:
    if (href === "/") return activeHash === "";
    if (href.startsWith("/#")) return activeHash === href.substring(2);
    return false;
  };

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
          ${isSolid
            //</>  ? "bg-[#f8f9fb]/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/70 dark:border-white/[0.07] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            ? "bg-[#f8f9fb]/50 dark:bg-gray-950/50 backdrop-blur-xl border-b border-gray-200/70 dark:border-white/[0.07] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
          }
        `}
      >
        {/* Max-width container: 1200px */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 h-16">
          {/* <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-6 h-16"> */}

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
              className={`font-black tracking-[-0.04em] text-[1.3rem] leading-none transition-colors duration-200 text-gray-900 dark:text-white`}
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
                onClick={(e) => {
                  if (pathname === "/" && href.startsWith("/#")) {
                    e.preventDefault();
                    const targetId = href.substring(2);
                    const elem = document.getElementById(targetId);
                    if (elem) {
                      elem.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-semibold
                  transition-all duration-200
                  ${isActive(href)
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/[0.07]"
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

          {/* ── RIGHT ACTIONS (desktop): Search · Dark Mode · User ── */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Search */}
            <div className="relative w-72">
              {/* Gradient glow ring */}
              <div
                className={`absolute -inset-[1.5px] rounded-2xl pointer-events-none transition-all duration-300 ${navSearchFocused ? "opacity-100" : "opacity-0"}`}
                style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}
              />
              <div className="relative w-full">
                <svg
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-all duration-200 ${navSearchFocused ? "text-teal-500 scale-110" : "text-gray-400 dark:text-gray-500"}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  id="navbar-search"
                  type="text"
                  placeholder="Search games..."
                  value={navSearch}
                  onChange={(e) => { setNavSearch(e.target.value); handleNavSearch(e.target.value); }}
                  onFocus={() => setNavSearchFocused(true)}
                  onBlur={() => setTimeout(() => setNavSearchFocused(false), 150)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNavSearch(navSearch);
                    if (e.key === "Escape") { setNavSearch(""); handleNavSearch(""); (e.target as HTMLInputElement).blur(); }
                  }}
                  className={`w-full rounded-2xl border bg-white dark:bg-gray-900 pl-10 pr-9 py-2.5 text-sm outline-none transition-all duration-200 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    navSearchFocused
                      ? "border-transparent shadow-[0_0_0_2px_#14b8a6,0_4px_20px_rgba(20,184,166,0.15)]"
                      : "border-gray-200 dark:border-gray-700/80 shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                />
                {navSearch ? (
                  <button
                    onClick={() => { setNavSearch(""); handleNavSearch(""); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-500/20 hover:text-teal-600 dark:hover:text-teal-400 transition-all cursor-pointer"
                    aria-label="Clear search"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : !navSearchFocused ? (
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center px-1.5 py-0.5 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-[9px] font-mono text-gray-400 dark:text-gray-500 select-none">/</kbd>
                ) : null}
                {/* Suggestions dropdown */}
                {navSearchFocused && navSearch.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-full z-[60] bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Results</p>
                      <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-1.5 py-0.5 rounded-md">Press ↵</span>
                    </div>
                    {["Typing", "Math", "Logic", "Coding", "Mouse", "Puzzle"]
                      .filter(s => s.toLowerCase().includes(navSearch.toLowerCase()))
                      .slice(0, 5)
                      .map((s) => (
                        <button
                          key={s}
                          onMouseDown={() => { setNavSearch(s); handleNavSearch(s); }}
                          className="flex items-center gap-3 w-full px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-left cursor-pointer group/item"
                        >
                          <span className="flex w-7 h-7 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 group-hover/item:bg-teal-100 dark:group-hover/item:bg-teal-500/20 transition-colors shrink-0">
                            <svg className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-teal-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                          </span>
                          <span className="font-medium">{s}</span>
                          <svg className="w-3.5 h-3.5 ml-auto text-gray-300 dark:text-gray-600 group-hover/item:text-teal-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                      ))}
                    {["Typing", "Math", "Logic", "Coding", "Mouse", "Puzzle"].filter(s => s.toLowerCase().includes(navSearch.toLowerCase())).length === 0 && (
                      <div className="px-3.5 py-4 text-sm text-gray-400 dark:text-gray-500 text-center">
                        No suggestions for <span className="font-semibold text-gray-600 dark:text-gray-300">&ldquo;{navSearch}&rdquo;</span>
                      </div>
                    )}
                    <div className="border-t border-gray-100 dark:border-white/[0.06] px-3.5 py-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shrink-0" />
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">Filtering games live</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${isSolid
                ? "border-gray-200 text-gray-500 hover:text-indigo-600 dark:border-white/10 dark:text-gray-400 dark:hover:text-indigo-400"
                : "border-gray-300 bg-white/50 text-gray-600 hover:bg-white hover:text-indigo-600 dark:border-white/20 dark:bg-white/10 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-white/20"
                }`}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-2.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsAvatarPickerOpen((v) => !v)}
                  aria-label="User menu and avatar switcher"
                  className={`group flex items-center gap-3 px-3.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer ${isSolid
                    ? "border-gray-200 bg-white hover:border-indigo-300 dark:border-white/10 dark:bg-gray-900 dark:hover:border-indigo-500/50"
                    : "border-gray-300 bg-white/60 hover:bg-white dark:border-white/20 dark:bg-white/10 backdrop-blur-sm dark:hover:bg-white/20"
                    }`}
                >
                  <Avatar avatarId={user.avatarId} username={user.username} size="sm" />
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {user.username}
                    </span>
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 flex items-center justify-end gap-1">
                      <span>{AVATARS[(user.avatarId ?? 0) % AVATARS.length].name}</span>
                      <svg className="w-3 h-3 opacity-60 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </div>
                </button>

                {/* Avatar Switcher Popover */}
                {isAvatarPickerOpen && (
                  <div className="absolute right-0 top-full mt-2.5 z-50">
                    <AvatarPicker
                      selectedAvatarId={user.avatarId ?? 0}
                      onSelect={(id, gender) => {
                        if (setAvatarId) setAvatarId(id, gender);
                      }}
                      onClose={() => setIsAvatarPickerOpen(false)}
                    />
                  </div>
                )}
              </div>
            ) : null}
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
              ${isSolid
                ? "border-gray-200 bg-white/80 text-gray-700 hover:border-indigo-200 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                : "border-gray-300 bg-white/50 text-gray-700 hover:bg-white hover:text-indigo-600 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
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
        className={`fixed inset-0 z-[45] bg-gray-950/40 backdrop-blur-[2px] md:hidden transition-opacity duration-300 ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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

        {/* Mobile search */}
        <div className="px-4 pt-3 pb-1">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              placeholder="Search games..."
              value={navSearch}
              onChange={(e) => { setNavSearch(e.target.value); handleNavSearch(e.target.value); }}
              onKeyDown={(e) => {
                if (e.key === "Enter") { handleNavSearch(navSearch); setIsMobileOpen(false); }
              }}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all dark:text-white placeholder:text-gray-400"
            />
          </div>
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
              onClick={(e) => {
                setIsMobileOpen(false);
                if (pathname === "/" && href.startsWith("/#")) {
                  e.preventDefault();
                  const targetId = href.substring(2);
                  const elem = document.getElementById(targetId);
                  if (elem) {
                    // Small delay to allow mobile menu to close before scrolling
                    setTimeout(() => {
                      elem.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }
                }
              }}
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
                {["🎮", "💡", "🏆", "🔒", "📄"][NAV_LINKS.findIndex(l => l.id === id)]}
              </span>
              {label}
              {isActive(href) && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
              )}
            </Link>
          ))}

          {/* Divider */}
          <div className="my-3 h-px bg-gray-200/80 dark:bg-white/[0.07]" />

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
              text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06]
              transition-all duration-200 mb-2
            "
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.07]">
              {isDark ? "☀️" : "🌙"}
            </span>
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          {user ? (
            <div className="mt-2 mx-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <Avatar avatarId={user.avatarId} username={user.username} size="md" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{user.username}</div>
                    <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {AVATARS[(user.avatarId ?? 0) % AVATARS.length].name}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsAvatarPickerOpen((v) => !v)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1.5 rounded-lg border border-indigo-200/60 dark:border-indigo-500/20 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  Switch
                </button>
              </div>

              {/* Inline Avatar Switcher on Mobile */}
              {isAvatarPickerOpen && (
                <div className="mb-3">
                  <AvatarPicker
                    selectedAvatarId={user.avatarId ?? 0}
                    onSelect={(id, gender) => {
                      if (setAvatarId) setAvatarId(id, gender);
                    }}
                    onClose={() => setIsAvatarPickerOpen(false)}
                  />
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/5 pt-2">
                You've played <strong className="text-gray-900 dark:text-white font-bold">4 games</strong> this week. Keep it up!
              </p>
            </div>
          ) : null}
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
