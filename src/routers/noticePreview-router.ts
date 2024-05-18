import { noticePreviewController } from "@/controllers";
import { validateBody, validateQuery } from "@/middlewares";
import { countySchema, noticePreviewSchema } from "@/schemas";
import { Router } from "express";

const noticePreviewRouter = Router();

noticePreviewRouter
  .get("/", validateQuery(countySchema), noticePreviewController.getAll)
  .post("/", validateBody(noticePreviewSchema), noticePreviewController.create);

export { noticePreviewRouter };
