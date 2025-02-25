// app/admin/request/reservations/page.jsx
import Link from "next/link";
import { fetchReservations, deleteReservationAction } from "@/app/_lib/actions";
import DeleteButton from "@/app/components/DeleteButton";

export default async function ReservationsPage({ searchParams }) {
  const reservations = await fetchReservations();
  const message = searchParams?.message || "";

  return (
    <div className="min-h-screen bg-lightbg text-white p-4 md:p-8">
      {message && (
        <div className="mb-4 p-4 bg-green-600 text-center rounded shadow">
          {message}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-normalbg">
        Reservations
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-darkbg shadow-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-3 py-2 border-b text-left text-xs md:text-sm">
                ID
              </th>
              <th className="px-3 py-2 border-b text-left text-xs md:text-sm">
                Name
              </th>
              <th className="px-3 py-2 border-b text-left text-xs md:text-sm">
                Phone
              </th>
              <th className="px-3 py-2 border-b text-left text-xs md:text-sm">
                Time Slot
              </th>
              <th className="px-3 py-2 border-b text-left text-xs md:text-sm">
                Guests
              </th>
              <th className="px-3 py-2 border-b text-left text-xs md:text-sm">
                Message
              </th>
              <th className="px-3 py-2 border-b text-left text-xs md:text-sm">
                Created At
              </th>
              <th className="px-3 py-2 border-b text-left text-xs md:text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 font-sans">
            {reservations.length > 0 ? (
              reservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-800">
                  <td className="px-3 py-2 text-xs md:text-sm">{res.id}</td>
                  <td className="px-3 py-2 text-xs md:text-sm">
                    {`${res.salutation} ${res.first_name} ${res.last_name}`}
                  </td>
                  <td className="px-3 py-2 text-xs md:text-sm">{res.phone}</td>
                  <td className="px-3 py-2 text-xs md:text-sm">
                    {res.time_slot}
                  </td>
                  <td className="px-3 py-2 text-xs md:text-sm">{res.guests}</td>
                  <td className="px-3 py-2 text-xs md:text-sm">
                    {res.message}
                  </td>
                  <td className="px-3 py-2 text-xs md:text-sm">
                    {new Date(res.created_at).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-xs md:text-sm">
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
                <td
                  colSpan="8"
                  className="px-3 py-2 text-center text-xs md:text-sm"
                >
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
