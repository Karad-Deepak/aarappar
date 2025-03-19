// lib/sendPickupOrderConfirmationEmail.js
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
 * Sends a pickup order confirmation email to the customer.
 * @param {Object} data - The pickup order object from the database.
 */
export async function sendPickupOrderConfirmationEmail(data) {
  if (!data) {
    console.error("Pickup order data is null; confirmation email not sent.");
    return;
  }

  // Destructure the data with expected field names
  const {
    customer_name,
    customer_email,
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
    to: customer_email, // Sends confirmation directly to the customer
    subject: `Pickup Order Confirmation - Order #${id}`,
    text: `Dear ${customer_name},

Thank you for placing your pickup order with us. Here are your order details:

Order ID: ${id}
Cart Items:
${formattedItems}
Total Bill: ${total_bill}
Order Status: ${order_status}
Order Placed At: ${new Date(created_at).toLocaleString()}

If you have any questions or need further assistance, please contact us.

Best regards,
Your Restaurant Team`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #ff0000;">Pickup Order Confirmation</h2>
        <p>Dear ${customer_name},</p>
        <p>Thank you for placing your pickup order with us. Below are your order details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Order ID:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${id}</td>
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
        
        </table>
        <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
        <p>Best regards,<br>AARAPPAR Indisches Restaurant</p>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending pickup order confirmation email:", error);
    throw error;
  }
}
