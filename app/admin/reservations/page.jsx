import { fetchReservations } from "@/app/lib/actions";
import ReservationsTable from "@/app/admin/_components/ReservationsTable";
import Script from "next/script";
import Link from "next/link";

export const revalidate = 60;
export default async function ReservationsPage() {
  const reservations = await fetchReservations();
  return (
    <div
      className="min-h-screen
     text-white px-2 py-1 md:px-4 md:py-1"
    >
      <Script id="auto-refresh">
        {`
          setInterval(() => {
            window.location.reload();
          }, 600000);
        `}
      </Script>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 lg:mb-4 gap-3">
        <h2 className="text-xl md:text-3xl font-bold text-normalbg">
          Reservations
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href="/admin/all-reservations"
            className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-blue-700 transition text-center"
          >
            View All Reservations
          </Link>
          <Link
            href="/admin/closed-dates"
            className="px-3 py-2 md:px-4 md:py-2 bg-red-600 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-red-700 transition text-center"
          >
            Manage Closed Dates
          </Link>
        </div>
      </div>
      <ReservationsTable reservations={reservations} />
    </div>
  );
}
