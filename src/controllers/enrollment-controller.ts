import { AuthenticatedRequest } from "@/middlewares";
import { enrollmentService } from "@/services/enrollment-service";
import { Response } from "express";
import httpStatus from "http-status";

async function get(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const response = await enrollmentService.getCulturalAgent(userId);
    res.send(response).status(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const culturalUser = req.body;
    const userId = req.userId;
    const fileInfo = culturalUser.upload;
    delete culturalUser.upload;
    const response = await enrollmentService.saveUser(culturalUser, fileInfo, userId);
    res.send(response).status(httpStatus.CREATED);
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

const enrollmentController = {
  get,
  create,
};

export default enrollmentController;
