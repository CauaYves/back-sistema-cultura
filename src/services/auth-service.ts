import { User } from "@/entities";
import { conflictError, forbiddenError, notFoundError, unauthorizedError, unprocessableEntityError } from "@/errors";
import { sendEmail } from "@/lib/nodemailer";
import { userRepository, sessionRepository, userConfirmationCodeRepository } from "@/repositories";
import { exclude } from "@/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

async function create(body: User) {
  const existentUserWithEmail = await userRepository.findOneByEmail(body.email);
  if (existentUserWithEmail) throw conflictError("email já cadastrado.");

  const existentUserWithCpf = await userRepository.findOneByCpf(body.cpf);
  if (existentUserWithCpf) throw conflictError("cpf já cadastrado.");

  const hashedPassword = await bcrypt.hash(body.password, 12);
  const newUser = await userRepository.create({ ...body, password: hashedPassword });

  await sendConfirmationEmail(body.email, body.name, newUser.id);
  return newUser;
}

async function signIn(params: SignInParams) {
  const { email, password } = params;

  const user = await getUserOrFail(email);
  if (!user.emailConfirmed) throw forbiddenError("confirme seu email antes de prosseguir");

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
    email: true,
    password: true,
    emailConfirmed: true,
  });
  if (!user) throw notFoundError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw unprocessableEntityError("email ou senha incorretos");
}

async function createOrUpdateSession(userId: number) {
  const expirationTime = "8h";
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: expirationTime });

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

async function sendConfirmationEmail(email: string, name: string, userId: number) {
  const code = uuidv4();
  const confirmationCode = code.concat(`_${userId}`);
  await userConfirmationCodeRepository.create(confirmationCode, userId);

  const subject = "confirme seu cadastro no sistema cultural";
  const text = `Olá ${name}! esse é o seu código de confirmação do cadastro, não compartilhe com ninguém, após alguns minutos esse código não será utilizável. código: ${confirmationCode}`;

  const emailInfo = await sendEmail(email, subject, text);
  return emailInfo;
}

async function isEmailConfirmed(userId: number) {
  const user = await userRepository.findOneById(userId);
  if (user.emailConfirmed) throw forbiddenError("email já confirmado");
}

async function confirmRegistration(code: string) {
  const userId = +code.substring(code.lastIndexOf("_") + 1, code.length);

  const userConfirmationCode = await userConfirmationCodeRepository.findOne(userId);
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
