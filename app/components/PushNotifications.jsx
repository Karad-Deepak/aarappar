// components/PushNotifications.jsx
"use client";

import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "@/firebase-config";

export default function PushNotifications() {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              // Save token to your backend
              fetch("/api/save-token", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: currentToken }),
              })
                .then((res) => res.json())
                .then((data) => console.log("Token saved:", data))
                .catch((err) => console.error("Error saving token:", err));
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((err) => {
            console.error("Error retrieving token: ", err);
          });
      } else {
        console.log("Permission not granted for notifications.");
      }
    });

    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
      // Optionally display a toast notification here.
    });
  }, []);

  return null;
}
