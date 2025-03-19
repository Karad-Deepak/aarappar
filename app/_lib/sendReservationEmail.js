// lib/sendReservationEmail.js
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
 * Sends a reservation email notification to the admin.
 * @param {Object} reservation - The reservation object.
 */
export async function sendReservationEmail(data) {
  if (!data) {
    console.error("Reservation data is null; email notification not sent.");
    return;
  }
  // Destructure from 'data' (assuming the structure is the same)
  const {
    salutation,
    first_name,
    last_name,
    email,
    phone,
    time_slot,
    guests,
    message,
    id,
    created_at,
  } = data;

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.ADMIN_EMAIL,
    replyTo: email, // Reply-to directs responses to the user's email
    subject: `New Reservation: ${first_name} ${last_name}`,
    text: `A new reservation has been made.
  
Salutation: ${salutation}
Name: ${first_name} ${last_name}
Email: ${email}
Phone: ${phone}
Time Slot: ${time_slot}
Guests: ${guests}
Message: ${message}

Reservation ID: ${id}
Created At: ${new Date(created_at).toLocaleString()}`,
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
      <h2 style="color: #2c3e50;">New Reservation Received</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Salutation:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${salutation}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${first_name} ${last_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Time Slot:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${time_slot}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Guests:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${guests}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Reservation ID:</td>
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
    console.error("Error sending email:", error);
    throw error;
  }
}
