// components/CartBottomBar.jsx
"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function CartBottomBar() {
  const { cart } = useCart();
  const router = useRouter();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [showOptions, setShowOptions] = useState(false);

  // If no items in cart, hide the bar
  if (totalItems === 0) return null;

  const handleProceedClick = () => {
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    setShowOptions(false);
    if (option === "delivery") {
      router.push("/cart");
    } else if (option === "pickup") {
      router.push("/pickup");
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-red-600 text-white p-4 flex justify-between items-center z-50">
        <span className="font-semibold pl-2 lg:pl-10">
          {totalItems} item{totalItems > 1 ? "s" : ""} in cart
        </span>
        <button
          onClick={handleProceedClick}
          className="bg-white text-normalbg font-bold px-4 py-2 rounded"
        >
          Proceed to Cart
        </button>
      </div>

      {showOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Choose Order Type
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleOptionClick("pickup")}
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Pickup
              </button>
            </div>
            <button
              onClick={() => setShowOptions(false)}
              className="mt-4 text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
