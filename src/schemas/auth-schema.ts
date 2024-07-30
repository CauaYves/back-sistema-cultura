import Zod from "zod";
import { regex } from "./regex";

const signupSchema = Zod.object({
  name: Zod.string(),
  cpf: Zod.string().max(11),
  email: Zod.string().email().regex(regex.gmail, "O email deve ser do domínio @gmail.com"),
  password: Zod.string()
    .min(6, "a senha precisa de no mínimo 6 caracteres.")
    .max(24, "a senha precisa de no máximo 24 caracteres."),
});

const updatePasswordSchema = Zod.object({
  cpf: Zod.string().regex(regex.cpf, "insira o seu CPF! "),
  password: Zod.string(),
  code: Zod.string(),
});

const signinSchema = Zod.object({
  cpf: Zod.string().regex(regex.cpf, "insira o seu CPF! "),
  password: Zod.string(),
});

const checkConfirmationCodeSchema = Zod.object({
  code: Zod.string(),
});

const forgotPasswordSchema = Zod.object({
  cpf: Zod.string().regex(regex.cpf, "insira um cpf válido. "),
});

export { checkConfirmationCodeSchema, forgotPasswordSchema, signinSchema, signupSchema, updatePasswordSchema };
