import { motion } from "framer-motion";

const ConnectSection = () => {
  return (
    <section className="bg-rose-50 text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-10">
        <h2 className="text-xl lg:text-4xl font-bold text-rose-500">
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
          <h3 className="text-sm lg:text-xl font-semibold text-rose-400">
            Operational Hours
          </h3>
          <p className="mt-3 text-gray-300">Mon - Fri: 9 AM - 10 PM</p>
          <p className="text-sm lg:text-xl text-gray-300">
            Sat - Sun: 10 AM - 11 PM
          </p>
        </div>

        {/* Address */}
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm lg:text-xl  font-semibold text-rose-400">
            Address
          </h3>
          <p className="text-sm lg:text-xl  mt-3 text-gray-300">
            ALEXANDERSTRASSE 86, 60489 FRANKFURT AM MAIN, GERMANY
          </p>
        </div>

        {/* Contact Number */}
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm lg:text-xl  font-semibold text-rose-400">
            Contact
          </h3>
          <p className="mt-3 text-gray-300">Phone: +49 15510462634</p>
          <p className="text-sm lg:text-xl text-gray-300">
            Email: aarapparde@gmail.com
          </p>
        </div>
      </motion.div>

      {/* View Gallery Link */}
      <div className="text-center mt-10">
        <motion.a
          href="/gallery"
          className="inline-block px-6 py-3 text-sm lg:text-lg font-semibold text-black bg-rose-500 rounded-xl hover:bg-rose-600 transition-all shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          View Gallery
        </motion.a>
      </div>
    </section>
  );
};

export default ConnectSection;
