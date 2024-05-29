import { noticeController } from "@/controllers";
import { authMiddleware, validateBody } from "@/middlewares";
import { noticeCreationSchema } from "@/schemas";
import { Router } from "express";

const noticeRouter = Router();

noticeRouter
  .all("/*", authMiddleware)
  .post("/", validateBody(noticeCreationSchema), noticeController.create)
  .get("/", noticeController.getAll)
  .get("/:id", noticeController.getOneById)
  .get("/many/:id", noticeController.getManyById);

export { noticeRouter };
