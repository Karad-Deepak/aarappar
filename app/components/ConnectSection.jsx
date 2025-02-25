"use client";
import { motion } from "framer-motion";

const ConnectSection = () => {
  return (
    <section className="bg-lightbg text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-10">
        <h2 className="text-xl lg:text-5xl font-bold text-normalbg">
          Connect with Us
        </h2>
      </div>

      <motion.div
        className="grid md:grid-cols-3 gap-6 lg:gap-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Operational Hours */}
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm lg:text-xl font-semibold text-red-400">
            Operational Hours
          </h3>
          <p className="mt-3">Tue - Fri: 17.30 - 22.00 </p>
          <p className="text-sm lg:text-xl ">Sat - Sun: 12.00 - 22.00</p>
        </div>

        {/* Address */}
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm lg:text-xl  font-semibold text-red-400 ">
            Address
          </h3>
          <p className="text-sm lg:text-xl  mt-3 ">
            Trümpertstraße 18 60489, Frankfurt am Main - Rödelheim
          </p>
        </div>

        {/* Contact Number */}
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm lg:text-xl  font-semibold text-red-400">
            Contact
          </h3>
          <p className="mt-3 text-sm lg:text-xl font-sans">
            Phone: +49 15219220483
          </p>
          <p className="text-sm lg:text-xl ">
            Email: aarapparrodelheim@aarappar.de
          </p>
        </div>
      </motion.div>

      {/* View Gallery Link */}
      <div className="text-center mt-10">
        <motion.a
          href="/gallery"
          className="inline-block px-6 py-3 text-sm lg:text-lg font-semibold  bg-normalbg rounded-xl hover:bg-rose-600 transition-all shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          View Gallery
        </motion.a>
      </div>
    </section>
  );
};

export default ConnectSection;
