import { userService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function createUser(req: Request, res: Response) {
  try {
    const { body } = req;
    await userService.create(body);
    return res.status(httpStatus.CREATED).send("registro criado com sucesso!");
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    return res.status(httpStatus.CONFLICT).send(error.message);
  }
}

async function singIn(req: Request, res: Response) {
  try {
    const { body } = req;
    const user = await userService.signIn(body);
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    if (error.name === "notFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);

    return res.status(httpStatus.BAD_REQUEST).send(error.details[0]);
  }
}
export { createUser, singIn };
