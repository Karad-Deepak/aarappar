"use client";

import { useCart } from "./CartContext";

// Helper to check if discount applies to a category
function categoryMatchesDiscount(itemCategory, discount) {
  if (!discount) return false;
  if (discount.applies_to === "all") return true;
  if (!discount.categories || discount.categories.length === 0) return false;

  const normalizedItemCat = (itemCategory || "").toLowerCase();
  return discount.categories.some((cat) => {
    const normalizedCat = cat.toLowerCase();
    return (
      normalizedItemCat.includes(normalizedCat) ||
      normalizedCat.includes(normalizedItemCat)
    );
  });
}

// Calculate discounted price
function calculateDiscountedPrice(originalPrice, discount) {
  if (!discount) return originalPrice;
  const price = parseFloat(originalPrice);

  if (discount.type === "percentage") {
    return Math.max(0, price * (1 - discount.value / 100));
  } else {
    return Math.max(0, price - discount.value);
  }
}

export default function QuantityControl({ item, disabled = false, activeDiscount = null }) {
  const { cart, addToCart, decreaseQuantity } = useCart();
  const currentItem = cart.find((i) => i.id === item.id);
  const quantity = currentItem ? currentItem.quantity : 0;

  const handleAdd = () => {
    if (!disabled) {
      // Calculate if discount applies and the discounted price
      const hasDiscount = categoryMatchesDiscount(item.category, activeDiscount);
      const originalPrice = parseFloat(item.price);
      const discountedPrice = hasDiscount
        ? calculateDiscountedPrice(originalPrice, activeDiscount)
        : originalPrice;

      // Add item with both original and discounted price info
      const itemWithDiscount = {
        ...item,
        original_price: originalPrice,
        price: discountedPrice,
        discount_applied: hasDiscount
          ? activeDiscount.type === "percentage"
            ? `${activeDiscount.value}%`
            : `€${activeDiscount.value}`
          : null,
      };

      addToCart(itemWithDiscount);
    }
  };

  const handleDecrease = () => {
    if (!disabled) {
      decreaseQuantity(item.id);
    }
  };

  // If item is sold out, show sold out button
  if (disabled || item.soldout) {
    return (
      <div>
        <button
          disabled
          className="bg-gray-400 text-white font-bold py-1 px-3 rounded cursor-not-allowed opacity-60"
        >
          Sold Out
        </button>
      </div>
    );
  }

  return (
    <div>
      {quantity === 0 ? (
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-rose-600 text-white font-bold py-1 px-3 rounded transition duration-200"
        >
          Add
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrease}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded transition duration-200"
          >
            –
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={handleAdd}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded transition duration-200"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
