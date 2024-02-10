import { userService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function createUser(req: Request, res: Response) {
  try {
    const { body } = req;
    const user = await userService.create(body);
    return res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    return res.status(httpStatus.CONFLICT).send(error.message);
  }
}

export { createUser };
