import nodemailer from "nodemailer";
import aws from "aws-sdk";

// AWS SDK config
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create transporter using SES
const transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: "2010-12-01" }),
});

/**
 * Sends a beautifully formatted catering enquiry email.
 * @param {Object} data - The catering enquiry data.
 */
export async function sendEnquiryEmail(data) {
  if (!data) {
    console.error("Enquiry data is missing.");
    return;
  }

  const { name, phone, message } = data;

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Catering Enquiry from ${name}`,
    replyTo: process.env.REPLY_TO_EMAIL || undefined,
    text: `New Catering Enquiry:\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="background-color: #d32f2f; padding: 16px 24px;">
            <h2 style="margin: 0; color: #fff;">🍽️ New Catering Enquiry</h2>
          </div>
          <div style="padding: 24px;">
            <p style="margin: 0 0 16px;">You've received a new catering enquiry with the following details:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; white-space: pre-line;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f1f1f1; padding: 16px 24px; text-align: center; font-size: 12px; color: #777;">
            AARAPPAR Indisches Restaurant  • Rödelheim, Frankfurt
          </div>
        </div>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending catering enquiry email:", error);
    throw error;
  }
}
