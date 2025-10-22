"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const images = [
  "/interior2.webp",
  "/interior5.webp",
  "/interior3.webp",
  "/interior4.webp",
  "/interior1.webp",
  "/interior3.webp",
];

export default function RestaurantGallery() {
  const t = useTranslations("Gallery");
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      aria-labelledby="gallery-heading"
      className="relative py-6 lg:py-12 px-4 sm:px-8 md:px-12 lg:px-24 text-center "
    >
      <h2
        id="gallery-title"
        className="text-2xl lg:text-5xl font-extrabold text-primary mb-4"
      >
        {t("title")}
      </h2>
      <p className="text-sm lg:text-lg text-gray-900 mb-6">
        {t("subtitle")}
      </p>

      <div className="relative max-w-4xl mx-auto overflow-hidden rounded-lg  aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`Interior of Aarappar Restaurant ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              quality={60}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-normalbg p-2 lg:p-3 rounded-full hover:bg-opacity-70 transition"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50  text-normalbg p-2 lg:p-3 rounded-full hover:bg-opacity-70 transition"
        >
          &rarr;
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label="View Slide"
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
