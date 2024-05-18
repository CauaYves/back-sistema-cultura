import { noticeController } from "@/controllers";
import { validateBody, validateQuery } from "@/middlewares";
import { countySchema, noticeCreationSchema } from "@/schemas";
import { Router } from "express";

const noticeRouter = Router();

noticeRouter
  .get("/", validateQuery(countySchema), noticeController.getAll)
  .post("/", validateBody(noticeCreationSchema), noticeController.create);

export { noticeRouter };
