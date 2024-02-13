import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function findOne(userId: number) {
  return prisma.session.findUnique({
    where: { userId },
  });
}

async function update(userId: number, token: string) {
  return prisma.session.update({
    where: { userId },
    data: { token },
  });
}
const sessionRepository = {
  create,
  update,
  findOne,
};

export { sessionRepository };
