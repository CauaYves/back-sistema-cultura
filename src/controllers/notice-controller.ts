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

async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { proposal, connections } = req.body;
    const response = await noticeService.create(userId, proposal, connections);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

const noticeController = {
  getAll,
  create,
};

export { noticeController };
