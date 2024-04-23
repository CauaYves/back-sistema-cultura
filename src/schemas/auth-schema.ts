import Zod from "zod";

const signupSchema = Zod.object({
  name: Zod.string(),
  cpf: Zod.string().regex(
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    "insira um cpf válido. "
  ),
  email: Zod.string()
    .email()
    .regex(/@gmail\.com$/, "O email deve ser do domínio @gmail.com"),
  password: Zod.string()
    .min(6, "a senha precisa de no mínimo 6 caracteres.")
    .max(24, "a senha precisa de no máximo 24 caracteres."),
});

const signinSchema = Zod.object({
  email: Zod.string()
    .email("deve ser um email válido ")
    .regex(/@gmail\.com$/, "O email deve ser do domínio @gmail.com "),
  password: Zod.string(),
});

const checkConfirmationCodeSchema = Zod.object({
  code: Zod.string(),
});

const forgotPasswordSchema = Zod.object({
  email: Zod.string()
    .email()
    .regex(/@gmail\.com$/, "O email deve ser do domínio @gmail.com"),
});

export {
  signupSchema,
  signinSchema,
  checkConfirmationCodeSchema,
  forgotPasswordSchema,
};
