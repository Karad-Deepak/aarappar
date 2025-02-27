"use client";

import { useEffect } from "react";
import Nav from "../components/Nav";
import confetti from "canvas-confetti";

export default function OrderConfirmation() {
  useEffect(() => {
    // Trigger confetti on page load
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
      gravity: 0.5,
    });
  }, []);

  return (
    <div className="min-h-screen bg-lightbg flex flex-col items-center justify-center relative">
      <Nav />
      <div className="p-8 bg-darkbg rounded-lg shadow-2xl text-center max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-normalbg">
          Thank you for your order!
        </h1>
        <p className="text-lg sm:text-xl text-white">
          Your order has been submitted successfully. We will connect with you
          shortly.
        </p>
      </div>
    </div>
  );
}
