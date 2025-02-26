"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/app/_lib/actions";
import { format } from "date-fns";

export default function OrdersTable({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, order_status: newStatus } : order
        )
      );
    } catch (error) {
      alert("Error updating order: " + error.message);
    }
  };

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-lightbg border border-gray-200 text-darkbg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Items</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.customer_name}</td>
              <td className="py-2 px-4 border-b">{order.phone}</td>
              <td className="py-2 px-4 border-b">{order.address}</td>
              <td className="py-2 px-4 border-b">
                {Array.isArray(order.items)
                  ? order.items.map((item) => item.item_name).join(", ")
                  : "N/A"}
              </td>
              <td className="py-2 px-4 border-b">
                €{parseFloat(order.total).toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  value={order.order_status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b">
                {order.created_at
                  ? format(new Date(order.created_at), "dd/MM/yyyy HH:mm")
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
