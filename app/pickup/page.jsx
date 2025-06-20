"use client";

import { useState } from "react";
import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";
import { createPickupOrder } from "@/app/lib/actions";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import RunnerBanner from "../components/RunnerBanner";

export default function PickupPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate the total bill based on cart items
  const totalBill = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Validate form inputs and return any errors
  const validateForm = () => {
    const newErrors = {};
    if (!customerName.trim()) {
      newErrors.customerName = "Name is required.";
    }
    if (!customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required.";
    } else {
      if (/[a-zA-Z]/.test(customerPhone)) {
        newErrors.customerPhone = "Phone number should contain only numbers.";
      } else if (!/^\+?[0-9]{10,15}$/.test(customerPhone)) {
        newErrors.customerPhone =
          "Please enter a valid phone number with 10 to 15 digits.";
      }
    }
    if (!customerEmail.trim()) {
      newErrors.customerEmail = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    // Create a FormData object to send to the server action
    const formData = new FormData();
    formData.append("customer_name", customerName);
    formData.append("phone", customerPhone);
    formData.append("email", customerEmail); // new field added here
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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Your cart is empty
        </h1>
        <p className="text-base sm:text-lg">
          Please add some items to your cart before placing an order.
        </p>
      </div>
    );
  }

  return (
    <>
      <RunnerBanner />
      <Nav />
      <motion.div
        className="container mt-8 lg:mt-12 mx-auto px-4 py-8 bg-lightbg min-h-screen flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center"
            variants={itemVariants}
          >
            Pickup Order
          </motion.h1>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 md:space-y-8"
            variants={staggerVariants}
          >
            {/* Customer Details */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              variants={itemVariants}
            >
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-1"
                >
                  Your Name:
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="text-white bg-gray-800 w-full p-2 sm:p-3 md:p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customerName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="customerPhone"
                  className="block text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-1"
                >
                  Your Phone Number:
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  pattern="^\+?[0-9]{10,15}$"
                  className="text-white w-full p-2 sm:p-3 md:p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-800"
                  required
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customerPhone}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="customerEmail"
                className="block text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-1"
              >
                Your Email:
              </label>
              <input
                type="email"
                id="customerEmail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter your email address"
                className="text-white bg-gray-800 w-full p-2 sm:p-3 md:p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerEmail}
                </p>
              )}
            </motion.div>

            {/* Cart Items */}
            <motion.div variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                Your Cart Items
              </h2>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-1"
                    variants={itemVariants}
                  >
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                        {item.item_name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                      €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Total Bill */}
            <motion.div
              className="flex justify-between items-center border-t pt-2 sm:pt-4"
              variants={itemVariants}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Total:
              </h2>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                €{totalBill.toFixed(2)}
              </span>
            </motion.div>
            <p className="text-normalbg font-semibold text-lg p-3">
              NOTE: Currently we are accepting cash only and timing starts from
              18.00 onwords only
            </p>

            {/* Submit Order Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-900 text-white font-bold py-2 sm:py-3 md:py-4 rounded hover:bg-red-950 transition duration-200"
              variants={itemVariants}
            >
              {isSubmitting ? "Submitting..." : "Submit Order"}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
}
