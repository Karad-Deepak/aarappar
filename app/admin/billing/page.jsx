"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Adjust the import as needed
import { fetchMenuItems } from "@/app/_lib/actions"; // Your provided fetch function

function BillingSystem() {
  const [tableNo, setTableNo] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [extraNotes, setExtraNotes] = useState("");
  const [extraPrice, setExtraPrice] = useState(0);
  const [total, setTotal] = useState(0);

  // Load menu items on mount
  useEffect(() => {
    async function getItems() {
      const items = await fetchMenuItems();
      setMenuItems(items);
    }
    getItems();
  }, []);

  // Filter items as the admin types in the search box
  useEffect(() => {
    if (searchQuery) {
      const results = menuItems.filter((item) =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery, menuItems]);

  // Calculate total bill every time items or extra price changes
  useEffect(() => {
    const itemsTotal = billItems.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    setTotal(itemsTotal + parseFloat(extraPrice || 0));
  }, [billItems, extraPrice]);

  // Add a selected menu item to the bill
  const addItemToBill = (item) => {
    setBillItems([...billItems, item]);
  };

  // Handle saving the invoice to Supabase and trigger print
  const handleCreateBill = async () => {
    const invoiceData = {
      table_no: tableNo,
      items: billItems,
      extra_notes: extraNotes,
      extra_price: extraPrice,
      total,
      created_at: new Date(),
    };

    const { data, error } = await supabase
      .from("invoices")
      .insert([invoiceData]);

    if (error) {
      console.error("Error creating invoice:", error);
      return;
    }

    // After saving, trigger print (or navigate to a dedicated print page)
    window.print();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-darkbg shadow-md rounded p-6"
      >
        <h1 className="text-2xl font-bold mb-4">Billing System</h1>

        {/* Table Number Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Table Number</label>
          <input
            type="text"
            value={tableNo}
            onChange={(e) => setTableNo(e.target.value)}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search and Add Items */}
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
            onClick={() => {
              // Focus on the search box when "Add Items" is clicked (if needed)
              document.getElementById("search-box")?.focus();
            }}
          >
            Add Items
          </button>
          <input
            id="search-box"
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {filteredItems.length > 0 && (
            <ul className="border rounded mt-2 max-h-60 overflow-auto">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span>
                    {item.item_name} - ${item.price}
                  </span>
                  <button
                    onClick={() => addItemToBill(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Display Bill Items */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Bill Items</h2>
          {billItems.length === 0 ? (
            <p className="text-gray-600">No items added.</p>
          ) : (
            <ul>
              {billItems.map((item, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                  <span>{item.item_name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Extra Items / Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Extra Items / Notes
          </label>
          <textarea
            value={extraNotes}
            onChange={(e) => setExtraNotes(e.target.value)}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Additional details..."
          />
          <input
            type="number"
            placeholder="Extra Price"
            value={extraPrice}
            onChange={(e) => setExtraPrice(e.target.value)}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total and Actions */}
        <div className="mb-4">
          <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCreateBill}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
          >
            Create Bill
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Print
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default BillingSystem;
