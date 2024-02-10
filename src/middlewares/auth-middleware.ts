import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { unauthorizedError } from "@/errors";
import { env } from "@/schemas";
import { prisma } from "@/config";

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorization = req.header("Authorization");
  if (!authorization) generateUnauthorizedResponse(res);

  const token = authorization.split(" ")[1];

  if (!token) generateUnauthorizedResponse(res);

  const { userId } = jwt.verify(token, env.JWT_SECRET ?? "") as JwtPayload;

  const session = await prisma.session.findFirst({
    where: {
      token,
    },
  });
  if (!session) return generateUnauthorizedResponse(res);

  req.userId = userId;

  next();
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}
export type AuthenticatedRequest = Request & JwtPayload;

type JwtPayload = {
  userId: number;
};
