import { ZodObject, ZodError, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { invalidDataError } from "@/errors";

export function validateBody<T extends ZodRawShape>(
  schema: ZodObject<T>
): ValidationMiddleware {
  return validate(schema, "body");
}

function validate<T extends ZodRawShape>(
  schema: ZodObject<T>,
  type: "body" | "params"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(httpStatus.BAD_REQUEST)
          .send(
            invalidDataError(error.errors.map((e) => e.message + " " + e.path))
          );
      } else {
        next(error);
      }
    }
  };
}
type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
