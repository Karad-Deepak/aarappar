import nodemailer from "nodemailer";
import aws from "aws-sdk";

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: "2010-12-01" }),
});

/**
 * Sends a pickup order email notification to the admin.
 * @param {Object} data - The pickup order object from the database.
 */
export async function sendPickupOrderEmail(data) {
  if (!data) {
    console.error("Pickup order data is null; email notification not sent.");
    return;
  }

  const {
    customer_name,
    customer_phone,
    cart_items,
    customer_email,
    total_bill,
    order_status,
    id,
    created_at,
  } = data;

  const formattedCartItems = Array.isArray(cart_items)
    ? cart_items
        .map(
          (item, index) =>
            `<li><strong>${item.item_name || `Item ${index + 1}`}</strong><br>
             Quantity: ${item.quantity}, Price: ${item.price}</li>`
        )
        .join("")
    : `<li>${cart_items}</li>`;

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Pickup Order from ${customer_name}`,
    replyTo: customer_email,
    text: `New Pickup Order:\n\nCustomer: ${customer_name}\nPhone: ${customer_phone}\nEmail: ${customer_email}\nTotal: ${total_bill}\nStatus: ${order_status}\nCreated At: ${created_at}\nItems:\n${formattedCartItems}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
        <div style="max-width: 700px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
          <div style="background-color: #d32f2f; padding: 20px 24px;">
            <h2 style="margin: 0; color: #fff;">🥡 New Pickup Order Received</h2>
          </div>
          <div style="padding: 24px;">
            <p style="margin-bottom: 16px;">Here are the details of the new pickup order:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Customer Name</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${customer_name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${customer_phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${customer_email}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Total Bill</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">€${total_bill}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Order Status</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${order_status}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Order ID</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${id}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Created At</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${new Date(
                  created_at
                ).toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; vertical-align: top;">Cart Items</td>
                <td style="padding: 12px;">
                  <ul style="padding-left: 20px; margin: 0;">${formattedCartItems}</ul>
                </td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f1f1f1; padding: 16px 24px; text-align: center; font-size: 12px; color: #777;">
            Aarappar Indisches Restaurant • Rödelheim, Frankfurt
          </div>
        </div>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending pickup order email:", error);
    throw error;
  }
}
