import { prisma } from "@/config";
import { FisicPerson, NoticeProposal } from "@/entities";
import { Prisma } from "@prisma/client";
import { R2File } from "./enrollment-repository";

async function getAll() {
  return prisma.notice.findMany();
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

  // Verificar se o Notice existe
  const notice = await client.notice.findUnique({
    where: { id: noticeId },
  });
  if (!notice) {
    throw new Error(`Notice with id ${noticeId} does not exist`);
  }

  // Verificar se o ID do agente cultural existe nas tabelas correspondentes
  if (data.culturalAgentPFId) {
    const culturalAgentPF = await client.culturalAgentPF.findUnique({
      where: { id: data.culturalAgentPFId },
    });
    if (!culturalAgentPF) {
      throw new Error(`CulturalAgentPF with id ${data.culturalAgentPFId} does not exist`);
    }
  } else if (data.culturalAgentPJId) {
    const culturalAgentPJ = await client.culturalAgentPJ.findUnique({
      where: { id: data.culturalAgentPJId },
    });
    if (!culturalAgentPJ) {
      throw new Error(`CulturalAgentPJ with id ${data.culturalAgentPJId} does not exist`);
    }
  }

  // Construir o objeto de dados para criação
  const fileData: any = {
    name: data.name,
    contentType: data.contentType,
    key: data.key,
    Notice: {
      connect: {
        id: noticeId,
      },
    },
  };

  if (data.culturalAgentPFId) {
    fileData.CulturalAgentPF = {
      connect: {
        id: data.culturalAgentPFId,
      },
    };
  } else if (data.culturalAgentPJId) {
    fileData.CulturalAgentPJ = {
      connect: {
        id: data.culturalAgentPJId,
      },
    };
  }

  // Adicionar logs detalhados
  console.log("fileData a ser criado:", fileData);
  try {
    const createdFile = await client.noticeFiles.create({
      data: fileData,
    });
    console.log("Arquivo criado com sucesso:", createdFile);
    return createdFile;
  } catch (error) {
    console.error("Erro ao criar o arquivo:", error);
    throw error;
  }
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

async function getOneById(id: number) {
  return prisma.notice.findUnique({
    where: {
      id,
    },
  });
}

async function getManyById(id: number) {
  return prisma.notice.findMany({
    where: {
      id,
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
  getOneById,
  getManyById,
};
