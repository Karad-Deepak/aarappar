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

  // Format cart items for the email.
  // If cart_items is an array, format each item; otherwise, output directly.
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
    html: `<h2>New Pickup Order Received</h2>
           <p><strong>Customer Name:</strong> ${customer_name}</p>
           <p><strong>Customer Phone:</strong> ${customer_phone}</p>
           <p><strong>Cart Items:</strong><br/>
           ${
             Array.isArray(cart_items)
               ? cart_items
                   .map((item, index) => {
                     const itemName = item.item_name || `Item ${index + 1}`;
                     return `<div>${itemName} (Quantity: ${item.quantity}, Price: ${item.price})</div>`;
                   })
                   .join("")
               : cart_items
           }
           </p>
           <p><strong>Total Bill:</strong> ${total_bill}</p>
           <p><strong>Order Status:</strong> ${order_status}</p>
           <p><strong>Order ID:</strong> ${id}</p>
           <p><strong>Created At:</strong> ${new Date(
             created_at
           ).toLocaleString()}</p>`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Pickup order email sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending pickup order email:", error);
    throw error;
  }
}
