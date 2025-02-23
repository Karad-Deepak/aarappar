// app/admin/request/reservations/page.jsx
import Link from "next/link";
import { fetchReservations, deleteReservationAction } from "@/app/_lib/actions";
import DeleteButton from "@/app/components/DeleteButton";

export default async function ReservationsPage({ searchParams }) {
  const reservations = await fetchReservations();
  const message = searchParams?.message || "";

  return (
    <div className="min-h-screen bg-lightbg text-white p-8">
      <Link href="/admin/request">
        <button className="mb-4 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
          Back to Dashboard
        </button>
      </Link>
      {message && (
        <div className="mb-4 p-4 bg-green-600 text-center">{message}</div>
      )}
      <h2 className="text-2xl font-bold mb-4">Reservations</h2>
      <table className="min-w-full bg-darkbg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">Date & Time</th>
            <th className="px-4 py-2 border-b">Guests</th>
            <th className="px-4 py-2 border-b">Message</th>
            <th className="px-4 py-2 border-b">Created At</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id} className="hover:bg-gray-800">
              <td className="px-4 py-2 border-b">{res.id}</td>
              <td className="px-4 py-2 border-b">{res.name}</td>
              <td className="px-4 py-2 border-b">{res.phone}</td>
              <td className="px-4 py-2 border-b">
                {new Date(res.datetime).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">{res.guests}</td>
              <td className="px-4 py-2 border-b">{res.message}</td>
              <td className="px-4 py-2 border-b">
                {new Date(res.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">
                <DeleteButton
                  id={res.id}
                  deletionAction={deleteReservationAction}
                >
                  Delete
                </DeleteButton>
              </td>
            </tr>
          ))}
          {reservations.length === 0 && (
            <tr>
              <td colSpan="8" className="px-4 py-2 text-center">
                No reservations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
