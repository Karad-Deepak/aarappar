// app/admin/request/enquiries/page.jsx
import Link from "next/link";
import { fetchEnquiries, deleteEnquiryAction } from "@/app/lib/actions";
import DeleteButton from "@/app//components/DeleteButton";

export default async function EnquiriesPage({}) {
  const enquiries = await fetchEnquiries();

  return (
    <div className="min-h-screen text-gray-900 p-8">
      <h2 className="text-2xl font-bold mb-4 text-normalbg">Enquiries</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border-b border-gray-300">ID</th>
            <th className="px-4 py-2 border-b border-gray-300">Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Phone</th>
            <th className="px-4 py-2 border-b border-gray-300">Message</th>
            <th className="px-4 py-2 border-b border-gray-300">Created At</th>
            <th className="px-4 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enq) => (
            <tr key={enq.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-300">{enq.id}</td>
              <td className="px-4 py-2 border-b border-gray-300">{enq.name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{enq.phone}</td>
              <td className="px-4 py-2 border-b border-gray-300">{enq.message}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                {new Date(enq.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b border-gray-300">
                <DeleteButton id={enq.id} deletionAction={deleteEnquiryAction}>
                  Delete
                </DeleteButton>
              </td>
            </tr>
          ))}
          {enquiries.length === 0 && (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center border-b border-gray-300">
                No enquiries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
