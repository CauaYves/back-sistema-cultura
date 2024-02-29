import { AuthenticatedRequest } from "@/middlewares";
import { enrollmentService } from "@/services/enrollment-service";
import { Response } from "express";
import httpStatus from "http-status";

async function createEnrollment(req: AuthenticatedRequest, res: Response) {
  try {
    const culturalUser = req.body;
    const fileInfo = culturalUser.upload;
    delete culturalUser.upload;
    const userId = req.userId;
    const response = await enrollmentService.saveUser(culturalUser, fileInfo, userId);
    res.send(response).status(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export { createEnrollment };
