"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import hero from "@/public/hero.jpg";

export default function Hero() {
  return (
    <section className="flex flex-col mt-8 gap-6 lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 lg:py-16 bg-darkbg text-white">
      {/* Left Side - Text */}
      <motion.div
        className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 gap-6 lg:gap-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-normalbg font-[Playfair Display] leading-tight">
          Flavours Straight from Home
        </h1>
        <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
          Authentic South Indian Flavors in the Heart of Germany! 🍛✨
          Experience the rich taste of **dosas, idlis, and flavorful curries**,
          crafted with traditional recipes and fresh ingredients. A true taste
          of home, away from home!
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/menu">
            <button className="bg-rose-500 text-white text-sm md:text-lg px-6 py-3 rounded-xl shadow-lg hover:bg-rose-600 transition-transform transform hover:scale-105">
              Order Now
            </button>
          </Link>
          <Link href="/reservation">
            <button className="bg-gray-800 text-white text-sm md:text-lg px-6 py-3 rounded-xl shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105">
              Reserve Table
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Right Side - Hero Image */}
      <motion.div
        className="flex justify-center lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={hero}
          alt="South Indian Cuisine"
          width={500}
          height={500}
          className="rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        />
      </motion.div>
    </section>
  );
}
