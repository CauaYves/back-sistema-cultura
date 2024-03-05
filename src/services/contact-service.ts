import { Contact } from "@/entities";
import { contactRepository } from "@/repositories/contact-repository";

async function getAllByUserId(userId: number) {
  const contact = await contactRepository.getAllByUserId(userId);
  return contact;
}

async function create(userId: number, body: Contact) {
  body.userId = userId;
  const contact = await contactRepository.create(body);
  return contact;
}

const contactService = {
  create,
  getAllByUserId,
};

export default contactService;
