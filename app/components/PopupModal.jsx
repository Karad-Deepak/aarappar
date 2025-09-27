"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo2.png";

export default function PopupModal({ content }) {
  const [isOpen, setIsOpen] = useState(true);

  // Rainbow border animation with LED blinking effect
  const borderVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%"],
      filter: [
        "brightness(1)",
        "brightness(1.3)",
        "brightness(1.7)",
        "brightness(1.3)",
        "brightness(1)",
      ],
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
        >
          {/* Enlarged Modal Container with added scale & rotation animations */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 2 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              rotate: 2,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
            className="w-full max-w-3xl md:max-w-6xl rounded-2xl max-h-[95vh] overflow-y-auto bg-slate-200 p-5 md:p-7 shadow-2xl mt-10 lg:mt-14 relative"
          >
            {/* Close Icon in the top right corner */}
            <div className="absolute top-3 right-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 lg:h-10 lg:w-10 text-normalbg hover:text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Header */}
            <div className="flex md:flex-row flex-col gap-3 md:gap-5 items-center justify-center mb-2 md:mb-3">
              <Image src={logo} alt="Logo" width={50} height={50} />
              <h1 className="text-lg md:text-xl text-normalbg font-bold text-center">
                AARAPPAR Indisches Restaurant
              </h1>
            </div>

            {/* Dynamic Content */}
            <motion.div
              className="mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.3, duration: 0.5 },
              }}
            >
              <p className="text-xs md:text-sm text-indigo-950 font-bold whitespace-pre-line">
                {content}
              </p>
            </motion.div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-7 border-gray-600">
              {/* <Link href="/reservation">
                <button className="text-base sm:text-lg font-bold text-normalbg hover:underline">
                  Reserve your table
                </button>
                
              </Link>
              
              <p className="text-sm sm:text-base font-bold text-normalbg">
                Call: +49 69 21939837
              </p>
              */}
            </div>
            {/* Close Button */}
            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-normalbg px-2 py-1 md:px-4 md:py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
