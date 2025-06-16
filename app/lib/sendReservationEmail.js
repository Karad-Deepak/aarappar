import nodemailer from "nodemailer";
import aws from "aws-sdk";

// AWS configuration
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: "2010-12-01" }),
});

/**
 * Sends a reservation email notification to the admin.
 * @param {Object} data - The reservation object.
 */
export async function sendReservationEmail(data) {
  if (!data) {
    console.error("Reservation data is null; email notification not sent.");
    return;
  }

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
    replyTo: email,
    subject: `New Reservation from ${first_name} ${last_name}`,
    text: `New reservation details:
    
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
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 20px; color: #333;">
        <div style="max-width: 700px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
          <div style="background-color: #d32f2f; padding: 20px 24px;">
            <h2 style="margin: 0; color: #fff;">🍽️ New Table Reservation</h2>
          </div>
          <div style="padding: 24px;">
            <p style="margin-bottom: 16px;">A new reservation has been made. Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Salutation</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${salutation}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${first_name} ${last_name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Time Slot</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${time_slot}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Guests</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${guests}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; white-space: pre-line;">${message}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #eee;">Reservation ID</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${id}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold;">Created At</td>
                <td style="padding: 12px;">${new Date(
                  created_at
                ).toLocaleString()}</td>
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
    console.error("Error sending reservation email:", error);
    throw error;
  }
}
