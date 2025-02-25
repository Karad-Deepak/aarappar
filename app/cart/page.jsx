"use client";

import { useState, useTransition } from "react";
import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/_lib/actions";
import Nav from "../components/Nav";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Calculate total price of cart items
  const totalPrice = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    // Validate customer name: required and minimum length
    if (!customerName.trim()) {
      errors.customerName = "Name is required.";
    } else if (customerName.trim().length < 2) {
      errors.customerName = "Name must be at least 2 characters.";
    }

    // Validate phone: required and match a basic pattern (allows optional '+' followed by 7-15 digits)
    if (!phone.trim()) {
      errors.phone = "Phone is required.";
    } else if (!/^\+?\d{7,15}$/.test(phone.trim())) {
      errors.phone = "Invalid phone number.";
    }

    // Validate address: required and minimum length
    if (!address.trim()) {
      errors.address = "Address is required.";
    } else if (address.trim().length < 5) {
      errors.address = "Address must be at least 5 characters.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

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
    <>
      <Nav />
      <div className="min-h-screen p-4 bg-lightbg text-darkbg mt-10 lg:mt-16">
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
            {/* Total Price Section */}
            <div className="mt-4 text-xl font-bold">
              Total Price: €{totalPrice.toFixed(2)}
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
                  {errors.customerName && (
                    <p className="text-normalbg text-sm mt-1">
                      {errors.customerName}
                    </p>
                  )}
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
                  {errors.phone && (
                    <p className="text-normalbg text-sm mt-1">{errors.phone}</p>
                  )}
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
                  {errors.address && (
                    <p className="text-normalbg text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-4 px-4 py-2 bg-normal hover:bg-rose-600 text-darkbg font-semibold rounded"
                >
                  {isPending ? "Submitting Order..." : "Submit Order"}
                </button>
              </form>
              {message && <p className="mt-4 text-green-400">{message}</p>}
            </div>
          </>
        )}
      </div>
    </>
  );
}
