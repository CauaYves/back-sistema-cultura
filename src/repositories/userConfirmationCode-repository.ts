import { prisma } from "@/config";

async function create(code: string, userId: number) {
  return prisma.userConfirmationCode.create({
    data: {
      userId,
      code,
    },
  });
}

async function update(code: string, userId: number) {
  return prisma.userConfirmationCode.update({
    where: { userId },
    data: {
      code,
    },
  });
}

async function findOne(userId: number) {
  return prisma.userConfirmationCode.findUnique({
    where: { userId },
  });
}

const userConfirmationCodeRepository = {
  create,
  update,
  findOne,
};
export { userConfirmationCodeRepository };
