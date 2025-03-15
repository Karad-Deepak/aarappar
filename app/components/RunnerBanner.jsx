// components/RunnerBanner.jsx
"use client";
import { motion } from "framer-motion";

const RunnerBanner = () => {
  return (
    <div className="fixed py-1  top-0 left-0 w-full bg-red-100 border-b border-red-300 overflow-hidden z-50">
      <motion.div
        className="whitespace-nowrap"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
      >
        <span className="px-4  text-red-700 font-extrabold">
          Sorry, Unfortunately, we can accept CASH only at the moment!
        </span>
      </motion.div>
    </div>
  );
};

export default RunnerBanner;
