import { fetchClosedDates } from "@/app/lib/actions";
import ClosedDatesManager from "@/app/admin/_components/ClosedDatesManager";

export const revalidate = 0;

export default async function ClosedDatesPage() {
  const closedDates = await fetchClosedDates();

  return (
    <div className="min-h-screen text-gray-900 px-2 py-1 md:px-4 md:py-1">
      <h2 className="text-xl md:text-3xl font-bold mb-3 lg:mb-4 text-normalbg">
        Manage Closed Dates
      </h2>
      <p className="text-sm md:text-base text-gray-600 mb-4">
        Add dates when the restaurant will be closed. These dates will be disabled in the reservation calendar.
      </p>
      <ClosedDatesManager closedDates={closedDates} />
    </div>
  );
}
