// components/CartBottomBar.jsx
"use client";

import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function CartBottomBar() {
  const { cart } = useCart();
  const router = useRouter();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // If no items in cart, hide the bar
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-rose-500 text-white p-4 flex justify-between items-center z-50">
      <span className="font-semibold pl-2 lg:pl-10">
        {totalItems} item{totalItems > 1 ? "s" : ""} in cart
      </span>
      <button
        onClick={() => router.push("/cart")}
        className="bg-white text-rose-500 font-bold px-4 py-2 rounded"
      >
        Proceed to Cart
      </button>
    </div>
  );
}
