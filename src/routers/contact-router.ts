import contactController from "@/controllers/contact-controller";
import { authMiddleware, validateBody } from "@/middlewares";
import { contactSchema } from "@/schemas";
import { Router } from "express";

const contactRouter = Router();

contactRouter
  .all("/*", authMiddleware)
  .get("/", contactController.getAllByUserId)
  .post("/", validateBody(contactSchema), contactController.create);

export { contactRouter };
