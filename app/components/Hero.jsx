"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import halal from "@/public/halal.png";

// Simple SVG Star component for rating
const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 sm:w-5 sm:h-5 ${
      filled ? "text-amber-500" : "text-gray-300"
    }`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

export default function Hero() {
  return (
    <section className="relative z-10 w-full flex flex-col items-center text-center gap-6 px-4 md:px-8 pt-20 pb-16 md:pt-24 md:pb-24 text-white">
      <motion.div
        className="flex w-full max-w-3xl flex-col items-center text-center gap-4 lg:gap-6 rounded-3xl border border-white/10 bg-white/20 backdrop-blur-sm px-6 py-8 md:px-10 md:py-12 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-normalbg text-4xl md:text-6xl font-bold uppercase font-[Playfair Display] leading-tight tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AARAPPAR
          <br />
          <motion.span
            className="text-3xl md:text-4xl font-bold uppercase text-normalbg leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Indisches Restaurant
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-sm md:text-base text-white leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Authentic Indian flavors in the heart of Germany. Experience the rich
          traditions of South India with dishes crafted from family recipes and
          fresh ingredients.
        </motion.p>
        {/* Ratings Block */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-2 sm:mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* Stars Card */}
          <div className="backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star filled={true} key={idx} />
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-slate-900">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-amber-500">
                  4.8
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-medium">
                  (100+ reviews)
                </span>
              </div>
            </div>
          </div>
          {/* Logo Placeholder */}
          <div className="flex items-center gap-1  rounded-full px-4 py-2 shadow-lg">
            <span className="flex items-center justify-center">
              <Image
                src={halal || "/placeholder.svg"}
                alt="Halal certification logo"
                className="w-12 h-12 md:w-16 md:h-16"
                priority
              />
            </span>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center w-full sm:w-auto mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.button
            className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-600 via-green-600 to-green-600 hover:from-teal-400 hover:via-teal-500 hover:to-teal-600 rounded-full font-bold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 border border-teal-500/40 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.button>
          <motion.button
            className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-500 hover:from-teal-600 hover:via-teal-800 hover:to-teal-900 rounded-full font-bold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Make Reservation
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
