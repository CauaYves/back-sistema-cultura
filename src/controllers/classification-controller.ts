import { AuthenticatedRequest } from "@/middlewares";
import { classificationService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const { body, userId } = req;
    const result = await classificationService.create(body, userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function getOneById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const result = await classificationService.getOneById(userId);
    return res.send(result);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

const classificationController = {
  create,
  getOneById,
};

export { classificationController, getOneById };
