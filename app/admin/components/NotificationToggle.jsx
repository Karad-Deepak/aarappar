"use client";

import { useState, useEffect } from "react";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { savePushSubscription, deletePushSubscription } from "@/app/lib/actions";

export default function NotificationToggle() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if push notifications are supported
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      checkSubscription();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (err) {
      console.error("Error checking subscription:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribe = async () => {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;

      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Notification permission denied");
        setIsLoading(false);
        return;
      }

      // Subscribe to push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });

      // Save to database
      const subscriptionJSON = subscription.toJSON();
      await savePushSubscription({
        endpoint: subscriptionJSON.endpoint,
        keys: {
          p256dh: subscriptionJSON.keys.p256dh,
          auth: subscriptionJSON.keys.auth,
        },
      });

      setIsSubscribed(true);
    } catch (err) {
      console.error("Error subscribing:", err);
      alert("Failed to enable notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async () => {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Delete from database
        await deletePushSubscription(subscription.endpoint);
        // Unsubscribe from browser
        await subscription.unsubscribe();
      }

      setIsSubscribed(false);
    } catch (err) {
      console.error("Error unsubscribing:", err);
      alert("Failed to disable notifications");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert VAPID key
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={isSubscribed ? unsubscribe : subscribe}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-xs font-medium border ${
        isSubscribed
          ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
          : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      title={isSubscribed ? "Notifications enabled - Click to disable" : "Enable notifications"}
    >
      {isLoading ? (
        <span className="animate-pulse">...</span>
      ) : isSubscribed ? (
        <>
          <FaBell className="w-4 h-4" />
          <span className="hidden lg:inline">Alerts On</span>
        </>
      ) : (
        <>
          <FaBellSlash className="w-4 h-4" />
          <span className="hidden lg:inline">Alerts Off</span>
        </>
      )}
    </button>
  );
}
