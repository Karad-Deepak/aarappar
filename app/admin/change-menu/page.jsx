import { fetchMenuItems } from "@/app/lib/actions";
import EditableMenuItem from "@/app/components/EditableMenuItems";
import AddMenuItemWrapper from "@/app/components/MenuWrapper";

export const revalidate = 10;
// Helper function to group items by a key
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const groupKey = item[key] || "Others";
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

export default async function AdminMenu() {
  const menudata = await fetchMenuItems();
  const groupedByCategory = groupBy(menudata, "category");

  return (
    <div className="container mx-auto px-1 py-1 mt-2 lg:mt-6">
      <AddMenuItemWrapper menuItems={menudata} />
      <h1 className="text-lg lg:text-3xl font-bold my-8 text-left text-normalbg ">
        Manage Menu Items
      </h1>

      {Object.entries(groupedByCategory).map(([category, items]) => (
        <details key={category} className="mb-6">
          <summary className="text-lg md:text-xl font-semibold border-b pb-2 cursor-pointer">
            {category}
          </summary>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            {items.map((item) => (
              <EditableMenuItem key={item.id} item={item} />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
