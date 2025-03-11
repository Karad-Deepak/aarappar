"use client";

import { useState } from "react";
import { updatePickupStatus } from "@/app/_lib/actions";
import { format } from "date-fns";

export default function PickupsTable({ initialPickups }) {
  const [pickups, setPickups] = useState(initialPickups);
  const [statusFilter, setStatusFilter] = useState("pending");

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updatePickupStatus(orderId, newStatus);
      setPickups((prevPickups) =>
        prevPickups.map((order) =>
          order.id === orderId ? { ...order, order_status: newStatus } : order
        )
      );
    } catch (error) {
      alert("Error updating pickup order: " + error.message);
    }
  };

  // Filter orders based on the current status filter.
  const filteredPickups = pickups.filter((order) => {
    if (statusFilter === "all") return true;
    return order.order_status === statusFilter;
  });

  if (!pickups || pickups.length === 0) {
    return <p>No pickup orders found.</p>;
  }

  return (
    <div className="px-2 md:px-4">
      {/* Filter selection */}
      <div className="mb-2 md:mb-4">
        <label htmlFor="statusFilter" className="mr-2 text-sm md:text-base">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-1 border rounded text-darkbg text-sm md:text-base"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="all">All</option>
        </select>
      </div>

      {filteredPickups.length === 0 ? (
        <p className="text-sm md:text-base">
          No pickup orders found for status "{statusFilter}".
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-200 text-white text-sm md:text-base">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-1 md:py-2 px-2 md:px-4 border-b">ID</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b">
                  Customer Name
                </th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b">Phone</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b">Items</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b">Total</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b">Status</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPickups.map((order) => (
                <tr key={order.id} className="hover:bg-gray-950">
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b">
                    {order.id}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b">
                    {order.customer_name}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b">
                    {order.customer_phone}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b">
                    {Array.isArray(order.cart_items)
                      ? order.cart_items
                          .map((item) => item.item_name)
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b">
                    €{parseFloat(order.total_bill).toFixed(2)}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b">
                    <select
                      value={order.order_status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="p-1 border rounded text-sm md:text-base text-darkbg"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b">
                    {order.created_at
                      ? format(new Date(order.created_at), "dd/MM/yyyy HH:mm")
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
