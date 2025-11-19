import webpush from 'web-push';
import { supabase } from './supabase';

// Configure web-push with VAPID keys
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function sendPushNotification({ title, body, url, tag }) {
  try {
    // Fetch all push subscriptions from database
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*');

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return { success: false, error: error.message };
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No push subscriptions found');
      return { success: true, sent: 0 };
    }

    const payload = JSON.stringify({
      title,
      body,
      url: url || '/admin',
      tag: tag || 'admin-notification',
      icon: '/logo2.png',
      badge: '/logo2.png'
    });

    // Send to all subscribed devices
    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };

        try {
          await webpush.sendNotification(pushSubscription, payload);
          return { success: true, endpoint: sub.endpoint };
        } catch (err) {
          console.error('Error sending to subscription:', err);

          // Remove invalid subscriptions (expired or unsubscribed)
          if (err.statusCode === 410 || err.statusCode === 404) {
            await supabase
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', sub.endpoint);
            console.log('Removed invalid subscription:', sub.endpoint);
          }

          return { success: false, endpoint: sub.endpoint, error: err.message };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    console.log(`Push notifications sent: ${successful}/${subscriptions.length}`);

    return { success: true, sent: successful, total: subscriptions.length };
  } catch (error) {
    console.error('Error in sendPushNotification:', error);
    return { success: false, error: error.message };
  }
}
