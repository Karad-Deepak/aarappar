"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/interior3.webp", "/interior5.webp", "/reviews.webp"];

export default function SimpleCarousel({ interval = 6000 }) {
  const [index, setIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const intv = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(intv);
  }, [interval]);

  // Handlers for arrows/dots
  const goTo = (i) => setIndex(i);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center py-2 lg:py-3">
      {/* Carousel Images */}
      <div className="relative w-full h-72 sm:h-96 flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`Slide ${index + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7 }}
            className="object-cover w-full h-full rounded-2xl"
            draggable={false}
          />
        </AnimatePresence>
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-red-600 transition z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="text-orange-500 w-6 h-6" />
        </button>
        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-red-600 transition z-10"
          aria-label="Next"
        >
          <ChevronRight className="text-orange-500 w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex space-x-2 mt-5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full border-2 ${
              i === index
                ? "bg-orange-600 border-orange-600"
                : "bg-black border-orange-600"
            } transition`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
