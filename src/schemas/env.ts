import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  EMAIL_SENDER_USER: z.string().email(),
  EMAIL_SENDER_PASSWORD: z.string(),
  EMAIL_SENDER_SERVICE: z.string(),
});

const env = envSchema.parse(process.env);

export { env };
