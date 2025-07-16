"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dosa from "@/public/Dosa.webp";
import biryani from "@/public/Biryani.webp";
import cchicken from "@/public/cchicken.webp";

const dishes = [
  {
    id: 1,
    name: "Masala Dosa",
    price: "€9.90",
    image: dosa,
  },
  {
    id: 2,
    name: "Chettinad Chicken Curry",
    price: "€14.90",
    image: cchicken,
  },
  {
    id: 3,
    name: "Chicken Biryani",
    price: "€13.90",
    image: biryani,
  },
];

export default function MenuSection() {
  return (
    <div className="relative text-white py-6 sm:py-8 lg:py-12 xl:py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 text-center bg-slate-900">
      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-600 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.h2
            className="text-2xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl font-bold text-amber-400 mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            A Taste of Tradition,{" "}
            <span className="block text-amber-300">A Feast of Flavors!</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Step into a world of rich aromas and authentic flavors with our
            specially curated South Indian menu. Every dish is a masterpiece,
            prepared with traditional recipes and the finest ingredients to
            bring you a taste of home.
          </motion.p>
        </motion.div>

        {/* Menu Cards Container */}
        <div className="relative mb-12 sm:mb-16 lg:mb-20">
          {/* Small Screens: Horizontal Scrollable Cards */}
          <div className="flex gap-4 sm:gap-6 overflow-x-auto lg:hidden scrollbar-hide px-2 py-6">
            {dishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl p-4 sm:p-6 text-center w-64 sm:w-72 flex-shrink-0 hover:bg-slate-800/80 transition-all duration-300"
                initial={{ opacity: 0, y: 30, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Dish Image with overlay */}
                <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden mb-4 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 256px, 288px"
                  />
                </div>

                {/* Dish Details */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className=" text-sm sm:text-lg font-bold text-white leading-tight">
                    {dish.name}
                  </h3>
                  <p className="text-sm sm:text-lg font-bold text-amber-400">
                    {dish.price}
                  </p>

                  <Link href="/menu">
                    <motion.button
                      className="mt-4 w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Order Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Large Screens: Grid Layout */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {dishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl p-6 lg:p-8 text-center hover:bg-slate-800/80 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -8 }}
              >
                {/* Dish Image with enhanced overlay */}
                <div className="relative w-full h-48 lg:h-56 xl:h-64 rounded-2xl overflow-hidden mb-6 group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-600/20 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Dish Details */}
                <div className="space-y-3 lg:space-y-4">
                  <h3 className="text-sm lg:text-lg xl:text-xl font-bold text-white leading-tight group-hover:text-amber-100 transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <p className="text-sm lg:text-lg xl:text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
                    {dish.price}
                  </p>

                  <Link href="/menu">
                    <motion.button
                      className="mt-6 w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-base lg:text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Order Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Explore Full Menu Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link href="/menu">
            <motion.button
              aria-label="Explore the full Aarappar restaurant menu"
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-lg lg:text-xl px-8 lg:px-12 py-4 lg:py-5 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-500/30 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                Explore Full Menu
                <motion.span
                  className="text-2xl group-hover:translate-x-1 transition-transform duration-300"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
