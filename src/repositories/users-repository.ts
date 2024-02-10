import { prisma } from "@/config";
import { User } from "@/entities";

async function findOneById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}
async function findOneByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  return user;
}

async function create(userData: User) {
  const user = prisma.user.create({ data: userData });
  return user;
}

const userReppository = {
  findOneById,
  findOneByEmail,
  create,
};

export { userReppository };
