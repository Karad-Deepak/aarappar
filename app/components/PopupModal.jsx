"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function PopupModal({ content }) {
  const [isOpen, setIsOpen] = useState(true);

  // Trigger confetti once when the modal is first shown
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFC700", "#FF0000", "#2E3192", "#41BBC7"],
      });
    }
  }, [isOpen]);

  // Border shimmer animation (glitter effect)
  const borderVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%"],
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
        >
          {/* Shimmering gradient border wrapper */}
          <motion.div
            variants={borderVariants}
            animate="animate"
            className="p-1 rounded-xl bg-gradient-to-r from-teal-400 via-rose-400 to-teal-400"
          >
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
              className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl md:p-8"
            >
              <motion.div
                className="mb-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3, duration: 0.5 },
                }}
              >
                <p className="text-lg md:text-2xl text-normalbg font-bold">
                  {content}
                </p>
              </motion.div>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-rose-500 px-6 py-2 text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
