import { createEnrollment } from "@/controllers";
import { authMiddleware, validateBody } from "@/middlewares";
import { enrollmentSchema } from "@/schemas";
import { Router } from "express";

const enrollmentsRouter = Router();

enrollmentsRouter.all("/*", authMiddleware).post("/identification", validateBody(enrollmentSchema), createEnrollment);

export { enrollmentsRouter };
