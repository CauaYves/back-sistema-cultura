import { authMiddleware, validateBody } from "@/middlewares";
import { Router } from "express";
import { collectiveSchema } from "@/schemas";
import collectiveController from "@/controllers/collective-controller";

const collectiveRouter = Router();

collectiveRouter
  .all("/*", authMiddleware)
  .post("/", validateBody(collectiveSchema), collectiveController.create);

export { collectiveRouter };