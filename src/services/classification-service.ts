import { Classification } from "@/entities";
import { notFoundError } from "@/errors";
import { classificationRepository, userRepository } from "@/repositories";
import { enrollmentService } from "./enrollment-service";

async function create(classification: Classification, userId: number) {
  const user = await userRepository.findOneById(userId);
  if (!user) return notFoundError();

  const signedUrls = classification.attachments.map(async (attachment) => {
    const url = await enrollmentService.generatePostSignedUrl(attachment, "arquivos_de_classificacao");
    return url;
  });

  const signedUrlsList = await Promise.all(signedUrls);

  delete classification.attachments;
  const createdClassification = await classificationRepository.create(classification, user.id);
  signedUrlsList.forEach(async (signedUrl) => {
    await classificationRepository.createFile(signedUrl.r2File, createdClassification.id);
  });
  // o classificationFilesId é uma variavel para referenciar todos os arquivos enviados pelo proponente a um edital em especifico, é uma forma de separar todos os arquivos por editais, precisa atualizar o classificationFilesId para referenciar aos arquivos da Cloudflare

  return { createdClassification, signedUrlsList };
}

async function getOneById(userId: number) {
  const classification = await classificationRepository.getOneById(userId);
  return classification;
}

const classificationService = { create, getOneById };

export { classificationService };
