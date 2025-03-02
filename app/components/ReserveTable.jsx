"use client";

import { useState, useTransition, useEffect } from "react";
import { motion } from "framer-motion";
import { submitReservation, fetchSlotAvailability } from "@/app/_lib/actions";

// Example time slot groups
const timeSlots = [
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

const salutations = ["Mr", "Ms", "Mrs"];

export default function ReserveTable() {
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    time_slot: "", // matches DB column name
    guests: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [slotAvailability, setSlotAvailability] = useState({});

  // Poll for slot availability every 60 seconds
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
    const intervalId = setInterval(() => {
      getAvailability();
    }, 60000); // refresh every 60s
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.salutation) newErrors.salutation = "Salutation is required.";
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First Name must be at least 2 characters.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Invalid phone number.";
    }
    if (!formData.time_slot) {
      newErrors.time_slot = "Please select a time slot.";
    }
    if (!formData.guests || Number(formData.guests) < 1) {
      newErrors.guests = "At least one guest is required.";
    }
    return newErrors;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Build FormData to pass to server action
    const data = new FormData();
    data.append("salutation", formData.salutation);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("time_slot", formData.time_slot); // must match DB column
    data.append("guests", formData.guests);
    data.append("message", formData.message);

    startTransition(async () => {
      try {
        await submitReservation(data);
        setFeedback("Your reservation has been successfully made!");
        // Reset form data and selections
        setFormData({
          salutation: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          time_slot: "",
          guests: "",
          message: "",
        });
        setSelectedDate("");
        setSelectedTimeSlot("");
        setErrors({});
      } catch (error) {
        console.error(error);
        setFeedback(
          "There was an error submitting your reservation. Please try again later."
        );
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-12">
      <div className="max-w-3xl w-full p-8 bg-gray-900 rounded-2xl shadow-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-normalbg mb-6"
        >
          Reserve Your Table
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-center mb-8"
        >
          Book a table in advance to ensure a wonderful dining experience.
        </motion.p>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Salutation, First Name, Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="salutation" className="block text-gray-300 mb-2">
                <span className="text-red-500">*</span> Salutation
              </label>
              <select
                id="salutation"
                name="salutation"
                value={formData.salutation}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              >
                <option value="">Select</option>
                {salutations.map((sal) => (
                  <option key={sal} value={sal}>
                    {sal}
                  </option>
                ))}
              </select>
              {errors.salutation && (
                <p className="mt-1 text-sm text-red-500">{errors.salutation}</p>
              )}
            </div>
            <div>
              <label htmlFor="firstName" className="block text-gray-300 mb-2">
                <span className="text-red-500">*</span> First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-300 mb-2">
                <span className="text-red-500">*</span> Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              <span className="text-red-500">*</span> Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-2">
              <span className="text-red-500">*</span> Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Calendar View for Time Slot */}
          <div>
            <label className="block text-gray-300 mb-2">
              <span className="text-red-500">*</span> Select Date
            </label>
            <div className="flex gap-4 justify-center">
              {timeSlots.map((group) => (
                <button
                  type="button"
                  key={group.label}
                  onClick={() => {
                    setSelectedDate(group.label);
                    setSelectedTimeSlot("");
                    setFormData((prev) => ({ ...prev, time_slot: "" }));
                  }}
                  className={`p-4 rounded-lg border transition-colors font-sans ${
                    selectedDate === group.label
                      ? "bg-normalbg text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
          {selectedDate && (
            <div>
              <label className="block text-gray-300 mb-2">
                <span className="text-red-500">*</span> Select Time Slot
              </label>
              <div className="flex gap-4 justify-center mt-2">
                {timeSlots
                  .find((group) => group.label === selectedDate)
                  ?.options.map((slot) => {
                    const value = `${selectedDate}: ${slot}`;
                    const booked = slotAvailability[value] || 0;
                    const remaining = 45 - booked;
                    let displayRemaining = "";
                    if (remaining <= 0) {
                      displayRemaining = "Booking is Full";
                    } else if (remaining > 10) {
                      displayRemaining = "";
                    } else {
                      displayRemaining = `${remaining} guests remaining`;
                    }
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          setSelectedTimeSlot(slot);
                          setFormData((prev) => ({
                            ...prev,
                            time_slot: value,
                          }));
                        }}
                        disabled={remaining <= 0}
                        className={`p-2 rounded-lg font-sans border transition-colors ${
                          selectedTimeSlot === slot
                            ? "bg-normalbg text-white"
                            : "bg-gray-800 text-white"
                        } ${
                          remaining <= 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span>{slot}</span>
                          <span className="text-xs p-1 font-semibold">
                            {displayRemaining}
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
              {errors.time_slot && (
                <p className="mt-1 text-sm text-red-500">{errors.time_slot}</p>
              )}
            </div>
          )}

          {/* Number of Guests */}
          <div>
            <label htmlFor="guests" className="block text-gray-300 mb-2">
              <span className="text-red-500">*</span> Number of Guests
            </label>
            <input
              id="guests"
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter number of guests"
            />
            {errors.guests && (
              <p className="mt-1 text-sm text-red-500">{errors.guests}</p>
            )}
          </div>

          {/* Message (Optional) */}
          <div>
            <label htmlFor="message" className="block text-gray-300 mb-2">
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please mention kids seats requirements or Any other special requests"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              rows="4"
            ></textarea>
          </div>

          <p className="font-semibold text-lg text-red-700 p-3">Note: We are accepting only cash.</p>

          <button
            type="submit"
            disabled={isPending}
            className="w-full p-3 rounded-lg bg-normalbg text-white font-semibold text-lg hover:bg-rose-600 transition"
          >
            {isPending ? "Reserving..." : "Reserve Now"}
          </button>
        </form>
        {feedback && (
          <div className="mt-4 text-center text-green-500 font-medium">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
