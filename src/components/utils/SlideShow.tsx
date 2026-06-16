"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  {
    src: "/game-cover/cover/dragon-drop-cover.png",
    alt: "Dragon Drop",
  },
  {
    src: "/game-cover/cover/link-number-cover.png",
    alt: "Link Number",
  },
  {
    src: "/game-cover/cover/master-mouse-cover.png",
    alt: "Master Mouse",
  },
  {
    src: "/game-cover/cover/robot-obstacle-cover.png",
    alt: "Robot Obstacle",
  },
  {
    src: "/game-cover/cover/typing-code-cover.png",
    alt: "Typing Code",
  },
  {
    src: "/game-cover/cover/typing-math-cover.png",
    alt: "Typing Math",
  },
  {
    src: "/game-cover/cover/koompi-typing-cover.png",
    alt: "Koompi Typing",
  },
];

export default function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // "left" = slide in from left (going back), "right" = slide in from right (going forward)
  const [direction, setDirection] = useState<"right" | "left">("left");
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = (newIndex: number, dir: "right" | "left") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 1000);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(newIndex, "right");
  };

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex, "left");
  };

  // Auto-play: always slides right (left-to-right direction)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection("left");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setIsAnimating(false);
      }, 1000);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Fade animation — no slide, keep ease-in-out
  const getAnimationClass = () => {
    if (!isAnimating) return "opacity-100";
    return "opacity-0";
  };

  return (
    <div className="relative w-full h-full mx-auto overflow-hidden rounded-lg shadow-lg group items-center justify-center">
      <div
        className={`relative w-full h-full transition-all duration-1000 ease-in-out ${getAnimationClass()}`}
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-contain"
        />
      </div>

      {/* left button */}
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        left
      </button> */}
      {/* button right */}
      {/* <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        right
      </button> */}

      {/* indicator dots */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() =>
              goToSlide(index, index > currentIndex ? "right" : "left")
            }
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div> */}
    </div>
  );
}
