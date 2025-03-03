"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { isSameDay, parse } from "date-fns";
import { toZonedTime, format as tzFormat } from "date-fns-tz";
import DeleteButton from "@/app/components/DeleteButton";
import {
  deleteReservationAction,
  fetchSlotAvailability,
  updateReservationStatus,
} from "@/app/_lib/actions";
import "react-datepicker/dist/react-datepicker.css";

// Dynamically import DatePicker to avoid SSR issues
const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

// Helper function to parse a date from a reservation's time_slot
// Assumes time_slot format: "28.Feb Friday: 17:30 to 19:30"
// Extracts the day-month portion (e.g., "28.Feb") and builds a Date.
function parseReservationDate(timeSlot) {
  const [datePart] = timeSlot.split(":");
  const dayMonth = datePart.trim().split(" ")[0].replace(".", " ");
  const currentYear = new Date().getFullYear();
  const dateString = `${dayMonth} ${currentYear}`;
  return parse(dateString, "d MMM yyyy", new Date());
}

// Predefined time slot groups (these labels must match the expected formatted date in Germany)
const timeSlots = [
  {
    label: "28.Feb Friday",
    options: ["17:30 to 19:30", "19:30 to 21:30"],
  },
  {
    label: "01.Mar Saturday",
    options: [
      "12:00 to 13:30",
      "13:30 to 14:30",
      "17:30 to 19:30",
      "19:30 to 21:30",
    ],
  },
  {
    label: "02.Mar Sunday",
    options: [
      "12:00 to 13:30",
      "13:30 to 14:30",
      "17:30 to 19:30",
      "19:30 to 21:30",
    ],
  },
];

export default function ReservationsTable({
  reservations,
  slotAvailability: initialAvailability,
}) {
  // Set selectedDate default to Germany time using utcToZonedTime
  const [selectedDate, setSelectedDate] = useState(() =>
    toZonedTime(new Date(), "Europe/Berlin")
  );
  const [mounted, setMounted] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [slotAvailability, setSlotAvailability] = useState(
    initialAvailability || {}
  );
  const [localReservations, setLocalReservations] = useState(reservations);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update local reservations if the prop changes
  useEffect(() => {
    setLocalReservations(reservations);
  }, [reservations]);

  // Poll for fresh slot availability every 60 seconds
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

  // Compute group label from the selected date in Germany time.
  // Format: "dd.MMM EEEE" (e.g., "28.Feb Friday")
  const groupLabel = useMemo(() => {
    return selectedDate
      ? tzFormat(selectedDate, "dd.MMM EEEE", { timeZone: "Europe/Berlin" })
      : "";
  }, [selectedDate]);

  // Filter reservations based on selected date and (optionally) selected time slot
  const filteredReservations = useMemo(() => {
    if (!selectedDate) return localReservations;
    let filtered = localReservations.filter((res) => {
      const resDate = parseReservationDate(res.time_slot);
      return isSameDay(resDate, selectedDate);
    });
    if (selectedTimeSlot) {
      const fullSlot = `${groupLabel}: ${selectedTimeSlot}`;
      filtered = filtered.filter((res) => res.time_slot === fullSlot);
    }
    return filtered;
  }, [selectedDate, selectedTimeSlot, localReservations, groupLabel]);

  // Compute total guests booked for the selected day
  const totalGuestsForDay = useMemo(() => {
    if (!selectedDate) return 0;
    return filteredReservations.reduce(
      (acc, res) => acc + Number(res.guests),
      0
    );
  }, [selectedDate, filteredReservations]);

  // Find the time slot group that matches the selected date's label
  const selectedGroup = useMemo(() => {
    return timeSlots.find((group) => group.label === groupLabel);
  }, [groupLabel]);

  // Handler for updating status is handled in the table rows

  return (
    <div>
      {/* Date Filter using a Calendar Picker */}
      <div className="mb-4">
        <label className="block text-sm md:text-base font-medium text-darkbg mb-2">
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
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-normalbg"
            dateFormat="dd MMM yyyy"
          />
        )}
        {selectedDate && (
          <button
            onClick={() => {
              setSelectedDate(null);
              setSelectedTimeSlot("");
            }}
            className="mt-2 text-xs md:text-sm text-red-500 underline ml-5"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Summary Section for the selected day */}
      {selectedDate && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold text-normalbg mb-2">
            Summary for{" "}
            {tzFormat(selectedDate, "dd MMM yyyy", {
              timeZone: "Europe/Berlin",
            })}
          </h3>
          <p className="mb-4">
            Total Guests Booked:{" "}
            <span className="font-semibold">{totalGuestsForDay}</span>
          </p>
          {selectedGroup && (
            <div className="flex gap-4 flex-wrap justify-center">
              {selectedGroup.options.map((slot) => {
                // Construct full time slot string, e.g., "28.Feb Friday: 17:30 to 19:30"
                const value = `${groupLabel}: ${slot}`;
                const booked = slotAvailability[value] || 0;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    disabled={booked >= 45}
                    className={`p-2 rounded-lg font-sans border transition-colors ${
                      selectedTimeSlot === slot
                        ? "bg-normalbg text-white"
                        : "bg-gray-800 text-white"
                    } ${booked >= 45 ? "opacity-50 " : ""}`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-sm">{slot}</span>
                      <span className="text-xs font-semibold">
                        {booked} booked
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
                Status
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
                      ? tzFormat(new Date(res.created_at), "dd/MM/yyyy HH:mm", {
                          timeZone: "Europe/Berlin",
                        })
                      : ""}
                  </td>
                  <td className="px-3 py-2 border-b text-xs md:text-sm">
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
                      className="bg-gray-800 text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-normalbg"
                    >
                      <option value="booked">Booked</option>
                      <option value="seated">Seated</option>
                      <option value="completed">Completed</option>
                    </select>
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
                  colSpan="9"
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
