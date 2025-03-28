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
          {/* Rainbow gradient border wrapper with blinking LED effect */}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            // Added overflow-y-auto to enable scrolling for high volume content
            className="w-full max-w-lg md:max-w-5xl rounded-2xl max-h-[95vh] overflow-y-auto bg-[#232946] p-3 md:p-5 shadow-2xl mt-6 lg:mt-12"
          >
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
              <p className="text-xs md:text-sm text-[#fffffe] font-bold whitespace-pre-line">
                {content}
              </p>
            </motion.div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-7 border-gray-600">
              <Link href="/reservation">
                <button className="text-base sm:text-lg font-bold text-normalbg  hover:underline">
                  Reserve your table
                </button>
              </Link>
              <p className="text-sm sm:text-base font-bold text-normalbg">
                Call: +49 69 21939837
              </p>
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
