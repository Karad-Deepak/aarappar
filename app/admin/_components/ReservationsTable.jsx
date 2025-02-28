"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { isSameDay, format, parse } from "date-fns";
import DeleteButton from "@/app/components/DeleteButton";
import { deleteReservationAction } from "@/app/_lib/actions";
import "react-datepicker/dist/react-datepicker.css";

// Dynamically import DatePicker to avoid SSR issues
const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

// Helper function to parse a date from a reservation's time_slot
// Assumes time_slot format: "28.Feb Friday: 17:30 to 19:30"
// We only extract the first segment (e.g., "28.Feb") and then build a date.
function parseReservationDate(timeSlot) {
  const [datePart] = timeSlot.split(":");
  // Get the first segment, e.g., "28.Feb" from "28.Feb Friday"
  const dayMonth = datePart.trim().split(" ")[0].replace(".", " ");
  const currentYear = new Date().getFullYear();
  const dateString = `${dayMonth} ${currentYear}`;
  // Use date-fns parse function with expected format "d MMM yyyy"
  const parsedDate = parse(dateString, "d MMM yyyy", new Date());
  return parsedDate;
}

export default function ReservationsTable({ reservations }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted flag to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter reservations based on the selected date using isSameDay from date-fns
  const filteredReservations = useMemo(() => {
    if (!selectedDate) return reservations;
    return reservations.filter((res) => {
      const resDate = parseReservationDate(res.time_slot);
      return isSameDay(resDate, selectedDate);
    });
  }, [selectedDate, reservations]);

  return (
    <div>
      {/* Date Filter using a Calendar Picker */}
      <div className="mb-4">
        <label className="block text-sm md:text-base font-medium text-darkbg mb-2">
          Filter by Date:
        </label>
        {/* Only render DatePicker on the client after mount */}
        {mounted && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select a date"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-normalbg"
            dateFormat="dd MMM yyyy"
          />
        )}
        {selectedDate && (
          <button
            onClick={() => setSelectedDate(null)}
            className="mt-2 text-xs md:text-sm text-red-500 underline ml-5"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Reservations Table */}
      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full border-collapse bg-darkbg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res) => (
                <motion.tr
                  key={res.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-800"
                >
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
                    {res.id}
                  </td>
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
                    {`${res.salutation} ${res.first_name} ${res.last_name}`}
                  </td>
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
                    {res.phone}
                  </td>
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
                    {res.time_slot}
                  </td>
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
                    {res.guests}
                  </td>
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
                    {res.message}
                  </td>
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
                    {res.created_at
                      ? format(new Date(res.created_at), "dd/MM/yyyy HH:mm")
                      : ""}
                  </td>
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
                    <DeleteButton
                      id={res.id}
                      deletionAction={deleteReservationAction}
                    >
                      Delete
                    </DeleteButton>
                  </td>
                </motion.tr>
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
        </motion.table>
      </div>
    </div>
  );
}
