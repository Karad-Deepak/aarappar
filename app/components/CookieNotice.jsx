"use client";
import { useEffect, useState } from "react";
import Link from "@/app/components/LocalizedLink";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

export default function CookieNotice() {
  const t = useTranslations("CookieNotice");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("cookie_notice_dismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    } catch (error) {
      // If localStorage is not accessible, still show the notice
      setIsVisible(true);
    }
  }, []);

  function handleAcknowledge() {
    try {
      localStorage.setItem("cookie_notice_dismissed", "1");
    } catch (error) {
      // Ignore write errors
    }
    setIsVisible(false);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={t("aria.dialog")}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-50"
        >
          <div className="w-full bg-gradient-to-r from-[#232946] via-[#1e233f] to-[#232946] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)] border-t border-white/10 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-base sm:text-lg font-semibold">
                    {t("title")}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed opacity-95 sm:text-base">
                    {t.rich("description", {
                      link: (chunks) => (
                        <Link
                          href="/privacy-policy"
                          className="underline decoration-2 underline-offset-4 hover:opacity-90"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                  <label className="mt-3 flex items-start gap-2 text-sm sm:text-base">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="mt-0.5 h-4 w-4 cursor-not-allowed accent-emerald-500"
                      aria-checked="true"
                      aria-label={t("aria.checkbox")}
                    />
                    <span>{t("checkboxLabel")}</span>
                  </label>
                </div>
                <div className="flex items-center gap-3 sm:ml-auto">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={handleAcknowledge}
                    className="inline-flex items-center rounded-md bg-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    aria-label={t("aria.button")}
                  >
                    {t("button")}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
