import { z } from "zod";

const classificationSchema = z.object({
  noticeNumber: z.string(),
  projectNumber: z.string(),
  proponentName: z.string(),
  cpf: z.string(),
  situation: z.string(),
  category: z.string(),
  attachments: z.array(
    z.object({
      name: z.string(),
      contentType: z.string(),
    }),
  ),
});

export { classificationSchema };
