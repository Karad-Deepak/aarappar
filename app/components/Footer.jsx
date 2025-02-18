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
      className="bg-zinc-900 text-white py-10 px-6 md:px-20 lg:px-40"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-lg lg:text-2xl font-bold text-rose-500">
            AARAPAR
          </h2>
          <p className="text-gray-400 mt-2 text-sm lg:text-lg">
            Experience the finest dining with our exquisite menu crafted with
            passion.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-sm lg:text-lg">
          <h3 className="text-sm lg:text-xl font-semibold text-rose-400 mb-3">
            Quick Links
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link href="/menu" className="hover:text-white transition">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-white transition">
                Reservations
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="text-sm lg:text-lg">
          <h3 className="text-sm lg:text-xl font-semibold text-rose-400 mb-3">
            Contact Us
          </h3>
          <p className="text-gray-400">123, Gourmet Street, Food City</p>
          <p className="text-gray-400">+1 (123) 456-7890</p>
          <p className="text-gray-400">info@aarapar.com</p>
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

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-10 pt-5 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AARAPAR. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
