import { env } from "@/config";
import { transporter } from "./schema";

async function sendEmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: env.EMAIL_SENDER_USER,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions);
}

export const nodemailerService = { sendEmail };
