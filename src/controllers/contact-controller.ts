import { AuthenticatedRequest } from "@/middlewares";
import contactService from "@/services/contact-service";
import { Response } from "express";
import httpStatus from "http-status";

async function getAllByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const response = await contactService.getAllByUserId(userId);
    res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId, body } = req;
    const response = await contactService.create(userId, body);
    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

const contactController = {
  create,
  getAllByUserId,
};

export default contactController;
