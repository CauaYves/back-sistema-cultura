import enrollmentController from "@/controllers/enrollment-controller";
import { authMiddleware, validateBody } from "@/middlewares";
import { enrollmentSchemaPf, enrollmentSchemaPj } from "@/schemas";
import { Router } from "express";

const enrollmentsRouter = Router();

enrollmentsRouter
  .all("/*", authMiddleware)
  .get("/identification-pf", enrollmentController.getPF)
  .get("/identification-pj", enrollmentController.getPJ)
  .post("/identification-pj", validateBody(enrollmentSchemaPj), enrollmentController.createPJ)
  .post("/identification-pf", validateBody(enrollmentSchemaPf), enrollmentController.createPF);
export { enrollmentsRouter };
