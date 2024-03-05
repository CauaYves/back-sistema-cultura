import { AuthenticatedRequest } from "@/middlewares";
import contactService from "@/services/contact-service";
import { Response } from "express";
import httpStatus from "http-status";

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
};

export default contactController;
