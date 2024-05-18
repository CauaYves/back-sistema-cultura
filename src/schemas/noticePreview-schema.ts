import { z } from "zod";

const noticePreviewSchema = z.object({
  name: z.string(),
  observations: z.string(),
  city: z.string(),
  openingDate: z.string(),
  endDate: z.string(),
});

export { noticePreviewSchema };
