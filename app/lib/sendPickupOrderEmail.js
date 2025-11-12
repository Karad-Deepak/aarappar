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

// Formats a numeric amount into EUR currency for a better email presentation
function formatCurrency(amount) {
  const numericAmount =
    typeof amount === "number" ? amount : parseFloat(amount || 0);
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  } catch {
    // Fallback if Intl fails for any reason
    return `€${numericAmount.toFixed(2)}`;
  }
}

// Maps a technical payment method to a friendly label for emails
function getFriendlyPaymentMethod(method) {
  if (!method) return "N/A";
  const key = String(method).toLowerCase();
  const mapping = {
    cash: "Cash at Pickup",
    card: "Card at Pickup",
    paypal: "PayPal",
    sparkasse: "Sparkasse Überweisung",
  };
  if (mapping[key]) return mapping[key];
  // Generic title-casing fallback
  return String(method)
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function escapeHtml(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
    id,
    payment_method,
    transaction_id,
    notes,
  } = data;

  const formattedCartItemsText = Array.isArray(cart_items)
    ? cart_items
        .map((item, index) => {
          const name = item.item_name || `Item ${index + 1}`;
          const qty = Number(item.quantity || 0);
          const price = Number(item.price || 0);
          const subtotal = price * qty;
          return `- ${name}  |  Qty: ${qty}  |  Price: ${formatCurrency(
            price
          )}  |  Subtotal: ${formatCurrency(subtotal)}`;
        })
        .join("\n")
    : `- ${String(cart_items || "").trim()}`;

  const itemsTableRows = Array.isArray(cart_items)
    ? cart_items
        .map((item, index) => {
          const name = item.item_name || `Item ${index + 1}`;
          const qty = Number(item.quantity || 0);
          const price = Number(item.price || 0);
          const subtotal = price * qty;
          return `
              <tr>
                <td style="padding:10px 12px; border-bottom:1px solid #eee;">${name}</td>
                <td style="padding:10px 12px; border-bottom:1px solid #eee; text-align:center;">${qty}</td>
                <td style="padding:10px 12px; border-bottom:1px solid #eee; text-align:right;">${formatCurrency(
                  price
                )}</td>
                <td style="padding:10px 12px; border-bottom:1px solid #eee; text-align:right; font-weight:600;">${formatCurrency(
                  subtotal
                )}</td>
              </tr>`;
        })
        .join("")
    : `
              <tr>
                <td style=\"padding:10px 12px; border-bottom:1px solid #eee;\" colspan=\"4\">${String(
                  cart_items || ""
                ).trim()}</td>
              </tr>`;

  const friendlyPaymentMethod = getFriendlyPaymentMethod(payment_method);
  const formattedTotal = formatCurrency(total_bill);
  const formattedNotesText =
    typeof notes === "string" && notes.trim().length > 0
      ? notes.trim()
      : "No additional notes provided.";
  const formattedNotesHtml =
    typeof notes === "string" && notes.trim().length > 0
      ? escapeHtml(notes.trim()).replace(/\r?\n/g, "<br />")
      : "<span style=\"color:#6b7280;\">No additional notes provided.</span>";
  const transactionRow = transaction_id
    ? `
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Transaction ID</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><code style="background:#f6f8fa; padding:2px 6px; border-radius:4px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${transaction_id}</code></td>
              </tr>
            `
    : "";

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Pickup Order from ${customer_name}`,
    replyTo: customer_email,
    text: `Aarappar - New Pickup Order\n\nCustomer: ${customer_name}\nPhone: ${customer_phone}\nEmail: ${customer_email}\nTotal: ${formattedTotal}\nPayment Method: ${friendlyPaymentMethod}${
      transaction_id ? `\nTransaction ID: ${transaction_id}` : ""
    }\nNotes: ${formattedNotesText}\nItems:\n${formattedCartItemsText}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
        <div style="max-width: 700px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
          <div style="background-color: #d32f2f; padding: 20px 24px;">
            <h2 style="margin: 0; color: #fff; display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <span>🍽️ Aarappar • New Pickup Order</span>
              <span style="background: rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:#fff; padding:6px 10px; border-radius:8px; font-size:14px;">${formattedTotal}</span>
            </h2>
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
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${formattedTotal}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Payment Method</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                  <span style="display:inline-block; padding:4px 10px; border-radius:999px; background:#e3f2fd; color:#0d47a1; font-weight:600;">${friendlyPaymentMethod}</span>
                </td>
              </tr>
              ${transactionRow}
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Notes</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${formattedNotesHtml}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Order ID</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${id}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; vertical-align: top;">Cart Items</td>
                <td style="padding: 12px;">
                  <table style="width:100%; border-collapse: collapse;">
                    <tr style="background:#fafafa;">
                      <th style="text-align:left; padding:10px 12px; border-bottom:1px solid #eee;">Item</th>
                      <th style="text-align:center; padding:10px 12px; border-bottom:1px solid #eee;">Qty</th>
                      <th style="text-align:right; padding:10px 12px; border-bottom:1px solid #eee;">Price</th>
                      <th style="text-align:right; padding:10px 12px; border-bottom:1px solid #eee;">Subtotal</th>
                    </tr>
                    ${itemsTableRows}
                  </table>
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
