"use client";

import { useState, useMemo, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewMenu({ menuItems, addMenuItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Extract unique categories from the provided menuItems.
  const categories = useMemo(() => {
    return Array.from(new Set(menuItems.map((item) => item.category)));
  }, [menuItems]);

  // Derive subcategories for the selected category.
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const filtered = menuItems.filter(
      (item) => item.category === selectedCategory
    );
    return Array.from(
      new Set(filtered.map((item) => item.subcategory).filter(Boolean))
    );
  }, [selectedCategory, menuItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const result = await addMenuItem(formData);
        setMessage(result.message);
        setSubmitted(true);
      } catch (error) {
        setMessage(error.message);
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessage("");
    setSubmitted(false);
    setSelectedCategory("");
  };

  return (
    <div className=" flex flex-col justify-center">
      <button
        onClick={() => {
          // Toggle form open/close; if already open, close it.
          isOpen ? handleClose() : setIsOpen(true);
        }}
        className=" mb-4 mx-auto px-4 py-2 m bg-red-900 hover:bg-normalbg text-white font-semibold rounded transition duration-200 ease-in-out"
      >
        {isOpen ? "Close Form" : "Add New Menu Item"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
              {submitted ? (
                <div className="text-center">
                  <p className="mb-4 text-green-600">{message}</p>
                  <button
                    onClick={handleClose}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200 ease-in-out"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} method="POST">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Add New Menu Item
                  </h2>
                  {message && (
                    <p className="mb-4 text-red-600 text-center">{message}</p>
                  )}
                  <div className="mb-4">
                    <label className="block text-base font-medium text-gray-900 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      name="item_name"
                      required
                      className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium text-gray-900 mb-1">
                      Price (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      required
                      className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium text-gray-900 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium text-gray-900 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      required
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  {subcategories.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-base font-medium text-gray-900 mb-1">
                        Subcategory
                      </label>
                      <select
                        name="subcategory"
                        required
                        className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" disabled>
                          Select subcategory
                        </option>
                        {subcategories.map((subcat) => (
                          <option key={subcat} value={subcat}>
                            {subcat}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex justify-end items-center space-x-2">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition duration-200 ease-in-out"
                    >
                      {isPending ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded transition duration-200 ease-in-out"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
