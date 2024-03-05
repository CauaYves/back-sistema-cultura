import { prisma } from "@/config";
import { Contact } from "@/entities";

async function create(data: Contact) {
  return prisma.contact.create({
    data,
  });
}
async function getAllByUserId(userId: number) {
  return prisma.contact.findMany({
    where: {
      userId,
    },
  });
}

const contactRepository = {
  create,
  getAllByUserId,
};

export { contactRepository };
