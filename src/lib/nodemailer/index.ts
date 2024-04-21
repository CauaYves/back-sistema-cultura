import { env } from "@/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: env.EMAIL_SENDER_SERVICE,
  auth: {
    user: env.EMAIL_SENDER_USER,
    pass: env.EMAIL_SENDER_PASSWORD,
  },
});

async function sendEmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: env.EMAIL_SENDER_USER,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions);
}

export { sendEmail };
