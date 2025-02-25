"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { submitReservation } from "@/app/_lib/actions"; // Adjust the path as needed

export default function ReserveTable() {
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timeSlot: "",
    guests: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

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
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required.";
    else if (formData.firstName.trim().length < 2)
      newErrors.firstName = "First Name must be at least 2 characters.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required.";
    else if (!/^\+?\d{7,15}$/.test(formData.phone.trim()))
      newErrors.phone = "Invalid phone number.";
    if (!formData.timeSlot) newErrors.timeSlot = "Please select a time slot.";
    if (!formData.guests || Number(formData.guests) < 1)
      newErrors.guests = "At least one guest is required.";
    // Message is optional
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

    // Build FormData object from state
    const data = new FormData();
    data.append("salutation", formData.salutation);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("timeSlot", formData.timeSlot);
    data.append("guests", formData.guests);
    data.append("message", formData.message);

    startTransition(async () => {
      try {
        await submitReservation(data);
        setFeedback("Your reservation has been successfully submitted!");
        // Reset form data and calendar selection
        setFormData({
          salutation: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          timeSlot: "",
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

  // Time slot options arranged as calendar view
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

  // Salutation options
  const salutations = ["Mr", "Ms", "Mrs"];

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
                Salutation
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
                First Name
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
                Last Name
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
              Email
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
              <p className="mt-1 text-sm text-normalbg">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-2 ">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 font-sans text-white border  border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Calendar View for Time Slot */}
          <div>
            <label className="block text-gray-300 mb-2">Select Date</label>
            <div className="flex gap-4 justify-center">
              {timeSlots.map((group) => (
                <button
                  type="button"
                  key={group.label}
                  onClick={() => {
                    setSelectedDate(group.label);
                    setSelectedTimeSlot("");
                    setFormData((prev) => ({ ...prev, timeSlot: "" }));
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
                Select Time Slot
              </label>
              <div className="flex gap-4 justify-center mt-2">
                {timeSlots
                  .find((group) => group.label === selectedDate)
                  ?.options.map((slot) => {
                    const value = `${selectedDate}: ${slot}`;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          setSelectedTimeSlot(slot);
                          setFormData((prev) => ({
                            ...prev,
                            timeSlot: value,
                          }));
                        }}
                        className={`p-2 rounded-lg font-sans border transition-colors ${
                          selectedTimeSlot === slot
                            ? "bg-normalbg text-white"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
              </div>
              {errors.timeSlot && (
                <p className="mt-1 text-sm text-red-500">{errors.timeSlot}</p>
              )}
            </div>
          )}

          {/* Number of Guests */}
          <div>
            <label htmlFor="guests" className="block text-gray-300 mb-2">
              Number of Guests
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
              placeholder="Any special requests or additional information"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              rows="4"
            ></textarea>
          </div>

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
