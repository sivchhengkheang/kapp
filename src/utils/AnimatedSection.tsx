"use client";

import React, { type ReactNode } from "react";
import { useInView } from "@/src/hooks/useInView";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  /** Use scroll-reveal instead of section-enter (page-load animation) */
  mode?: "page-load" | "scroll";
}

/**
 * Wraps any section in a staggered entrance animation.
 * - mode="page-load" → CSS animation fires immediately on mount (150ms delay increments)
 * - mode="scroll"    → fades in when scrolled into view via IntersectionObserver
 */
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  mode = "scroll",
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.08 });

  if (mode === "page-load") {
    const delayClass = delay > 0 ? `section-enter-delay-${delay}` : "";
    return (
      <div className={`section-enter ${delayClass} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${inView ? "in-view" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
