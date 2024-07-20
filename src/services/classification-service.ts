import { Classification, FileInfo } from "@/entities";
import { notFoundError } from "@/errors";
import { classificationRepository, userRepository } from "@/repositories";
import { enrollmentService } from "./enrollment-service";

async function create(classification: Classification, userId: number, file: FileInfo) {
  const user = await userRepository.findOneById(userId);
  if (!user) return notFoundError();
  delete classification.attachments;
  const signedUrl = await enrollmentService.generateSignedUrl(file, "arquivos_de_classificacao");
  const createdClassification = await classificationRepository.create(classification, user.id);
  // atualizar o classificationFilesId para referenciar aos arquivos da cloudflare
  return { createdClassification, signedUrl };
}

async function getOneById(userId: number) {
  const classification = await classificationRepository.getOneById(userId);
  return classification;
}

const classificationService = { create, getOneById };

export { classificationService };
