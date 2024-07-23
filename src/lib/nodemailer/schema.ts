import { env } from "@/config";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: env.EMAIL_SENDER_SERVICE,
  auth: {
    user: env.EMAIL_SENDER_USER,
    pass: env.EMAIL_SENDER_PASSWORD,
  },
});
