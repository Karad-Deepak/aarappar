"use client";

import { useState, useTransition } from "react";
import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/_lib/actions";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderItems = JSON.stringify(cart);
    const formData = new FormData();
    formData.append("customer_name", customerName);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("items", orderItems);

    startTransition(async () => {
      try {
        const result = await createOrder(formData);
        setMessage(result.message);
        clearCart();
        router.push("/order-confirmation");
      } catch (error) {
        setMessage("Order submission failed: " + error.message);
      }
    });
  };

  return (
    <div className="min-h-screen p-4 bg-lightbg text-darkbg">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 border rounded"
              >
                <div>
                  <p className="font-semibold">{item.item_name}</p>
                  <p className="text-sm">
                    Quantity: {item.quantity} x €
                    {parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-rose-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="mt-4 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded"
              >
                {isPending ? "Submitting Order..." : "Submit Order"}
              </button>
            </form>
            {message && <p className="mt-4 text-green-400">{message}</p>}
          </div>
        </>
      )}
    </div>
  );
}
