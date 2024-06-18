import { prisma } from "@/config";
import { CulturalUserPF, CulturalUserPJ, FileInfo } from "@/entities";

async function createCulturalAgentPf(data: CulturalUserPF, userId: number, fileId: string) {
  return prisma.culturalAgentPF.create({
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

async function createCulturalAgentPj(data: CulturalUserPJ, userId: number, fileId: string) {
  return prisma.culturalAgentPJ.create({
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

async function createFilePf(data: R2File) {
  return prisma.filePF.create({
    data: data,
  });
}

async function createFilePj(data: R2File) {
  return prisma.filePJ.create({
    data: data,
  });
}

async function getUserCulturalPFById(userId: number) {
  return prisma.culturalAgentPF.findUnique({
    where: { userId },
  });
}

async function getUserCulturalPJById(userId: number) {
  return prisma.culturalAgentPJ.findUnique({
    where: { userId },
  });
}

const enrollmentRepository = {
  createFilePf,
  createFilePj,
  createCulturalAgentPf,
  createCulturalAgentPj,
  getUserCulturalPFById,
  getUserCulturalPJById,
};

export { enrollmentRepository };
