import { noticePreviewController } from "@/controllers";
import { validateBody } from "@/middlewares";
import { noticePreviewSchema } from "@/schemas";
import { Router } from "express";

const noticePreviewRouter = Router();

noticePreviewRouter
  .get("/:cityName", noticePreviewController.getManyByName)
  .post("/", validateBody(noticePreviewSchema), noticePreviewController.create)
  .delete("/:id", noticePreviewController.deleteById);

export { noticePreviewRouter };
