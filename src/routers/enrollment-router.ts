import enrollmentController from "@/controllers/enrollment-controller";
import { authMiddleware, validateBody } from "@/middlewares";
import { enrollmentSchema } from "@/schemas";
import { Router } from "express";

const enrollmentsRouter = Router();

enrollmentsRouter
  .all("/*", authMiddleware)
  .get("/", enrollmentController.get)
  .post("/identification", validateBody(enrollmentSchema), enrollmentController.create);

export { enrollmentsRouter };
