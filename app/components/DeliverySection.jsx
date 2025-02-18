"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import delivery from "@/public/delivery.png";

// Reusable Button Component with Hover Effect
const Button = ({ children, className, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-xl text-sm lg:text-lg font-semibold transition-all shadow-md ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// Delivery Section Component
export default function DeliverySection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between  text-white p-10 md:p-16 ">
      {/* Left Section */}
      <div className="flex-1 space-y-8 text-center md:text-left">
        <h2 className="text-xl md:text-4xl font-extrabold text-normalbg uppercase tracking-wide">
          Delivery Available On
        </h2>

        {/* Delivery Links - Column on small, Row on large */}
        <ul className="text-sm lg:text-xl  flex flex-col md:flex-row md:gap-8 justify-center md:justify-start space-y-3 md:space-y-0 ">
          <li>
            <Link
              href="https://www.lieferando.de/"
              target="_blank"
              className=" text-white hover:text-rose-400 transition duration-300"
            >
              ➤ Lieferando
            </Link>
          </li>
          <li>
            <Link
              href="https://www.ubereats.com/de"
              target="_blank"
              className=" text-white hover:text-rose-400 transition duration-300"
            >
              ➤ Uber Eats
            </Link>
          </li>
          <li>
            <Link
              href="https://www.foodora.de/"
              target="_blank"
              className=" text-white hover:text-rose-400 transition duration-300"
            >
              ➤ Foodora
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center md:justify-start text-sm lg:text-xl">
          <Button className="bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-red-500 hover:to-rose-500">
            Order Here Now
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200">
            Reserve a Table
          </Button>
        </div>
      </div>

      {/* Right Section - Delivery Boy Image */}
      <div className="flex-1 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-6 bg-opacity-10 bg-gray-800 rounded-3xl shadow-lg backdrop-blur-lg"
        >
          <Image
            src={delivery}
            alt="Delivery Boy"
            width={350}
            height={350}
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
