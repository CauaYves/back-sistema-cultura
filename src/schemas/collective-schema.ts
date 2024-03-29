import { z } from "zod";
const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;

const collectiveSchema = z.object({
  name: z.string(),
  area: z.string(),
  opening: z.string().refine((value) => dateFormat.test(value), {
    message: "Insira uma data válida! campo incompleto: ",
  }),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  neighboorhood: z.string(),
  cep: z.string(),
  complement: z.string(),
  county: z.string(),
  responsible: z.string(),
  userId: z.number(),
});

export { collectiveSchema };
