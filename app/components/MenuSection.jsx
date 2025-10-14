"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "@/app/components/LocalizedLink";
import { useTranslations } from "next-intl";

import dosa from "@/public/Dosa.webp";
import biryani from "@/public/Biryani.webp";
import cchicken from "@/public/cchicken.webp";

const dishes = [
  {
    id: 1,
    name: "Masala Dosa",
    price: "€12.90",
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
  const t = useTranslations("MenuSection");

  return (
    <div className="relative overflow-hidden py-6 sm:py-8 lg:py-12 xl:py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 text-center text-gray-800">
      <div className="absolute inset-0" />

      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-orange-100 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-amber-100 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100 blur-3xl opacity-20" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.h2
            className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-bold text-[#320A6B] mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-3xl text-sm sm:text-base md:text-sm lg:text-lg text-gray-900 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <div className="relative mb-12 sm:mb-16 lg:mb-20">
          <div className="scrollbar-hide flex gap-4 px-2 py-6 sm:gap-6 overflow-x-auto lg:hidden">
            {dishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                className="flex-shrink-0 w-64 sm:w-72 rounded-3xl border bg-gradient-to-b from-zinc-200 to-slate-200 bg-white/80 p-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-50 sm:p-6"
                initial={{ opacity: 0, y: 30, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="group relative mb-4 h-36 w-full overflow-hidden rounded-2xl sm:h-44">
                  <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-gray-900/30 to-transparent" />
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 256px, 288px"
                  />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-sm sm:text-lg font-bold leading-tight text-gray-900">
                    {dish.name}
                  </h3>
                  <p className="text-sm sm:text-lg font-bold text-red-600">
                    {dish.price}
                  </p>
                  <Link href="/menu">
                    <motion.button
                      className="mt-4 w-full rounded-2xl border border-green-500/30 bg-gradient-to-r from-green-500 via-green-600 to-green-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:shadow-xl sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("cta.order")}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden grid-cols-1 gap-6 lg:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10">
            {dishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                className="group rounded-3xl border bg-gradient-to-b from-zinc-200 to-slate-200 bg-white/80 p-6 text-center shadow-xl transition-all duration-300 backdrop-blur-sm hover:bg-gray-50 lg:p-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -8 }}
              >
                <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl transition-shadow duration-300 group-hover:shadow-2xl lg:h-56 xl:h-64">
                  <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-red-100/30 to-red-200/30" />
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="space-y-3 lg:space-y-4">
                  <h3 className="text-sm font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-orange-700 lg:text-lg xl:text-xl">
                    {dish.name}
                  </h3>
                  <p className="text-sm font-bold text-red-600 transition-colors duration-300 group-hover:text-orange-500 lg:text-lg xl:text-xl">
                    {dish.price}
                  </p>
                  <Link href="/menu">
                    <motion.button
                      className="mt-6 w-full rounded-2xl border border-green-500/30 bg-gradient-to-r from-green-500 via-green-600 to-green-700 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:shadow-2xl lg:text-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("cta.order")}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link href="/menu" aria-label={t("cta.exploreAria")}>
            <motion.button
              className="group rounded-3xl border border-teal-500/30 bg-gradient-to-r from-green-500 via-green-600 to-green-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:from-teal-400 hover:via-teal-500 hover:to-teal-600 hover:shadow-2xl lg:px-12 lg:py-5 lg:text-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                {t("cta.explore")}
                <motion.span
                  className="text-2xl transition-transform duration-300 group-hover:translate-x-1"
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

