"use client";

import { useState, useTransition } from "react";
import { updateMenuItem, deleteMenuItem } from "@/app/_lib/actions";

export default function EditableMenuItem({ item }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(async () => {
      try {
        const result = await updateMenuItem(formData);
        setMessage(result.message);
        setIsEditing(false);
      } catch (err) {
        setMessage("Update failed: " + err.message);
      }
    });
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    startTransition(async () => {
      try {
        const result = await deleteMenuItem(item.id);
        setMessage(result.message);
        // Optionally, you could remove the item from the UI or trigger a refresh.
      } catch (err) {
        setMessage("Delete failed: " + err.message);
      }
    });
  };

  if (isEditing) {
    return (
      <div className="w-full  px-2 mb-4">
        <form
          onSubmit={handleSubmit}
          className="p-3 lg:p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg"
        >
          <input type="hidden" name="id" value={item.id} />
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-200 mb-1">
              Item Name
            </label>
            <input
              type="text"
              name="item_name"
              defaultValue={item.item_name}
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-200 mb-1">
              Price (€)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              defaultValue={item.price}
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-200 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={item.description}
              rows="4"
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-200 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              defaultValue={item.category}
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-200 mb-1">
              Subcategory
            </label>
            <input
              type="text"
              name="subcategory"
              defaultValue={item.subcategory}
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end items-center space-x-2 lg:space-x-5">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded transition duration-200 ease-in-out"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition duration-200 ease-in-out"
            >
              Delete
            </button>
          </div>
          {message && (
            <div className="mt-4 text-green-500 text-center">{message}</div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="w-full  px-2 mb-4">
      <div
        onClick={() => setIsEditing(true)}
        className="relative cursor-pointer p-4 bg-gray-900 border border-gray-700 rounded-lg shadow hover:bg-gray-800"
      >
        <h3 className="text-xl text-gray-200">{item.item_name}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
      {message && (
        <div className="mt-2 text-green-500 text-center">{message}</div>
      )}
    </div>
  );
}
