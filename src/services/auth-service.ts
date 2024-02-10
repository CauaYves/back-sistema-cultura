import { User } from "@/entities";
import { conflictError } from "@/errors";
import { userReppository } from "@/repositories/users-repository";

async function create(body: User) {
  const existentUser = await userReppository.findOneByEmail(body.email);
  if (existentUser) {
    throw conflictError("email já cadastrado.");
  } else {
    const newUser = userReppository.create(body);
    return newUser;
  }
}

const userService = {
  create,
};
export { userService };
