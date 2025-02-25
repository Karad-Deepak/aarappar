// app/admin/request/page.jsx
import Link from "next/link";

export default function AdminRequestsDashboard() {
  return (
    <div className="min-h-screen bg-darkbg text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Requests Dashboard</h1>
      <div className="space-x-4">
        <Link href="/admin/request/enquiries">
          <button className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-600">
            Enquiries
          </button>
        </Link>
        <Link href="/admin/request/reservations">
          <button className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-600">
            Reservations
          </button>
        </Link>
      </div>
    </div>
  );
}
