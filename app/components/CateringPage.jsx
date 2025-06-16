"use client";

import { motion } from "framer-motion";
import { submitEnquiry } from "@/app/lib/actions"; // Adjust the path as needed
import { useState, useTransition } from "react";

export default function CateringPage() {
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    startTransition(async () => {
      try {
        await submitEnquiry(formData);
        setFeedback("Your message has been sent successfully!");
        event.target.reset();
      } catch (error) {
        console.error(error);
        setFeedback(
          "There was an error sending your message. Please try again later."
        );
      }
    });
  }

  return (
    <div className="min-h-screen bg-lightbg text-white px-6 py-12 md:px-20">
      {/* Heading Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-normalbg"
      >
        Catering Services
      </motion.h1>

      {/* Information Section */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-lg md:text-xl text-center text-darkbg"
      >
        Elevate your events with our exquisite catering services. We offer a
        variety of menus customized to your preferences, ensuring an
        unforgettable experience for your guests.
      </motion.p>

      {/* Inquiry Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 max-w-lg mx-auto bg-darkbg p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-normalbg mb-4 text-center">
          Catering Enquiry Form
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-rose-500 h-32"
            required
          ></textarea>
          <button
            type="submit"
            disabled={isPending}
            className="bg-normalbg hover:bg-rose-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            {isPending ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
        {feedback && (
          <div className="mt-4 text-center text-green-500 font-medium">
            {feedback}
          </div>
        )}
      </motion.div>
    </div>
  );
}
