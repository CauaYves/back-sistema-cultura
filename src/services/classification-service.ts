import { Classification } from "@/entities";
import { notFoundError } from "@/errors";
import { cloudflareService, directorys } from "@/lib";
import { classificationRepository, userRepository } from "@/repositories";

async function create(classification: Classification, userId: number) {
  const user = await userRepository.findOneById(userId);
  if (!user) return notFoundError();

  const signedUrls = classification.attachments.map(async (attachment) => {
    const url = await cloudflareService.generatePostSignedUrl(attachment, directorys.arquivos_de_classificacao);
    return url;
  });

  const signedUrlsList = await Promise.all(signedUrls);

  delete classification.attachments;
  const createdClassification = await classificationRepository.create(classification, user.id);
  signedUrlsList.forEach(async (signedUrl) => {
    await classificationRepository.createFile(signedUrl.r2File, createdClassification.id);
  });
  return { createdClassification, signedUrlsList };
}

async function getOneById(userId: number) {
  const classification = await classificationRepository.getOneById(userId);
  return classification;
}

async function getFiles(userId: number) {
  const userClassifications = await classificationRepository.getManyById(userId);
  const userFiles = userClassifications.map(async (classification) => {
    const classificationFile = await classificationRepository.getFileByClassificationId(classification.id);
    return classificationFile;
  });
  const userFilesResolved = await Promise.all(userFiles);

  const flattenedUserFiles = userFilesResolved.flat();
  const urlsList = await Promise.all(
    flattenedUserFiles
      .filter((files) => files)
      .map(async (file) => {
        const url = await cloudflareService.generateGetSignedUrl(directorys.arquivos_de_classificacao, file.key);
        return url;
      }),
  );
  return { urlsList, userClassifications };
}

export const classificationService = { create, getOneById, getFiles };
