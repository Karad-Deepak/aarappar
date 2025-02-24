"use client";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import ConnectSection from "../components/ConnectSection";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-darkbg text-white flex flex-col items-center justify-center px-4 py-8 mt-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-rose-500 mb-6">
          About AARAPAR
        </h1>
        <div className="max-w-2xl text-center space-y-4">
          <p>
            Welcome to AARAPAR, where culinary excellence meets a stunning
            modern design. Our restaurant was born from a passion for delivering
            unique dining experiences, blending the best of tradition with
            contemporary innovation.
          </p>
          <p>
            At AARAPAR, we believe that every meal is a celebration. Our chefs
            carefully select the freshest ingredients to craft dishes that are
            not only delicious but also visually captivating. Our ambiance—with
            its sleek, modern aesthetic and vibrant rose accents—reflects our
            commitment to quality and creativity.
          </p>
          <p>
            Join us on a culinary journey where every visit promises exquisite
            flavors, artistic presentation, and a warm, welcoming atmosphere. We
            are dedicated to making every moment memorable.
          </p>
        </div>
      </motion.div>
      <ConnectSection />
      <Footer />
    </>
  );
}
