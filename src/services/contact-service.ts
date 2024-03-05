import { Contact } from "@/entities";
import { contactRepository } from "@/repositories/contact-repository";

async function create(userId: number, body: Contact) {
  body.userId = userId;
  const contact = await contactRepository.create(userId, body);
  return contact;
}

const contactService = {
  create,
};

export default contactService;
