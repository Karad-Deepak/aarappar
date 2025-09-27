"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const reviews = [
  {
    name: "Virginia Toy",
    rating: 5,
    review:
      "This was my first test of the new 'local', and I can only say… it was exceptional. What a pleasure to find such a diverse and authentic South Indian menu. My meal was deliciously flavoured and nicely spicy, which is sooo hard to find in Germany, and also great value for money. I can't wait to return!",
  },
  {
    name: "Dominico D",
    rating: 5,
    review:
      "We (a couple with a small child) had dinner at Aarappar this evening. The opening offer was a buffet. We really liked it there. The restaurant is cozy, the food was delicious and the service was great. Everyone was very warm and understanding, especially towards our child. We felt comfortable and will definitely come back.",
  },
  {
    name: "Praveen Kumar",
    rating: 5,
    review:
      "Recently visited the newest Indian restaurant in town with authentic Indian cuisine. The price was reasonable, especially considering the variety and quality of the food. It's a great option for trying a little bit of everything Indian cuisine has to offer both veg & non-veg. Overall, this restaurant is perfect for those looking to explore a range of Indian flavors in one visit. Definitely recommended",
  },
  {
    name: "sher singh",
    rating: 5,
    review:
      "Visited Aarappar Restaurant today with family. very warm and welcoming, especially they took care of my 2 year kid so well. I tasted the authentic south indian food after long time and it was delicious. i would recommend this restaurant for people who want to try South indian food!",
  },
  {
    name: "vkr S",
    rating: 5,
    review:
      "One of the authentic Indian restaurants that balances the taste of Indian flavors (South and North) and appeals to both Indian and German customers.",
  },
];

export default function CustomerFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Auto-rotate every 6 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    });
  }, [currentIndex, controls]);

  return (
    <section className="relative px-3 sm:px-4 md:px-8 lg:px-12 xl:px-24 py-6 sm:py-8 lg:py-10 xl:py-12 ">
      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 "></div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-600 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center text-gray-900">
        {/* Section Title */}
        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-primary mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            What Our Customers Say
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-950 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover why our guests keep coming back for authentic South Indian
            flavors and exceptional service.
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="relative overflow-hidden w-full min-h-[500px] sm:min-h-[450px] lg:min-h-[400px] bg-gradient-to-b from-zinc-200 to-slate-200 backdrop-blur-sm border border-slate-300/60 rounded-3xl shadow-2xl">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="absolute w-full h-full p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center"
                initial={{ opacity: 0, x: index > currentIndex ? 100 : -100 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x:
                    index === currentIndex
                      ? 0
                      : index > currentIndex
                      ? 100
                      : -100,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Quote Icon */}
                <motion.div
                  className="mb-6 sm:mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: index === currentIndex ? 1 : 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="bg-red-500/10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center">
                    <FaQuoteLeft className="text-2xl sm:text-3xl text-red-600" />
                  </div>
                </motion.div>

                {/* Review Text */}
                <motion.div
                  className="max-w-4xl mx-auto mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    y: index === currentIndex ? 0 : 20,
                  }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed italic font-medium px-4">
                    "{review.review}"
                  </p>
                </motion.div>

                {/* Customer Info */}
                <motion.div
                  className="flex flex-col items-center space-y-3 sm:space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    y: index === currentIndex ? 0 : 20,
                  }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {/* Stars Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map(
                      (_, starIndex) => (
                        <FaStar
                          key={starIndex}
                          className="text-yellow-400 text-lg sm:text-xl"
                        />
                      )
                    )}
                  </div>

                  {/* Customer Name */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-slate-300/60">
                    <p className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900">
                      {review.name}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-4 sm:left-6 lg:left-8">
            <motion.button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="bg-white/80 backdrop-blur-sm border border-slate-300/60 hover:bg-white p-3 sm:p-4 rounded-2xl shadow-lg transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronLeft className="text-xl sm:text-2xl text-gray-900 group-hover:text-teal-600 transition-colors duration-300" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 transform -translate-y-1/2 right-4 sm:right-6 lg:right-8">
            <motion.button
              onClick={handleNext}
              aria-label="Next Review"
              className="bg-white/80 backdrop-blur-sm border border-slate-300/60 hover:bg-white p-3 sm:p-4 rounded-2xl shadow-lg transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronRight className="text-xl sm:text-2xl text-gray-900 group-hover:text-teal-600 transition-colors duration-300" />
            </motion.button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mt-8 sm:mt-12">
          {reviews.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-orange-400 shadow-lg shadow-amber-400/50"
                  : "bg-slate-400 hover:bg-slate-300"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to Action */}
      </div>
    </section>
  );
}
