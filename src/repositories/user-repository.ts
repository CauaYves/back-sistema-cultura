import { prisma } from "@/config";
import { User } from "@/entities";
import { Prisma } from "@prisma/client";

async function findOneById(id: number, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindFirstArgs = {
    where: {
      id,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findFirst(params);
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

async function updatePassword(userId: number, password: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { password },
  });
}

async function update(userId: number, data: User) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

const userRepository = {
  confirmRegistry,
  findOneById,
  findOneByEmail,
  create,
  findOneByCpf,
  updatePassword,
  update,
};

export { userRepository };
