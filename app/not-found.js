"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-rose-500">
      <motion.h1
        className="text-4xl mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        404 - Page Not Found
      </motion.h1>
      <motion.p
        className="mb-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        The page you are looking for does not exist.
      </motion.p>
      <Link href="/">
        <motion.button
          className="bg-rose-500 text-white py-2 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to Home
        </motion.button>
      </Link>
    </div>
  );
}
