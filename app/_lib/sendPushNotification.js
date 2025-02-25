// lib/sendPushNotification.js
import admin from "firebase-admin";
import { createClient } from "@supabase/supabase-js";

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace literal "\n" with actual newlines in your key
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// Initialize Supabase client to retrieve tokens
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Send a push notification to a single token.
 * @param {string} token - The FCM token.
 * @param {Object} payload - Contains title, body, and optional data.
 */
async function sendNotificationToToken(token, payload) {
  const message = {
    token,
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: payload.data || {},
  };

  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    console.error("Error sending notification to token:", token, error);
  }
}

/**
 * Retrieve all admin tokens from Supabase and send notifications.
 * @param {Object} payload - Notification payload.
 */
export async function sendPushNotificationsToAll(payload) {
  // Retrieve all tokens from the admin_tokens table
  const { data: tokens, error } = await supabase
    .from("admin_tokens")
    .select("token");

  if (error) {
    console.error("Error fetching admin tokens:", error);
    return;
  }

  if (!tokens || tokens.length === 0) {
    console.log("No admin tokens found.");
    return;
  }

  // Send notification to each token
  const sendPromises = tokens.map((tokenObj) =>
    sendNotificationToToken(tokenObj.token, payload)
  );

  return Promise.all(sendPromises);
}
