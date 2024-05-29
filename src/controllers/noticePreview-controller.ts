import { AuthenticatedRequest } from "@/middlewares";
import { noticePreviewService } from "@/services";
import { Response, Request } from "express";
import httpStatus from "http-status";

async function getManyByName(req: Request, res: Response) {
  try {
    const { cityName } = req.params;
    const response = await noticePreviewService.getManyByName(cityName);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function getOneById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await noticePreviewService.getOneById(+id);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const { body } = req;
    const response = await noticePreviewService.create(body);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    if (error.name === "UnprocessableEntityError") {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
async function deleteById(req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const response = await noticePreviewService.deleteById(id);
    return res.status(httpStatus.NO_CONTENT).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export const noticePreviewController = {
  getManyByName,
  create,
  deleteById,
  getOneById,
};
