import { fetchFutureReservations } from "@/app/lib/actions";
import FutureReservationsTable from "@/app/admin/_components/FutureReservationsTable";

export const revalidate = 60;

export default async function AllReservationsPage() {
  const reservations = await fetchFutureReservations();

  return (
    <div className="min-h-screen text-gray-900 px-2 py-1 md:px-4 md:py-1">
      <h2 className="text-xl md:text-3xl font-bold mb-3 lg:mb-4 text-normalbg">
        All Future Reservations
      </h2>
      <p className="text-sm md:text-base text-gray-600 mb-4">
        View all upcoming reservations from today onwards.
      </p>
      <FutureReservationsTable reservations={reservations} />
    </div>
  );
}
