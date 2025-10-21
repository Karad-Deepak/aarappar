"use client";

import { motion } from "framer-motion";
import { submitEnquiry } from "@/app/lib/actions"; // Adjust the path as needed
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

export default function CateringPage() {
  const t = useTranslations("CateringPage");
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    startTransition(async () => {
      try {
        await submitEnquiry(formData);
        setFeedback(t("success"));
        event.target.reset();
      } catch (error) {
        console.error(error);
        setFeedback(t("error"));
      }
    });
  }

  return (
    <div className="min-h-screen bg-white  px-6 py-12 md:px-20">
      {/* Heading Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-bold text-center text-primary"
      >
        {t("title")}
      </motion.h1>

      {/* Information Section */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-sm md:text-lg text-center text-darkbg"
      >
        {t("subtitle")}
      </motion.p>

      {/* Inquiry Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 max-w-lg mx-auto bg-darkbg p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-normalbg mb-4 text-center">
          {t("form.title")}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t("form.name.placeholder")}
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("form.phone.placeholder")}
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <textarea
            name="message"
            placeholder={t("form.message.placeholder")}
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-rose-500 h-32"
            required
          ></textarea>
          <button
            type="submit"
            disabled={isPending}
            className="bg-normalbg hover:bg-rose-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            {isPending ? t("form.submit.loading") : t("form.submit.button")}
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
