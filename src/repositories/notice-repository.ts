import { prisma } from "@/config";
import { FisicPerson, NoticeProposal } from "@/entities";
import { R2File } from "./enrollment-repository";
import { Prisma } from "@prisma/client";

async function getAll() {
  return prisma.noticePreview.findMany();
}

async function createResponsible(data: FisicPerson, transaction?: Prisma.TransactionClient) {
  const client = transaction || prisma;
  return client.responsible.create({
    data,
  });
}

async function createCoordinator(data: FisicPerson, transaction?: Prisma.TransactionClient) {
  const client = transaction || prisma;
  return client.projectCoordinator.create({
    data,
  });
}

async function create(
  data: NoticeProposal,
  noticePreviewId: number,
  responsibleId: number,
  projectCoordinatorId: number,
  culturalAgentPFId?: number,
  culturalAgentPJId?: number,
  transaction?: Prisma.TransactionClient,
) {
  const client = transaction || prisma;
  const noticeData: Prisma.NoticeCreateInput = {
    ...data,
    NoticePreview: {
      connect: {
        id: noticePreviewId,
      },
    },
    ProjectCoordinator: {
      connect: {
        id: projectCoordinatorId,
      },
    },
    Responsible: {
      connect: {
        id: responsibleId,
      },
    },
  };

  if (culturalAgentPFId) {
    noticeData.CulturalAgentPF = {
      connect: {
        id: culturalAgentPFId,
      },
    };
  }

  if (culturalAgentPJId) {
    noticeData.CulturalAgentPJ = {
      connect: {
        id: culturalAgentPJId,
      },
    };
  }

  return client.notice.create({
    data: noticeData,
  });
}

async function createFile(data: R2File, noticeId: number, transaction?: Prisma.TransactionClient) {
  const client = transaction || prisma;
  return client.noticeFiles.create({
    data: {
      ...data,
      Notice: {
        connect: {
          id: noticeId,
        },
      },
    },
  });
}

async function updateFiles(
  noticeId: number,
  culturalAgentPFId?: number,
  culturalAgentPJId?: number,
  transaction?: Prisma.TransactionClient,
) {
  const client = transaction || prisma;

  if (!culturalAgentPFId && !culturalAgentPJId) {
    throw new Error("Pelo menos um ID de agente cultural deve ser fornecido.");
  }

  const whereClause: Prisma.NoticeFilesUpdateManyArgs["where"] = {
    noticeId: noticeId,
  };

  if (culturalAgentPFId) {
    whereClause.culturalAgentPFId = culturalAgentPFId;
  }

  if (culturalAgentPJId) {
    whereClause.culturalAgentPJId = culturalAgentPJId;
  }

  return client.noticeFiles.updateMany({
    where: whereClause,
    data: {
      noticeId,
    },
  });
}

async function getOneByNoticePreviewId(noticePreviewId: number) {
  return prisma.notice.findFirst({
    where: {
      noticePreviewId,
    },
  });
}

export const noticeRepository = {
  getAll,
  create,
  createResponsible,
  createCoordinator,
  createFile,
  updateFiles,
  getOneByNoticePreviewId,
};
