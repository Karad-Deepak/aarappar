import { fetchMenu } from "../_lib/actions";
import CartBottomBar from "./CartBottomBar";
import CategorySection from "./CategorySection";
import ScrollToTopButton from "./ScrollToTopButton"; // Import the button component

export default async function MenuPage() {
  const menuData = await fetchMenu();
  const categories = [...new Set(menuData.map((item) => item.category))];

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-lightbg text-white">
      {/* Page Title */}
      <div className="text-center mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-rose-500 mb-3">
          Our Menu
        </h1>
        <p className="text-black text-sm sm:text-lg ">
          Explore our delicious offerings
        </p>
      </div>

      {/* Category Tabs at Top */}
      <div className="mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 sm:px-6">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-darkbg text-white hover:bg-rose-500 transition duration-300 text-center"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mt-12 space-y-12">
        {categories.map((category) => (
          <CategorySection
            key={category}
            id={category}
            category={category}
            dishes={menuData.filter((dish) => dish.category === category)}
          />
        ))}
      </div>

      {/* Scroll to Top Button (Client Component) */}
      <ScrollToTopButton />
      <CartBottomBar />
    </div>
  );
}
