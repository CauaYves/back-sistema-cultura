import { Request, Response } from "express";
import httpStatus from "http-status";

async function authController(req: Request, res: Response) {
  try {
    const body = req.body;
    return res.send(body);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export { authController };
