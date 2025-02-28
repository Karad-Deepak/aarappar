"use client";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Amit Sharma",
    review:
      "The experience was fantastic! The food quality and service were exceptional. Will visit again!",
  },
  {
    name: "Priya Mehta",
    review:
      "Beautiful ambiance with a warm and welcoming staff. The flavors were rich and authentic!",
  },
  {
    name: "Rajesh Iyer",
    review:
      "One of the best dining experiences I've had. Great taste, excellent presentation, and superb service!",
  },
];

export default function CustomerFeedback() {
  return (
    <section
      className="relative  px-4 py-10 lg:py-20 lg:px-6 bg-darkbg
"
    >
      <div className="absolute inset-0  bg-opacity-60"> </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
        <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-8 text-normalbg">
          What Our Customers Say
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg  p-6 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm lg:text-lg italic">"{review.review}"</p>
              <h4 className="font-semibold mt-4 text-xl">{review.name}</h4>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex space-x-4 overflow-x-auto snap-x snap-mandatory px-4 py-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-lg min-w-[80%] snap-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm lg:text-lg italic">"{review.review}"</p>
              <h4 className="font-semibold mt-4 text-lg lg:text-xl">
                {review.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
