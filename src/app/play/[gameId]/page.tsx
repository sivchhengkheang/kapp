"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { PRODUCT_DATA } from "@/src/constants";
import { AuthContext } from "@/src/context/AuthContext";
import Image from "next/image";

/* ─── Icons (inline SVGs to avoid extra imports) ──────────────────── */
function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

function IconMaximize({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}

function IconMinimize({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
    </svg>
  );
}

/* ─── Loading Spinner ──────────────────────────────────────────────── */
function LoadingScreen({ title, coverSrc }: { title: string; coverSrc: string }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-950">
      {/* Blurred background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={coverSrc}
          alt=""
          fill
          className="object-cover opacity-10 scale-110 blur-2xl"
          aria-hidden="true"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-white/10" />
          <div className="absolute w-16 h-16 rounded-full border-t-2 border-indigo-400 animate-spin" />
          <div className="absolute w-10 h-10 rounded-full border-b-2 border-violet-400 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
        </div>

        {/* Title */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-1">
            Loading Game
          </p>
          <h1 className="text-xl font-black text-white">{title}</h1>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-[progress_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

/* ─── Main gameplay component ──────────────────────────────────────── */
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
  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Prevent MetaMask TypeError ── */
  useEffect(() => {
    if (typeof window !== "undefined" && !window.ethereum) {
      Object.defineProperty(window, "ethereum", {
        value: undefined,
        writable: true,
        configurable: true,
      });
    }
  }, []);

  /* ── Cross-origin auth handshake ── */
  useEffect(() => {
    const handleFrameLoad = () => {
      setIsLoaded(true);
      if (iframeRef.current && token && user && iframeUrl) {
        const payload = {
          source: "kapp-studio-portal",
          action: "SYNC_AUTH_SESSION",
          user: { id: user.id, username: user.username },
          token,
        };
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
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  /* ── Auto-hide HUD on inactivity ── */
  const showHud = () => {
    setHudVisible(true);
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => setHudVisible(false), 3500);
  };

  useEffect(() => {
    showHud();
    return () => {
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Fullscreen toggle ── */
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen not supported — silently ignore
    }
  };

  /* ── Exit navigation ── */
  const handleExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    // Go back to the game detail page, or home if no history
    router.push(`/${gameId}`);
  };

  /* ── Not found ── */
  if (!product || !iframeUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white gap-4">
        <p className="text-gray-400 text-lg">Game not found.</p>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition-colors"
        >
          <IconArrowLeft className="w-4 h-4" />
          Back to Hub
        </button>
      </div>
    );
  }

  const coverSrc = `/${product.cover}`;
  const accentBg = product.brandColor?.split(" ")[0] ?? "bg-indigo-600";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gray-950 overflow-hidden flex flex-col"
      onMouseMove={showHud}
      onTouchStart={showHud}
    >
      {/* ─── Loading screen ──────────────────────────── */}
      {!isLoaded && (
        <LoadingScreen title={product.title} coverSrc={coverSrc} />
      )}

      {/* ─── Floating HUD ────────────────────────────── */}
      <div
        aria-label="Game controls"
        className={`
          absolute top-0 left-0 right-0 z-30
          flex items-center justify-between
          px-4 py-3
          transition-all duration-500 ease-in-out
          ${hudVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}
        `}
        style={{
          background:
            "linear-gradient(180deg, rgba(3,7,18,0.85) 0%, rgba(3,7,18,0.4) 70%, transparent 100%)",
        }}
      >
        {/* Left: Exit button + game meta */}
        <div className="flex items-center gap-3">
          <button
            id="exit-game-btn"
            onClick={handleExit}
            className="
              group flex items-center gap-2 pl-3 pr-4 py-2
              rounded-full
              bg-white/10 hover:bg-white/20
              backdrop-blur-md
              border border-white/15 hover:border-white/30
              text-white text-sm font-semibold
              transition-all duration-200
              hover:scale-[1.03] active:scale-[0.97]
              shadow-lg
            "
            aria-label="Exit game and return to game detail"
          >
            <IconArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5 shrink-0" />
            <span className="hidden sm:inline">Back to Hub</span>
          </button>

          {/* Game identity pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
            <span className="text-base leading-none" aria-hidden="true">
              {product.categoryIcon}
            </span>
            <span className="text-xs font-bold text-white/80 leading-none">
              {product.title}
            </span>
          </div>
        </div>

        {/* Right: Utility buttons */}
        <div className="flex items-center gap-2">
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Live
            </span>
          </div>

          {/* Fullscreen toggle */}
          <button
            id="fullscreen-toggle-btn"
            onClick={toggleFullscreen}
            className="
              flex h-9 w-9 items-center justify-center rounded-full
              bg-white/10 hover:bg-white/20
              backdrop-blur-md
              border border-white/15 hover:border-white/30
              text-white
              transition-all duration-200 hover:scale-105 active:scale-95
            "
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <IconMinimize className="w-4 h-4" />
            ) : (
              <IconMaximize className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* ─── Accent glow ring (top edge) ─────────────── */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] z-20 opacity-60 ${accentBg}`}
        aria-hidden="true"
      />

      {/* ─── Game iframe ──────────────────────────────── */}
      <iframe
        ref={iframeRef}
        src={iframeUrl}
        title={product.title}
        className="w-full flex-1 border-none"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-fullscreen"
        onError={() => {}}
        style={{ display: "block" }}
      />

      {/* ─── Bottom fade (immersive edge softener) ────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-10"
        style={{
          background: "linear-gradient(0deg, rgba(3,7,18,0.4) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ─── Keyframe for progress bar ────────────────── */}
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
