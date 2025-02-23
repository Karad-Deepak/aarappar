// components/DeleteButton.jsx
"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id, deletionAction, children }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deletionAction(id);
        alert("Deletion successful!");
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Deletion failed: " + error.message);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      {children}
    </button>
  );
}
