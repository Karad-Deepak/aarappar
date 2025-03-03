import { fetchPickups } from "@/app/_lib/actions";
import PickupsTable from "@/app/admin/_components/PickupsTable";

export const revalidate = 300;
export default async function AdminPickupsPage() {
  const pickups = await fetchPickups();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Pickup Orders</h1>
      <PickupsTable initialPickups={pickups} />
    </div>
  );
}
