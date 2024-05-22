import { noticeController } from "@/controllers";
import { validateBody } from "@/middlewares";
import { noticeCreationSchema } from "@/schemas";
import { Router } from "express";

const noticeRouter = Router();

noticeRouter.post(
  "/",
  validateBody(noticeCreationSchema),
  noticeController.create
);

export { noticeRouter };
