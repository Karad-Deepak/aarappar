"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { updateReservationStatus, deleteReservationAction } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function FutureReservationsTable({ reservations }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, completed, cancelled

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReservationStatus({ id, status: newStatus });
      router.refresh();
    } catch (error) {
      alert("Failed to update status: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this reservation?")) {
      return;
    }

    try {
      await deleteReservationAction(id);
      router.refresh();
    } catch (error) {
      alert("Failed to delete reservation: " + error.message);
    }
  };

  // Filter reservations based on status
  const filteredReservations = reservations.filter((res) => {
    if (filter === "all") return true;
    return res.status === filter;
  });

  // Group reservations by date
  const groupedByDate = filteredReservations.reduce((acc, res) => {
    const dateKey = res.time_slot.split(":")[0]; // Extract date part
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(res);
    return acc;
  }, {});

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition ${
              filter === status
                ? "bg-normalbg text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Reservations Count */}
      <div className="text-sm md:text-base text-gray-600">
        Total: {filteredReservations.length} reservation(s)
      </div>

      {/* Reservations List */}
      {filteredReservations.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No reservations found.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByDate).map(([date, dateReservations]) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              {/* Date Header */}
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  {date}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {dateReservations.length} reservation(s)
                </p>
              </div>

              {/* Reservations for this date */}
              <div className="divide-y divide-gray-200">
                {dateReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="p-3 md:p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      {/* Reservation Details */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 text-sm md:text-base">
                            {reservation.salutation} {reservation.first_name}{" "}
                            {reservation.last_name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                              reservation.status
                            )}`}
                          >
                            {reservation.status || "pending"}
                          </span>
                        </div>

                        <div className="text-xs md:text-sm text-gray-600 space-y-0.5">
                          <div>
                            <strong>Time:</strong> {reservation.time_slot}
                          </div>
                          <div>
                            <strong>Guests:</strong> {reservation.guests}
                          </div>
                          <div>
                            <strong>Phone:</strong> {reservation.phone}
                          </div>
                          <div>
                            <strong>Email:</strong> {reservation.email}
                          </div>
                          {reservation.message && (
                            <div>
                              <strong>Message:</strong> {reservation.message}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row md:flex-col gap-2">
                        <select
                          value={reservation.status || "pending"}
                          onChange={(e) =>
                            handleStatusChange(reservation.id, e.target.value)
                          }
                          className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => handleDelete(reservation.id)}
                          className="px-2 py-1 md:px-3 md:py-1.5 bg-red-600 text-white text-xs md:text-sm font-semibold rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
