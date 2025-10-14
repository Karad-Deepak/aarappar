"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Nav from "@/app/components/Nav";
import ConnectSection from "@/app/components/ConnectSection";
import Footer from "@/app/components/Footer";
import GalleryCarousel from "@/app/components/Gallery";

export default function About() {
  const t = useTranslations("AboutPage");
  const paragraphs = t.raw("paragraphs");

  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-6 flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 py-8 text-indigo-950"
      >
        <h1 className="mb-6 text-4xl font-bold text-normalbg md:text-5xl">
          {t("title")}
        </h1>
        <div className="max-w-2xl space-y-4 text-center text-base leading-relaxed md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
      <GalleryCarousel />
      <ConnectSection />
      <Footer />
    </>
  );
}
