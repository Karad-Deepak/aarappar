// lib/sendReservationConfirmationEmail.js
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
 * Sends a reservation confirmation email to the user.
 * @param {Object} data - The reservation object from the database.
 */
export async function sendReservationConfirmationEmail(data) {
  if (!data) {
    console.error("Reservation data is null; confirmation email not sent.");
    return;
  }

  const {
    salutation,
    first_name,
    last_name,
    email,
    time_slot,
    guests,
    id,
    created_at,
  } = data;

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email, // Send confirmation to the user
    subject: `Reservation Confirmed: ${first_name} ${last_name}`,
    text: `Dear ${salutation} ${first_name} ${last_name},

Your reservation has been confirmed with the following details:
Time Slot: ${time_slot}
Guests: ${guests}
Reservation ID: ${id}
Created At: ${new Date(created_at).toLocaleString()}

Thank you for choosing our restaurant!

Best regards,
Your Restaurant Team`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #ff0000;">Reservation Confirmed!</h2>
        <p>Dear ${salutation} ${first_name} ${last_name},</p>
        <p>Your reservation has been confirmed. Below are your reservation details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Time Slot:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${time_slot}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Guests:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${guests}</td>
          </tr>
         
        </table>
        <p>If you have any questions or need to modify your reservation, please contact us.</p>
        <p>We look forward to welcoming you!</p>
        <p>Best regards,<br>AARAPPAR Indisches Restaurant</p>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
}
