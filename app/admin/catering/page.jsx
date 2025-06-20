// app/admin/request/enquiries/page.jsx
import Link from "next/link";
import { fetchEnquiries, deleteEnquiryAction } from "@/app/lib/actions";
import DeleteButton from "@/app//components/DeleteButton";

export default async function EnquiriesPage({}) {
  const enquiries = await fetchEnquiries();

  return (
    <div className="min-h-screen text-white p-8">
      <h2 className="text-2xl font-bold mb-4 text-normalbg">Enquiries</h2>
      <table className="min-w-full bg-gray-950">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">Message</th>
            <th className="px-4 py-2 border-b">Created At</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enq) => (
            <tr key={enq.id} className="hover:bg-gray-800">
              <td className="px-4 py-2 border-b">{enq.id}</td>
              <td className="px-4 py-2 border-b">{enq.name}</td>
              <td className="px-4 py-2 border-b">{enq.phone}</td>
              <td className="px-4 py-2 border-b">{enq.message}</td>
              <td className="px-4 py-2 border-b">
                {new Date(enq.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">
                <DeleteButton id={enq.id} deletionAction={deleteEnquiryAction}>
                  Delete
                </DeleteButton>
              </td>
            </tr>
          ))}
          {enquiries.length === 0 && (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">
                No enquiries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
