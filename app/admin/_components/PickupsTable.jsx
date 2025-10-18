"use client";

import { useState } from "react";
import { updatePickupStatus } from "@/app/lib/actions";
import { format, isToday, parseISO } from "date-fns";

export default function PickupsTable({ initialPickups }) {
  const [pickups, setPickups] = useState(initialPickups);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [filterClicked, setFilterClicked] = useState(false);

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

  const handleFilterSelect = (e) => {
    setFilterClicked(true);
    setStatusFilter(e.target.value);
  };

  // Filter orders based on the current status filter
  const filteredPickups = pickups.filter((order) => {
    if (statusFilter === "all") return true;

    if (statusFilter === "pending") {
      if (!filterClicked) {
        // Default view: only today's pending orders
        const orderDate = parseISO(order.created_at);
        return order.order_status === "pending" && isToday(orderDate);
      }
      // After clicking "Pending": show all pending orders
      return order.order_status === "pending";
    }

    return order.order_status === statusFilter;
  });

  if (!pickups || pickups.length === 0) {
    return <p>No pickup orders found.</p>;
  }

  return (
    <div className="px-2 md:px-4">
      {/* Filter selection */}
      <div className="mb-2 md:mb-4">
        <label htmlFor="statusFilter" className="mr-2 text-sm md:text-base text-gray-900">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleFilterSelect}
          className="p-1 border border-gray-300 rounded text-gray-900 bg-white text-sm md:text-base"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="all">All</option>
        </select>
      </div>

      {filteredPickups.length === 0 ? (
        <p className="text-sm md:text-base text-gray-900">
          No pickup orders found for status "{statusFilter}".
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-gray-900 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">ID</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                  Customer Name
                </th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">Phone</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">Items</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">Total</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">Status</th>
                <th className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPickups.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                    {order.id}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                    {order.customer_name}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                    {order.customer_phone}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                    {Array.isArray(order.cart_items)
                      ? order.cart_items
                          .map((item) => `${item.item_name} (${item.quantity})`)
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                    €{parseFloat(order.total_bill).toFixed(2)}
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                    <select
                      value={order.order_status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="p-1 border border-gray-300 rounded bg-white text-sm md:text-base text-gray-900"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-1 md:py-2 px-2 md:px-4 border-b border-gray-300">
                    {order.created_at
                      ? format(parseISO(order.created_at), "dd/MM/yyyy HH:mm")
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
