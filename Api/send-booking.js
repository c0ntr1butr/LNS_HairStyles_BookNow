const twilio = require("twilio");

const OWNER_PHONE = "whatsapp:+919701326265";
const CO_OWNER_PHONE = "whatsapp:+918374794192";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const {
      name,
      phone,
      service,
      date,
      time,
      message
    } = req.body;

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const bookingMessage = `New Appointment Request - LNS HairStyles

Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${date}
Time: ${time}
Message: ${message || "No special request"}

Reply:
YES - to confirm
NO 1 hour - to suggest after 1 hour
NO 2 hours - to suggest after 2 hours
or reply with updated time like 6:30 PM`;

    const recipients = [OWNER_PHONE, CO_OWNER_PHONE];

    await Promise.all(
      recipients.map((to) =>
        client.messages.create({
          from: process.env.TWILIO_WHATSAPP_FROM,
          to,
          body: bookingMessage
        })
      )
    );

    return res.status(200).json({
      success: true,
      message: "WhatsApp messages sent to owner and co-owner"
    });
  } catch (error) {
    console.error("Twilio error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send WhatsApp message",
      error: error.message
    });
  }
};