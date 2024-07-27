import { FileInfo } from "@/entities";
import { SignedUrl } from "@/services";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { S3 } from "./schema";

const URL_EXPIRATION_TIME = 600;

async function generatePostSignedUrl(fileInfo: FileInfo, bucketName: string) {
  const { name } = fileInfo;
  const fileKey = randomUUID().concat("-").concat(name);
  const signedUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    }),
    { expiresIn: URL_EXPIRATION_TIME },
  );
  const r2File = {
    ...fileInfo,
    key: fileKey,
  };
  const creatdSignedUrl: SignedUrl = { signedUrl, r2File };

  return creatdSignedUrl;
}

async function generateGetSignedUrl(bucketName: string, fileKey: string) {
  const signedUrl = await getSignedUrl(S3, new GetObjectCommand({ Bucket: bucketName, Key: fileKey }), {
    expiresIn: URL_EXPIRATION_TIME,
  });
  return signedUrl;
}

export const cloudflareService = { generatePostSignedUrl, generateGetSignedUrl };
export const buckets = { files: "files" };
export const directorys = { arquivos_de_classificacao: "arquivos_de_classificacao" };
