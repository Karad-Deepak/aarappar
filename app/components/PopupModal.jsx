// components/PopupModal.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PopupModal({ content }) {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl md:p-8"
        >
          <div className="mb-4 text-center">
            <p className="text-lg md:text-xl text-gray-800">{content}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-rose-500 px-6 py-2 text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
