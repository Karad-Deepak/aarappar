"use client";

import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";

export default function PickupPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  // Calculate the total bill based on each item's price and quantity
  const totalBill = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  // Handle order submission (simulate order submission)
  const handleSubmitOrder = () => {
    // Here you would typically send the order data to your backend
    // For demonstration, we clear the cart and navigate to an order confirmation page
    clearCart();
    router.push("/order-success");
  };

  // If there are no items in the cart, show a message instead
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p>Please add some items to your cart before placing an order.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-lightbg">
      <h1 className="text-3xl font-bold mb-6">Pickup Order</h1>
      {/* Display Cart Items */}
      <div className="mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.item_name}</h2>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="text-lg font-bold">
              €{(parseFloat(item.price) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      {/* Display Total Bill */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Total:</h2>
        <span className="text-2xl font-bold">€{totalBill.toFixed(2)}</span>
      </div>
      {/* Submit Order Button */}
      <button
        onClick={handleSubmitOrder}
        className="w-full bg-normalbg text-white font-bold py-3 rounded hover:bg-blue-700 transition"
      >
        Submit Order
      </button>
    </div>
  );
}
