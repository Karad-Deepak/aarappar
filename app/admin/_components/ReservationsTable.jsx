"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { parse, startOfDay, isSameDay, getDay, format } from "date-fns";
import DeleteButton from "@/app/components/DeleteButton";
import {
  deleteReservationAction,
  fetchSlotAvailability,
  updateReservationStatus,
} from "@/app/_lib/actions";
import "react-datepicker/dist/react-datepicker.css";

// Dynamically import react-datepicker to avoid SSR issues
const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

/**
 * parseReservationDate:
 * Extract "DD/MM/YYYY" from time_slot e.g. "06/03/2025: 19:30 to 21:30"
 */
function parseReservationDate(time_slot) {
  const match = time_slot.match(/^(\d{2}\/\d{2}\/\d{4})/);
  if (!match) return null;
  return parse(match[1], "dd/MM/yyyy", new Date());
}

/**
 * parseReservationSlot:
 * Extract "HH:MM to HH:MM" from time_slot e.g. "06/03/2025: 19:30 to 21:30"
 */
function parseReservationSlot(time_slot) {
  const match = time_slot.match(/(\d{2}:\d{2}\s*to\s*\d{2}:\d{2})$/);
  return match ? match[1] : "";
}

/**
 * parseReservationStartDateTime:
 * Returns a Date object for the reservation's start datetime.
 * e.g. "06/03/2025: 19:30 to 21:30" => Date object for "06/03/2025 19:30"
 */
function parseReservationStartDateTime(time_slot) {
  const dateMatch = time_slot.match(/^(\d{2}\/\d{2}\/\d{4})/);
  if (!dateMatch) return null;
  const timeMatch = time_slot.match(/(\d{2}:\d{2})/);
  if (!timeMatch) return null;
  const dateTimeString = `${dateMatch[1]} ${timeMatch[1]}`;
  return parse(dateTimeString, "dd/MM/yyyy HH:mm", new Date());
}

/**
 * getSlotsForDay:
 * Returns available time slots for a given date.
 */
function getSlotsForDay(date) {
  if (!date) return [];
  const day = getDay(date);
  if (day === 1) return []; // Monday => closed
  if (day >= 2 && day <= 5) {
    return ["18:00 to 20:00", "20:00 to 22:00"];
  }
  return [
    "12:00 to 13:30",
    "13:30 to 14:30",
    "18:00 to 20:00",
    "20:00 to 22:00",
  ];
}

export default function ReservationsTable({
  reservations,
  slotAvailability: initialAvailability,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [mounted, setMounted] = useState(false);
  const [localReservations, setLocalReservations] = useState(reservations);
  const [slotAvailability, setSlotAvailability] = useState(
    initialAvailability || {}
  );

  // For hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update local reservations if prop changes
  useEffect(() => {
    setLocalReservations(reservations);
  }, [reservations]);

  // Poll for slot availability
  useEffect(() => {
    async function getAvailability() {
      try {
        const availability = await fetchSlotAvailability();
        setSlotAvailability(availability);
      } catch (error) {
        console.error("Error fetching slot availability:", error.message);
      }
    }
    getAvailability();
    const intervalId = setInterval(getAvailability, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Filter reservations based solely on date:
  // If no date is selected, show only reservations from today onward.
  const filteredReservations = useMemo(() => {
    const today = startOfDay(new Date());
    if (!selectedDate) {
      return localReservations.filter((res) => {
        const dateObj = parseReservationDate(res.time_slot);
        return dateObj && startOfDay(dateObj) >= today;
      });
    }
    const dayToMatch = startOfDay(selectedDate);
    let filtered = localReservations.filter((res) => {
      const dateObj = parseReservationDate(res.time_slot);
      return dateObj && isSameDay(startOfDay(dateObj), dayToMatch);
    });
    if (selectedTimeSlot) {
      filtered = filtered.filter(
        (res) => parseReservationSlot(res.time_slot) === selectedTimeSlot
      );
    }
    return filtered;
  }, [selectedDate, selectedTimeSlot, localReservations]);

  // Sort the filtered reservations by start datetime (date and time)
  const sortedReservations = useMemo(() => {
    return filteredReservations.slice().sort((a, b) => {
      const dateA = parseReservationStartDateTime(a.time_slot);
      const dateB = parseReservationStartDateTime(b.time_slot);
      return dateA - dateB;
    });
  }, [filteredReservations]);

  const totalGuestsForDay = useMemo(() => {
    return filteredReservations.reduce((acc, r) => acc + Number(r.guests), 0);
  }, [filteredReservations]);

  const daySlots = useMemo(() => getSlotsForDay(selectedDate), [selectedDate]);

  function getBookedCount(slot) {
    if (!selectedDate) return 0;
    const dayToMatch = startOfDay(selectedDate);
    return localReservations
      .filter((r) => {
        const d = parseReservationDate(r.time_slot);
        return (
          d &&
          isSameDay(startOfDay(d), dayToMatch) &&
          parseReservationSlot(r.time_slot) === slot
        );
      })
      .reduce((acc, r) => acc + Number(r.guests), 0);
  }

  return (
    <div className="p-4 text-white min-h-screen">
      {/* Filter by Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-red-500 mb-2">
          Filter by Date:
        </label>
        {mounted && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setSelectedTimeSlot("");
            }}
            placeholderText="Select a date"
            className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            dateFormat="dd/MM/yyyy"
          />
        )}
        {selectedDate && (
          <button
            onClick={() => {
              setSelectedDate(null);
              setSelectedTimeSlot("");
            }}
            className="mt-2 text-xs text-red-400 underline ml-5"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Summary Section */}
      {selectedDate && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold text-red-500 mb-2">
            Summary for {format(selectedDate, "dd/MM/yyyy")}
          </h3>
          <p className="mb-4">
            Total Guests Booked:{" "}
            <span className="font-semibold">{totalGuestsForDay}</span>
          </p>
          {daySlots.length === 0 ? (
            <p className="text-red-400 text-center">
              We are closed on Mondays!
            </p>
          ) : (
            <div className="flex gap-4 flex-wrap justify-center">
              {daySlots.map((slot) => {
                const bookedCount = getBookedCount(slot);
                const maxCapacity = 45; // example capacity
                const isFull = bookedCount >= maxCapacity;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    disabled={isFull}
                    className={`p-2 rounded-lg border transition-colors ${
                      selectedTimeSlot === slot
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 text-white"
                    } ${isFull ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-sm">{slot}</span>
                      <span className="text-xs font-semibold">
                        {bookedCount} booked
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Reservations Table */}
      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full border-collapse bg-gray-950 shadow-lg rounded-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-gray-700">
            <tr>
              <th className="px-3 py-2 border-b text-left text-sm">ID</th>
              <th className="px-3 py-2 border-b text-left text-sm">Name</th>
              <th className="px-3 py-2 border-b text-left text-sm">Phone</th>
              <th className="px-3 py-2 border-b text-left text-sm">
                Time Slot
              </th>
              <th className="px-3 py-2 border-b text-left text-sm">Guests</th>
              <th className="px-3 py-2 border-b text-left text-sm">Message</th>
              <th className="px-3 py-2 border-b text-left text-sm">
                Created At
              </th>
              <th className="px-3 py-2 border-b text-left text-sm">Status</th>
              <th className="px-3 py-2 border-b text-left text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedReservations.length > 0 ? (
              sortedReservations.map((res) => (
                <motion.tr
                  key={res.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-800"
                >
                  <td className="px-3 py-2 border-b text-sm">{res.id}</td>
                  <td className="px-3 py-2 border-b text-sm">
                    {`${res.salutation} ${res.first_name} ${res.last_name}`}
                  </td>
                  <td className="px-3 py-2 border-b text-sm">{res.phone}</td>
                  <td className="px-3 py-2 border-b text-sm font-bold text-indigo-500 ">
                    {res.time_slot}
                  </td>
                  <td className="px-3 py-2 border-b text-sm">{res.guests}</td>
                  <td className="px-3 py-2 border-b text-sm">{res.message}</td>
                  <td className="px-3 py-2 border-b text-sm">
                    {res.created_at
                      ? format(new Date(res.created_at), "dd/MM/yyyy HH:mm")
                      : ""}
                  </td>
                  <td className="px-3 py-2 border-b text-sm">
                    <select
                      value={res.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        try {
                          await updateReservationStatus({
                            id: res.id,
                            status: newStatus,
                          });
                          setLocalReservations((prev) =>
                            prev.map((r) =>
                              r.id === res.id ? { ...r, status: newStatus } : r
                            )
                          );
                        } catch (error) {
                          console.error(
                            "Error updating status:",
                            error.message
                          );
                        }
                      }}
                      className="bg-gray-800 text-white p-1 rounded"
                    >
                      <option value="booked">Booked</option>
                      <option value="seated">Seated</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 border-b text-xs">
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
                <td colSpan="9" className="px-3 py-2 text-center text-xs">
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
