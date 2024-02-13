import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError, ZodRawShape } from "zod";
import httpStatus from "http-status";
import { invalidDataError } from "@/errors";

export function validateQuery<T extends ZodRawShape>(schema: ZodObject<T>): ValidationMiddleware {
  return validate(schema, "query");
}

function validate<T extends ZodRawShape>(schema: ZodObject<T>, type: "body" | "params" | "query") {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(httpStatus.BAD_REQUEST).send(invalidDataError(error.errors.map((e) => e.message)));
      } else {
        next(error);
      }
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;
