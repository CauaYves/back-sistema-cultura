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
import {
  confirmRegisterTexts,
  generateHtml,
  recoverPasswordTexts,
} from "@/templates";
import { dateFunctions, exclude } from "@/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getUserById(userId: number) {
  const user = await userRepository.findOneById(userId, {
    name: true,
    cpf: true,
    email: true,
  });
  return user;
}

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
    cpf: true,
    password: true,
    emailConfirmed: true,
  });
  if (!user) throw notFoundError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw UnprocessableEntityError("dados incorretos! ");
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

async function generateVerificationCode(userId: number) {
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  const code = randomNum.toString() + userId;
  return code;
}

async function sendConfirmationEmail(
  email: string,
  name: string,
  userId: number
) {
  const code = await generateVerificationCode(userId);

  const subject = `Olá ${name}, Confirme seu cadastro na Culturalize`;
  await userConfirmationCodeRepository.create(code, userId);
  const text = generateHtml(email, code, confirmRegisterTexts);

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

async function recoverPassword(email: string) {
  const userFound = await userRepository.findOneByEmail(email);
  if (!userFound) throw notFoundError();

  await userConfirmationCodeRepository.updateVerificationCode(
    userFound.id,
    false
  );
  const code = await generateVerificationCode(userFound.id);
  await userConfirmationCodeRepository.update(code, userFound.id);
  const subject = "Código de verificação Culturalize";
  const text = generateHtml(email, code, recoverPasswordTexts);

  const emailInfo = await sendEmail(email, subject, text);
  return emailInfo;
}

async function updatePassword(body: UpdatePasswordType) {
  const user = await userRepository.findOneByEmail(body.email);
  const verificationCode = await userConfirmationCodeRepository.findOne(
    user.id
  );
  const timeLimitInSeconds = 600;

  const stampWhoAsBeenCreated = dateFunctions.transformDatetimeInTimestamp(
    verificationCode.updatedAt
  );

  const stampNow = dateFunctions.getAtualTimestamp();

  if (
    stampNow - stampWhoAsBeenCreated >= timeLimitInSeconds ||
    verificationCode.code !== body.code ||
    verificationCode.used
  ) {
    throw forbiddenError("código de verificação inválido! ");
  }
  const hashedPassword = await bcrypt.hash(body.password, 12);
  await userRepository.updatePassword(user.id, hashedPassword);
  await userConfirmationCodeRepository.updateVerificationCode(user.id, true);
}

async function updateUserRegistrartion(body: User, userId: number) {
  const user = await getUserOrFail(body.email);
  if (!user.emailConfirmed)
    throw forbiddenError("confirme seu email antes de prosseguir");

  await validatePasswordOrFail(body.password, user.password);
  const hashedPassword = await bcrypt.hash(body.password, 12);
  body.password = hashedPassword;
  await userRepository.update(userId, body);
}

export type SignInParams = Pick<User, "email" | "password">;
interface UpdatePasswordType extends SignInParams {
  code: string;
}
const authService = {
  getUserById,
  confirmRegistration,
  create,
  signIn,
  recoverPassword,
  updatePassword,
  updateUserRegistrartion,
};
export { authService };
