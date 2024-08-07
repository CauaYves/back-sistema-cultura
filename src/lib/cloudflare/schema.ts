import { S3Client } from "@aws-sdk/client-s3";
import { env } from "process";

export const S3 = new S3Client({
  endpoint: env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: env.CLOUDFLARE_API_TOKEN,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
  region: "auto",
});
