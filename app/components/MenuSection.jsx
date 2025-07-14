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
    <div className="relative text-white py-8 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-24 text-center bg-cover bg-center ">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-slate-900 "></div>

      <div className="relative z-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl lg:text-4xl font-bold text-amber-400 mb-4"
        >
          A Taste of Tradition, A Feast of Flavors!
        </motion.h2>
        <p className="text-[12px] lg:text-lg text-gray-50 max-w-2xl mx-auto pb-6 lg:pb-10">
          Step into a world of rich aromas and authentic flavors with our
          specially curated South Indian menu. Every dish is a masterpiece,
          prepared with traditional recipes and the finest ingredients to bring
          you a taste of home.
        </p>

        {/* SCROLLABLE ON SMALL SCREENS, GRID ON LARGE SCREENS */}
        <div className="relative">
          {/* Small Screens: Horizontal Scrollable Cards with No Scrollbar */}
          <div className="flex gap-6 overflow-x-auto lg:hidden no-scrollbar px-1 py-4">
            {dishes.map((dish) => (
              <motion.div
                key={dish.id}
                className="bg-slate-950 rounded-2xl shadow-lg p-4 sm:p-6 text-center w-56 sm:w-64 flex-shrink-0 hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: dish.id * 0.2 }}
              >
                {/* Dish Image */}
                <div className="relative w-full h-32 sm:h-40 rounded-xl overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    className="rounded-xl object-cover"
                  />
                </div>

                {/* Dish Name & Price */}
                <h3 className="text-sm sm:text-lg font-semibold mt-3">
                  {dish.name}
                </h3>
                <p className="text-xs sm:text-md text-red-400 font-medium mt-1">
                  {dish.price}
                </p>
                <Link href="/menu">
                  <button className="mt-3 bg-amber-400 text-indigo-950 fomt-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-xl hover:bg-rose-600 transition">
                    Order Now
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Large Screens: Grid Layout */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dishes.map((dish) => (
              <motion.div
                key={dish.id}
                className="bg-slate-950 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: dish.id * 0.2 }}
              >
                {/* Dish Image */}
                <div className="relative w-full h-40 rounded-xl overflow-hidden">
                  <Image
                    quality={60}
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>

                {/* Dish Name & Price */}
                <h3 className="text-lg font-semibold mt-3">{dish.name}</h3>
                <p className="text-md text-red-400 font-medium mt-1">
                  {dish.price}
                </p>
                <Link href="/menu">
                  <button className="mt-3 bg-amber-400 font-bold text-black px-5 py-2 rounded-xl hover:bg-rose-600 transition">
                    Order Now
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <Link href="/menu">
          <motion.button
            aria-label="Explore the full Aarappar restaurant menu"
            className="py-3 px-6 rounded-2xl mt-10 text-lg text-white bg-normalbg hover:bg-rose-600 transition"
            whileHover={{ scale: 1.1 }}
          >
            Explore Full Menu →
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
