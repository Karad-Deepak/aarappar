import { fetchPickups } from "@/app/lib/actions";
import PickupsTable from "@/app/admin/_components/PickupsTable";
import Script from "next/script";

export const revalidate = 60;
export default async function AdminPickupsPage() {
  const pickups = await fetchPickups();
  return (
    <div className="container mx-auto p-1 lg:p-2">
      <Script id="auto-refresh">
        {`
          setInterval(() => {
            window.location.reload();
          }, 180000);
        `}
      </Script>
      <h1 className="text-xl lg:text-3xl font-bold mb-4 text-normalbg">
        Pickup Orders
      </h1>
      <PickupsTable initialPickups={pickups} />
    </div>
  );
}
