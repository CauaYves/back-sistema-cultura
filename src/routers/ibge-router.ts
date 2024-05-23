import { Router } from "express";
import { ibgeController } from "@/controllers";

const ibgeRouter = Router();

ibgeRouter.get("/uf", ibgeController.getUfs).get("/counties/:ufId", ibgeController.getCountyByUfId);

export { ibgeRouter };
