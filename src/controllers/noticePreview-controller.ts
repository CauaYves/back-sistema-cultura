import { AuthenticatedRequest } from "@/middlewares";
import { noticePreviewService } from "@/services";
import { Response, Request } from "express";
import httpStatus from "http-status";

async function getAll(req: Request, res: Response) {
  try {
    const response = "";
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId, body } = req;
    const response = await noticePreviewService.create(userId, body);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "UnprocessableEntityError") {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export const noticePreviewController = {
  getAll,
  create,
};
