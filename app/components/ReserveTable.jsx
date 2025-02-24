"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { submitReservation } from "@/app/_lib/actions"; // Adjust the path as needed

export default function ReserveTable() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    datetime: "",
    guests: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required.";
    if (!formData.datetime) newErrors.datetime = "Date & Time is required.";
    if (!formData.guests || Number(formData.guests) < 1)
      newErrors.guests = "At least one guest is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build FormData object from state
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("datetime", formData.datetime);
    data.append("guests", formData.guests);
    data.append("message", formData.message);

    startTransition(async () => {
      try {
        await submitReservation(data);
        setFeedback("Your reservation has been successfully submitted!");
        // Reset form data
        setFormData({
          name: "",
          phone: "",
          datetime: "",
          guests: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        console.error(error);
        setFeedback(
          "There was an error submitting your reservation. Please try again later."
        );
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-12">
      <div className="max-w-3xl w-full p-8 bg-gray-900 rounded-2xl shadow-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-normalbg mb-6"
        >
          Reserve Your Table
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-center mb-8"
        >
          Book a table in advance to ensure a wonderful dining experience.
        </motion.p>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="datetime" className="block text-gray-300 mb-2">
              Date & Time
            </label>
            <input
              id="datetime"
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
            />
            {errors.datetime && (
              <p className="mt-1 text-sm text-red-500">{errors.datetime}</p>
            )}
          </div>

          <div>
            <label htmlFor="guests" className="block text-gray-300 mb-2">
              Number of Guests
            </label>
            <input
              id="guests"
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter number of guests"
            />
            {errors.guests && (
              <p className="mt-1 text-sm text-red-500">{errors.guests}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Any special requests or additional information"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              rows="4"
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full p-3 rounded-lg bg-normalbg text-white font-semibold text-lg hover:bg-rose-600 transition"
          >
            {isPending ? "Reserving..." : "Reserve Now"}
          </button>
        </form>
        {feedback && (
          <div className="mt-4 text-center text-green-500 font-medium">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
