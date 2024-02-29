import Zod from "zod";

const uploadBodySchema = Zod.object({
  name: Zod.string().min(1),
  contentType: Zod.string().regex(/\w+\/[-=.\w]+/),
});

const enrollmentSchema = Zod.object({
  email: Zod.string().email("insira um email válido. "),
  codename: Zod.string(),
  mothername: Zod.string(),
  borndate: Zod.string(),
  nacionality: Zod.string(),
  naturalness: Zod.string(),
  rg: Zod.string().regex(/^\d{2}\.\d{3}\.\d{3}-\d$/),
  issuingbody: Zod.string(),
  uf: Zod.string(),
  gender: Zod.string(),
  race: Zod.string(),
  student: Zod.boolean(),
  education: Zod.string(),
  extracurricularCourses: Zod.string().max(56).optional(),
  superiorCourses: Zod.string().max(56).optional(),
  deficiency: Zod.boolean(),
  address: Zod.string().max(50),
  houseNumber: Zod.string(),
  complement: Zod.string().max(48),
  cep: Zod.string().regex(/^\d{5}-\d{3}$/),
  public: Zod.boolean(),
  upload: uploadBodySchema,
});

export { enrollmentSchema, uploadBodySchema };
