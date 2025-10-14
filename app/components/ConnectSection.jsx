"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaRegClock } from "react-icons/fa";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";

export default function ConnectSection() {
  const t = useTranslations("ConnectSection");
  const hours = t.raw("hours.entries");
  const addressLines = t.raw("address.lines");
  const contactItems = t.raw("contact.items");

  return (
    <section className="relative py-6 sm:py-8 lg:py-10 xl:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 text-gray-900">
      <div className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-red-400 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-amber-500 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600 blur-3xl opacity-20" />
      </div>

      <div className="relative z-10">
        <motion.div
          className="mb-12 text-center sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#320A6B] mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t.rich("title", {
              highlight: (chunks) => <span className="text-[#320A6B]">{chunks}</span>,
            })}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-gray-950 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="rounded-3xl border border-slate-300/60 bg-gradient-to-b from-zinc-200 to-slate-200 p-6 text-center shadow-xl transition-all duration-300 backdrop-blur-sm hover:shadow-2xl lg:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-green-600 transition-colors duration-300 group-hover:bg-teal-500/20 sm:mb-6 sm:h-20 sm:w-20">
              <FaRegClock className="text-2xl sm:text-3xl lg:text-4xl" />
            </div>
            <h3 className="mb-4 text-lg font-bold text-green-700 transition-colors duration-300 group-hover:text-teal-800 sm:mb-6 sm:text-xl lg:text-2xl">
              {t("hours.title")}
            </h3>
            <div className="space-y-2 text-sm text-gray-900 sm:space-y-3 sm:text-base lg:text-lg leading-relaxed">
              {hours.map((entry) => (
                <div
                  key={entry.label}
                  className="rounded-xl border border-slate-300/60 bg-white/70 p-3 text-gray-900 transition-colors duration-300 hover:bg-white/90"
                >
                  <p className="font-medium">
                    {entry.label}:{" "}
                    <span className="font-semibold text-gray-900">
                      {entry.value}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-slate-300/60 bg-gradient-to-b from-zinc-200 to-slate-200 p-6 text-center shadow-xl transition-all duration-300 backdrop-blur-sm hover:shadow-2xl lg:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-green-600 transition-colors duration-300 group-hover:bg-teal-500/20 sm:mb-6 sm:h-20 sm:w-20">
              <FiMapPin className="text-2xl sm:text-3xl lg:text-4xl" />
            </div>
            <h3 className="mb-4 text-lg font-bold text-green-700 transition-colors duration-300 group-hover:text-teal-800 sm:mb-6 sm:text-xl lg:text-2xl">
              {t("address.title")}
            </h3>
            <div className="space-y-4 rounded-2xl border border-slate-300/60 bg-white/70 p-4 text-sm text-gray-900 transition-colors duration-300 hover:bg-white/90 sm:p-6 sm:text-base lg:text-lg">
              <p className="space-y-1 font-medium">
                {addressLines.map((line) => (
                  <span key={line} className="block text-gray-900">
                    {line}
                  </span>
                ))}
              </p>
              <div className="h-48 w-full overflow-hidden rounded-2xl border border-slate-300/60 sm:h-56 lg:h-64">
                <iframe
                  title={t("address.mapTitle")}
                  src={t("address.mapSrc")}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 lg:col-span-1 rounded-3xl border border-slate-300/60 bg-gradient-to-b from-zinc-200 to-slate-200 p-6 text-center shadow-xl transition-all duration-300 backdrop-blur-sm hover:shadow-2xl lg:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-green-600 transition-colors duration-300 group-hover:bg-teal-500/20 sm:mb-6 sm:h-20 sm:w-20">
              <FiPhoneCall className="text-2xl sm:text-3xl lg:text-4xl" />
            </div>
            <h3 className="mb-4 text-lg font-bold text-green-700 transition-colors duration-300 group-hover:text-teal-800 sm:mb-6 sm:text-xl lg:text-2xl">
              {t("contact.title")}
            </h3>
            <div className="space-y-3 text-sm text-gray-900 sm:space-y-4 sm:text-base">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-300/60 bg-white/70 p-3 transition-colors duration-300 hover:bg-white/90 sm:p-4"
                >
                  <p className="mb-1 text-xs text-gray-900 sm:text-sm">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg break-all">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
