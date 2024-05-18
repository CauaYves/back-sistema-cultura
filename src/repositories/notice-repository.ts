import { prisma } from "@/config";

async function getAll() {
  return prisma.noticePreview.findMany();
}

export const noticeRepository = {
  getAll,
};
