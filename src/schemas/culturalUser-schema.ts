import Zod from "zod";
import { regex } from "./regex";

const uploadBodySchema = Zod.object({
  name: Zod.string().min(1),
  contentType: Zod.string().regex(/\w+\/[-=.\w]+/),
});

const enrollmentSchemaPf = Zod.object({
  alternativeTel: Zod.string().max(15),
  cep: Zod.string().regex(regex.cep),
  complement: Zod.string(),
  county: Zod.string(),
  cpf: Zod.string().regex(regex.cpf, "insira um cpf válido. "),
  programs: Zod.array(Zod.string()),
  email: Zod.string().email("insira um email válido. "),
  houseNumber: Zod.string(),
  name: Zod.string(),
  neighboorhood: Zod.string(),
  phone: Zod.string(),
  proponent: Zod.string(),
  public: Zod.boolean(),
  publicPlace: Zod.string(),
  tel: Zod.string(),
  uf: Zod.string(),
  upload: uploadBodySchema,
});

const enrollmentSchemaPj = Zod.object({
  alternativeTel: Zod.string().max(15),
  cep: Zod.string().regex(regex.cep),
  cnpj: Zod.string(),
  complement: Zod.string(),
  county: Zod.string(),
  programs: Zod.array(Zod.string()),
  email: Zod.string().email("insira um email válido. "),
  fantasyName: Zod.string(),
  houseNumber: Zod.string(),
  job: Zod.string(),
  neighboorhood: Zod.string(),
  phone: Zod.string(),
  proponent: Zod.string(),
  public: Zod.boolean(),
  publicPlace: Zod.string(),
  responsible: Zod.string(),
  socialReason: Zod.string(),
  tel: Zod.string(),
  uf: Zod.string(),
  upload: uploadBodySchema,
  website: Zod.string(),
});

export { enrollmentSchemaPf, enrollmentSchemaPj, uploadBodySchema };
