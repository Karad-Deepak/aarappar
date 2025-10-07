"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Wallet,
  CreditCard,
  Banknote,
  BadgeDollarSign,
  PartyPopper,
} from "lucide-react";
import halal from "@/public/halal.png"; // Assuming this path is correct and the image is provided
import interior3 from "@/public/interior3.webp";

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
    <section className="relative w-full flex flex-col mt-10 gap-6 lg:gap-8 lg:flex-row items-center px-4 md:px-5 py-10 lg:py-12 lg:pb-20">
      {/* Left Side - Text */}
      <motion.div
        className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 gap-4 lg:gap-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold uppercase text-normalbg font-[Playfair Display] leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AARAPPAR <br />
          <motion.span
            className="text-3xl md:text-3xl font-bold uppercase text-normalbg leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Indisches Restaurant
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-sm md:text-[16px] text-slate-950 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Authentic Indian Flavors in the Heart of Germany! Experience the rich
          flavors and traditions of South India at our restaurant.
        </motion.p>
        {/* Ratings Block */}
        <motion.div
          className="flex flex-row items-center gap-3 sm:gap-6 mt-2 sm:mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* Stars Card */}
          <div className=" backdrop-blur-sm border  rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star filled={true} key={idx} />
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-amber-500">
                  4.8
                </span>
                <span className="text-gray-900 text-xs sm:text-sm lg:text-base font-medium">
                  (100+ reviews)
                </span>
              </div>
            </div>
          </div>
          {/* Logo Placeholder */}
          <div className="flex items-center gap-1">
            <span className="bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src={halal || "/placeholder.svg"}
                alt="Logo halal"
                className="w-12 h-12 md:w-20 md:h-20"
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-block px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-600 via-green-600 to-green-600 hover:from-green-700 hover:via-green-800 hover:to-green-900 rounded-full font-bold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 border border-green-600/30 text-white"
            >
              Order Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/reservation"
              className="w-full sm:w-auto inline-block px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-500 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 rounded-full font-bold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 text-black"
            >
              Make Reservation
            </Link>
          </motion.div>
        </motion.div>
        {/* Rolling Payment Banner - Mobile (below buttons) */}
        <div className="lg:hidden w-full mt-4 flex justify-center">
          <div className="relative w-full max-w-[360px] sm:max-w-[480px] overflow-hidden bg-slate-100/80 border border-normalbg/20 rounded-full py-2">
            <marquee behavior="scroll" direction="left" scrollamount="12">
              <span className="inline-flex items-center gap-2 text-normalbg font-semibold text-xs mr-6">
                <PartyPopper size={16} /> 10 % Rabatt zum Mitnehmen!
              </span>
              <span className="inline-flex items-center gap-2 text-normalbg font-semibold text-xs mr-6">
                <Wallet size={16} /> Cash accepted
              </span>
              <span className="inline-flex items-center gap-2 text-normalbg font-semibold text-xs mr-6">
                <CreditCard size={16} /> Card accepted
              </span>
              <span className="inline-flex items-center gap-2 text-normalbg font-semibold text-xs mr-6">
                <BadgeDollarSign size={16} /> PayPal accepted
              </span>
              <span className="inline-flex items-center gap-2 text-normalbg font-semibold text-xs mr-6">
                <Banknote size={16} /> IBAN accepted
              </span>
            </marquee>
          </div>
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
        <Image
          src={interior3}
          alt="Restaurant Hero"
          className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto rounded-2xl shadow-lg"
          priority
        />
      </motion.div>
      {/* Rolling Payment Banner - Desktop (bottom of hero) */}
      <div className="hidden lg:block w-full lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mb-4 px-4 md:px-5 z-10">
        <div className="w-full overflow-hidden bg-slate-100/80 border border-normalbg/20 rounded-full py-3">
          <marquee behavior="scroll" direction="left" scrollamount="9">
            <span className="inline-flex items-center gap-3 text-normalbg font-semibold text-sm mr-14">
              <PartyPopper size={18} /> 10 % Rabatt zum Mitnehmen!
            </span>
            <span className="inline-flex items-center gap-3 text-normalbg font-semibold text-sm mr-14">
              <Wallet size={18} /> Cash accepted
            </span>
            <span className="inline-flex items-center gap-3 text-normalbg font-semibold text-sm mr-14">
              <CreditCard size={18} /> Card accepted
            </span>
            <span className="inline-flex items-center gap-3 text-normalbg font-semibold text-sm mr-14">
              <BadgeDollarSign size={18} /> PayPal accepted
            </span>
            <span className="inline-flex items-center gap-3 text-normalbg font-semibold text-sm mr-14">
              <Banknote size={18} /> IBAN accepted
            </span>
          </marquee>
        </div>
      </div>
    </section>
  );
}
