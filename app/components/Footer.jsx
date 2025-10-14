"use client";

import { motion } from "framer-motion";
import Link from "@/app/components/LocalizedLink";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const quickLinks = t.raw("links");
  const contactDetails = t.raw("contact.details");
  const addressLines = t.raw("contact.addressLines");

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-slate-50 px-6 py-7 text-black md:px-20 lg:px-40 lg:py-10"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        <div>
          <h2 className="text-lg font-bold text-normalbg lg:text-2xl">
            {t("brand")}
          </h2>
          <p className="mt-2 text-sm lg:text-lg">{t("tagline")}</p>
        </div>

        <div className="text-sm lg:text-lg">
          <h3 className="mb-3 text-sm font-semibold text-red-400 lg:text-xl">
            {t("quickLinksTitle")}
          </h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-black">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm lg:text-lg">
          <h3 className="mb-3 text-sm font-semibold text-red-400 lg:text-xl">
            {t("contact.title")}
          </h3>
          <div className="space-y-1">
            {addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            {contactDetails.map((detail) => (
              <p key={detail.label}>
                {detail.label}: {detail.value}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-3 text-center text-sm lg:pt-6">
        <strong>{t("cookies.message")}</strong> {t("cookies.separator")}{" "}
        <Link href="/privacy-policy" className="text-normalbg">
          {t("cookies.policy")}
        </Link>
        {t("cookies.terminator")}
      </div>

      <div className="mt-5 border-t border-gray-900 pt-5 text-center text-sm text-gray-700 lg:mt-10">
        &copy; {new Date().getFullYear()} {t("brand")} {t("copyright")}
      </div>
    </motion.footer>
  );
};

export default Footer;

