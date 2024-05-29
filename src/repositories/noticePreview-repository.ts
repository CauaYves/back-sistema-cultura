import { prisma } from "@/config";
import { NoticePreview } from "@/entities";

async function getManyByCityName(city: string) {
  return prisma.noticePreview.findMany({
    where: {
      city,
    },
  });
}

async function create(noticePreview: NoticePreview) {
  return prisma.noticePreview.create({
    data: noticePreview,
  });
}

async function deleteById(id: number) {
  return prisma.noticePreview.delete({
    where: {
      id,
    },
  });
}

async function getByName(name: string) {
  return prisma.noticePreview.findFirst({
    where: {
      name,
    },
  });
}
async function getById(id: number) {
  return prisma.noticePreview.findUnique({
    where: {
      id,
    },
  });
}

async function getOneById(id: number) {
  return prisma.noticePreview.findUnique({
    where: {
      id,
    },
  });
}

export const noticePreviewRepository = {
  create,
  getById,
  deleteById,
  getByName,
  getManyByCityName,
  getOneById,
};
