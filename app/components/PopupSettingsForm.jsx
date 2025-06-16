// components/PopupSettingsForm.jsx
"use client";

import { useState, useTransition } from "react";
import { updatePopupSettings } from "@/app/lib/actions";

export default function PopupSettingsForm({ popup }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(async () => {
      try {
        const result = await updatePopupSettings(formData);
        setMessage(result.message);
      } catch (error) {
        setMessage("Update failed: " + error.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" defaultValue={popup ? popup.id : ""} />
      <div>
        <label className="block font-medium text-gray-300">Popup Content</label>
        <textarea
          name="content"
          defaultValue={popup ? popup.content : ""}
          className="w-full p-2 bg-gray-800 text-white rounded h-[45vh]"
          rows="4"
        ></textarea>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="active"
            defaultChecked={popup ? popup.active : false}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-300">Active</span>
        </label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
      {message && <div className="mt-2 text-green-400">{message}</div>}
    </form>
  );
}
