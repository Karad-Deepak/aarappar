// app/admin/menu/page.jsx
import Link from "next/link";
import { fetchMenuItems } from "@/app/_lib/actions";
import EditableMenuItem from "@/app/components/EditableMenuItems";

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
    <div className="container mx-auto px-4 py-8 mt-8 lg:mt-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-normalbg">
        Manage Menu Items
      </h1>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <details key={category} className="mb-6">
          <summary className="text-2xl font-semibold border-b pb-2 text-normalbg cursor-pointer">
            {category}
          </summary>
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <EditableMenuItem key={item.id} item={item} />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
