// lib/sendPickupOrderEmail.js
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

  // Destructure the data with expected field names
  const {
    customer_name,
    customer_phone,
    cart_items,
    total_bill,
    order_status,
    id,
    created_at,
  } = data;

  // Format cart items for text version
  let formattedItems;
  if (Array.isArray(cart_items)) {
    formattedItems = cart_items
      .map((item, index) => {
        const itemName = item.item_name || `Item ${index + 1}`;
        return `${itemName} (Quantity: ${item.quantity}, Price: ${item.price})`;
      })
      .join("\n");
  } else {
    formattedItems = cart_items;
  }

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Pickup Order from ${customer_name}`,
    text: `A new pickup order has been received.
    
Customer Name: ${customer_name}
Customer Phone: ${customer_phone}
Cart Items:
${formattedItems}
Total Bill: ${total_bill}
Order Status: ${order_status}
Order ID: ${id}
Created At: ${new Date(created_at).toLocaleString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2c3e50;">New Pickup Order Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Customer Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${customer_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Customer Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${customer_phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Cart Items:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              ${
                Array.isArray(cart_items)
                  ? `<ul style="padding-left: 20px; margin: 0;">` +
                    cart_items
                      .map((item, index) => {
                        const itemName = item.item_name || `Item ${index + 1}`;
                        return `<li>${itemName} (Quantity: ${item.quantity}, Price: ${item.price})</li>`;
                      })
                      .join("") +
                    `</ul>`
                  : cart_items
              }
            </td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Total Bill:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${total_bill}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Order Status:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${order_status}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Order ID:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Created At:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date(
              created_at
            ).toLocaleString()}</td>
          </tr>
        </table>
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
