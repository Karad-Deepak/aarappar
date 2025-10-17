"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/public/logo2.png";

export default function PopupModal({ type, content, imageUrl }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
        >
          {/* Modal Container */}
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
            className={`w-full rounded-2xl overflow-y-auto bg-slate-100 shadow-2xl mt-10 lg:mt-14 relative ${
              type === "image" && imageUrl
                ? "max-w-2xl md:max-w-4xl max-h-[95vh] p-3 md:p-5"
                : "max-w-3xl md:max-w-4xl max-h-[85vh] md:max-h-[75vh] p-5 md:p-7"
            }`}
          >
            {/* Conditional Rendering Based on Type */}
            {type === "image" && imageUrl ? (
              // Image Only Mode
              <>
                {/* Close Icon - Outside image for mobile, inside for desktop */}
                <div className="absolute -top-10 right-2 md:top-3 md:right-3 z-20">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer bg-white md:bg-transparent rounded-full p-1 md:p-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 md:h-10 md:w-10 text-normalbg hover:text-red-600"
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

                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                >
                  <div className="relative w-full h-auto">
                    <Image
                      src={imageUrl}
                      alt="Popup Image"
                      width={1200}
                      height={800}
                      className="w-full h-auto rounded-lg object-contain max-h-[70vh]"
                      priority
                    />
                  </div>
                </motion.div>
              </>
            ) : (
              // Content Mode (Default)
              <>
                {/* Close Icon in the top right corner */}
                <div className="absolute top-3 right-3 z-10">
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
              </>
            )}

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
