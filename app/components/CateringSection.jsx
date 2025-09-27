"use client";
import { motion } from "framer-motion";
import catering from "@/public/catering1.webp";
import Image from "next/image";

export default function CateringSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between  text-slate-950 py-6 md:py-16 px-7 md:px-20 gap-6 lg:gap-8 ">
      {/* Left - Image */}
      <motion.div
        className="md:w-1/2 w-full flex items-center justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={catering} // Change this to the actual image path
          alt="Catering Services"
          width={300}
          height={500}
          className="rounded-2xl shadow-lg  lg:block"
        />
      </motion.div>

      {/* Right - Content */}
      <motion.div
        className="md:w-1/2 w-full text-center md:text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl lg:text-5xl font-bold text-primary mb-4">
          Elevate Your Events with Exquisite Catering
        </h2>
        <p className="text-sm lg:text-lg text=black mb-6">
          Experience a blend of delicious flavors, artful presentation, and
          seamless service. Our catering team ensures every detail is crafted to
          perfection, making your event truly unforgettable.
        </p>

        <button className="  text-base   bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:from-teal-400 hover:via-teal-500 hover:to-teal-600 text-white font-bold  sm:text-lg px-8 py-3 lg:px-16 lg:py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/30 ">
          Enquire Now
        </button>
      </motion.div>
    </section>
  );
}
