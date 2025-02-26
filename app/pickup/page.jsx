"use client";

import { useState } from "react";
import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";
import { createPickupOrder } from "@/app/_lib/actions";

export default function PickupPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  // Local state for customer details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate the total bill based on cart items
  const totalBill = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please provide your name and phone number.");
      return;
    }
    setIsSubmitting(true);

    // Create a FormData object to send to the server action
    const formData = new FormData();
    formData.append("customer_name", customerName);
    formData.append("phone", customerPhone);
    formData.append("items", JSON.stringify(cart));

    try {
      // Call the server action to create a pickup order in Supabase
      await createPickupOrder(formData);
      clearCart();
      router.push("/order-confirmation");
    } catch (error) {
      alert("Failed to submit order: " + error.message);
    }
    setIsSubmitting(false);
  };

  // If there are no items in the cart, display a message instead
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 bg-lightbg">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p>Please add some items to your cart before placing an order.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-lightbg">
      <h1 className="text-3xl font-bold mb-6">Pickup Order</h1>
      <form onSubmit={handleSubmit}>
        {/* Customer Details */}
        <div className="mb-6">
          <label
            htmlFor="customerName"
            className="block text-lg font-medium mb-2"
          >
            Your Name:
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <label
            htmlFor="customerPhone"
            className="block text-lg font-medium mb-2"
          >
            Your Phone Number:
          </label>
          <input
            type="tel"
            id="customerPhone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Cart Items */}
        <h2 className="text-2xl font-bold mb-4">Your Cart Items</h2>
        <div className="mb-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <h3 className="text-xl font-semibold">{item.item_name}</h3>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-lg font-bold">
                €{(parseFloat(item.price) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Total Bill */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Total:</h2>
          <span className="text-2xl font-bold">€{totalBill.toFixed(2)}</span>
        </div>

        {/* Submit Order Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-normalbg text-white font-bold py-3 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
}
