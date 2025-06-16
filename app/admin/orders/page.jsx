import { fetchOrders } from "@/app/lib/actions";
import OrdersTable from "@/app/admin/_components/OrdersTable";

export default async function AdminOrdersPage() {
  const orders = await fetchOrders();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Orders</h1>
      <OrdersTable initialOrders={orders} />
    </div>
  );
}
