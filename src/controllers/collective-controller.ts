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

async function get(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const response = await collectiveService.getManyByUserId(userId);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function update(req: AuthenticatedRequest, res: Response) {
  try {
    const id = +req.params.id;
    const { body } = req;
    const response = await collectiveService.update(body, id);
    return res.status(httpStatus.NO_CONTENT).send(response);
  } catch (error) {
    if (error.name === "UnprocessableEntityError")
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function deleteOne(req: AuthenticatedRequest, res: Response) {
  try {
    const id = +req.params.id;
    const response = await collectiveService.deleteOne(id);
    return res.status(httpStatus.NO_CONTENT).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

const collectiveController = {
  create,
  get,
  update,
  deleteOne,
};

export default collectiveController;
