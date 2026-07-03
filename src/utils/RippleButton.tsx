"use client";

import { useRef, useCallback, type ButtonHTMLAttributes, type ReactNode } from "react";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  rippleColor?: string;
}

/**
 * Drop-in <button> replacement that spawns a radial ripple on every click.
 * Adds `.ripple-container` automatically — make sure the button has
 * `position: relative` and `overflow: hidden` (provided by the class).
 */
export function RippleButton({
  children,
  className = "",
  rippleColor = "rgba(255,255,255,0.35)",
  onClick,
  ...props
}: RippleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const wave = document.createElement("span");
        wave.className = "ripple-wave";
        wave.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: ${rippleColor};
        `;
        btn.appendChild(wave);

        // Clean up after animation (300ms)
        const cleanup = () => wave.remove();
        wave.addEventListener("animationend", cleanup, { once: true });
        // Fallback cleanup
        setTimeout(cleanup, 500);
      }
      onClick?.(e);
    },
    [onClick, rippleColor]
  );

  return (
    <button
      ref={btnRef}
      className={`ripple-container ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
