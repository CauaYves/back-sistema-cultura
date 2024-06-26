import { authMiddleware, validateBody } from "@/middlewares";
import { Router } from "express";
import { collectiveSchema } from "@/schemas";
import collectiveController from "@/controllers/collective-controller";

const collectiveRouter = Router();

collectiveRouter
  .all("/*", authMiddleware)
  .get("/", collectiveController.get)
  .post("/", validateBody(collectiveSchema), collectiveController.create)
  .delete("/:id", collectiveController.deleteOne)
  .put("/:id", validateBody(collectiveSchema), collectiveController.update);

export { collectiveRouter };
