"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        // Increase quantity by one, keeping the price info from the item being added
        return prevCart.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                // Update price info in case discount changed
                price: item.price,
                original_price: item.original_price || item.price,
                discount_applied: item.discount_applied,
              }
            : i
        );
      }
      // Add item with initial quantity 1
      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          original_price: item.original_price || item.price,
        },
      ];
    });
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
