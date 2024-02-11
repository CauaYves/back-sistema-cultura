import { User } from "@/entities";
import { conflictError, notFoundError, unprocessableEntityError } from "@/errors";
import { userRepository, sessionRepository } from "@/repositories";
import { exclude } from "@/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function create(body: User) {
  const existentUser = await userRepository.findOneByEmail(body.email);
  if (existentUser) throw conflictError("email já cadastrado.");

  const hashedPassword = await bcrypt.hash(body.password, 12);

  const newUser = userRepository.create({ ...body, password: hashedPassword });
  return newUser;
}

async function signIn(params: SignInParams) {
  const { email, password } = params;

  const user = await getUserOrFail(email);
  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);
  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string) {
  const user = await userRepository.findOneByEmail(email, { id: true, email: true, password: true });
  if (!user) throw notFoundError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw unprocessableEntityError("email ou senha incorretos");
}

async function createSession(userId: number) {
  const expirationTime = "8h";
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: expirationTime });
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

export type SignInParams = Pick<User, "email" | "password">;

const userService = {
  create,
  signIn,
};
export { userService };
