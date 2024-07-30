import { AuthenticatedRequest } from "@/middlewares";
import { authService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function getUserInfo(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const response = await authService.getUserById(userId);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function createUser(req: Request, res: Response) {
  try {
    const { body } = req;
    await authService.create(body);
    return res.status(httpStatus.CREATED).send("registro criado com sucesso! verifique seu email. ");
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const { body } = req;
    const user = await authService.signIn(body);
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    if (error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === "UnprocessableEntityError")
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    if (error.name === "ForbiddenError") return res.status(httpStatus.FORBIDDEN).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function checkConfirmationCode(req: Request, res: Response) {
  try {
    const code = req.query.code.toString();

    const result = await authService.confirmRegistration(code);
    return res.send(result).status(200);
  } catch (error) {
    if (error.name === "ForbiddenError") return res.status(httpStatus.FORBIDDEN).send(error.message);
    if (error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function forgotPassword(req: Request, res: Response) {
  try {
    const { cpf } = req.body;
    const result = await authService.recoverPassword(cpf);
    return res.send(result).status(200);
  } catch (error) {
    if (error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function updatePassword(req: Request, res: Response) {
  try {
    const { body } = req;
    const result = await authService.updatePassword(body);
    return res.send(result).status(200);
  } catch (error) {
    if (error.name === "ForbiddenError") return res.status(httpStatus.FORBIDDEN).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function updatedUserData(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { body } = req;
    await authService.updateUserRegistrartion(body, userId);
    return res.status(httpStatus.CREATED).send("Cadastro alterado com sucesso! ");
  } catch (error) {
    if (error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message);
    if (error.name === "UnprocessableEntityError")
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export { checkConfirmationCode, createUser, forgotPassword, getUserInfo, signIn, updatedUserData, updatePassword };
