"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/interior1.webp",
  "/interior2.webp",
  "/interior3.webp",
  "/interior4.webp",
  "/interior5.webp",
  "/interior6.webp",
];

const GalleryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-normalbg">
          Restaurant Gallery
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-100">
          Experience our elegant interiors
        </p>
      </div>
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
        {/* Carousel Container */}
        <div className="relative aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Interior ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-normalbg bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition focus:outline-none"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-normalbg bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition focus:outline-none"
        >
          &rarr;
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
