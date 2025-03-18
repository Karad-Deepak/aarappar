"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Dominico D",
    review:
      "We (a couple with a small child) had dinner at Aarappar this evening. The opening offer was a buffet. We really liked it there. The restaurant is cozy, the food was delicious and the service was great. Everyone was very warm and understanding, especially towards our child. We felt comfortable and will definitely come back.",
  },
  {
    name: "Praveen Kumar",
    review:
      "Recently visited the newest Indian restaurant in town with authentic Indian cuisine. The price was reasonable, especially considering the variety and quality of the food. It’s a great option for trying a little bit of everything Indian cuisine has to offer both veg & non-veg. Overall, this restaurant is perfect for those looking to explore a range of Indian flavors in one visit. Definitely recommended",
  },
  {
    name: "sher singh",
    review:
      "Visited Aarappar Restaurant today with family. very warm and welcoming, especially they took care of my 2 year kid so well. I tasted the authentic south indian food after long time and it was delicious. i would recommend this restaurant for people who want to try South indian food!",
  },
  {
    name: "vkr S",
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
    }, 5000); // Auto-rotate every 5 seconds
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
      transition: { duration: 0.5 },
    });
  }, [currentIndex, controls]);

  return (
    <section className="relative px-4 py-8 lg:py-16 lg:px-6 bg-lightbg">
      <div className="absolute inset-0 bg-opacity-60"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
        <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-8 text-normalbg">
          What Our Customers Say
        </h2>

        {/* Carousel Container */}
        <div className="relative overflow-hidden w-full h-[400px] lg:h-[300px] bg-darkbg rounded-3xl ">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="absolute w-full h-full p-6 flex flex-col justify-center items-center bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg"
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
              transition={{ duration: 0.5 }}
            >
              {/* Opening Quote */}
              <div className="mb-3">
                <span className="text-5xl text-red-700">❝</span>
              </div>
              {/* Review Text */}
              <p className="text-sm lg:text-lg text-white tracking-wide px-4">
                {review.review}
              </p>
              {/* Closing Quote */}
              <div className="mt-3">
                <span className="text-5xl text-red-700">❞</span>
              </div>
              <p className="font-semibold mt-2 lg:mt-5 text-xl">
                {review.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="p-2 rounded-full bg-darkbg bg-opacity-80 hover:bg-opacity-30 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="p-2 rounded-full bg-darkbg bg-opacity-80 hover:bg-opacity-30 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
