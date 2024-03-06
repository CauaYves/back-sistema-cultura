import { prisma } from "@/config";
import { CulturalUser, FileInfo } from "@/entities";

async function create(data: CulturalUser, userId: number, fileId: string) {
  return prisma.culturalAgent.create({
    data: {
      ...data,
      User: {
        connect: {
          id: userId,
        },
      },
      File: {
        connect: {
          id: fileId,
        },
      },
    },
  });
}

export interface R2File extends FileInfo {
  key: string;
}

async function createFile(data: R2File) {
  return prisma.file.create({
    data: data,
  });
}

async function getOneById(userId: number) {
  return prisma.culturalAgent.findUnique({
    where: { userId },
  });
}

const enrollmentRepository = {
  create,
  createFile,
  getOneById,
};

export { enrollmentRepository };
