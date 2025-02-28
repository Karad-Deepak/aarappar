import { fetchReservations } from "@/app/_lib/actions";
import ReservationsTable from "@/app/admin/_components/ReservationsTable";

export const revalidate = 300;
export default async function ReservationsPage() {
  const reservations = await fetchReservations();
  return (
    <div className="min-h-screen bg-lightbg text-white p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-normalbg">
        Reservations
      </h2>
      <ReservationsTable reservations={reservations} />
    </div>
  );
}
