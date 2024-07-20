import { prisma } from "@/config";
import { Classification } from "@/entities";

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

const classificationRepository = {
  create,
  getOneById,
};
export { classificationRepository };
