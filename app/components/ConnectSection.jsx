"use client";
import { motion } from "framer-motion";
import { FaRegClock } from "react-icons/fa";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";

const ConnectSection = () => {
  return (
    <section className="relative text-gray-900 py-6 sm:py-8 lg:py-10 xl:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 ">
      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 "></div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-32 h-32 bg-red-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-orange-600 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
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
            Connect with <span className="text-[#320A6B]">Us</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-950 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Visit us, call us, or find us online. We're here to serve you the
            best South Indian cuisine in Frankfurt.
          </motion.p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Operational Hours Card */}
          <motion.div
            className="bg-gradient-to-b from-zinc-200 to-slate-200 backdrop-blur-sm border border-slate-300/60 p-6 lg:p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="bg-teal-500/10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-teal-500/20 transition-colors duration-300">
              <FaRegClock className="text-2xl sm:text-3xl lg:text-4xl text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-700 mb-4 sm:mb-6 group-hover:text-teal-800 transition-colors duration-300">
              Operational Hours
            </h3>

            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed">
              <div className="bg-white/70 border border-slate-300/60 rounded-xl p-3 hover:bg-white/90 transition-colors duration-300 text-gray-900">
                <p className="font-medium">
                  Tue - Thu:{" "}
                  <span className="text-gray-900 font-semibold">18:00 - 22:00</span>
                </p>
              </div>
              <div className="bg-white/70 border border-slate-300/60 rounded-xl p-3 hover:bg-white/90 transition-colors duration-300 text-gray-900">
                <p className="font-medium">
                  Fri: <span className="text-gray-900 font-semibold">17:30 - 22:00</span>
                </p>
              </div>
              <div className="bg-white/70 border border-slate-300/60 rounded-xl p-3 hover:bg-white/90 transition-colors duration-300 text-gray-900">
                <p className="font-medium">
                  Sat - Sun:{" "}
                  <span className="text-gray-900 font-semibold">
                    12:00 - 14:30, 17:30 - 22:00
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Address Card */}
          <motion.div
            className="bg-gradient-to-b from-zinc-200 to-slate-200 backdrop-blur-sm border border-slate-300/60 p-6 lg:p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="bg-teal-500/10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-teal-500/20 transition-colors duration-300">
              <FiMapPin className="text-2xl sm:text-3xl lg:text-4xl text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-700 mb-4 sm:mb-6 group-hover:text-teal-800 transition-colors duration-300">
              Address
            </h3>

            <div className="bg-white/70 border border-slate-300/60 rounded-xl p-4 sm:p-6 hover:bg-white/90 transition-colors duration-300 text-gray-900 space-y-4">
              <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-medium">
                <span className="block text-gray-900 font-semibold mb-2">
                  Trümpertstraße 18
                </span>
                <span className="text-gray-900 font-semibold">60489, Frankfurt am Main</span>
                <span className="block text-gray-900 mt-1">Rödelheim</span>
              </p>
              <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden rounded-2xl border border-slate-300/60">
                <iframe
                  title="AARAPPAR Indisches Restaurant Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40178.60245771533!2d8.537106513977035!3d50.12766987455033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0934d333c46d%3A0x15c1044ed6dd33a3!2sAarappar%20Indisches%20Restaurant!5e1!3m2!1sen!2sin!4v1758961088990!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            className="bg-gradient-to-b from-zinc-200 to-slate-200 backdrop-blur-sm border border-slate-300/60 p-6 lg:p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 group md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="bg-teal-500/10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-teal-500/20 transition-colors duration-300">
              <FiPhoneCall className="text-2xl sm:text-3xl lg:text-4xl text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-700 mb-4 sm:mb-6 group-hover:text-teal-800 transition-colors duration-300">
              Contact
            </h3>

            <div className="space-y-3 sm:space-y-4 text-gray-900">
              <div className="bg-white/70 border border-slate-300/60 rounded-xl p-3 sm:p-4 hover:bg-white/90 transition-colors duration-300">
                <p className="text-xs sm:text-sm text-gray-900 mb-1">Primary</p>
                <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                  +49 69 21939837
                </p>
              </div>

              <div className="bg-white/70 border border-slate-300/60 rounded-xl p-3 sm:p-4 hover:bg-white/90 transition-colors duration-300">
                <p className="text-xs sm:text-sm text-gray-900 mb-1">
                  Secondary
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                  +49 15219220483
                </p>
              </div>

              <div className="bg-white/70 border border-slate-300/60 rounded-xl p-3 sm:p-4 hover:bg-white/90 transition-colors duration-300">
                <p className="text-xs sm:text-sm text-gray-900 mb-1">Email</p>
                <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 break-all">
                  aarapparrodelheim@aarappar.de
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        ></motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;




