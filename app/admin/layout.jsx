"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Function to determine link styles dynamically
  const getLinkClasses = (path) =>
    `transition-all duration-300 px-4 py-2 rounded-2xl text-sm lg:text-xl font-semibold 
    ${
      pathname === path
        ? "bg-red-600 text-white"
        : "text-normalbg hover:bg-rose-800 hover:text-white"
    }`;

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <header className="bg-black shadow-md border-b border-normalbg">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">
              {/* Logo / Branding */}
              <div className="flex-shrink-0">
                <Link href="/admin">
                  <span className="text-2xl font-bold text-normalbg">
                    Admin Dashboard
                  </span>
                </Link>
              </div>
              {/* Navigation Tabs */}
              <nav className="flex space-x-6">
                <Link
                  href="/admin/orders"
                  className={getLinkClasses("/admin/orders")}
                >
                  Orders
                </Link>
                <Link
                  href="/admin/reservations"
                  className={getLinkClasses("/admin/reservations")}
                >
                  Reservations
                </Link>
                <Link
                  href="/admin/catering"
                  className={getLinkClasses("/admin/catering")}
                >
                  Catering
                </Link>
                <Link
                  href="/admin/change-menu"
                  className={getLinkClasses("/admin/change-menu")}
                >
                  Change Menu
                </Link>
                <Link
                  href="/admin/popup-settings"
                  className={getLinkClasses("/admin/popup-settings")}
                >
                  Popup Settings
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-10 px-6 sm:px-8 lg:px-12">
          {/* Framer Motion animated container for smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
