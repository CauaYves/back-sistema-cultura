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

async function getOneById(contactId: number) {
  return prisma.contact.findUnique({
    where: { id: contactId },
  });
}

async function edit(body: Contact, contactId: number) {
  return prisma.contact.update({
    where: { id: contactId },
    data: body,
  });
}

const contactRepository = {
  create,
  getAllByUserId,
  deleteOneById,
  getOneById,
  edit,
};

export { contactRepository };
