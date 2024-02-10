import Zod from "zod";

export const signupSchema = Zod.object({
  name: Zod.string(),
  cpf: Zod.string(),
  email: Zod.string(),
  password: Zod.string(),
});
