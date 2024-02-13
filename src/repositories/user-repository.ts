import { prisma } from "@/config";
import { User } from "@/entities";
import { Prisma } from "@prisma/client";

async function findOneById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}
async function findOneByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindFirstArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findFirst(params);
}

async function findOneByCpf(cpf: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindFirstArgs = {
    where: {
      cpf,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findFirst(params);
}

async function create(userData: User) {
  const user = prisma.user.create({ data: userData });
  return user;
}

async function confirmRegistry(userId: number) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      emailConfirmed: true,
    },
  });
}

const userRepository = {
  confirmRegistry,
  findOneById,
  findOneByEmail,
  create,
  findOneByCpf,
};

export { userRepository };
