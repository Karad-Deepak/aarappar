"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DiscountContext = createContext();

// Normalize category for matching
function normalizeCategory(category) {
  if (!category) return "";
  return String(category)
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

// Check if a category matches any in the discount's category list
function categoryMatches(itemCategory, discountCategories) {
  if (!itemCategory || !discountCategories || discountCategories.length === 0) {
    return false;
  }

  const normalizedItemCat = normalizeCategory(itemCategory);

  return discountCategories.some((discountCat) => {
    const normalizedDiscountCat = normalizeCategory(discountCat);
    // Check if either contains the other (for partial matches like "Curries" matching "Vegetarische & Vegan Curries")
    return (
      normalizedItemCat.includes(normalizedDiscountCat) ||
      normalizedDiscountCat.includes(normalizedItemCat)
    );
  });
}

export function DiscountProvider({ children, initialDiscount = null }) {
  const [activeDiscount, setActiveDiscount] = useState(initialDiscount);

  // Calculate discounted price based on active discount
  const calculateDiscountedPrice = (originalPrice, category) => {
    if (!activeDiscount) return originalPrice;

    const price = parseFloat(originalPrice);

    // Check if discount applies to this category
    if (activeDiscount.applies_to === "categories") {
      if (!categoryMatches(category, activeDiscount.categories)) {
        return price;
      }
    }

    // Apply discount
    if (activeDiscount.type === "percentage") {
      const discountAmount = price * (activeDiscount.value / 100);
      return Math.max(0, price - discountAmount);
    } else {
      // Fixed amount
      return Math.max(0, price - activeDiscount.value);
    }
  };

  // Check if discount applies to a category
  const hasDiscount = (category) => {
    if (!activeDiscount) return false;

    if (activeDiscount.applies_to === "all") return true;

    return categoryMatches(category, activeDiscount.categories);
  };

  // Get discount description string (e.g., "10%" or "€2.50")
  const getDiscountLabel = () => {
    if (!activeDiscount) return "";

    if (activeDiscount.type === "percentage") {
      return `${activeDiscount.value}%`;
    } else {
      return `€${parseFloat(activeDiscount.value).toFixed(2)}`;
    }
  };

  // Calculate total savings for a cart
  const calculateTotalSavings = (cartItems) => {
    if (!activeDiscount || !cartItems || cartItems.length === 0) return 0;

    return cartItems.reduce((total, item) => {
      const originalPrice = parseFloat(item.original_price || item.price);
      const discountedPrice = calculateDiscountedPrice(
        originalPrice,
        item.category
      );
      const savings = (originalPrice - discountedPrice) * (item.quantity || 1);
      return total + savings;
    }, 0);
  };

  return (
    <DiscountContext.Provider
      value={{
        activeDiscount,
        setActiveDiscount,
        calculateDiscountedPrice,
        hasDiscount,
        getDiscountLabel,
        calculateTotalSavings,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
}

export function useDiscount() {
  const context = useContext(DiscountContext);
  if (!context) {
    // Return default values if used outside provider
    return {
      activeDiscount: null,
      calculateDiscountedPrice: (price) => price,
      hasDiscount: () => false,
      getDiscountLabel: () => "",
      calculateTotalSavings: () => 0,
    };
  }
  return context;
}
