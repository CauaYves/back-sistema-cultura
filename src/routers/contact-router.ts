import { authMiddleware, validateBody } from "@/middlewares";
import { Router } from "express";
import { contactSchema } from "@/schemas";
import contactController from "@/controllers/contact-controller";

const contactRouter = Router();

contactRouter

  .all("/*", authMiddleware)
  .get("/", contactController.getAllByUserId)
  .post("/", validateBody(contactSchema), contactController.create)
  .delete("/:id", contactController.deleteOneById)
  .put("/:id", validateBody(contactSchema), contactController.edit);

export { contactRouter };
