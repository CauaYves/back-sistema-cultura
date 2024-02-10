import { Router } from "express";
import { authController } from "@/controllers/index";
import { validateBody } from "../middlewares/validation-middleware";
import { signupSchema } from "../schemas/auth-schema";

const authrouter = Router();

authrouter.post("/signup", validateBody(signupSchema), authController);

export { authrouter };
