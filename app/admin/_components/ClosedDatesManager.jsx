"use client";

import { useState } from "react";
import { addClosedDate, deleteClosedDate } from "@/app/lib/actions";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ClosedDatesManager({ closedDates }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddDate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("closed_date", selectedDate);
      formData.append("reason", reason);

      await addClosedDate(formData);
      setSuccess("Closed date added successfully!");
      setSelectedDate("");
      setReason("");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to add closed date");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this closed date?")) {
      return;
    }

    try {
      await deleteClosedDate(id);
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to delete closed date");
    }
  };

  // Format date for display - using consistent formatting to avoid hydration issues
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  return (
    <div className="space-y-6">
      {/* Add New Closed Date Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
          Add Closed Date
        </h3>
        <form onSubmit={handleAddDate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="closed_date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Date
              </label>
              <input
                type="date"
                id="closed_date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reason (Optional)
              </label>
              <input
                type="text"
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Holiday, Private Event"
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-2 md:py-3 bg-red-900 text-white font-semibold rounded-lg hover:bg-red-950 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add Closed Date"}
          </button>
        </form>
      </motion.div>

      {/* List of Closed Dates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
          Closed Dates List
        </h3>

        {closedDates.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No closed dates configured yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 md:px-4 py-2 md:py-3 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-3 md:px-4 py-2 md:py-3 font-semibold text-gray-700 hidden md:table-cell">
                    Reason
                  </th>
                  <th className="px-3 md:px-4 py-2 md:py-3 font-semibold text-gray-700 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {closedDates.map((closedDate) => (
                  <tr
                    key={closedDate.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-3 md:px-4 py-2 md:py-3">
                      <div className="font-medium text-gray-900">
                        {formatDate(closedDate.closed_date)}
                      </div>
                      <div className="text-xs text-gray-500 md:hidden mt-1">
                        {closedDate.reason || "No reason specified"}
                      </div>
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-gray-600 hidden md:table-cell">
                      {closedDate.reason || "—"}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-center">
                      <button
                        onClick={() => handleDelete(closedDate.id)}
                        className="px-3 py-1 md:px-4 md:py-2 bg-red-600 text-white text-xs md:text-sm font-semibold rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
