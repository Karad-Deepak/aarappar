"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import QuantityControl from "./QuantityControl";
import chicken from "@/public/chicken.webp";
import Biryani from "@/public/Biryani.webp";

// Helper: group items by key
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key] || "Others";
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

export default function MenuDisplay({ menudata }) {
  const [searchTerm, setSearchTerm] = useState("");

  // only available
  const available = menudata.filter((item) => !item.soldout);
  const filtered = available.filter((item) =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // group by category
  const byCat = groupBy(available, "category");

  // refined user-friendly order
  const categoryOrder = [
    "SOUPS",
    "APPETIZERS – VEGETARIAN",
    "APPETIZERS – NON-VEGETARIAN",
    "EGG APPETIZERS",
    "VEGETARIAN & VEGAN CURRIES",
    "NON-VEGETARIAN CURRIES",
    "RICE & BIRYANI",
    "DOSA SPECIALS",
    "INDIAN BREADS",
    "PAROTTA",
    "KIDS MENU",
    "DESSERTS",
    "DRINKS",
  ];

  // only those present
  const ordered = categoryOrder.filter((c) => byCat[c]);

  // fallbacks for any extra categories
  const rest = Object.keys(byCat).filter((c) => !categoryOrder.includes(c));
  const finalCats = [...ordered, ...rest];

  // animations
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVar = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const detailsVar = {
    collapsed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
  };

  return (
    <div className="container mx-auto px-4 pt-8 lg:pt-14 pb-8">
      <div className="flex justify-between mb-8 items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={chicken}
            alt=""
            className="w-16 h-16 md:w-32 md:h-32 rounded-full"
          />
        </motion.div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Menu</h1>
          <p className="text-gray-50 hidden lg:block">
            Delicious South Indian flavors, pure & natural.
          </p>
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={Biryani}
            alt=""
            className="w-16 h-16 md:w-32 md:h-32 rounded-full"
          />
        </motion.div>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="w-full max-w-md p-2 rounded-full border focus:ring-2 focus:ring-red-500"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchTerm && filtered.length === 0 && (
        <p className="text-center text-gray-500">No items found.</p>
      )}

      {searchTerm ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white text-red-500 p-4 rounded shadow flex flex-col justify-between hover:scale-105 transition"
              variants={itemVar}
            >
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-950">
                    {item.item_name}
                  </span>
                  <span className="font-bold text-indigo-400">
                    €{parseFloat(item.price).toFixed(2)}
                  </span>
                </div>
                {item.description && (
                  <p className="text-gray-400 mt-1 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
              <QuantityControl item={item} disabled={false} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        finalCats.map((category) => {
          const items = byCat[category];
          const bySub = groupBy(items, "subcategory");
          return (
            <details key={category} className="mb-6">
              <summary className="cursor-pointer bg-slate-800 px-4 py-2 font-semibold text-sm lg:text-xl text-red-500 rounded">
                {category}
              </summary>
              <AnimatePresence>
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={detailsVar}
                  className="px-4 pt-4 bg-red-50"
                >
                  {Object.entries(bySub).map(([sub, arr]) => (
                    <div key={sub} className="mb-4">
                      {sub && sub !== "Others" && (
                        <h3 className="text-lg lg:text-2xl font-medium text-indigo-400 mb-2">
                          {sub}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {arr.map((item) => (
                          <motion.div
                            key={item.id}
                            className="bg-white text-red-500 p-4 rounded shadow flex flex-col justify-between hover:scale-105 transition"
                            variants={itemVar}
                          >
                            <div>
                              <div className="flex justify-between">
                                <span className="font-semibold text-sm lg:text-lg text-gray-900">
                                  {item.item_name}
                                </span>
                                <span className="font-bold text-indigo-400">
                                  €{parseFloat(item.price).toFixed(2)}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-gray-500 mt-1 text-xs lg:text-sm">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <QuantityControl item={item} disabled={false} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </details>
          );
        })
      )}
    </div>
  );
}
