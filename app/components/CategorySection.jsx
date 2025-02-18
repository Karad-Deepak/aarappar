export default function CategorySection({ id, category, dishes }) {
  return (
    <div id={id} className="w-full scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-rose-500 mb-4 border-b-2 border-rose-500 pb-2">
        {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.dish}
            className="bg-darkbg p-4 sm:p-5 rounded-xl shadow-md flex flex-col justify-between h-full"
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-col ">
                <h3 className="text-lg sm:text-2xl font-semibold text-white">
                  {dish.dish}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mt-2">
                  {dish.description}
                </p>
              </div>
              <div className="mt-4 text-right">
                <span className="text-rose-400 font-bold text-lg sm:text-xl">
                  ${dish.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
