"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import heroImg from "@/public/heroimg.webp";
import heroMob from "@/public/heromob.webp";
import halal from "@/public/halal.png";
import SimpleCarousel from "./SimpleCarousel";

// Simple SVG Star component for rating
const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-red-600" : "text-gray-400"}`}
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
    <section className="w-full flex flex-col mt-8 gap-6 lg:gap-8 lg:flex-row items-center px-4 md:px-5 py-10 lg:py-12 bg-gradient-to-br from-slate-950 via-violet-950/50 to-zinc-950 text-white">
      {/* Left Side - Text */}
      <motion.div
        className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 gap-4 lg:gap-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-2xl md:text-5xl font-bold uppercase text-normalbg font-[Playfair Display] leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AARAPPAR <br />
          <motion.span
            className="text-xl md:text-3xl font-bold uppercase text-white leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Indisches Restaurant
          </motion.span>
        </motion.h1>
        {/* 
        <motion.p
          className="text-lg md:text-2xl lg:text-2xl font-bold text-lightbg leading-tight"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Flavours Straight from Home
        </motion.p>
*/}
        <motion.p
          className="text-sm md:text-[16px] text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Authentic Indian Flavors in the Heart of Germany! 🍛✨ Experience the
          rich flavors and traditions of South India at our restaurant.
        </motion.p>

        {/* Ratings Block */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-2 sm:mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* Stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star filled={true} key={idx} />
            ))}
            <span className="ml-2 text-sm lg:text-lg  font-semibold text-red-500">
              4.8
              <span className="text-gray-400 ml-1  font-normal text-sm lg:text-lg">
                (100+ reviews)
              </span>
            </span>
          </div>
          {/* Logo Placeholder */}
          <div className="flex items-center gap-1">
            <span className="  bg-gray-700 rounded-full flex items-center justify-center">
              {/* Placeholder Logo: replace src below */}
              <Image
                src={halal}
                alt="Logo halal"
                className=" w-12 h-12 md:w-20 md:h-20  "
              />
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - Hero Image */}
      <motion.div
        className="flex justify-center lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        {/*  <picture>
          <source media="(min-width: 768px)" srcSet={heroImg.src} />
          <source media="(max-width: 767px)" srcSet={heroMob.src} />
          <Image
            src={heroImg}
            alt="South Indian Cuisine"
            width={500}
            height={500}
            priority={true}
            quality={75}
            className="rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          />
        </picture>
        */}
        <SimpleCarousel />
      </motion.div>
    </section>
  );
}
