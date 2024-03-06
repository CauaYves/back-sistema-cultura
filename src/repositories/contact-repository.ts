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

async function deleteOneById(id: number) {
  return prisma.contact.delete({
    where: {
      id,
    },
  });
}

const contactRepository = {
  create,
  getAllByUserId,
  deleteOneById,
};

export { contactRepository };
