"use client";

import { useCart } from "./CartContext";

export default function QuantityControl({ item }) {
  const { cart, addToCart, decreaseQuantity } = useCart();
  const currentItem = cart.find((i) => i.id === item.id);
  const quantity = currentItem ? currentItem.quantity : 0;

  const handleAdd = () => {
    addToCart(item);
  };

  const handleDecrease = () => {
    decreaseQuantity(item.id);
  };

  return (
    <div>
      {quantity === 0 ? (
        <button
          disabled
          onClick={handleAdd}
          className="bg-red-500 hover:bg-rose-600 text-white font-bold py-1 px-3 rounded transition duration-200"
        >
          Add
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrease}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded transition duration-200"
          >
            –
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={handleAdd}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded transition duration-200"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
