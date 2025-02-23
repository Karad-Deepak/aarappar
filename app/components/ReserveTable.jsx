"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { submitReservation } from "@/app/_lib/actions"; // Adjust the path as needed

export default function ReserveTable() {
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    startTransition(async () => {
      try {
        await submitReservation(formData);
        setFeedback("Your reservation has been successfully submitted!");
        event.target.reset();
      } catch (error) {
        console.error(error);
        setFeedback(
          "There was an error submitting your reservation. Please try again later."
        );
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg text-white px-6 py-12">
      <div className="max-w-3xl w-full p-8 bg-darkbg rounded-2xl shadow-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-rose-500 mb-6"
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Date & Time</label>
            <input
              type="datetime-local"
              name="datetime"
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Number of Guests</label>
            <input
              type="number"
              name="guests"
              required
              min="1"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter number of guests"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              required
              placeholder="Any special requests or additional information"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full p-3 rounded-lg bg-rose-500 text-white font-semibold text-lg hover:bg-rose-600 transition"
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
