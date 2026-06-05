"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Game } from "../../constants";

const images = [
  {
    src: "/slide-show/typing-code/slide-1.png",
    alt: "slide 1",
  },
  {
    src: "/slide-show/typing-code/slide-2.png",
    alt: "slide 2",
  },
  {
    src: "/slide-show/typing-code/slide-3.png",
    alt: "slide 3",
  },
  {
    src: "/slide-show/typing-code/slide-4.png",
    alt: "slide 4",
  },
  {
    src: "/slide-show/typing-code/slide-5.png",
    alt: "slide 5",
  },
  {
    src: "/slide-show/typing-code/slide-6.png",
    alt: "slide 6",
  },
];

export default function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // handle manualy navigate
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev + 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // set auto play functionaly

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-7xl h-[67vh] mx-auto overflow-hidden rounded-xl shadow-lg group">
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover transition-all duration-500 ease-in-out"
        />
      </div>
      {/* left button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        left
      </button>
      {/* button right */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        right
      </button>

      {/* indecator dote */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2
      "
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${currentIndex ? "bg-white " : "bg-white/50"}`}
            aria-label={`Go to the slide ${index + 1}`}
          ></button>
        ))}{" "}
      </div>
    </div>
  );
}
