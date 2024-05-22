import { z } from "zod";

const noticeCreationSchema = z.object({
  proposal: z.object({
    name: z.string(),
    description: z.string(),
    justification: z.string(),
    attachments: z.array(
      z.object({
        name: z.string(),
        contentType: z.string(),
      })
    ),
    accessibility: z.string(),
    accessDemocratization: z.string(),
    executionPlace: z.string(),
    publicServed: z.string(),
  }),
  connections: z.object({
    culturalAgentPFId: z.number().optional(),
    culturalAgentPJId: z.number().optional(),
    noticePreviewId: z.number(),
  }),
  responsible: z.object({
    name: z.string(),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "insira um cpf válido. "),
    rg: z.string(),
    issuingBody: z.string(),
    email: z.string().email("insira um email válido. "),
    tel: z.string(),
    cep: z.string(),
    address: z.string(),
    number: z.string(),
    complement: z.string(),
    neighboorHood: z.string(),
    county: z.string(),
    uf: z.string(),
    activiesOnLastTwoYears: z.string(),
  }),
});

export { noticeCreationSchema };
