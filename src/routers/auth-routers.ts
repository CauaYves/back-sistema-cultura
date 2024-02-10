import { Router } from "express";
import { createUser, singIn } from "@/controllers/index";
import { validateBody } from "@/middlewares";
import { signinSchema, signupSchema } from "@/schemas";

const authrouter = Router();

authrouter.post("/sign-up", validateBody(signupSchema), createUser);
authrouter.post("/sign-in", validateBody(signinSchema), singIn);

export { authrouter };
