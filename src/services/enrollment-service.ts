import { CulturalUserPF, CulturalUserPJ, FileInfo } from "@/entities";
import { forbiddenError, notFoundError } from "@/errors";
import { cloudflareService } from "@/lib";
import { enrollmentRepository } from "@/repositories";

export interface CulturalModelPJ extends CulturalUserPJ {
  userId: number;
  fileId: string;
}

export interface CulturalModelPF extends CulturalUserPF {
  userId: number;
  fileId: string;
}
export type R2File = {
  key: string;
  name: string;
  contentType: string;
};

export interface SignedUrl {
  signedUrl: string;
  r2File: R2File;
}

async function saveUserPj(culturalUser: CulturalModelPJ, fileInfo: FileInfo, userId: number) {
  await checkIfAlreadyHaveUserPJ(userId);
  const { r2File, signedUrl } = await cloudflareService.generatePostSignedUrl(fileInfo, "cadastros_pj");
  const file = await enrollmentRepository.createFilePj(r2File);

  await enrollmentRepository.createCulturalAgentPj(culturalUser, userId, file.id);

  return { signedUrl, fileId: file.id };
}
async function checkIfAlreadyHaveUserPJ(userId: number) {
  const search = await enrollmentRepository.getUserCulturalPJById(userId);
  if (search) {
    throw forbiddenError("Você já possui um cadastro de agente cultural como pessoa jurídica! ");
  }
}

async function saveUserPf(culturalUser: CulturalModelPF, fileInfo: FileInfo, userId: number) {
  await checkIfAlreadyHaveUserPF(userId);

  const { r2File, signedUrl } = await cloudflareService.generatePostSignedUrl(fileInfo, "cadastros_pf");
  const file = await enrollmentRepository.createFilePf(r2File);

  await enrollmentRepository.createCulturalAgentPf(culturalUser, userId, file.id);

  return { signedUrl, fileId: file.id };
}
async function checkIfAlreadyHaveUserPF(userId: number) {
  const search = await enrollmentRepository.getUserCulturalPFById(userId);
  if (search) {
    throw forbiddenError("Você já possui um cadastro de agente cultural como pessoa física! ");
  }
}

async function getPF(userId: number) {
  const userPF = await enrollmentRepository.getUserCulturalPFById(userId);
  if (!userPF) throw notFoundError();
  delete userPF.fileId;
  delete userPF.userId;
  delete userPF.createdAt;
  delete userPF.updatedAt;
  return userPF;
}

async function getPJ(userId: number) {
  const userPJ = await enrollmentRepository.getUserCulturalPJById(userId);
  if (!userPJ) throw notFoundError();
  delete userPJ.fileId;
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
