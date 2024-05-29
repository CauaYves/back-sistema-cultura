import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { noticeService } from "@/services";

async function getAll(req: Request, res: Response) {
  try {
    const response = await noticeService.getAll();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
async function getOneById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await noticeService.getOneById(+id);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
async function getManyById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await noticeService.getManyById(+id);
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
    const { userId } = req;
    const { proposal, connections, responsible, coordinator } = req.body;
    const response = await noticeService.create(userId, proposal, connections, responsible, coordinator);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

const noticeController = {
  getAll,
  create,
  getOneById,
  getManyById,
};

export { noticeController };
