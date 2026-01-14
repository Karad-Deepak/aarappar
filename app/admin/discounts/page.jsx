import { fetchAllDiscounts, fetchMenuItems } from "@/app/lib/actions";
import DiscountManager from "./_components/DiscountManager";

export const revalidate = 10;

export default async function DiscountsPage() {
  const [discounts, menuItems] = await Promise.all([
    fetchAllDiscounts(),
    fetchMenuItems(),
  ]);

  // Extract unique categories from menu items
  const categories = [...new Set(menuItems.map((item) => item.category))].filter(
    Boolean
  );

  return (
    <div className="container mx-auto px-1 py-1 mt-2 lg:mt-6">
      <h1 className="text-lg lg:text-3xl font-bold mb-6 text-left text-normalbg">
        Manage Discounts
      </h1>
      <DiscountManager
        discounts={discounts || []}
        categories={categories}
        menuItems={menuItems || []}
      />
    </div>
  );
}
