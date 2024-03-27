// eslint-disable-next-line boundaries/element-types
import { env } from "@/config";
import { CulturalUser, FileInfo } from "@/entities";
import { conflictError, notFoundError } from "@/errors";
import { r2 } from "@/lib";
import { enrollmentRepository } from "@/repositories";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

export interface CulturalModel extends CulturalUser {
  userId: number;
  fileId: string;
}

async function getCulturalAgent(userId: number) {
  const user = await enrollmentRepository.getOneById(userId);
  if (!user) throw notFoundError();
  return user;
}

async function saveUser(
  culturalUser: CulturalModel,
  fileInfo: FileInfo,
  userId: number
) {
  await getExistentUserById(userId);

  const { name } = fileInfo;
  const fileKey = randomUUID().concat("-").concat(name);
  const URLexpirationTime = 600;
  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: fileKey,
    }),
    { expiresIn: URLexpirationTime }
  );
  const r2File = {
    ...fileInfo,
    key: fileKey,
  };
  const file = await enrollmentRepository.createFile(r2File);
  await enrollmentRepository.create(culturalUser, userId, file.id);

  return { signedUrl, fileId: file.id };
}

async function getExistentUserById(userId: number) {
  const user = await enrollmentRepository.getOneById(userId);
  if (user) throw conflictError("Usuário já cadastrado");
}

const enrollmentService = {
  saveUser,
  getCulturalAgent,
};
export { enrollmentService };
