import { AuthenticatedRequest } from "@/middlewares";
import { enrollmentService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

async function createPJ(req: AuthenticatedRequest, res: Response) {
  try {
    const culturalUser = req.body;
    const userId = req.userId;
    const fileInfo = culturalUser.upload;
    delete culturalUser.upload;
    const response = await enrollmentService.saveUserPj(culturalUser, fileInfo, userId);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    if (error.name === "ForbiddenError") return res.status(httpStatus.FORBIDDEN).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function createPF(req: AuthenticatedRequest, res: Response) {
  try {
    const culturalUser = req.body;
    const userId = req.userId;
    const fileInfo = culturalUser.upload;
    delete culturalUser.upload;
    const response = await enrollmentService.saveUserPf(culturalUser, fileInfo, userId);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    if (error.name === "ForbiddenError") return res.status(httpStatus.FORBIDDEN).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function getPF(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const response = await enrollmentService.getPF(userId);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function getPJ(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const response = await enrollmentService.getPJ(userId);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

const enrollmentController = {
  createPF,
  createPJ,
  getPF,
  getPJ,
};

export default enrollmentController;
