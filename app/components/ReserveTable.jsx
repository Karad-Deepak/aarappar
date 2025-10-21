"use client";

import { useState, useTransition, useEffect } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { submitReservation, fetchSlotAvailability } from "@/app/lib/actions";
import { useTranslations } from "next-intl";

export default function ReserveTable() {
  const t = useTranslations("ReservationPage");

  const salutations = [
    { value: "Mr", label: t("form.salutation.options.mr") },
    { value: "Ms", label: t("form.salutation.options.ms") },
    { value: "Mrs", label: t("form.salutation.options.mrs") }
  ];

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
  const [selectedDate, setSelectedDate] = useState(null); // Date object
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
    const intervalId = setInterval(getAvailability, 60000); // refresh every 60s
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
    if (!formData.salutation) newErrors.salutation = t("validation.salutationRequired");
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("validation.firstNameRequired");
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = t("validation.firstNameMinLength");
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("validation.lastNameRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = t("validation.emailInvalid");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("validation.phoneRequired");
    } else if (
      !/^\+?[0-9 ]{7,20}$/.test(formData.phone.trim()) ||
      formData.phone.replace(/[^0-9]/g, "").length < 7
    ) {
      newErrors.phone = t("validation.phoneInvalid");
    }
    if (!formData.time_slot) {
      newErrors.time_slot = t("validation.timeSlotRequired");
    }
    if (!formData.guests || Number(formData.guests) < 1) {
      newErrors.guests = t("validation.guestsRequired");
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
        setFeedback(t("success"));
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
        setSelectedDate(null);
        setSelectedTimeSlot("");
        setErrors({});
      } catch (error) {
        console.error(error);
        setFeedback(t("error"));
      }
    });
  }

  // Determine available time slots based on the selected date
  const getTimeSlots = (date) => {
    if (!date) return [];
    const day = date.getDay(); // 0: Sunday, 1: Monday, 2-5: Tue-Fri, 6: Saturday
    if (day === 1) return []; // Closed on Mondays
    if (day >= 2 && day <= 4) return ["18:00 to 20:00", "20:00 to 22:00"];
    if (day === 5)
      return ["17:30 to 19:00", "19:00 to 20:30", "20:30 to 22:00"];
    if (day === 0 || day === 6)
      return [
        "12:00 to 13:30",
        "13:30 to 14:30",
        "17:30 to 19:00",
        "19:00 to 20:30",
        "20:30 to 22:00",
      ];
    return [];
  };

  const timeSlots = getTimeSlots(selectedDate);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-white px-6 py-12">
      <div className="max-w-3xl w-full p-8 bg-gray-900 rounded-2xl shadow-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl text-normalbg font-bold text-center mb-6"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-center mb-8"
        >
          {t("subtitle")}
        </motion.p>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Salutation, First Name, Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="salutation" className="block text-gray-300 mb-2">
                <span className="text-red-500">*</span> {t("form.salutation.label")}
              </label>
              <select
                id="salutation"
                name="salutation"
                value={formData.salutation}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              >
                <option value="">{t("form.salutation.placeholder")}</option>
                {salutations.map((sal) => (
                  <option key={sal.value} value={sal.value}>
                    {sal.label}
                  </option>
                ))}
              </select>
              {errors.salutation && (
                <p className="mt-1 text-sm text-red-500">{errors.salutation}</p>
              )}
            </div>
            <div>
              <label htmlFor="firstName" className="block text-gray-300 mb-2">
                <span className="text-red-500">*</span> {t("form.firstName.label")}
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
                placeholder={t("form.firstName.placeholder")}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-300 mb-2">
                <span className="text-red-500">*</span> {t("form.lastName.label")}
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
                placeholder={t("form.lastName.placeholder")}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              <span className="text-red-500">*</span> {t("form.email.label")}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder={t("form.email.placeholder")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-2">
              <span className="text-red-500">*</span> {t("form.phone.label")}
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder={t("form.phone.placeholder")}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Calendar for Date Selection */}
          <div>
            <label className="block text-gray-300 mb-2">
              <span className="text-red-500">*</span> {t("form.date.label")}
            </label>
            <div className="bg-gray-800 p-3 rounded-lg">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTimeSlot("");
                  // Reset the selected time slot in formData when date changes
                  setFormData((prev) => ({ ...prev, time_slot: "" }));
                }}
                minDate={new Date()}
                dateFormat="dd MMM yyyy"
                // Disable Mondays (restaurant closed)
                filterDate={(date) => date.getDay() !== 1}
                // Visually strike Mondays in the calendar
                dayClassName={(date) =>
                  date.getDay() === 1
                    ? "line-through opacity-50 pointer-events-none"
                    : undefined
                }
                // Add strike-through to the day number as well
                renderDayContents={(day, date) => (
                  <span
                    className={date.getDay() === 1 ? "line-through" : undefined}
                  >
                    {day}
                  </span>
                )}
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
                placeholderText={t("form.date.placeholder")}
              />
            </div>
            {selectedDate && selectedDate.getDay() === 1 && (
              <p className="mt-2 text-red-500 text-center">
                {t("form.mondayClosed")}
              </p>
            )}
          </div>

          {/* Time Slot Selection */}
          {selectedDate && selectedDate.getDay() !== 1 && (
            <div>
              <label className="block text-gray-300 mb-2">
                <span className="text-red-500">*</span> {t("form.timeSlot.label")}
              </label>
              {timeSlots.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-center mt-2">
                  {timeSlots.map((slot) => {
                    const value = `${selectedDate.toLocaleDateString(
                      "en-GB"
                    )}: ${slot}`;
                    const booked = slotAvailability[value] || 0;
                    const remaining = 25 - booked;
                    let displayRemaining = "";
                    if (remaining <= 0) {
                      displayRemaining = t("form.timeSlot.bookingFull");
                    } else if (remaining <= 10) {
                      displayRemaining = t("form.timeSlot.guestsRemaining", { count: remaining });
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
                        className={`p-2 rounded-lg border transition-colors ${
                          selectedTimeSlot === slot
                            ? "bg-normalbg text-white"
                            : "bg-gray-800 text-white"
                        } ${
                          remaining <= 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span>{slot}</span>
                          {displayRemaining && (
                            <span className="text-xs p-1 font-semibold">
                              {displayRemaining}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-2 text-center text-gray-400">
                  {t("form.timeSlot.noSlots")}
                </p>
              )}
              {errors.time_slot && (
                <p className="mt-1 text-sm text-red-500">{errors.time_slot}</p>
              )}
            </div>
          )}

          {/* Number of Guests */}
          <div>
            <label htmlFor="guests" className="block text-gray-300 mb-2">
              <span className="text-red-500">*</span> {t("form.guests.label")}
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
              placeholder={t("form.guests.placeholder")}
            />
            {errors.guests && (
              <p className="mt-1 text-sm text-red-500">{errors.guests}</p>
            )}
          </div>

          {/* Message (Optional) */}
          <div>
            <label htmlFor="message" className="block text-gray-300 mb-2">
              {t("form.message.label")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("form.message.placeholder")}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full p-3 rounded-lg bg-normalbg text-white font-semibold text-lg hover:bg-rose-600 transition"
          >
            {isPending ? t("form.submit.loading") : t("form.submit.button")}
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
