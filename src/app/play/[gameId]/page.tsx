"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { PRODUCT_DATA } from "@/src/constants";
import { AuthContext } from "@/src/context/AuthContext";
import Image from "next/image";
import NotFound from "../../not-found";

/* ─── Icons ────────────────────────────────────────────────────────── */
function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}
function IconMaximize({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}
function IconMinimize({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
    </svg>
  );
}
function IconInfo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
    </svg>
  );
}
function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
function IconStar({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

/* ─── Loading Screen ───────────────────────────────────────────────── */
function LoadingScreen({ title, coverSrc }: { title: string; coverSrc: string }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <Image src={coverSrc} alt="" fill className="object-cover opacity-10 scale-110 blur-2xl" aria-hidden="true" sizes="100vw" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-white/10" />
          <div className="absolute w-16 h-16 rounded-full border-t-2 border-indigo-400 animate-spin" />
          <div className="absolute w-10 h-10 rounded-full border-b-2 border-violet-400 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
        </div>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-1">Loading Game</p>
          <h1 className="text-xl font-black text-white">{title}</h1>
        </div>
        <div className="w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-[progress_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

/* ─── Panel data ───────────────────────────────────────────────────── */
const PANEL_TABS = ["Info", "Controls", "Tips"] as const;
type PanelTab = (typeof PANEL_TABS)[number];

const CONTROLS_DEFAULT = [
  { key: "Mouse / Touch", action: "Interact with the game" },
  { key: "F11 / Button", action: "Toggle fullscreen" },
  { key: "Esc", action: "Exit fullscreen" },
  { key: "Back button", action: "Return to game hub" },
];

const TIPS_MAP: Record<string, string[]> = {
  Coding:       ["Focus on accuracy before speed — mistakes cost more time.", "Practice daily for 10 min for the fastest WPM gains.", "Let your fingers learn patterns, not individual keys."],
  Math:         ["Skip tough problems and return — time management wins.", "Round numbers mentally before calculating exactly.", "Daily 15-min sessions beat one long weekly grind."],
  "Mouse Skills": ["Keep your wrist relaxed — tension hurts precision.", "Use your whole arm for large movements, wrist for fine.", "Slow down first; speed comes naturally with accuracy."],
  Logic:        ["Plan 2–3 moves ahead before committing.", "Work backwards from the goal state.", "Pause and breathe when stuck — fresh eyes see more."],
  Puzzle:       ["Start from the corners and edges.", "Look for patterns, not just pieces.", "Use process of elimination ruthlessly."],
  Typing:       ["Don't look at the keyboard — trust muscle memory.", "Keep a consistent rhythm rather than bursting.", "Short daily sessions beat long infrequent ones."],
};

const DIFF_BADGE: Record<string, string> = {
  Easy:   "text-teal-400 bg-teal-500/15 border-teal-500/30",
  Medium: "text-amber-400 bg-amber-500/15 border-amber-500/30",
  Hard:   "text-rose-400 bg-rose-500/15 border-rose-500/30",
};

/* ─── Star Row ─────────────────────────────────────────────────────── */
function StarRow({ rate }: { rate: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStar key={n} className={`w-3 h-3 ${n <= Math.round(rate) ? "text-amber-400" : "text-white/20"}`} filled={n <= Math.round(rate)} />
      ))}
    </div>
  );
}

/* ─── Info Panel ───────────────────────────────────────────────────── */
type Product = NonNullable<ReturnType<typeof PRODUCT_DATA.find>>;

function InfoPanel({
  product, activeTab, setActiveTab, onClose,
  onTouchStart, onTouchEnd,
}: {
  product: Product;
  activeTab: PanelTab;
  setActiveTab: (t: PanelTab) => void;
  onClose: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}) {
  const tips = TIPS_MAP[product.category] ?? TIPS_MAP["Coding"];

  return (
    <div className="flex flex-col h-full" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Drag handle — mobile only */}
      <div className="flex justify-center pt-2 pb-0 sm:hidden shrink-0">
        <div className="w-10 h-1 rounded-full bg-white/20" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-3 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.07] border border-white/10 text-xl shrink-0">
            {product.categoryIcon}
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight truncate max-w-[140px]">{product.title}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">{product.category}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.07] hover:bg-white/[0.14] border border-white/10 text-white/50 hover:text-white transition-all"
          aria-label="Close panel"
        >
          <IconX className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 pt-3 pb-2 shrink-0">
        {PANEL_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 ${
              activeTab === tab
                ? "bg-indigo-500/25 text-indigo-300 border border-indigo-500/40"
                : "text-white/35 hover:text-white/65 border border-transparent hover:border-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Swipe hint — mobile only */}
      <p className="sm:hidden text-center text-[9px] text-white/20 mb-1 shrink-0">← swipe tabs →  ·  swipe down to close</p>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">

        {/* INFO */}
        {activeTab === "Info" && (
          <div className="flex flex-col gap-3 pt-1">
            <div className="grid grid-cols-2 gap-2">
              {/* Rating */}
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-3">
                <p className="text-[9px] text-white/35 uppercase tracking-wider mb-1.5">Rating</p>
                <div className="flex items-center gap-1.5">
                  <StarRow rate={product.rate} />
                  <span className="text-sm font-black text-white">{product.rate.toFixed(1)}</span>
                </div>
              </div>
              {/* Plays */}
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-3">
                <p className="text-[9px] text-white/35 uppercase tracking-wider mb-1.5">Plays</p>
                <p className="text-sm font-black text-white">{product.plays}</p>
              </div>
              {/* Avg time */}
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-3">
                <p className="text-[9px] text-white/35 uppercase tracking-wider mb-1.5">Avg. Session</p>
                <p className="text-sm font-black text-white">{product.avgTime}</p>
              </div>
              {/* Difficulty */}
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-3">
                <p className="text-[9px] text-white/35 uppercase tracking-wider mb-1.5">Difficulty</p>
                <span className={`inline-block px-2 py-0.5 rounded-md border text-[11px] font-bold ${DIFF_BADGE[product.difficulty]}`}>
                  {product.difficulty}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-3">
              <p className="text-[9px] text-white/35 uppercase tracking-wider mb-1.5">About</p>
              <p className="text-xs text-white/60 leading-relaxed">{product.description}</p>
            </div>

            {/* Subtitle quote */}
            {product.subTitle && (
              <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3">
                <p className="text-xs text-indigo-300 leading-relaxed italic">&ldquo;{product.subTitle}&rdquo;</p>
              </div>
            )}
          </div>
        )}

        {/* CONTROLS */}
        {activeTab === "Controls" && (
          <div className="flex flex-col gap-2 pt-1">
            {CONTROLS_DEFAULT.map((ctrl, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/[0.07] px-3 py-2.5">
                <span className="text-[11px] font-mono font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 rounded-md px-2 py-0.5 shrink-0">
                  {ctrl.key}
                </span>
                <span className="text-xs text-white/50 text-right">{ctrl.action}</span>
              </div>
            ))}
          </div>
        )}

        {/* TIPS */}
        {activeTab === "Tips" && (
          <div className="flex flex-col gap-2.5 pt-1">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-3 rounded-xl bg-white/[0.04] border border-white/[0.07] p-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[10px] font-black text-amber-400 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs text-white/60 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────── */
export default function PlayPage() {
  const params = useParams<{ gameId: string }>();
  const router = useRouter();
  const { user, token } = useContext(AuthContext);

  const gameId = params?.gameId;
  const product = gameId ? PRODUCT_DATA.find((p) => p.id === gameId) : null;
  const iframeUrl = product?.iframeUrl;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PanelTab>("Info");

  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  /* ── Prevent MetaMask TypeError ── */
  useEffect(() => {
    if (typeof window !== "undefined" && !window.ethereum) {
      Object.defineProperty(window, "ethereum", { value: undefined, writable: true, configurable: true });
    }
  }, []);

  /* ── Cross-origin auth handshake ── */
  useEffect(() => {
    const handleFrameLoad = () => {
      setIsLoaded(true);
      if (iframeRef.current && token && user && iframeUrl) {
        const payload = { source: "kapp-studio-portal", action: "SYNC_AUTH_SESSION", user: { id: user.id, username: user.username }, token };
        try {
          const origin = new URL(iframeUrl).origin;
          iframeRef.current.contentWindow?.postMessage(payload, origin);
        } catch {
          iframeRef.current.contentWindow?.postMessage(payload, "*");
        }
      }
    };
    const frame = iframeRef.current;
    frame?.addEventListener("load", handleFrameLoad);
    return () => frame?.removeEventListener("load", handleFrameLoad);
  }, [token, user, iframeUrl]);

  /* ── Fullscreen sync ── */
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /* ── Auto-hide HUD ── */
  const showHud = () => {
    setHudVisible(true);
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => setHudVisible(false), 3500);
  };
  useEffect(() => {
    showHud();
    return () => { if (hudTimerRef.current) clearTimeout(hudTimerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Fullscreen toggle ── */
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) await containerRef.current.requestFullscreen();
      else await document.exitFullscreen();
    } catch { /* not supported */ }
  };

  /* ── Exit ── */
  const handleExit = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
    router.push(`/${gameId}`);
  };

  /* ── Swipe handlers for mobile drawer ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dy > 60 && Math.abs(dx) < 40) { setPanelOpen(false); return; }
    if (Math.abs(dx) > 60 && Math.abs(dy) < 40) {
      const idx = PANEL_TABS.indexOf(activeTab);
      if (dx < 0 && idx < PANEL_TABS.length - 1) setActiveTab(PANEL_TABS[idx + 1]);
      if (dx > 0 && idx > 0) setActiveTab(PANEL_TABS[idx - 1]);
    }
  };

  /* ── Not found ── */
  if (!product || !iframeUrl) return <NotFound />;

  const coverSrc = `/${product.cover}`;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gray-950 overflow-hidden flex flex-col"
      onMouseMove={showHud}
    >
      {/* Loading */}
      {!isLoaded && <LoadingScreen title={product.title} coverSrc={coverSrc} />}

      {/* Top accent glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-20"
        style={{ background: "linear-gradient(90deg, rgba(99,102,241,0) 0%, #6366f1 25%, #8b5cf6 50%, #14b8a6 75%, rgba(20,184,166,0) 100%)" }}
        aria-hidden="true"
      />

      {/* ─── Floating HUD pill ──────────────────────────────────────────────
           Desktop  → pinned top-center  (slides up on hide)
           Mobile   → pinned bottom-center (slides down on hide, thumb-friendly)
      ──────────────────────────────────────────────────────────────────── */}
      <div
        aria-label="Game controls"
        className={`
          absolute left-1/2 -translate-x-1/2 z-30
          flex items-center gap-1.5 px-1.5 py-1.5
          rounded-2xl
          bg-[rgba(3,7,18,0.75)] backdrop-blur-2xl
          border border-white/[0.09]
          shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]
          transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
          bottom-5 sm:bottom-auto sm:top-4
          ${hudVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none translate-y-4 sm:translate-y-0 sm:-translate-y-4"
          }
        `}
      >
        {/* Back */}
        <button
          id="exit-game-btn"
          onClick={() => { showHud(); handleExit(); }}
          className="group flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.13] border border-white/[0.09] hover:border-white/[0.22] text-white/75 hover:text-white text-xs font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[0.96]"
          aria-label="Exit game"
        >
          <IconArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 shrink-0" />
          <span className="hidden sm:inline leading-none">Back</span>
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-white/[0.08]" />

        {/* Game identity — desktop only */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl">
          <span className="text-base leading-none">{product.categoryIcon}</span>
          <span className="text-[11px] font-bold text-white/65 max-w-[100px] truncate leading-none">{product.title}</span>
        </div>

        {/* Live dot */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/[0.12] border border-emerald-500/20">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 hidden sm:block leading-none">Live</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-white/[0.08]" />

        {/* Info toggle */}
        <button
          id="panel-toggle-btn"
          onClick={() => { showHud(); setPanelOpen((v) => !v); }}
          className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
            panelOpen
              ? "bg-indigo-500/25 border-indigo-400/45 text-indigo-300"
              : "bg-white/[0.06] border-white/[0.09] hover:bg-white/[0.13] hover:border-white/[0.22] text-white/60 hover:text-white"
          }`}
          aria-label="Toggle game info"
          title="Game info"
        >
          <IconInfo className="w-4 h-4" />
        </button>

        {/* Fullscreen */}
        <button
          id="fullscreen-toggle-btn"
          onClick={() => { showHud(); toggleFullscreen(); }}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.13] border border-white/[0.09] hover:border-white/[0.22] text-white/60 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <IconMinimize className="w-4 h-4" /> : <IconMaximize className="w-4 h-4" />}
        </button>
      </div>

      {/* Game iframe */}
      <iframe
        ref={iframeRef}
        src={iframeUrl}
        title={product.title}
        className="w-full flex-1 border-none"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onError={() => { }}
        style={{ display: "block" }}
      />

      {/* ─── Side panel — desktop (slides from right) ─── */}
      <div
        className={`
          hidden sm:flex flex-col
          absolute top-0 right-0 bottom-0 z-40
          w-72 lg:w-80
          bg-[rgba(5,10,25,0.92)] backdrop-blur-2xl
          border-l border-white/[0.07]
          shadow-[-12px_0_40px_rgba(0,0,0,0.5)]
          transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]
          ${panelOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!panelOpen}
      >
        <InfoPanel
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => { showHud(); setPanelOpen(false); }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* ─── Bottom drawer — mobile ─────────────────── */}
      {/* Backdrop */}
      <div
        className={`sm:hidden absolute inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${panelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => { showHud(); setPanelOpen(false); }}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div
        className={`
          sm:hidden flex flex-col
          absolute left-0 right-0 bottom-0 z-50
          h-[72vh]
          bg-[rgba(5,10,25,0.95)] backdrop-blur-2xl
          border-t border-white/[0.09]
          rounded-t-2xl
          shadow-[0_-12px_48px_rgba(0,0,0,0.65)]
          transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]
          ${panelOpen ? "translate-y-0" : "translate-y-full"}
        `}
        aria-hidden={!panelOpen}
      >
        <InfoPanel
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => { showHud(); setPanelOpen(false); }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Mobile tap zones — top & bottom strips reveal the HUD */}
      <div
        className="sm:hidden absolute top-0 left-0 right-0 h-12 z-20"
        onTouchStart={(e) => { e.stopPropagation(); showHud(); }}
        aria-label="Tap to show game controls"
        role="button"
        tabIndex={-1}
      />
      <div
        className="sm:hidden absolute bottom-0 left-0 right-0 h-20 z-20"
        onTouchStart={(e) => { e.stopPropagation(); showHud(); }}
        aria-label="Tap to show game controls"
        role="button"
        tabIndex={-1}
      />

      {/* Bottom fade edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-10"
        style={{ background: "linear-gradient(0deg, rgba(3,7,18,0.4) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes progress {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
