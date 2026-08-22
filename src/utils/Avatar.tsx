"use client";

import React, { useState } from "react";

export interface AvatarSpec {
  id: number;
  name: string;
  gender: "male" | "female";
  gradient: string;
  bgColors: [string, string];
  role: string;
}

export const AVATARS: AvatarSpec[] = [
  // ── MALE AVATARS (0 - 4) ──
  {
    id: 0,
    name: "Tech Cyber",
    gender: "male",
    gradient: "from-indigo-500 to-purple-600",
    bgColors: ["#6366f1", "#9333ea"],
    role: "Developer",
  },
  {
    id: 1,
    name: "Gamer Alex",
    gender: "male",
    gradient: "from-teal-400 to-emerald-600",
    bgColors: ["#2dd4bf", "#059669"],
    role: "Speed Runner",
  },
  {
    id: 2,
    name: "Coder Leo",
    gender: "male",
    gradient: "from-rose-500 to-amber-500",
    bgColors: ["#f43f5e", "#f59e0b"],
    role: "Fullstack Lead",
  },
  {
    id: 3,
    name: "Explorer Sam",
    gender: "male",
    gradient: "from-sky-400 to-blue-600",
    bgColors: ["#38bdf8", "#2563eb"],
    role: "Logic Master",
  },
  {
    id: 4,
    name: "Pro Gamer Max",
    gender: "male",
    gradient: "from-violet-600 to-fuchsia-600",
    bgColors: ["#7c3aed", "#c026d3"],
    role: "E-Sports Champ",
  },
  // ── FEMALE AVATARS (5 - 9) ──
  {
    id: 5,
    name: "Tech Maya",
    gender: "female",
    gradient: "from-pink-500 to-rose-600",
    bgColors: ["#ec4899", "#e11d48"],
    role: "Frontend Engineer",
  },
  {
    id: 6,
    name: "Gamer Zoe",
    gender: "female",
    gradient: "from-cyan-400 to-blue-500",
    bgColors: ["#22d3ee", "#3b82f6"],
    role: "Streamer Pro",
  },
  {
    id: 7,
    name: "Coder Emma",
    gender: "female",
    gradient: "from-amber-400 to-orange-600",
    bgColors: ["#fbbf24", "#ea580c"],
    role: "UI Architect",
  },
  {
    id: 8,
    name: "Pro Player Nina",
    gender: "female",
    gradient: "from-purple-500 to-indigo-600",
    bgColors: ["#a855f7", "#4f46e5"],
    role: "Tactical Strategist",
  },
  {
    id: 9,
    name: "Learner Chloe",
    gender: "female",
    gradient: "from-emerald-400 to-teal-600",
    bgColors: ["#34d399", "#0d9488"],
    role: "AI Researcher",
  },
];

/** Hash username to deterministic avatar ID (0-9) */
export function getAvatarIdForUsername(username?: string | null): number {
  if (!username) return 0;
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % AVATARS.length;
}

/** Render SVG graphic for a given avatar ID */
export function AvatarGraphic({ avatarId }: { avatarId: number }) {
  const spec = AVATARS[avatarId % AVATARS.length];
  const gradId = `avatar-grad-${spec.id}`;

  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full rounded-full">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={spec.bgColors[0]} />
          <stop offset="100%" stopColor={spec.bgColors[1]} />
        </linearGradient>
      </defs>

      {/* Background Circle */}
      <circle cx="32" cy="32" r="32" fill={`url(#${gradId})`} />

      {/* Background ambient lighting */}
      <circle cx="20" cy="18" r="16" fill="white" opacity="0.12" />

      {/* ── SPECIFIC ILLUSTRATION PER AVATAR ── */}
      {spec.id === 0 && (
        /* Male 1: Tech Cyber (Headphones & Hoodie) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#312e81" />
          <path d="M26 40 L32 48 L38 40 Z" fill="#4338ca" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#fbcfe8" />
          <circle cx="32" cy="25" r="11" fill="#fed7aa" />
          <path d="M21 24 C21 16, 26 13, 32 13 C38 13, 43 16, 43 24 C41 20, 37 18, 32 18 C27 18, 23 20, 21 24 Z" fill="#1e1b4b" />
          <circle cx="28" cy="24" r="1.5" fill="#1e1b4b" />
          <circle cx="36" cy="24" r="1.5" fill="#1e1b4b" />
          <path d="M29 28 Q32 31 35 28" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M19 23 C19 14, 25 10, 32 10 C39 10, 45 14, 45 23" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
          <rect x="17" y="20" width="5" height="10" rx="2.5" fill="#4f46e5" />
          <rect x="42" y="20" width="5" height="10" rx="2.5" fill="#4f46e5" />
          <circle cx="19.5" cy="25" r="1.5" fill="#818cf8" />
          <circle cx="44.5" cy="25" r="1.5" fill="#818cf8" />
        </g>
      )}

      {spec.id === 1 && (
        /* Male 2: Gamer Alex (Backwards Cap & Jacket) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#ea580c" />
          <path d="M27 40 L32 50 L37 40 Z" fill="#ffffff" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#ffedd5" />
          <circle cx="32" cy="25" r="11" fill="#ffedd5" />
          <circle cx="28" cy="25" r="1.5" fill="#431407" />
          <circle cx="36" cy="25" r="1.5" fill="#431407" />
          <path d="M28 29 Q32 32 36 29" stroke="#431407" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M20 22 C20 15, 25 12, 32 12 C39 12, 44 15, 44 22 Z" fill="#0284c7" />
          <rect x="18" y="20" width="10" height="3" rx="1.5" fill="#0369a1" />
          <circle cx="32" cy="12" r="2" fill="#0369a1" />
        </g>
      )}

      {spec.id === 2 && (
        /* Male 3: Coder Leo (Glasses & Yellow Tee) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#eab308" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#fde68a" />
          <circle cx="32" cy="25" r="11" fill="#fde68a" />
          <path d="M20 22 C19 16, 23 11, 32 11 C41 11, 45 16, 44 22 C41 18, 38 16, 32 16 C26 16, 23 18, 20 22 Z" fill="#78350f" />
          <circle cx="22" cy="16" r="3" fill="#78350f" />
          <circle cx="32" cy="12" r="3.5" fill="#78350f" />
          <circle cx="42" cy="16" r="3" fill="#78350f" />
          <rect x="23" y="22" width="8" height="6" rx="2" fill="none" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="33" y="22" width="8" height="6" rx="2" fill="none" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="31" y1="24" x2="33" y2="24" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="27" cy="25" r="1" fill="#1e293b" />
          <circle cx="37" cy="25" r="1" fill="#1e293b" />
          <path d="M29 30 Q32 32 35 30" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {spec.id === 3 && (
        /* Male 4: Explorer Sam (Beanie & Beard) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#0f766e" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#fcd34d" />
          <circle cx="32" cy="25" r="11" fill="#fcd34d" />
          <path d="M20 22 C20 13, 24 9, 32 9 C40 9, 44 13, 44 22 Z" fill="#15803d" />
          <rect x="19" y="19" width="26" height="4" rx="2" fill="#166534" />
          <path d="M23 27 C23 34, 27 36, 32 36 C37 36, 41 34, 41 27 C41 30, 37 34, 32 34 C27 34, 23 30, 23 27 Z" fill="#451a03" />
          <circle cx="27" cy="23" r="1.5" fill="#451a03" />
          <circle cx="37" cy="23" r="1.5" fill="#451a03" />
          <path d="M29 28 Q32 30 35 28" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </g>
      )}

      {spec.id === 4 && (
        /* Male 5: Pro Gamer Max (Neon Visor & Headset) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#18181b" />
          <path d="M28 40 L32 46 L36 40 Z" fill="#a21caf" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#fed7aa" />
          <circle cx="32" cy="25" r="11" fill="#fed7aa" />
          <path d="M21 20 L23 13 L27 17 L32 10 L37 17 L41 13 L43 20 Z" fill="#3b0764" />
          <rect x="22" y="21" width="20" height="7" rx="3.5" fill="#e879f9" opacity="0.9" />
          <line x1="24" y1="24.5" x2="40" y2="24.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M20 25 C18 30, 24 33, 27 32" stroke="#e879f9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="27" cy="32" r="1.5" fill="#e879f9" />
          <path d="M29 31 Q32 33 35 31" stroke="#3b0764" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </g>
      )}

      {spec.id === 5 && (
        /* Female 1: Tech Maya (Ponytail & Glasses) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#831843" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#fbcfe8" />
          <circle cx="44" cy="24" r="7" fill="#4c0519" />
          <circle cx="32" cy="25" r="11" fill="#fbcfe8" />
          <path d="M21 25 C21 16, 26 12, 32 12 C38 12, 43 16, 43 25 C41 18, 36 15, 32 15 C28 15, 23 18, 21 25 Z" fill="#4c0519" />
          <circle cx="27" cy="24" r="3.5" fill="none" stroke="#be185d" strokeWidth="1.5" />
          <circle cx="37" cy="24" r="3.5" fill="none" stroke="#be185d" strokeWidth="1.5" />
          <line x1="30.5" y1="24" x2="33.5" y2="24" stroke="#be185d" strokeWidth="1.5" />
          <circle cx="27" cy="24" r="1" fill="#4c0519" />
          <circle cx="37" cy="24" r="1" fill="#4c0519" />
          <circle cx="24" cy="27" r="1.5" fill="#f472b6" opacity="0.6" />
          <circle cx="40" cy="27" r="1.5" fill="#f472b6" opacity="0.6" />
          <path d="M29 29 Q32 32 35 29" stroke="#4c0519" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {spec.id === 6 && (
        /* Female 2: Gamer Zoe (Cat-Ear Headset & Bob Haircut) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#0284c7" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#fef08a" />
          <circle cx="32" cy="25" r="11" fill="#fef08a" />
          <path d="M19 25 C19 14, 24 12, 32 12 C40 12, 45 14, 45 25 L45 32 L40 30 L40 22 C40 16, 36 14, 32 14 C28 14, 24 16, 24 22 L24 30 L19 32 Z" fill="#f59e0b" />
          <circle cx="27" cy="24" r="1.5" fill="#78350f" />
          <circle cx="37" cy="24" r="1.5" fill="#78350f" />
          <path d="M28 28 Q32 31 36 28" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M19 23 C19 13, 25 9, 32 9 C39 9, 45 13, 45 23" fill="none" stroke="#ec4899" strokeWidth="2.5" />
          <polygon points="21,11 25,4 29,11" fill="#ec4899" />
          <polygon points="23,10 25,6 27,10" fill="#f472b6" />
          <polygon points="35,11 39,4 43,11" fill="#ec4899" />
          <polygon points="37,10 39,6 41,10" fill="#f472b6" />
        </g>
      )}

      {spec.id === 7 && (
        /* Female 3: Coder Emma (Beret & Wavy Hair) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#c2410c" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#ffedd5" />
          <path d="M19 26 C17 34, 18 42, 22 46 L42 46 C46 42, 47 34, 45 26 Z" fill="#451a03" />
          <circle cx="32" cy="25" r="11" fill="#ffedd5" />
          <ellipse cx="32" cy="14" rx="15" ry="6" fill="#b91c1c" />
          <circle cx="32" cy="7" r="1.5" fill="#b91c1c" />
          <circle cx="27" cy="24" r="1.5" fill="#451a03" />
          <circle cx="37" cy="24" r="1.5" fill="#451a03" />
          <path d="M28 28 Q32 31 36 28" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {spec.id === 8 && (
        /* Female 4: Pro Player Nina (Dyed Highlights & Hoodie) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#3730a3" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#fed7aa" />
          <path d="M38 12 C46 10, 50 16, 48 26 C44 24, 42 20, 38 16 Z" fill="#d946ef" />
          <circle cx="32" cy="25" r="11" fill="#fed7aa" />
          <path d="M21 24 C21 16, 26 13, 32 13 C38 13, 43 16, 43 24 C40 18, 35 16, 32 16 C29 16, 24 18, 21 24 Z" fill="#2e1065" />
          <path d="M22 22 Q27 17 31 20" stroke="#d946ef" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="27" cy="24" r="1.5" fill="#2e1065" />
          <circle cx="37" cy="24" r="1.5" fill="#2e1065" />
          <path d="M28 29 Q32 32 36 29" stroke="#2e1065" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {spec.id === 9 && (
        /* Female 5: Learner Chloe (Hair Bun & Glasses) */
        <g>
          <path d="M14 54 C14 44, 20 40, 32 40 C44 40, 50 44, 50 54 L50 64 L14 64 Z" fill="#0d9488" />
          <rect x="28" y="32" width="8" height="10" rx="3" fill="#fde68a" />
          <circle cx="32" cy="9" r="6" fill="#292524" />
          <line x1="24" y1="10" x2="40" y2="8" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="25" r="11" fill="#fde68a" />
          <path d="M21 25 C21 16, 26 14, 32 14 C38 14, 43 16, 43 25 C40 19, 36 17, 32 17 C28 17, 24 19, 21 25 Z" fill="#292524" />
          <circle cx="27" cy="24" r="3.5" fill="none" stroke="#0d9488" strokeWidth="1.5" />
          <circle cx="37" cy="24" r="3.5" fill="none" stroke="#0d9488" strokeWidth="1.5" />
          <line x1="30.5" y1="24" x2="33.5" y2="24" stroke="#0d9488" strokeWidth="1.5" />
          <circle cx="27" cy="24" r="1" fill="#292524" />
          <circle cx="37" cy="24" r="1" fill="#292524" />
          <path d="M29 29 Q32 32 35 29" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  );
}

interface AvatarProps {
  avatarId?: number;
  username?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ avatarId, username, size = "sm", className = "" }: AvatarProps) {
  const finalId =
    typeof avatarId === "number"
      ? avatarId
      : getAvatarIdForUsername(username);

  const sizeClasses = {
    sm: "h-8 w-8 ring-2 ring-white/20",
    md: "h-10 w-10 ring-2 ring-white/30",
    lg: "h-14 w-14 ring-4 ring-indigo-500/20",
    xl: "h-20 w-20 ring-4 ring-indigo-500/30",
  }[size];

  return (
    <div className={`relative shrink-0 rounded-full overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 ${sizeClasses} ${className}`}>
      <AvatarGraphic avatarId={finalId} />
    </div>
  );
}

interface AvatarPickerProps {
  selectedAvatarId: number;
  onSelect: (avatarId: number, gender: "male" | "female") => void;
  onClose?: () => void;
}

export function AvatarPicker({ selectedAvatarId, onSelect, onClose }: AvatarPickerProps) {
  const currentSpec = AVATARS[selectedAvatarId % AVATARS.length];
  const [tab, setTab] = useState<"male" | "female">(currentSpec.gender ?? "male");

  const filtered = AVATARS.filter((a) => a.gender === tab);

  return (
    <div className="w-[310px] p-4 bg-white/95 dark:bg-gray-900/95 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl backdrop-blur-xl animate-fade-up select-none">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200/80 dark:border-white/10">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Choose Your Avatar
          </h4>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">Select male or female avatar style</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Male / Female Tab Switcher */}
      <div className="grid grid-cols-2 gap-1 p-1 mb-3 rounded-xl bg-gray-100 dark:bg-gray-800">
        <button
          onClick={() => setTab("male")}
          className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            tab === "male"
              ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Male 👨 (5)
        </button>
        <button
          onClick={() => setTab("female")}
          className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            tab === "female"
              ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Female 👩 (5)
        </button>
      </div>

      {/* Grid of 5 avatars for selected gender */}
      <div className="grid grid-cols-5 gap-2">
        {filtered.map((item) => {
          const isSelected = selectedAvatarId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelect(item.id, item.gender);
                if (onClose) onClose();
              }}
              title={`${item.name} (${item.role})`}
              className={`group relative flex flex-col items-center p-1 rounded-xl transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-500/20 scale-105"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
              }`}
            >
              <div className="w-10 h-10">
                <AvatarGraphic avatarId={item.id} />
              </div>
              <span className="mt-1 text-[9px] font-bold text-gray-700 dark:text-gray-300 truncate w-full text-center">
                {item.name.split(" ")[1] ?? item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
