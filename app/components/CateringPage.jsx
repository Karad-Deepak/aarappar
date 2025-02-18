import { motion } from "framer-motion";

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-lightbg text-white px-6 py-12 md:px-20">
      {/* Heading Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-rose-500"
      >
        Catering Services
      </motion.h1>

      {/* Information Section */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-lg md:text-xl text-center text-darkbg"
      >
        Elevate your events with our exquisite catering services. We offer a
        variety of menus customized to your preferences, ensuring an
        unforgettable experience for your guests.
      </motion.p>

      {/* Inquiry Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 max-w-lg mx-auto bg-darkbg p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-rose-500 mb-4 text-center">
          Enquiry Form
        </h2>
        <form
          action="/api/enquiry"
          method="POST"
          className="flex flex-col space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-rose-500 h-32"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            Send Enquiry
          </button>
        </form>
      </motion.div>
    </div>
  );
}
