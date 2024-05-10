// eslint-disable-next-line boundaries/element-types
import { env } from "@/config";
import { CulturalUserPF, CulturalUserPJ, FileInfo } from "@/entities";
import { conflictError, forbiddenError, notFoundError } from "@/errors";
import { r2 } from "@/lib";
import { enrollmentRepository } from "@/repositories";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

export interface CulturalModelPJ extends CulturalUserPJ {
  userId: number;
  fileId: string;
}

export interface CulturalModelPF extends CulturalUserPF {
  userId: number;
  fileId: string;
}

async function generateSignedUrl(fileInfo: FileInfo) {
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
  return { signedUrl, r2File };
}

async function saveUserPj(
  culturalUser: CulturalModelPJ,
  fileInfo: FileInfo,
  userId: number
) {
  await checkIfAlreadyHaveUserPJ(userId);
  const { r2File, signedUrl } = await generateSignedUrl(fileInfo);
  const file = await enrollmentRepository.createFilePj(r2File);

  await enrollmentRepository.createCulturalAgentPj(
    culturalUser,
    userId,
    file.id
  );

  return { signedUrl, fileId: file.id };
}
async function checkIfAlreadyHaveUserPJ(userId: number) {
  const search = await enrollmentRepository.getUserCulturalPJById(userId);
  if (search) {
    throw forbiddenError(
      "Você já possui um cadastro de agente cultural como pessoa jurídica! "
    );
  }
}

async function saveUserPf(
  culturalUser: CulturalModelPF,
  fileInfo: FileInfo,
  userId: number
) {
  await checkIfAlreadyHaveUserPF(userId);
  const { r2File, signedUrl } = await generateSignedUrl(fileInfo);
  const file = await enrollmentRepository.createFilePf(r2File);

  await enrollmentRepository.createCulturalAgentPf(
    culturalUser,
    userId,
    file.id
  );

  return { signedUrl, fileId: file.id };
}
async function checkIfAlreadyHaveUserPF(userId: number) {
  const search = await enrollmentRepository.getUserCulturalPFById(userId);
  if (search) {
    throw forbiddenError(
      "Você já possui um cadastro de agente cultural como pessoa física! "
    );
  }
}

async function getPF(userId: number) {
  const userPF = await enrollmentRepository.getUserCulturalPFById(userId);
  if (!userPF) throw notFoundError();
  delete userPF.fileId;
  delete userPF.id;
  delete userPF.userId;
  delete userPF.createdAt;
  delete userPF.updatedAt;
  return userPF;
}

async function getPJ(userId: number) {
  const userPJ = await enrollmentRepository.getUserCulturalPJById(userId);
  if (!userPJ) throw notFoundError();
  delete userPJ.fileId;
  delete userPJ.id;
  delete userPJ.userId;
  delete userPJ.createdAt;
  delete userPJ.updatedAt;
  return userPJ;
}

const enrollmentService = {
  saveUserPj,
  saveUserPf,
  getPF,
  getPJ,
};
export { enrollmentService };
