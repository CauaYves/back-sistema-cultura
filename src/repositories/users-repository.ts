import { prisma } from "@/config";
import { User } from "@/entities";
import { Prisma } from "@prisma/client";

async function findOneById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}
async function findOneByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(userData: User) {
  const user = prisma.user.create({ data: userData });
  return user;
}

const userRepository = {
  findOneById,
  findOneByEmail,
  create,
};

export { userRepository };
