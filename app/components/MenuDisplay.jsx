"use client";

import { motion } from "framer-motion";

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
  // Group items by category
  const groupedByCategory = groupBy(menudata, "category");

  // Framer Motion variants for container and item animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8 lg:mt-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-normalbg">
        Menu
      </h1>
      {Object.entries(groupedByCategory).map(([category, items]) => {
        // Group items by subcategory within each category
        const groupedBySub = groupBy(items, "subcategory");
        return (
          <motion.div
            key={category}
            className="mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2 className="text-xl lg:text-3xl font-semibold border-b-2 border-gray-200 pb-2 mb-6 text-normalbg">
              {category}
            </h2>
            {Object.entries(groupedBySub).map(([subcategory, subItems]) => (
              <div key={subcategory} className="mb-6">
                {subcategory &&
                  subcategory.trim() !== "" &&
                  subcategory.toLowerCase() !== "others" && (
                    <h3 className="text-lg lg:text-2xl font-medium text-gray-700 mb-4">
                      {subcategory}
                    </h3>
                  )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subItems.map((item) => (
                    <motion.div
                      key={item.item_name}
                      className="p-4 border rounded-lg shadow hover:shadow-lg transition duration-300"
                      variants={itemVariants}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm lg:text-xl font-semibold">
                          {item.item_name}
                        </h4>
                        <span className="text-s lg:text-lg font-bold text-green-600">
                          €{parseFloat(item.price).toFixed(2)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-2 text-gray-600 text-xs lg:text-lg">
                          {item.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}
