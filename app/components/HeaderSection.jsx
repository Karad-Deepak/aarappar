"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "./Nav";
import Hero from "./Hero";
import interior4 from "@/public/interior4.webp";
import interior5 from "@/public/interior5.webp";
import interior6 from "@/public/interior6.webp";

const backgroundImages = [interior4, interior5, interior6];

export default function HeaderSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full overflow-hidden min-h-[80vh]">
      <div className="absolute inset-0 -z-10">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={image}
              alt="Restaurant interior"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
      </div>
      <Nav />
      <Hero />
    </header>
  );
}
