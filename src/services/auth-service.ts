import { User } from "@/entities";
import {
  conflictError,
  forbiddenError,
  notFoundError,
  unauthorizedError,
  UnprocessableEntityError,
} from "@/errors";
import { sendEmail } from "@/lib/nodemailer";
import {
  userRepository,
  sessionRepository,
  userConfirmationCodeRepository,
} from "@/repositories";
import { generateHtml } from "@/templates";
import { exclude } from "@/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function create(body: User) {
  const existentUserWithEmail = await userRepository.findOneByEmail(body.email);
  if (existentUserWithEmail) throw conflictError("email já cadastrado.");

  const existentUserWithCpf = await userRepository.findOneByCpf(body.cpf);
  if (existentUserWithCpf) throw conflictError("cpf já cadastrado.");

  const hashedPassword = await bcrypt.hash(body.password, 12);
  const newUser = await userRepository.create({
    ...body,
    password: hashedPassword,
  });

  await sendConfirmationEmail(body.email, body.name, newUser.id);
  return newUser;
}

async function signIn(params: SignInParams) {
  const { email, password } = params;

  const user = await getUserOrFail(email);
  if (!user.emailConfirmed)
    throw forbiddenError("confirme seu email antes de prosseguir");

  await validatePasswordOrFail(password, user.password);

  const token = await createOrUpdateSession(user.id);
  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string) {
  const user = await userRepository.findOneByEmail(email, {
    id: true,
    name: true,
    email: true,
    password: true,
    emailConfirmed: true,
  });
  if (!user) throw notFoundError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid)
    throw UnprocessableEntityError("email ou senha incorretos");
}

async function createOrUpdateSession(userId: number) {
  const expirationTime = "8h";
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });

  const existentToken = await sessionRepository.findOne(userId);
  if (!existentToken) {
    await sessionRepository.create({
      token,
      userId,
    });
    return token;
  }
  const updatedToken = await sessionRepository.update(userId, token);
  return updatedToken.token;
}

function generateVerificationCode(userId: number) {
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return randomNum.toString() + userId;
}

async function sendConfirmationEmail(
  email: string,
  name: string,
  userId: number
) {
  const code = generateVerificationCode(userId);
  await userConfirmationCodeRepository.create(code, userId);

  const subject = "confirme seu cadastro no sistema cultural";
  const text = generateHtml(email, code);

  const emailInfo = await sendEmail(email, subject, text);
  return emailInfo;
}

async function isEmailConfirmed(userId: number) {
  const user = await userRepository.findOneById(userId);
  if (user.emailConfirmed) throw forbiddenError("email já confirmado");
}

async function confirmRegistration(code: string) {
  const userId = +code.substring(4, code.length);
  const userConfirmationCode = await userConfirmationCodeRepository.findOne(
    userId
  );

  if (!userConfirmationCode || userConfirmationCode.code !== code) {
    throw unauthorizedError();
  }
  await isEmailConfirmed(userId);
  await userRepository.confirmRegistry(userId);
  return "cadastro verificado com sucesso! ";
}

export type SignInParams = Pick<User, "email" | "password">;

const authService = {
  confirmRegistration,
  create,
  signIn,
};
export { authService };
