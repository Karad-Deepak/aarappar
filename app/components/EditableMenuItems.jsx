// components/EditableMenuItem.jsx
"use client";

import { useState, useTransition } from "react";
import { updateMenuItem } from "@/app/_lib/actions";

export default function EditableMenuItem({ item }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(async () => {
      try {
        const result = await updateMenuItem(formData);
        setMessage(result.message);
      } catch (err) {
        setMessage("Update failed: " + err.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow mb-4">
      <input type="hidden" name="id" value={item.id} />
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300">
          Item Name
        </label>
        <input
          type="text"
          name="item_name"
          defaultValue={item.item_name}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300">
          Price (€)
        </label>
        <input
          type="number"
          step="0.01"
          name="price"
          defaultValue={item.price}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={item.description}
          className="w-full p-2 bg-gray-800 text-white rounded"
        ></textarea>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300">
          Category
        </label>
        <input
          type="text"
          name="category"
          defaultValue={item.category}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300">
          Subcategory
        </label>
        <input
          type="text"
          name="subcategory"
          defaultValue={item.subcategory}
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
      {message && <div className="mt-2 text-green-500">{message}</div>}
    </form>
  );
}
