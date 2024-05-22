import { prisma } from "@/config";
import { FisicPerson, NoticeProposal, Proposal } from "@/entities";
import { R2File } from "./enrollment-repository";

async function getAll() {
  return prisma.noticePreview.findMany();
}

async function createResponsible(data: FisicPerson) {
  return prisma.responsible.create({
    data,
  });
}

async function createCoordinator(data: FisicPerson) {
  return prisma.projectCoordinator.create({
    data,
  });
}

async function create(
  data: NoticeProposal,
  noticePreviewId: number,
  projectCoordinatorId: number,
  responsibleId: number,
  culturalAgentPFId?: number,
  culturalAgentPJId?: number
) {
  const noticeData: any = {
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

  return prisma.notice.create({
    data: noticeData,
  });
}

async function createFile(data: R2File, noticeId: number) {
  return prisma.noticeFiles.create({
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
  culturalAgentPJId?: number,
  culturalAgentPFId?: number
) {
  if (!culturalAgentPJId && !culturalAgentPFId) {
    throw new Error("Pelo menos um ID de agente cultural deve ser fornecido.");
  }

  const whereClause: any = {
    noticeId: noticeId,
  };

  if (culturalAgentPJId) {
    whereClause.culturalAgentPJId = culturalAgentPJId;
  }

  if (culturalAgentPFId) {
    whereClause.culturalAgentPFId = culturalAgentPFId;
  }

  return prisma.noticeFiles.updateMany({
    where: whereClause,
    data: {
      noticeId,
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
};
