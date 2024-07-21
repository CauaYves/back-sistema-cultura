import { prisma } from "@/config";
import { Classification } from "@/entities";
import { R2File } from "@/services";

async function create(classification: Classification, userId: number) {
  return prisma.classification.create({
    data: {
      ...classification,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

async function getOneById(userId: number) {
  return prisma.classification.findMany({
    where: {
      userId,
    },
  });
}

async function createFile(r2File: R2File, classificationId: number) {
  return prisma.classificationFiles.create({
    data: {
      ...r2File,
      Classification: {
        connect: { id: classificationId },
      },
    },
  });
}

const classificationRepository = {
  create,
  getOneById,
  createFile,
};
export { classificationRepository };
