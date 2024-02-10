import { Router } from "express";
import { createUser } from "@/controllers/index";
import { validateBody } from "@/middlewares";
import { signupSchema } from "@/schemas";

const authrouter = Router();

authrouter.post("/signup", validateBody(signupSchema), createUser);

export { authrouter };
