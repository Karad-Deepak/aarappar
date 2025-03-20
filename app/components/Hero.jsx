"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import heroImg from "@/public/heroimg.webp";
import heroMob from "@/public/heromob.webp";

export default function Hero() {
  return (
    <section className="flex flex-col mt-8 gap-6 lg:gap-8 lg:flex-row items-center px-4 md:px-5 py-10 lg:py-12 bg-darkbg text-white">
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
            className="text-xl md:text-3xl font-bold uppercase text-normalbg leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Indisches Restaurant
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl lg:text-2xl font-bold text-lightbg leading-tight"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Flavours Straight from Home
        </motion.p>
        <p className="font-bold text-sm lg:text-2xl drop-shadow-[0_1px_2px_#e00700]">
          100% Pure, Natural Taste – No Artificial Colors Added to our dishes!
        </p>
        <motion.p
          className="text-sm md:text-[16px] text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Authentic Indian Flavors in the Heart of Germany! 🍛✨ Experience the
          rich flavors and traditions of South India at our restaurant, where
          every dish is a celebration of culture and culinary excellence. From
          aromatic spices to time-honored recipes, we offer a warm, welcoming
          atmosphere and unforgettable food that brings the essence of South
          India to your table.
        </motion.p>

        <div className="flex gap-4 sm:flex-row">
          <Link href="/reservation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Reserve a table at Aarappar Restaurant"
              className="bg-teal-800 text-white text-sm md:text-lg px-6 py-3 rounded-xl shadow-lg hover:bg-rose-600 transition-transform transform"
            >
              Reserve Table
            </motion.button>
          </Link>

          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View the menu and order now from Aarappar Restaurant"
              className="bg-gray-800 text-white text-sm md:text-lg px-6 py-3 rounded-xl shadow-lg hover:bg-gray-700 transition-transform transform"
            >
              Order Now
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Right Side - Hero Image */}
      <motion.div
        className="flex justify-center lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        <picture>
          {/* For medium and larger screens, use heroImg */}
          <source media="(min-width: 768px)" srcSet={heroImg.src} />
          {/* For smaller screens, use heroMob */}
          <source media="(max-width: 767px)" srcSet={heroMob.src} />
          {/* Fallback image */}
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
      </motion.div>
    </section>
  );
}
