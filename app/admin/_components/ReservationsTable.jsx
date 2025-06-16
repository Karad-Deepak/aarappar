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
} from "@/app/lib/actions";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

function parseReservationDate(time_slot) {
  const match = time_slot.match(/^(\d{2}\/\d{2}\/\d{4})/);
  return match ? parse(match[1], "dd/MM/yyyy", new Date()) : null;
}

function parseReservationSlot(time_slot) {
  const match = time_slot.match(/(\d{2}:\d{2}\s*to\s*\d{2}:\d{2})$/);
  return match ? match[1] : "";
}

function parseReservationStartDateTime(time_slot) {
  const dateMatch = time_slot.match(/^(\d{2}\/\d{2}\/\d{4})/);
  const timeMatch = time_slot.match(/(\d{2}:\d{2})/);
  if (!dateMatch || !timeMatch) return null;
  return parse(
    `${dateMatch[1]} ${timeMatch[1]}`,
    "dd/MM/yyyy HH:mm",
    new Date()
  );
}

function getSlotsForDay(date) {
  if (!date) return [];
  const day = getDay(date);
  if (day === 1) return [];
  if (day >= 2 && day <= 4) return ["18:00 to 20:00", "20:00 to 22:00"];
  if (day === 5) return ["17:30 to 19:00", "19:00 to 20:30", "20:30 to 22:00"];
  return [
    "12:00 to 13:30",
    "13:30 to 14:30",
    "17:30 to 19:00",
    "19:00 to 20:30",
    "20:30 to 22:00",
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

  useEffect(() => setMounted(true), []);
  useEffect(() => setLocalReservations(reservations), [reservations]);

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
    const id = setInterval(getAvailability, 60000);
    return () => clearInterval(id);
  }, []);

  const filteredReservations = useMemo(() => {
    const today = startOfDay(new Date());
    if (!selectedDate) {
      return localReservations.filter((res) => {
        const d = parseReservationDate(res.time_slot);
        return d && startOfDay(d) >= today;
      });
    }
    const target = startOfDay(selectedDate);
    return localReservations.filter((res) => {
      const d = parseReservationDate(res.time_slot);
      return (
        d &&
        isSameDay(startOfDay(d), target) &&
        (!selectedTimeSlot ||
          parseReservationSlot(res.time_slot) === selectedTimeSlot)
      );
    });
  }, [selectedDate, selectedTimeSlot, localReservations]);

  const sortedReservations = useMemo(
    () =>
      filteredReservations.slice().sort((a, b) => {
        const aDate = parseReservationStartDateTime(a.time_slot);
        const bDate = parseReservationStartDateTime(b.time_slot);
        return aDate - bDate;
      }),
    [filteredReservations]
  );

  const totalGuestsForDay = useMemo(
    () => filteredReservations.reduce((sum, r) => sum + Number(r.guests), 0),
    [filteredReservations]
  );

  const daySlots = useMemo(() => getSlotsForDay(selectedDate), [selectedDate]);

  function getBookedCount(slot) {
    if (!selectedDate) return 0;
    const target = startOfDay(selectedDate);
    return localReservations
      .filter((r) => {
        const d = parseReservationDate(r.time_slot);
        return (
          d &&
          isSameDay(startOfDay(d), target) &&
          parseReservationSlot(r.time_slot) === slot
        );
      })
      .reduce((sum, r) => sum + Number(r.guests), 0);
  }

  return (
    <div className="p-4 text-white min-h-screen">
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
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-2 rounded-lg border transition-colors ${
                      selectedTimeSlot === slot
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-sm">{slot}</span>
                      <span className="text-xs font-semibold">
                        {bookedCount} reservations
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

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
                  <td className="px-3 py-2 border-b text-sm font-bold text-indigo-500">
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
