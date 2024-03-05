import { prisma } from "@/config";
import { Contact } from "@/entities";

async function create(userId: number, data: Contact) {
  return prisma.contact.create({
    data,
  });
}

const contactRepository = {
  create,
};

export { contactRepository };
