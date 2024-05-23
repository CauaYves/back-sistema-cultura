import { ibgeService } from "@/services/ibge-service";
import { Response, Request } from "express";
import httpStatus from "http-status";

async function getUfs(_req: Request, res: Response) {
  try {
    const response = await ibgeService.getUfs();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function getCountyByUfId(req: Request, res: Response) {
  try {
    const { ufId } = req.params;
    const response = await ibgeService.getCountiesByUfId(ufId);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export const ibgeController = {
  getUfs,
  getCountyByUfId,
};
