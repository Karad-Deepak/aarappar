"use client";
import { motion } from "framer-motion";

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
    name: "vkr S",
    review:
      "One of the authentic Indian restaurants that balances the taste of Indian flavors (South and North) and appeals to both Indian and German customers.",
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
