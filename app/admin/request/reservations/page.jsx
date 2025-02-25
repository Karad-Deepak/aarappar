// app/admin/request/reservations/page.jsx
import Link from "next/link";
import { fetchReservations, deleteReservationAction } from "@/app/_lib/actions";
import DeleteButton from "@/app/components/DeleteButton";

export default async function ReservationsPage({ searchParams }) {
  const reservations = await fetchReservations();
  const message = searchParams?.message || "";

  return (
    <div className="min-h-screen bg-lightbg text-white p-4 md:p-8">
      <Link href="/admin/request">
        <button className="mb-4 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
          Back to Dashboard
        </button>
      </Link>
      {message && (
        <div className="mb-4 p-4 bg-green-600 text-center rounded">
          {message}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-normalbg">
        Reservations
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-darkbg">
          <thead>
            <tr>
              <th className="px-3 py-2 border-b text-left text-sm md:text-base">
                ID
              </th>
              <th className="px-3 py-2 border-b text-left text-sm md:text-base">
                Name
              </th>
              <th className="px-3 py-2 border-b text-left text-sm md:text-base">
                Phone
              </th>
              <th className="px-3 py-2 border-b text-left text-sm md:text-base">
                Time Slot
              </th>
              <th className="px-3 py-2 border-b text-left text-sm md:text-base">
                Guests
              </th>
              <th className="px-3 py-2 border-b text-left text-sm md:text-base">
                Message
              </th>
              <th className="px-3 py-2 border-b text-left text-sm md:text-base">
                Created At
              </th>
              <th className="px-3 py-2 border-b text-left text-sm md:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-800">
                  <td className="px-3 py-2 border-b text-sm">{res.id}</td>
                  <td className="px-3 py-2 border-b text-sm">
                    {`${res.salutation} ${res.first_name} ${res.last_name}`}
                  </td>
                  <td className="px-3 py-2 border-b text-sm">{res.phone}</td>
                  <td className="px-3 py-2 border-b text-sm">
                    {res.time_slot}
                  </td>
                  <td className="px-3 py-2 border-b text-sm">{res.guests}</td>
                  <td className="px-3 py-2 border-b text-sm">{res.message}</td>
                  <td className="px-3 py-2 border-b text-sm">
                    {new Date(res.created_at).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 border-b text-sm">
                    <DeleteButton
                      id={res.id}
                      deletionAction={deleteReservationAction}
                    >
                      Delete
                    </DeleteButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-3 py-2 text-center text-sm">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
