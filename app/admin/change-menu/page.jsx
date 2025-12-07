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

// Normalize category strings to improve matching between DB and desired order
function normalizeCategoryLabel(label) {
  if (!label) return "";
  let s = String(label).toLowerCase();
  s = s.replace(/[–—]/g, "-"); // unify dashes
  s = s.replace(/\s*\|\s*/g, " | "); // normalize pipe spacing
  s = s.replace(/\s+/g, " ").trim(); // collapse spaces
  return s;
}

// refined user-friendly category order (same as menu page)
const categoryOrder = [
  "Soups",
  "Vorspeisen | Appetizers – Vegetarisch",
  "Eier Vorspeisen | Egg Appetizers",
  "Vorspeisen | Appetizers – Non Vegetarisch",
  "Our Dosa Specials (knusprige, Gefüllte Reis-Crepes aus Südindien) (nur am Abends | Only in the Evenings)",
  "Our Steam Specials / Unsere Dampf-Spezialitäten (nur am Abends | Only in the Evenings)",
  "Vegetarische & Vegan Curries",
  "Non-Vegetarische Curries",
  "Rice & Biryani",
  "Parotta (unsere Parotta-Spezialitäten) (nur am Abends | Only in the Evenings)",
  "Indian Breads (nur am Abends | Only in the Evenings)",
  "Kids Menu",
  "Soft Drinks",
  "Dessert",
];

const categoryOrderNormalized = categoryOrder.map(normalizeCategoryLabel);

const categorySynonyms = [
  ["soup", "soups"],
  ["egg", "eier", "egg appetizers"],
  ["vegetarisch", "veg appetizers", "vegetarian appetizers"],
  ["non vegetarisch", "non-vegetarisch", "non vegetarian appetizers"],
  ["dosa", "dosa specials"],
  ["steam", "steamed", "dampf", "dampf-spezialitäten", "steam specials"],
  ["vegetarische", "vegan", "veg curries", "vegetarian curries"],
  [
    "non-vegetarische",
    "non vegetarische",
    "non veg curries",
    "non vegetarian curries",
  ],
  ["biryani", "rice"],
  ["parotta"],
  ["indian breads", "breads", "bread", "naan", "roti"],
  ["kids"],
  ["drinks", "soft drinks"],
  ["dessert", "desserts"],
].map((arr) => arr.map(normalizeCategoryLabel));

function getPriorityIndexFor(category) {
  const n = normalizeCategoryLabel(category);
  let idx = categoryOrderNormalized.indexOf(n);
  if (idx !== -1) return idx;
  for (let i = 0; i < categoryOrderNormalized.length; i++) {
    const target = categoryOrderNormalized[i];
    if (n.includes(target) || target.includes(n)) return i;
  }
  for (let i = 0; i < categorySynonyms.length; i++) {
    const synonyms = categorySynonyms[i];
    for (let k = 0; k < synonyms.length; k++) {
      if (n.includes(synonyms[k])) return i;
    }
  }
  return Number.MAX_SAFE_INTEGER;
}

export default async function AdminMenu() {
  const menudata = await fetchMenuItems();
  const groupedByCategory = groupBy(menudata, "category");

  // Sort categories using the same logic as the menu page
  const presentCategories = Object.keys(groupedByCategory);
  const sortedCategories = presentCategories
    .map((c, i) => ({ name: c, i, p: getPriorityIndexFor(c) }))
    .sort((a, b) => (a.p === b.p ? a.i - b.i : a.p - b.p))
    .map((x) => x.name);

  return (
    <div className="container mx-auto px-1 py-1 mt-2 lg:mt-6">
      <AddMenuItemWrapper menuItems={menudata} />
      <h1 className="text-lg lg:text-3xl font-bold my-8 text-left text-normalbg ">
        Manage Menu Items
      </h1>

      {sortedCategories.map((category) => {
        const items = groupedByCategory[category];
        return (
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
        );
      })}
    </div>
  );
}
