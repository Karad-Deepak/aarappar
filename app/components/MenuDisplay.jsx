"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import QuantityControl from "./QuantityControl";
import { toTitleCase } from "@/app/utils/string";
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

// Normalize soldout value to boolean
function isSoldout(value) {
  return value === true || value === "true";
}

// Extract leading number from item name for sorting
function extractItemNumber(itemName) {
  const match = itemName.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

// Sort items by their leading number
function sortItemsByNumber(items) {
  return [...items].sort((a, b) => {
    const numA = extractItemNumber(a.item_name);
    const numB = extractItemNumber(b.item_name);
    return numA - numB;
  });
}

// Normalize category strings to improve matching between DB and desired order
function normalizeCategoryLabel(label) {
  if (!label) return "";
  let s = String(label).toLowerCase();
  s = s.replace(/[–—]/g, "-"); // unify dashes
  s = s.replace(/\s*\|\s*/g, " | "); // normalize pipe spacing
  s = s.replace(/\s+/g, " ").trim(); // collapse spaces
  return s;
}

export default function MenuDisplay({ menudata }) {
  const [searchTerm, setSearchTerm] = useState("");

  // show all items, including sold-out ones
  const filtered = menudata.filter((item) =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // group by category (including sold-out items)
  const byCat = groupBy(menudata, "category");

  // refined user-friendly order
  const categoryOrder = [
    "Soups",
    "Vorspeisen | Appetizers – Vegetarisch",
    "Eier Vorspeisen | Egg Appetizers",
    "Vorspeisen | Appetizers – Non Vegetarisch",
    "Our Dosa Specials (knusprige, Gefüllte Reis-Crepes aus Südindien) (nur am Abends | Only in the Evenings)",
    "Our Steam Specials / Unsere Dampf-Spezialitäten (nur am Abends | Only in the Evenings)",
    "Vegetarische & Vegan Curries",
    "Non-Vegetarische Curries",
    "Rice & Biryani",
    "Parotta (unsere Parotta-Spezialitäten) (nur am Abends | Only in the Evenings)",
    "Indian Breads (nur am Abends | Only in the Evenings)",
    "Kids Menu",
    "Soft Drinks",
    "Dessert",
  ];

  const categoryOrderNormalized = categoryOrder.map(normalizeCategoryLabel);
  const categorySynonyms = [
    ["soup", "soups"],
    ["egg", "eier", "egg appetizers"],
    ["vegetarisch", "veg appetizers", "vegetarian appetizers"],
    ["non vegetarisch", "non-vegetarisch", "non vegetarian appetizers"],
    ["dosa", "dosa specials"],
    ["steam", "steamed", "dampf", "dampf-spezialitäten", "steam specials"],
    ["vegetarische", "vegan", "veg curries", "vegetarian curries"],
    [
      "non-vegetarische",
      "non vegetarische",
      "non veg curries",
      "non vegetarian curries",
    ],
    ["biryani", "rice"],
    ["parotta"],
    ["indian breads", "breads", "bread", "naan", "roti"],
    ["kids"],
    ["drinks", "soft drinks"],
    ["dessert", "desserts"],
  ].map((arr) => arr.map(normalizeCategoryLabel));

  function getPriorityIndexFor(category) {
    const n = normalizeCategoryLabel(category);
    let idx = categoryOrderNormalized.indexOf(n);
    if (idx !== -1) return idx;
    for (let i = 0; i < categoryOrderNormalized.length; i++) {
      const target = categoryOrderNormalized[i];
      if (n.includes(target) || target.includes(n)) return i;
    }
    for (let i = 0; i < categorySynonyms.length; i++) {
      const synonyms = categorySynonyms[i];
      for (let k = 0; k < synonyms.length; k++) {
        if (n.includes(synonyms[k])) return i;
      }
    }
    return Number.MAX_SAFE_INTEGER;
  }

  const presentCategories = Object.keys(byCat);
  const sortedCats = presentCategories
    .map((c, i) => ({ name: c, i, p: getPriorityIndexFor(c) }))
    .sort((a, b) => (a.p === b.p ? a.i - b.i : a.p - b.p))
    .map((x) => x.name);

  // Hide categories where every item is sold out
  const visibleCats = sortedCats.filter((c) =>
    (byCat[c] || []).some((item) => !isSoldout(item.soldout))
  );

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
          <h1 className="text-4xl font-bold text-primary">Menu</h1>
          <p className="text-gray-950 hidden lg:block">
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
          {sortItemsByNumber(filtered).map((item) => (
            <motion.div
              key={item.id}
              className={`bg-white text-red-500 p-4 rounded shadow flex flex-col justify-between transition ${
                item.soldout ? "opacity-60 hover:scale-100" : "hover:scale-105"
              }`}
              variants={itemVar}
            >
              <div>
                <div className="flex justify-between">
                  <span
                    className={`font-semibold text-lg ${
                      item.soldout
                        ? "text-gray-500 line-through"
                        : "text-gray-950"
                    }`}
                  >
                    {item.item_name}
                    {item.soldout && (
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        SOLD OUT
                      </span>
                    )}
                  </span>
                  <span
                    className={`font-bold ${
                      item.soldout ? "text-gray-400" : "text-indigo-700"
                    }`}
                  >
                    €{parseFloat(item.price).toFixed(2)}
                  </span>
                </div>
                {item.description && (
                  <p
                    className={`mt-1 text-sm ${
                      item.soldout ? "text-gray-400" : "text-gray-400"
                    }`}
                  >
                    {item.description}
                  </p>
                )}
              </div>
              <QuantityControl item={item} disabled={item.soldout} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        visibleCats.map((category) => {
          const items = byCat[category];
          const bySub = groupBy(items, "subcategory");
          return (
            <details key={category} className="mb-6">
              <summary className="cursor-pointer bg-slate-100 px-4 py-2 font-semibold text-lg lg:text-xl text-normalbg rounded">
                {toTitleCase(category)}
              </summary>
              <AnimatePresence>
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={detailsVar}
                  className="px-4 pt-4 "
                >
                  {Object.entries(bySub).map(([sub, arr]) => (
                    <div key={sub} className="mb-4">
                      {sub && sub !== "Others" && (
                        <h3 className="text-lg lg:text-xl font-medium text-indigo-800 mb-2">
                          {sub}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sortItemsByNumber(arr).map((item) => (
                          <motion.div
                            key={item.id}
                            className={`bg-white text-red-500 p-4 rounded shadow flex flex-col justify-between transition ${
                              item.soldout
                                ? "opacity-60 hover:scale-100"
                                : "hover:scale-105"
                            }`}
                            variants={itemVar}
                          >
                            <div>
                              <div className="flex justify-between">
                                <span
                                  className={`font-semibold text-sm lg:text-lg ${
                                    item.soldout
                                      ? "text-gray-500 "
                                      : "text-gray-900"
                                  }`}
                                >
                                  {item.item_name}
                                  {item.soldout && (
                                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                      Unavailable
                                    </span>
                                  )}
                                </span>
                                <span
                                  className={`font-bold ${
                                    item.soldout
                                      ? "text-gray-400"
                                      : "text-indigo-800"
                                  }`}
                                >
                                  €{parseFloat(item.price).toFixed(2)}
                                </span>
                              </div>
                              {item.description && (
                                <p
                                  className={`mt-1 text-xs lg:text-sm ${
                                    item.soldout
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <QuantityControl
                              item={item}
                              disabled={item.soldout}
                            />
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
