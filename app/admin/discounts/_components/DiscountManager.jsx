"use client";

import { useState } from "react";
import {
  createDiscount,
  updateDiscount,
  toggleDiscountActive,
  deleteDiscount,
} from "@/app/lib/actions";
import { FiTrash2, FiEdit2, FiCheck, FiX, FiPercent, FiTag } from "react-icons/fi";

const CATEGORY_SHORT_NAMES = {
  Soups: "Soups",
  "Vorspeisen | Appetizers – Vegetarisch": "Veg Appetizers",
  "Eier Vorspeisen | Egg Appetizers": "Egg Appetizers",
  "Vorspeisen | Appetizers – Non Vegetarisch": "Non-Veg Appetizers",
  "Our Dosa Specials (knusprige, Gefüllte Reis-Crepes aus Südindien) (nur am Abends | Only in the Evenings)":
    "Dosa Specials",
  "Our Steam Specials / Unsere Dampf-Spezialitäten (nur am Abends | Only in the Evenings)":
    "Steam Specials",
  "Vegetarische & Vegan Curries": "Veg Curries",
  "Non-Vegetarische Curries": "Non-Veg Curries",
  "Rice & Biryani": "Rice & Biryani",
  "Parotta (unsere Parotta-Spezialitäten) (nur am Abends | Only in the Evenings)":
    "Parotta",
  "Indian Breads (nur am Abends | Only in the Evenings)": "Indian Breads",
  "Kids Menu": "Kids Menu",
  "Soft Drinks": "Soft Drinks",
  Dessert: "Dessert",
};

function getShortCategoryName(category) {
  return CATEGORY_SHORT_NAMES[category] || category;
}

export default function DiscountManager({ discounts, categories, menuItems }) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "percentage",
    value: "",
    applies_to: "all",
    categories: [],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "percentage",
      value: "",
      applies_to: "all",
      categories: [],
    });
    setIsCreating(false);
    setEditingId(null);
    setShowPreview(false);
    setError("");
  };

  const handleEdit = (discount) => {
    setFormData({
      name: discount.name,
      type: discount.type,
      value: discount.value.toString(),
      applies_to: discount.applies_to,
      categories: discount.categories || [],
    });
    setEditingId(discount.id);
    setIsCreating(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();
      if (editingId) submitData.append("id", editingId);
      submitData.append("name", formData.name);
      submitData.append("type", formData.type);
      submitData.append("value", formData.value);
      submitData.append("applies_to", formData.applies_to);
      submitData.append("categories", JSON.stringify(formData.categories));

      if (editingId) {
        await updateDiscount(submitData);
      } else {
        await createDiscount(submitData);
      }

      resetForm();
    } catch (err) {
      setError(err.message || "Failed to save discount");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id, currentActive) => {
    setLoading(true);
    try {
      await toggleDiscountActive(id, !currentActive);
    } catch (err) {
      setError(err.message || "Failed to toggle discount");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this discount?")) return;

    setLoading(true);
    try {
      await deleteDiscount(id);
    } catch (err) {
      setError(err.message || "Failed to delete discount");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  // Calculate preview prices
  const getPreviewItems = () => {
    if (!formData.value || isNaN(parseFloat(formData.value))) return [];

    const value = parseFloat(formData.value);

    return menuItems
      .filter((item) => {
        if (formData.applies_to === "all") return true;
        return formData.categories.some((cat) => {
          const normalizedItemCat = item.category?.toLowerCase() || "";
          const normalizedCat = cat.toLowerCase();
          return (
            normalizedItemCat.includes(normalizedCat) ||
            normalizedCat.includes(normalizedItemCat)
          );
        });
      })
      .map((item) => {
        const originalPrice = parseFloat(item.price);
        let discountedPrice;

        if (formData.type === "percentage") {
          discountedPrice = originalPrice * (1 - value / 100);
        } else {
          discountedPrice = originalPrice - value;
        }

        return {
          ...item,
          originalPrice,
          discountedPrice: Math.max(0, discountedPrice),
        };
      })
      .slice(0, 10); // Show only first 10 for preview
  };

  const activeDiscount = discounts.find((d) => d.active);

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 px-5 py-4 rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* Active Discount Banner */}
      {activeDiscount && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <FiPercent size={20} />
              </div>
              <div>
                <span className="text-green-900 font-bold text-lg">
                  Active Discount:{" "}
                </span>
                <span className="text-green-800 font-semibold">
                  {activeDiscount.name} -{" "}
                  {activeDiscount.type === "percentage"
                    ? `${activeDiscount.value}%`
                    : `€${parseFloat(activeDiscount.value).toFixed(2)}`}{" "}
                  off
                </span>
                <p className="text-green-700 text-sm font-medium mt-0.5">
                  {activeDiscount.applies_to === "categories"
                    ? `Applied to: ${activeDiscount.categories
                        .map(getShortCategoryName)
                        .join(", ")}`
                    : "Applied to all items"}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleActive(activeDiscount.id, true)}
              className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
              disabled={loading}
            >
              Deactivate
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Form */}
      {isCreating ? (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editingId ? "Edit Discount" : "Create New Discount"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-base font-bold text-gray-700 mb-2">
                Discount Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Summer Sale, Weekend Special"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 font-medium text-gray-800 transition-colors"
                required
              />
            </div>

            {/* Type Toggle */}
            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                Discount Type
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all font-semibold ${
                    formData.type === "percentage"
                      ? "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="percentage"
                    checked={formData.type === "percentage"}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="sr-only"
                  />
                  <FiPercent size={18} />
                  <span>Percentage (%)</span>
                </label>
                <label
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all font-semibold ${
                    formData.type === "fixed"
                      ? "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="fixed"
                    checked={formData.type === "fixed"}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="sr-only"
                  />
                  <FiTag size={18} />
                  <span>Fixed Amount (€)</span>
                </label>
              </div>
            </div>

            {/* Value */}
            <div>
              <label className="block text-base font-bold text-gray-700 mb-2">
                {formData.type === "percentage"
                  ? "Percentage Off"
                  : "Amount Off (€)"}
              </label>
              <div className="relative w-56">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={formData.type === "percentage" ? "100" : "1000"}
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  placeholder={formData.type === "percentage" ? "10" : "2.50"}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 font-bold text-xl text-gray-800 transition-colors"
                  required
                />
                <span className="absolute right-4 top-3.5 text-gray-500 font-bold text-lg">
                  {formData.type === "percentage" ? "%" : "€"}
                </span>
              </div>
            </div>

            {/* Apply To */}
            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                Apply To
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all font-semibold ${
                    formData.applies_to === "all"
                      ? "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="applies_to"
                    value="all"
                    checked={formData.applies_to === "all"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        applies_to: e.target.value,
                        categories: [],
                      })
                    }
                    className="sr-only"
                  />
                  <span>All Items</span>
                </label>
                <label
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all font-semibold ${
                    formData.applies_to === "categories"
                      ? "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="applies_to"
                    value="categories"
                    checked={formData.applies_to === "categories"}
                    onChange={(e) =>
                      setFormData({ ...formData, applies_to: e.target.value })
                    }
                    className="sr-only"
                  />
                  <span>Select Categories</span>
                </label>
              </div>
            </div>

            {/* Category Selection */}
            {formData.applies_to === "categories" && (
              <div>
                <label className="block text-base font-bold text-gray-700 mb-3">
                  Select Categories
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-3 border-2 border-gray-200 rounded-xl bg-gray-50">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all font-medium ${
                        formData.categories.includes(category)
                          ? "bg-rose-100 border-2 border-rose-300 text-rose-800"
                          : "bg-white border-2 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="mr-2 w-4 h-4 accent-rose-500"
                      />
                      <span className="text-sm">
                        {getShortCategoryName(category)}
                      </span>
                    </label>
                  ))}
                </div>
                {formData.categories.length === 0 && (
                  <p className="text-red-600 text-sm font-semibold mt-2">
                    Please select at least one category
                  </p>
                )}
              </div>
            )}

            {/* Preview Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-blue-600 hover:text-blue-800 font-bold underline underline-offset-2"
              >
                {showPreview ? "Hide Preview" : "Preview Price Changes"}
              </button>
            </div>

            {/* Preview Section */}
            {showPreview && (
              <div className="border-2 border-gray-200 rounded-xl p-5 bg-gray-50">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  Price Preview (First 10 items)
                </h3>
                {getPreviewItems().length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {getPreviewItems().map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200"
                      >
                        <span className="truncate mr-4 font-medium text-gray-800">
                          {item.item_name}
                        </span>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-gray-400 line-through font-medium">
                            €{item.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-green-600 font-bold text-lg">
                            €{item.discountedPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 font-medium">
                    Enter a discount value to see preview
                  </p>
                )}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={
                  loading ||
                  (formData.applies_to === "categories" &&
                    formData.categories.length === 0)
                }
                className="px-8 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-md transition-colors"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Discount"
                  : "Create Discount"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 font-bold text-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="px-8 py-4 bg-rose-500 text-white rounded-xl hover:bg-rose-600 font-bold text-lg shadow-md transition-colors flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Create New Discount
        </button>
      )}

      {/* Existing Discounts List */}
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden">
        <h2 className="text-xl font-bold p-5 border-b-2 border-gray-200 bg-gray-50">
          All Discounts
        </h2>

        {discounts.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-medium">
            No discounts created yet. Create your first discount above.
          </div>
        ) : (
          <div className="divide-y-2 divide-gray-100">
            {discounts.map((discount) => (
              <div
                key={discount.id}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  discount.active ? "bg-green-50" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-gray-800">
                      {discount.name}
                    </span>
                    {discount.active && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1.5 font-medium">
                    <span className="font-bold text-gray-800">
                      {discount.type === "percentage"
                        ? `${discount.value}% off`
                        : `€${parseFloat(discount.value).toFixed(2)} off`}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span>
                      {discount.applies_to === "all"
                        ? "All items"
                        : `Categories: ${discount.categories
                            .map(getShortCategoryName)
                            .join(", ")}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Toggle Active Button */}
                  <button
                    onClick={() =>
                      handleToggleActive(discount.id, discount.active)
                    }
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                      discount.active
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {discount.active ? (
                      <>
                        <FiX size={16} /> Deactivate
                      </>
                    ) : (
                      <>
                        <FiCheck size={16} /> Activate
                      </>
                    )}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(discount)}
                    disabled={loading}
                    className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <FiEdit2 size={20} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(discount.id)}
                    disabled={loading}
                    className="p-2.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
