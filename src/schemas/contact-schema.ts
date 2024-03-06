import { z } from "zod";

const contactSchema = z.object({
  type: z.string(),
  number: z.string(),
  public: z.boolean(),
});

export { contactSchema };
