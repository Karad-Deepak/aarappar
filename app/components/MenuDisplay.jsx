"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import QuantityControl from "./QuantityControl";
import chicken from "@/public/chicken.webp";
import Biryani from "@/public/Biryani.webp";

// Helper function to group items by a key
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const groupKey = item[key] || "Others";
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

export default function MenuDisplay({ menudata }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term (case-insensitive)
  const filteredData = menudata.filter((item) =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // When no search, group by category; when searching, show flat list
  const groupedByCategory = groupBy(menudata, "category");

  // Framer Motion variants for container and item animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const detailsVariants = {
    collapsed: { opacity: 0, height: 0 },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8 lg:mt-12">
      {/* Decorative Images and Title */}
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto md:mx-0"
        >
          <Image
            src={chicken}
            alt="Decorative Left"
            className="rounded-full object-cover w-12 h-12 md:w-40 md:h-40"
          />
        </motion.div>

        <div className="text-center my-4 md:my-0">
          <h1 className="text-4xl font-bold text-rose-500 mb-3">Menu</h1>
          <p className="hidden lg:block text-sm sm:text-lg text-darkbg">
            Discover our delicious offerings carefully crafted to delight your
            taste buds.
          </p>
        </div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto md:mx-0"
        >
          <Image
            src={Biryani}
            alt="Decorative Right"
            className="rounded-full object-cover w-12 h-12 md:w-40 md:h-40"
          />
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for items..."
          className="w-full max-w-md p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
        />
      </div>

      {/* No results message for search */}
      {searchTerm && filteredData.length === 0 && (
        <p className="text-center text-gray-600 mb-4">
          No menu items match your search.
        </p>
      )}

      {searchTerm ? (
        // When search term exists, display matching items in a grid
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredData.map((item) => (
            <motion.div
              key={item.id}
              className="p-4 border rounded-lg shadow bg-white hover:scale-105 hover:shadow-2xl transition transform duration-300 flex flex-col justify-between"
              variants={itemVariants}
            >
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-sm lg:text-xl font-semibold text-gray-800">
                    {item.item_name}
                  </h4>
                  <span className="text-s lg:text-lg font-bold text-indigo-600">
                    €{parseFloat(item.price).toFixed(2)}
                  </span>
                </div>
                {item.description && (
                  <p className="mt-2 text-gray-600 text-xs lg:text-lg">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <QuantityControl item={item} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // When no search term, display items grouped by category & subcategory
        Object.entries(groupedByCategory).map(([category, items]) => {
          // Further group items by subcategory
          const groupedBySub = groupBy(items, "subcategory");
          return (
            <details
              key={category}
              className="mb-3 lg:mb-7 border border-darkbg rounded-lg overflow-hidden"
            >
              <summary className="px-4 py-2 cursor-pointer text-[16px] lg:text-2xl font-semibold text-normalbg bg-indigo-50 hover:bg-gray-200 transition-colors">
                {category}
              </summary>
              <AnimatePresence>
                <motion.div
                  className="px-4 py-4"
                  variants={detailsVariants}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                >
                  {Object.entries(groupedBySub).map(
                    ([subcategory, subItems]) => (
                      <div key={subcategory} className="mb-6">
                        {subcategory &&
                          subcategory.trim() !== "" &&
                          subcategory.toLowerCase() !== "others" && (
                            <h3 className="text-lg lg:text-2xl font-medium text-indigo-700 mb-4">
                              {subcategory}
                            </h3>
                          )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {subItems.map((item) => (
                            <motion.div
                              key={item.id}
                              className="p-4 border rounded-lg shadow bg-white hover:scale-105 hover:shadow-2xl transition transform duration-300 flex flex-col justify-between"
                              variants={itemVariants}
                            >
                              <div>
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm lg:text-xl font-semibold text-gray-800">
                                    {item.item_name}
                                  </h4>
                                  <span className="text-s lg:text-lg font-bold text-indigo-600">
                                    €{parseFloat(item.price).toFixed(2)}
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="mt-2 text-gray-600 text-xs lg:text-lg">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              <div className="mt-4">
                                <QuantityControl item={item} />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </details>
          );
        })
      )}
    </div>
  );
}
