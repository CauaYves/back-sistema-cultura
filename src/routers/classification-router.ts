import { classificationController } from "@/controllers";
import { authMiddleware, validateBody } from "@/middlewares";
import { classificationSchema } from "@/schemas/classification-schema";
import { Router } from "express";

const classificationRouter = Router();

classificationRouter
  .all("/*", authMiddleware)
  .get("/", classificationController.getOneById)
  .get("/files", classificationController.getFiles)
  .post("/", validateBody(classificationSchema), classificationController.create);

export { classificationRouter };
