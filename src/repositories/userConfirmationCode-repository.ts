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

async function updateVerificationCode(userId: number, used: boolean) {
  return prisma.userConfirmationCode.update({
    where: { userId },
    data: {
      used,
    },
  });
}

async function recicle(code: string, userId: number) {
  return prisma.userConfirmationCode.update({
    where: {
      userId,
    },
    data: {
      code,
    },
  });
}

const userConfirmationCodeRepository = {
  create,
  update,
  findOne,
  updateVerificationCode,
  recicle,
};
export { userConfirmationCodeRepository };
