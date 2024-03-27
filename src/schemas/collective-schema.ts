import { z } from "zod";

const collectiveSchema = z.object({
  name: z.string(),
  area: z.string(),
  opening: z.string(),
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
