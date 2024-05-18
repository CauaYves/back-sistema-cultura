import { string, z } from "zod";

const noticeCreationSchema = z.object({
  proposal: z.object({
    name: z.string(),
    description: z.string(),
    justification: z.string(),
    attachments: z.array(string()),
    accessibility: z.string(),
    accessDemocratization: z.string(),
    executionPlace: z.string(),
    publicServed: z.string(),
  }),
  connections: z.object({
    culturalAgentPFId: z.number().optional(),
    culturalAgentPJId: z.number().optional(),
    noticePreviewId: z.number(),
    responsibleId: z.number(),
    projectCoordinatorId: z.number(),
  }),
});

export { noticeCreationSchema };
