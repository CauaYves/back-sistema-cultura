import { prisma } from "@/config";
import { Collective } from "@/entities";

async function create(data: Collective) {
  return prisma.culturalCollective.create({
    data,
  });
}

async function getOneByUserId(userId: number) {
  return prisma.culturalCollective.findFirst({
    where: { userId },
  });
}

async function getManyByUserId(userId: number) {
  return prisma.culturalCollective.findMany({
    where: { userId },
  });
}

const collectiveRepository = {
  create,
  getOneByUserId,
  getManyByUserId,
};

export { collectiveRepository };
