"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
        >
          {/* Rainbow gradient border wrapper with blinking LED effect */}
          <motion.div
            variants={borderVariants}
            animate="animate"
            className="p-1 rounded-xl"
            style={{
              background:
                "linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8F00FF)",
              backgroundSize: "400% 400%",
            }}
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
              className="w-4xl rounded-2xl bg-zinc-950 p-6 shadow-2xl md:p-8"
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
                <p className="text-sm md:text-xl text-white font-bold whitespace-pre-line">
                  {content}
                </p>
              </motion.div>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-normalbg px-6 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
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
