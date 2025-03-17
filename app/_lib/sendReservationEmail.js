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
    // You can also add an HTML version if desired:
    html: `<h2>New Reservation Received</h2>
           <p><strong>Salutation:</strong> ${salutation}</p>
           <p><strong>Name:</strong> ${first_name} ${last_name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Time Slot:</strong> ${time_slot}</p>
           <p><strong>Guests:</strong> ${guests}</p>
           <p><strong>Message:</strong> ${message}</p>
           <p><strong>Reservation ID:</strong> ${id}</p>
           <p><strong>Created At:</strong> ${new Date(
             created_at
           ).toLocaleString()}</p>`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);

    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
