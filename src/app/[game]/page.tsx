"use client";

import Navbar from "@/src/utils/Navbar";
import SlideShow from "@/src/utils/SlideShow";
import { PRODUCT_DATA } from "@/src/constants";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useContext } from "react";
import { Download, ExternalLink, Play, X } from "lucide-react";
import windows from "@/public/windows-icon.svg";
import linux from "@/public/linux-icon.svg";
import { AuthContext } from "@/src/context/AuthContext";
import { Footer } from "@/src/utils/Footer";

export default function GameDetail() {
  const [showIfram, setShowIfram] = useState(false);
  const params = useParams<{ game: string }>();
  const gameName = params?.game;
  const product = gameName ? PRODUCT_DATA.find((p) => p.id === gameName) : null;
  const iframeUrl = product?.iframeUrl;

  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { user, token } = useContext(AuthContext);

  /* Prevent MetaMask TypeError */
  useEffect(() => {
    if (typeof window !== "undefined" && !window.ethereum) {
      Object.defineProperty(window, "ethereum", {
        value: undefined,
        writable: true,
        configurable: true,
      });
    }
  }, []);

  /* Cross-origin auth handshake */
  useEffect(() => {
    const handleFrameLoad = () => {
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

  /* Lock body scroll when iframe is open */
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showIfram);
  }, [showIfram]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--gray-50)] dark:bg-[var(--gray-950)]">
        <Navbar />
        <p className="text-gray-500">Game not found.</p>
      </div>
    );
  }

  const specRows = (platform: "windows" | "linux") => {
    const p = product[platform];
    return [
      ["Version", p?.releaseDetails?.version],
      ["File Size", p?.releaseDetails?.fileSize],
      ["File Type", p?.releaseDetails?.fileType],
      ["Architecture", p?.releaseDetails?.architecture],
      ["Release", p?.releaseDetails?.releaseDate],
    ];
  };

  return (
    <div className="min-h-screen w-full bg-[var(--gray-50)] dark:bg-[var(--gray-950)] text-gray-900 dark:text-gray-50 flex flex-col">
      <Navbar />

      <div className="mt-16 flex-1">
        <div className="mx-auto max-w-7xl px-5 py-8 flex flex-col gap-6">

          {/* ── Cover Banner ─────────────────────────────────── */}
          <section className="overflow-hidden rounded-[var(--radius-xl)] bg-gray-800 shadow-[var(--shadow-md)]">
            <Image
              src={`/${product.cover}`}
              alt={`${product.title} cover`}
              width={1280}
              height={340}
              className="w-full h-auto object-contain"
              priority
            />
          </section>

          {/* ── Info Card ────────────────────────────────────── */}
          <section className="overflow-hidden rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)]">
            <div className="flex flex-col md:flex-row p-6 md:p-8 gap-8 items-start md:items-center justify-between">

              {/* Left */}
              <div className="flex-1 flex flex-col items-start gap-5">
                {/* Type tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {product.type?.map(
                    (t: { text: string; color: string }, i: number) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold uppercase tracking-wider ${t.color}`}
                      >
                        {t.text}
                      </span>
                    )
                  )}
                </div>

                {/* Title + description */}
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                    {product.description}
                  </p>
                </div>

                {/* Play button */}
                <button
                  id="game-play-btn"
                  onClick={() => setShowIfram(true)}
                  className={`group flex items-center gap-2.5 px-7 py-3.5 rounded-[var(--radius)] font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] ${
                    product.brandColor ??
                    "bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Play Now
                </button>
              </div>

              {/* Right: Rating */}
              <div className="shrink-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-[var(--radius-lg)] p-6 min-w-[160px] border border-gray-100 dark:border-white/[0.06]">
                <span className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
                  {product.rate.toFixed(1)}
                </span>
                <div className="mt-2 flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => {
                    const n = product.rate;
                    const fill = i <= Math.floor(n) ? 1 : i - n < 1 && i - n > 0 ? n - Math.floor(n) : 0;
                    return (
                      <span key={i} className="relative w-4 h-4 shrink-0">
                        <svg className="absolute inset-0 w-4 h-4 text-gray-200 dark:text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                          <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </span>
                      </span>
                    );
                  })}
                </div>
                <p className="mt-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  User Rating
                </p>
              </div>
            </div>
          </section>

          {/* ── Download Section ─────────────────────────────── */}
          <section className="overflow-hidden rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-white dark:bg-gray-900 shadow-[var(--shadow-sm)] p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100 dark:border-white/[0.06]">
              <div
                className={`w-1 h-6 rounded-full ${
                  product.brandColor?.split(" ")[0] ?? "bg-indigo-500"
                }`}
              />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                Download
              </h2>
              <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 font-medium">
                Choose your platform
              </span>
            </div>

            {/* Platform cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  key: "windows",
                  icon: windows,
                  iconAlt: "windows",
                  accentBg: "bg-blue-50 dark:bg-blue-950/40",
                  accentRing: "ring-blue-100 dark:ring-blue-900/40",
                  btnLabel: "Download for Windows",
                },
                {
                  key: "linux",
                  icon: linux,
                  iconAlt: "linux",
                  accentBg: "bg-emerald-50 dark:bg-emerald-950/40",
                  accentRing: "ring-emerald-100 dark:ring-emerald-900/40",
                  btnLabel: "Download for Linux",
                },
              ].map(({ key, icon, iconAlt, accentBg, accentRing, btnLabel }) => {
                const p = product[key as "windows" | "linux"];
                return (
                  <div
                    key={key}
                    className="flex flex-col rounded-[var(--radius-lg)] border border-gray-200/70 dark:border-white/[0.07] bg-gray-50 dark:bg-gray-800/50 shadow-[var(--shadow-sm)] overflow-hidden transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
                  >
                    {/* Accent bar */}
                    <div
                      className={`h-0.5 w-full ${
                        product.brandColor?.split(" ")[0] ?? "bg-indigo-500"
                      }`}
                    />

                    <div className="p-5 flex flex-col gap-4 flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-[var(--radius)] ${accentBg} ring-1 ${accentRing}`}>
                          <Image src={icon} alt={iconAlt} width={24} height={24} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                            {p?.platform}
                          </h3>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {p?.osRequirement}
                          </p>
                        </div>
                      </div>

                      {/* Spec table */}
                      <div className="rounded-[var(--radius-sm)] overflow-hidden border border-gray-200/60 dark:border-white/[0.06] text-xs">
                        {specRows(key as "windows" | "linux").map(([label, value], i) => (
                          <div
                            key={label}
                            className={`flex justify-between items-center px-3 py-2 ${
                              i % 2 === 0
                                ? "bg-gray-50 dark:bg-gray-800/60"
                                : "bg-white dark:bg-gray-900"
                            }`}
                          >
                            <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
                            <span className="text-gray-800 dark:text-gray-200 font-semibold tabular-nums">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Download button */}
                      <div className="mt-auto">
                        <a
                          href={p?.releaseDetails?.download}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`download-${key}-btn`}
                        >
                          <button
                            className={`w-full py-3 px-5 rounded-[var(--radius)] font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] hover:shadow-[var(--shadow-sm)] ${
                              product.brandColor ??
                              "bg-gray-900 hover:bg-gray-800 text-white"
                            }`}
                          >
                            <Download size={16} />
                            {btnLabel}
                          </button>
                        </a>
                        <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 mt-2">
                          {p?.fileName} · {p?.releaseDetails?.fileSize}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div className="border-t border-gray-200 dark:border-white/[0.06]">
        <Footer />
      </div>

      {/* ── Fullscreen Iframe Overlay ─────────────────────────── */}
      {showIfram && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-gray-950">
          <Navbar />
          {/* Close button */}
          <button
            id="iframe-close-btn"
            onClick={() => setShowIfram(false)}
            className="absolute top-20 right-5 z-[80] flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/15 transition-all duration-200 hover:scale-105"
            aria-label="Close game"
          >
            <X className="w-4 h-4" />
          </button>
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            title={product.title}
            className="w-full flex-1 mt-14 rounded-none"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-fullscreen"
            onError={() => {}}
          />
        </div>
      )}
    </div>
  );
}
