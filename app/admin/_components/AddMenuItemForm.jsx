"use client";

import { useState, useTransition } from "react";
import { addMenuItem } from "@/app/_lib/actions";

// Define a mapping for categories to subcategories
const categoryOptions = {
  Appetizers: ["Cold", "Hot"],
  "Main Course": ["Vegetarian", "Non-Vegetarian", "Vegan"],
  Desserts: [], // No predefined subcategories
  Beverages: ["Soft Drinks", "Alcoholic"],
};

export default function AddMenuItemForm({ onClose, onAdded }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Basic client-side validation
    const itemName = formData.get("item_name");
    const price = formData.get("price");
    const category = formData.get("category");
    if (!itemName || !price || isNaN(price) || !category) {
      setMessage("Please fill in all required fields correctly.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await addMenuItem(formData);
        setMessage(result.message);
        // Optionally refresh the list of items via a callback
        if (onAdded) onAdded();
        // Close the form after a successful add
        onClose();
      } catch (err) {
        setMessage("Failed to add item: " + err.message);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg mb-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-200">
        Add New Menu Item
      </h2>

      <div className="mb-4">
        <label className="block text-base font-medium text-gray-200 mb-1">
          Item Name
        </label>
        <input
          type="text"
          name="item_name"
          className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-base font-medium text-gray-200 mb-1">
          Price (€)
        </label>
        <input
          type="number"
          step="0.01"
          name="price"
          className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-base font-medium text-gray-200 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows="4"
          className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-base font-medium text-gray-200 mb-1">
          Category
        </label>
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {Object.keys(categoryOptions).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory &&
        categoryOptions[selectedCategory] &&
        categoryOptions[selectedCategory].length > 0 && (
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-200 mb-1">
              Subcategory
            </label>
            <select
              name="subcategory"
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Subcategory</option>
              {categoryOptions[selectedCategory].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

      <div className="flex justify-end items-center space-x-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition duration-200 ease-in-out"
        >
          {isPending ? "Adding..." : "Add Item"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded transition duration-200 ease-in-out"
        >
          Cancel
        </button>
      </div>

      {message && (
        <div className="mt-4 text-center text-green-500">{message}</div>
      )}
    </form>
  );
}
