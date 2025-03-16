"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-zinc-950 text-white py-7 lg:py-10 px-6 md:px-20 lg:px-40"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-lg lg:text-2xl font-bold text-normal text-normalbg">
            AARAPPAR Indisches Restaurant
          </h2>
          <p className="text-gray-400 mt-2 text-sm lg:text-lg">
            Flavours Straight from Home
          </p>
        </div>

        <div className="text-sm lg:text-lg">
          <h3 className="text-sm lg:text-xl font-semibold text-red-400 mb-3">
            Quick Links
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link href="/menu" className="hover:text-white transition">
                Menu
              </Link>
            </li>

            <li>
              <Link href="/reservation" className="hover:text-white transition">
                Reservations
              </Link>
            </li>
            <li>
              <Link href="/catering" className="hover:text-white transition">
                Catering
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="text-sm lg:text-lg">
          <h3 className="text-sm lg:text-xl font-semibold text-red-400 mb-3">
            Contact Us
          </h3>
          <p className="text-gray-400">
            Trümpertstraße 18 60489, Frankfurt am Main - Rödelheim
          </p>
          <p className="text-gray-400 ">+49 15219220483</p>
          <p className="text-gray-400">aarapparrodelheim@aarappar.de</p>
          <div className="flex space-x-4 mt-4 ">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className=" pt-3 lg:pt-6 px-5 text-center text-sm">
        <strong>We only use essential cookies</strong> — please see our{" "}
        <Link href="/privacy-policy" className="hover:text-red-700">
          Privacy Policy
        </Link>
        .
      </div>
      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-5 lg:mt-10 pt-5 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AARAPPAR. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
