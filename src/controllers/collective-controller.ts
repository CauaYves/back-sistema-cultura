import { AuthenticatedRequest } from "@/middlewares";
import { collectiveService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const { body, userId } = req;
    const response = await collectiveService.create(body, userId);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    if (error.name === "UnprocessableEntityError")
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

const collectiveController = {
  create,
};

export default collectiveController;
