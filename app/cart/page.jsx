"use client";

import { useState, useTransition } from "react";
import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/lib/actions";
import Nav from "../components/Nav";
import { motion } from "framer-motion";

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

    if (!customerName.trim()) {
      errors.customerName = "Name is required.";
    } else if (customerName.trim().length < 2) {
      errors.customerName = "Name must be at least 2 characters.";
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required.";
    } else if (!/^\+?\d{7,15}$/.test(phone.trim())) {
      errors.phone = "Invalid phone number.";
    }

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

  if (cart.length === 0) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-lightbg px-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-darkbg">
              Your cart is empty.
            </h1>
            <p className="text-base sm:text-lg text-darkbg">
              Please add some items to your cart before placing an order.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <motion.div
        className="min-h-screen bg-lightbg py-8 px-4 flex flex-col items-center mt-5 lg:mt-7"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 sm:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-darkbg">
            Your Cart
          </h1>
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-2 sm:mb-0">
                  <p className="font-semibold text-lg sm:text-xl text-darkbg">
                    {item.item_name}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 ">
                    Quantity: {item.quantity} x €
                    {parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-rose-500 hover:underline text-sm sm:text-base"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-xl sm:text-2xl font-bold text-darkbg ">
            Total Price: €{totalPrice.toFixed(2)}
          </div>
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-darkbg mb-4">
              Checkout
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-base sm:text-lg text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 sm:p-3 md:p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
                {errors.customerName && (
                  <p className="text-normalbg text-sm mt-1">
                    {errors.customerName}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-base sm:text-lg text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 sm:p-3 md:p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
                {errors.phone && (
                  <p className="text-normalbg text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-base sm:text-lg text-gray-700">
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 sm:p-3 md:p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  rows="3"
                  required
                ></textarea>
                {errors.address && (
                  <p className="text-normalbg text-sm mt-1">{errors.address}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="mt-4 w-full px-4 py-3 bg-red-900 hover:bg-rose-600 text-white font-semibold rounded transition duration-200"
              >
                {isPending ? "Submitting Order..." : "Submit Order"}
              </button>
            </form>
            {message && (
              <p className="mt-4 text-green-500 text-base sm:text-lg">
                {message}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
