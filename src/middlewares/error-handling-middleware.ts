import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ApplicationError } from "@/protocols";

export function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) {
  if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === "ForbiddenError") {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }

  if (
    err.name === "UnprocessableEntityError" ||
    err.name === "InvalidDataError"
  ) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
    });
  }
  /* eslint-disable-next-line no-console */
  console.error(err.name);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
