"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Import react icons
import { FaRegCalendarAlt, FaTruck } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { FiEdit, FiSettings } from "react-icons/fi";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to determine link styles dynamically
  const getLinkClasses = (path) =>
    `block transition-all duration-300 px-4 py-2 rounded-2xl text-sm lg:text-xl font-semibold 
    ${
      pathname === path
        ? "bg-normalbg text-white"
        : "text-white hover:bg-rose-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-black text-white ">
      <header className="bg-black shadow-md">
        <div className="max-w-7xl  mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16 ">
          {/* Logo / Branding */}
          <div className="flex-shrink-0 ">
            <Link href="/admin">
              <span className="text-2xl font-bold text-normalbg">
                Admin Dashboard
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/admin/reservations"
              className={getLinkClasses("/admin/reservations")}
            >
              <FaRegCalendarAlt className="inline mr-2" />
              Reservations
            </Link>

            <Link
              href="/admin/pickups"
              className={getLinkClasses("/admin/pickups")}
            >
              <FaTruck className="inline mr-2" />
              Pickups
            </Link>
            <Link
              href="/admin/catering"
              className={getLinkClasses("/admin/catering")}
            >
              <GiChefToque className="inline mr-2" />
              Catering
            </Link>
            <Link
              href="/admin/change-menu"
              className={getLinkClasses("/admin/change-menu")}
            >
              <FiEdit className="inline mr-2" />
              Change Menu
            </Link>
            <Link
              href="/admin/popup-settings"
              className={getLinkClasses("/admin/popup-settings")}
            >
              <FiSettings className="inline mr-2" />
              Popup Settings
            </Link>
          </nav>
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-1/2 bg-black shadow-lg z-50 md:hidden"
          >
            <div className="p-4 space-y-4 mt-5">
              <Link
                href="/admin/reservations"
                className={getLinkClasses("/admin/reservations")}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaRegCalendarAlt className="inline mr-2" />
                Reservations
              </Link>

              <Link
                href="/admin/pickups"
                className={getLinkClasses("/admin/pickups")}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTruck className="inline mr-2" />
                Pickups
              </Link>
              <Link
                href="/admin/catering"
                className={getLinkClasses("/admin/catering")}
                onClick={() => setIsMenuOpen(false)}
              >
                <GiChefToque className="inline mr-2" />
                Catering
              </Link>
              <Link
                href="/admin/change-menu"
                className={getLinkClasses("/admin/change-menu")}
                onClick={() => setIsMenuOpen(false)}
              >
                <FiEdit className="inline mr-2" />
                Change Menu
              </Link>
              <Link
                href="/admin/popup-settings"
                className={getLinkClasses("/admin/popup-settings")}
                onClick={() => setIsMenuOpen(false)}
              >
                <FiSettings className="inline mr-2" />
                Popup Settings
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto py-10 px-6 sm:px-8 lg:px-12">
        {children}
      </main>
    </div>
  );
}
